"use client";
import React, { Fragment, useState, useEffect } from 'react';
import Formulario from './components/formulario'; // Asegúrate de que el nombre sea correcto
import Cita from "./components/cita"; // Asegúrate de que el nombre sea correcto

// Asegúrate de que estás usando 'uuid' si necesitas generar IDs únicos
import { v4 as uuidv4 } from 'uuid';

function App() {
  // Estado para las citas
  const [citas, guardarCitas] = useState([]);

  // Use Effect para cargar citas desde local storage
  useEffect(() => {
    // Verificar si window está definido
    if (typeof window !== 'undefined') {
      const citasIniciales = JSON.parse(localStorage.getItem('citas')) || [];
      guardarCitas(citasIniciales);
    }
  }, []); // Solo se ejecuta una vez al montar el componente

  // Use Effect para guardar citas en local storage cuando cambian
  useEffect(() => {
    // Verificar si window está definido
    if (typeof window !== 'undefined') {
      localStorage.setItem('citas', JSON.stringify(citas));
    }
  }, [citas]);

  // Función que toma las citas actuales y agrega la nueva
  const crearCita = (cita) => {
    const nuevaCita = { ...cita, id: uuidv4() }; // Agregar un ID único
    guardarCitas([...citas, nuevaCita]);
  };

  // Función que elimina una cita por su id
  const eliminarCita = (id) => {
    const nuevasCitas = citas.filter(cita => cita.id !== id);
    guardarCitas(nuevasCitas);
  };

  // Mensaje condicional
  const titulo = citas.length === 0 ? 'No hay citas' : 'Administra tus Citas';

  return (
    <Fragment>
      <h1>Administrador de Pacientes</h1>
      <div className="container">
        <div className="column">
          <Formulario crearCita={crearCita} />
        </div>
        <div className="column">
          <h2>{titulo}</h2>
          {citas.map(cita => (
            <Cita
              key={cita.id}
              cita={cita}
              eliminarCita={eliminarCita}
            />
          ))}
        </div>
      </div>
    </Fragment>
  );
}

export default App;
