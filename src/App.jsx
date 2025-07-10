// src/App.jsx (o App.js)
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import InputCreate from './components/InputCreate'; // <-- Asegúrate de que esta ruta sea correcta

function App() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Función para obtener las tareas de tu backend
  const fetchTasks = async () => {
    try {
      // **IMPORTANTE:** Verifica que esta URL coincida con la URL de tu backend
      const response = await fetch('http://localhost:3000/'); 
      if (!response.ok) {
        throw new Error(`¡Error HTTP! Estado: ${response.status}`);
      }
      const data = await response.json();
      setTasks(data);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []); // Se ejecuta una vez al montar el componente

  if (loading) return <div>Cargando tareas...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Ver Tareas</Link>
            </li>
            <li>
              <Link to="/create">Crear Tarea</Link>
            </li>
          </ul>
        </nav>

        <hr />

        <Routes>
          <Route 
            path="/" 
            element={
              <div>
                <h1>Todas las Tareas</h1>
                {tasks.length > 0 ? (
                  <ul>
                    {tasks.map(task => (
                      <li key={task.id}>{task.title}</li>
                    ))}
                  </ul>
                ) : (
                  <p>No se encontraron tareas. ¡Crea algunas!</p>
                )}
                <button onClick={fetchTasks}>Actualizar Tareas</button> {/* Botón para refrescar */}
              </div>
            } 
          />
          <Route path="/create" element={<InputCreate />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;