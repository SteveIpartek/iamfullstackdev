// src/components/InputCreate.jsx
import React, { useState } from 'react';

const InputCreate = () => {
  const [taskTitle, setTaskTitle] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault(); // Evita el comportamiento predeterminado de envío del formulario

    if (!taskTitle.trim()) {
      alert('Por favor, introduce un título para la tarea.');
      return;
    }

    // **IMPORTANTE:** Verifica que esta URL coincida con la URL de tu backend
    // Si tu backend está en un puerto o dominio diferente, cámbialo aquí.
    const urlApi = 'http://localhost:3000/create'; 

    const payload = {
      title: taskTitle,
    };

    try {
      const response = await fetch(urlApi, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(`¡Error HTTP! Estado: ${response.status}`);
      }

      const data = await response.json();
      console.log('Tarea añadida con éxito:', data);
      alert('¡Tarea añadida con éxito!');
      setTaskTitle(''); // Limpia el campo de entrada
      // Considera añadir una forma de refrescar la lista de tareas en App.jsx
      // para ver la nueva tarea inmediatamente.
    } catch (error) {
      console.error('Error al añadir la tarea:', error);
      alert('Error al añadir la tarea. Por favor, revisa la consola para más detalles.');
    }
  };

  return (
    <div>
      <h2>Añadir Nueva Tarea</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={taskTitle}
          onChange={(e) => setTaskTitle(e.target.value)}
          placeholder="Introduce el título de la nueva tarea"
        />
        <button type="submit">Añadir Tarea</button>
      </form>
    </div>
  );
};

export default InputCreate;