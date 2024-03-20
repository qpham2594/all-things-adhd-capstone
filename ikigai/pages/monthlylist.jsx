import { useEffect, useState } from 'react';
import { getSession } from 'next-auth/react';
import styles from '../app/styles/page.module.css';

export default function MonthlyList({ session }) {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [completedTasks, setCompletedTasks] = useState(0);
  const [puzzlePiecesRevealed, setPuzzlePiecesRevealed] = useState(0);
  const [revealPuzzle, setRevealPuzzle] = useState(false);
  const [revealedTasks, setRevealedTasks] = useState([]);

  useEffect(() => {
    if (session) {
      fetchTasks();
    }
  }, [session]);

  const fetchTasks = async () => {
    try {
      const response = await fetch('/api/todo');
      const data = await response.json();
      setTasks(data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  useEffect(() => {
    setCompletedTasks(tasks.filter((task) => task.completed).length);
  }, [tasks]);

  useEffect(() => {
    setRevealPuzzle(completedTasks === tasks.length);
  }, [completedTasks, tasks.length]);

  useEffect(() => {
    // Reveal puzzle piece when a new task is completed
    if (completedTasks > puzzlePiecesRevealed && !revealedTasks.includes(completedTasks)) {
      setPuzzlePiecesRevealed((prev) => prev + 1);
      setRevealedTasks((prev) => [...prev, completedTasks]);
    }
  }, [completedTasks, puzzlePiecesRevealed, revealedTasks]);

  const addTask = async () => {
    try {
      const newTaskData = {
        task: newTask,
        date: selectedDate || new Date(),
      };
  
      // Update the UI immediately by appending the new task to the existing tasks
      setTasks((prevTasks) => [...prevTasks, newTaskData]);
  
      const response = await fetch('/api/todo', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newTaskData),
      });
  
      if (response.ok) {
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
        },
        body: JSON.stringify({
          id: _id,
          task: updatedTask,
          date: new Date(),
        }),
      });

      if (response.ok) {
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
        },
        body: JSON.stringify({ id: _id }),
      });

      if (response.ok) {
        setTasks((prevTasks) => prevTasks.filter((task) => task._id !== _id));
      } else {
        console.error('Error deleting task:', await response.json());
      }
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  const updateTaskStatus = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].completed = !updatedTasks[index].completed;
    setTasks(updatedTasks);
  };

  return (
    <div>
      <h1>Monthly List</h1>
      {session ? (
        <>
          <ul>
            {tasks.map((task, index) => (
              <li key={task._id}>
                <span
                  onClick={() => updateTaskStatus(index)}
                  style={{ textDecoration: task.completed ? 'line-through' : 'none' }}
                >
                  {task.task}
                </span>{' '}
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
          {revealPuzzle && (
            <div>
              <h1>Reveal the puzzle by finishing your monthly to-do list!</h1>
              <div id={styles.puzzleBoard}>
                <div id={styles.cowImages}>
                {tasks.slice(0, puzzlePiecesRevealed).map((task, index) => (
                <img
                key={index}
                src={`/images/img${index + 1}.jpg`}
                alt={`img ${index + 1}`}
              />
              
              ))}
                </div>
              </div>
            </div>
          )}
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

