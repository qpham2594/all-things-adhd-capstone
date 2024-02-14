import { useEffect, useState } from 'react';
import Header from '@/components/header';

const MonthlyList = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');

  useEffect(() => {
    FetchTasks();
  }, []);

  const FetchTasks = async () => {
    const response = await fetch('/api/todo');
    const data = await response.json();
    setTasks(data);
  };

  const AddTask = async () => {
    try {
      const response = await fetch('/api/todo', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ task: newTask }),
      });

      if (response.ok) {
        console.log('Task added successfully');
        setNewTask('');
        FetchTasks();
      } else {
        console.error('Error adding task:', await response.json());
      }
    } catch (error) {
      console.error('Error adding task:', error);
    }
  };

  const UpdateTask = async (taskId, updatedTask) => {
    try {
      const response = await fetch('/api/todo', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: taskId, task: updatedTask }),
      });

      if (response.ok) {
        console.log('Task updated successfully');
        FetchTasks();
      } else {
        console.error('Error updating task:', await response.json());
      }
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  const DeleteTask = async (taskId) => {
    try {
      const response = await fetch('/api/todo', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: taskId }),
      });

      if (response.ok) {
        console.log('Task deleted successfully');
        FetchTasks();
      } else {
        console.error('Error deleting task:', await response.json());
      }
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  return (
    <div>
      <Header/>
      <h1>Monthly List</h1>
      <ul>
        {tasks.map((task) => (
          <li key={task._id}>
            {task.task}{' '}
            <button onClick={() => UpdateTask(task._id, prompt('Enter updated task:'))}>
              Update
            </button>{' '}
            <button onClick={() => DeleteTask(task._id)}>Delete</button>
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
        <button onClick={AddTask}>Add Task</button>
      </div>
    </div>
  );
};

export default MonthlyList;