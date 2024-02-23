import { useEffect, useState } from 'react';
import { getSession } from 'next-auth/react';

export default function MonthlyList({ session }) {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');

  const fetchTasks = async () => {
    try {
      const response = await fetch('/api/todo', {
        headers: {
          Authorization: `Bearer ${session?.accessToken}`,
        },
      });
      const data = await response.json();
      setTasks(data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  useEffect(() => {
    if (session) {
      fetchTasks();
    }
  }, [session]);

  const addTask = async () => {
    try {
      const response = await fetch('/api/todo', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${session?.accessToken}`,
        },
        body: JSON.stringify({ task: newTask, date: new Date(), user: session?.user?.id }),
      });

      if (response.ok) {
        console.log('Task added successfully');
        setNewTask('');
        fetchTasks();
      } else {
        console.error('Error adding task:', await response.json());
      }
    } catch (error) {
      console.error('Error adding task:', error);
    }
  };

  const updateTask = async (taskId, updatedTask) => {
    try {
      updatedTask = updatedTask || '';

      const response = await fetch(`/api/todo/${taskId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${session?.accessToken}`,
        },
        body: JSON.stringify({ task: updatedTask, date: new Date(), user: session?.user?.id }),
      });

      if (response.ok) {
        console.log('Task updated successfully');
        fetchTasks();
      } else {
        console.error('Error updating task:', await response.json());
      }
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  const deleteTask = async (taskId) => {
    try {
      const response = await fetch(`/api/todo/${taskId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${session?.accessToken}`,
        },
        body: JSON.stringify({ user: session?.user?.id }),
      });

      if (response.ok) {
        console.log('Task deleted successfully');
        fetchTasks();
      } else {
        console.error('Error deleting task:', await response.json());
      }
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  return (
    <div>
      <h1>Monthly List</h1>
      {session ? (
        <>
          <ul>
            {tasks.map((task) => (
              <li key={task._id}>
                {task.task}{' '}
                <button onClick={() => updateTask(task._id, prompt('Enter updated task:'))}>
                  Update
                </button>{' '}
                <button onClick={() => deleteTask(task._id)}>Delete</button>
              </li>
            ))}
          </ul>
          <div>
            <input
              type="text"
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              placeholder="Enter new task"
            />
            <button onClick={addTask}>Add Task</button>
          </div>
        </>
      ) : (
        <p>Please log in to access the to-do list.</p>
      )}
    </div>
  );
}

export async function getServerSideProps(context) {
  try {
    const session = await getSession(context);

    if (session) {
      console.log('Session retrieved successfully:', session);
    } else {
      console.log('No session found');
    }

    return {
      props: {
        session,
      },
    };
  } catch (error) {
    console.error('Error retrieving session:', error);

    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }
}