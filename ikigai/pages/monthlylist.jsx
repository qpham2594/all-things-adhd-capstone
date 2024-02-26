import { useEffect, useState } from 'react';
import { getSession } from 'next-auth/react';

export default function MonthlyList({ session }) {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [selectedDate, setSelectedDate] = useState(null);

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
      console.log('User ID:', session?.user?.id);
      const response = await fetch('/api/todo', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${session?.accessToken}`,
        },
        body: JSON.stringify({ task: newTask, date: selectedDate || new Date(), user: session?.user?.id }),
      });
  
      if (response.status === 200) {
        console.log('Task added successfully');
        const newTaskData = await response.json();

        setTasks((prevTasks) => [...prevTasks, newTaskData]);
        setNewTask('');
        setSelectedDate(''); 
      } else {
        console.error('Error adding task:', await response.json());
      }
    } catch (error) {
      console.error('Error adding task:', error);
    }
  };
  

  const updateTask = async (_id, updatedTask) => {
    try {
      updatedTask = updatedTask || '';
  
      const response = await fetch(`/api/todo/`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${session?.accessToken}`,
        },
        body: JSON.stringify({ id: _id, task: updatedTask, date: new Date(), user: session?.user?.id }),
      });
  
      if (response.status === 200) {
        console.log('Task updated successfully');
        setTasks((prevTasks) =>
          prevTasks.map((task) =>
            task._id === _id ? { ...task, task: updatedTask } : task
          )
        );
      } else {
        console.error('Error updating task:', await response.json());
      }
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };
  
  const deleteTask = async (_id) => {
    try {
      const response = await fetch('/api/todo', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${session?.accessToken}`,
        },
        body: JSON.stringify({ id: _id }),
      });
  
      if (response.status === 200) {
        console.log('Task deleted successfully');
        setTasks((prevTasks) => prevTasks.filter((task) => task._id !== _id));
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
        <input
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          placeholder="Select date"
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