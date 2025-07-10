// src/components/Home.jsx
import { useEffect, useState } from 'react';

const Home = () => {
  const [tasks, setTasks] = useState([]);  // empieza como array vacío
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('http://localhost:3000/')
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setTasks(data);
        } else {
          console.error('Respuesta inesperada del backend:', data);
          setError('La respuesta no es un array');
        }
      })
      .catch((err) => {
        console.error('Error al cargar tareas:', err);
        setError('Error al conectar con el servidor');
      });
  }, []);

  if (error) {
    return <p style={{ color: 'red' }}>{error}</p>;
  }

  return (
    <div>
      <h1>Lista de Tareas</h1>
      <ul>
        {tasks.length === 0 ? (
          <li>No hay tareas aún</li>
        ) : (
          tasks.map((task) => (
            <li key={task._id}>{task.title}</li>
          ))
        )}
      </ul>
    </div>
  );
};

export default Home;
