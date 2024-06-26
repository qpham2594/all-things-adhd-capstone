import { useEffect, useState } from 'react';
import { getSession } from 'next-auth/react';
import styles from '@/styles/page.module.css';
import Head from "next/head";

export default function MonthlyList({ session }) {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [completedTasks, setCompletedTasks] = useState(0);
  const [puzzlePiecesRevealed, setPuzzlePiecesRevealed] = useState(0);
  const [revealPuzzle, setRevealPuzzle] = useState(false);
  const [revealedTasks, setRevealedTasks] = useState([]);

  useEffect(() => {
    if (session) {
      fetchTasks();
    }
  }, [session]);

  useEffect(() => {
    // Load tasks from localStorage on initial load
    const savedTasks = localStorage.getItem('tasks');
    if (savedTasks) {
      setTasks(JSON.parse(savedTasks));
    }
  }, []);

  useEffect(() => {
    // Save tasks to localStorage whenever tasks change
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

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

  const fetchTasks = async () => {
    try {
      const response = await fetch('/api/todo');
      const data = await response.json();
      setTasks(data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  const addTask = async () => {
    try {
      const newTaskData = {
        task: newTask,
        date: selectedDate || new Date(),
      };

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
        fetchTasks(); // Fetch updated tasks after adding a new one
      } else {
        console.error('Error adding task:', await response.json());
      }
    } catch (error) {
      console.error('Error adding task:', error);
    }
  };

  const deleteTask = async (id) => {
    try {
      const response = await fetch(`/api/todo?id=${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: id }),
      });

      if (response.ok) {
        fetchTasks(); // Fetch updated tasks after deleting one
      } else {
        console.error('Error deleting task:', await response.json());
      }
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  const updateTaskStatus = async (index) => {
    try {
      const updatedTasks = [...tasks];
      updatedTasks[index].completed = !updatedTasks[index].completed;
      setTasks(updatedTasks);

      // Update localStorage with the modified tasks array
      localStorage.setItem('tasks', JSON.stringify(updatedTasks));

      const response = await fetch('/api/todo', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: tasks[index]._id,
          completed: updatedTasks[index].completed,
        }),
      });

      if (!response.ok) {
        console.error('Error updating task status:', await response.json());
      }
    } catch (error) {
      console.error('Error updating task status:', error);
    }
  };

  return (
    <div className={styles.todoAddBox}>
      <Head>
        <title> Ikigai To-do List </title>
        <meta name="description" content="Ikigai To-do List" />
        <link rel="icon" href='/favicontransparent.png'/>
      </Head>
      <h1 className={styles.h1}> Your To-do List</h1>
      {session ? (
        <>
          <div className={styles.taskContainer}>
            <div className={styles.taskTextWrapper}>
              <p className={styles.taskText}>
                Got things to do? Having a hard time with administrative tasks? <br></br>
                Jot them down, accomplish them, and get a puzzle piece in return for each completed task!
              </p>
            </div>
            <div className={styles.inputWrapper}>
              <input
                type="text"
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
                placeholder="Enter new task"
                className={styles.taskInput}
              />
            <input
              type="date"
              value={new Date().toISOString().split('T')[0]} // Convert current date to string in yyyy-mm-dd format
              onChange={(e) => console.log(new Date(e.target.value))}
              className={styles.taskInput}
            />
              <button onClick={addTask} className={styles.addTaskButton}>Add Task</button>
            </div>
          </div>    
          <div className={styles.taskListContainer}>
            <ul className={styles.taskList}>
              {tasks.map((task, index) => (
                <li key={task._id}>
                  <span
                    onClick={() => updateTaskStatus(index)}
                    style={{ textDecoration: task.completed ? 'line-through' : 'none', cursor: 'pointer' }}
                  >
                    {task.task}
                  </span>{' '}
                  <button onClick={() => deleteTask(task._id)} className={styles.todoButton}>Delete</button>
                </li>
              ))}
            </ul>
          </div>  
          {revealPuzzle && (
            <div>
              <h1 className={styles.h1}>Reveal the puzzle by finishing your monthly to-do list!</h1>
              <div className={styles.puzzleBoard}>
                <div className={styles.cowContainer}>
                  <div className={styles.cowImages}>
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
