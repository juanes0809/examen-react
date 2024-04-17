import React, { useState } from 'react';
import './App.css';

function App() {
  const [clientes, setClientes] = useState([]);
  const [filtroTitular, setFiltroTitular] = useState('');
  const [filtroDestino, setFiltroDestino] = useState('');
  const [filtroPagoMin, setFiltroPagoMin] = useState(0);
  const [filtroPagoMax, setFiltroPagoMax] = useState(5000000);

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const nuevoCliente = {
      nombre: formData.get('nombre'),
      lugarVisita: formData.get('lugarVisita'),
      valorPagado: parseFloat(formData.get('valorPagado')),
      cantidadPersonas: parseInt(formData.get('cantidadPersonas'), 10)
    };
    setClientes([...clientes, nuevoCliente]);
    event.target.reset();
  };

  const handleFiltroTitularChange = (event) => {
    setFiltroTitular(event.target.value);
  };

  const handleFiltroDestinoChange = (event) => {
    setFiltroDestino(event.target.value);
  };

  const handleFiltroPagoMinChange = (event) => {
    setFiltroPagoMin(parseFloat(event.target.value));
  };

  const handleFiltroPagoMaxChange = (event) => {
    setFiltroPagoMax(parseFloat(event.target.value));
  };

  const clientesFiltrados = clientes.filter(cliente =>
    cliente.nombre.toLowerCase().includes(filtroTitular.toLowerCase()) &&
    cliente.lugarVisita.toLowerCase().includes(filtroDestino.toLowerCase()) &&
    cliente.valorPagado > filtroPagoMin &&
    cliente.valorPagado < filtroPagoMax
  );

  return (
    <div className="container">
      <h1>Registro de Clientes de "Nos Fuimos"</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="nombre">Nombre del Cliente:</label>
        <input type="text" id="nombre" name="nombre" required />
        <label htmlFor="lugarVisita">Lugar que Visita:</label>
        <input type="text" id="lugarVisita" name="lugarVisita" required />
        <label htmlFor="valorPagado">Valor Pagado:</label>
        <input type="number" id="valorPagado" name="valorPagado" required />
        <label htmlFor="cantidadPersonas">Cantidad de Personas:</label>
        <input type="number" id="cantidadPersonas" name="cantidadPersonas" required />
        <button type="submit">Agregar Cliente</button>
      </form>
      <div>
        <h2>Filtrar por Titular:</h2>
        <input type="text" value={filtroTitular} onChange={handleFiltroTitularChange} />
      </div>
      <div>
        <h2>Filtrar por Destino:</h2>
        <input type="text" value={filtroDestino} onChange={handleFiltroDestinoChange} />
      </div>
      <div>
        <h2>Filtrar por Pago Mínimo:</h2>
        <input type="number" value={filtroPagoMin} onChange={handleFiltroPagoMinChange} />
      </div>
      <div>
        <h2>Filtrar por Pago Máximo:</h2>
        <input type="number" value={filtroPagoMax} onChange={handleFiltroPagoMaxChange} />
      </div>
      <h2>Lista de Clientes:</h2>
      <ul>
        {clientesFiltrados.map((cliente, index) => (
          <li key={index}>
            <strong>Nombre:</strong> {cliente.nombre}, <strong>Lugar que Visita:</strong> {cliente.lugarVisita}, <strong>Valor Pagado:</strong> {cliente.valorPagado}, <strong>Cantidad de Personas:</strong> {cliente.cantidadPersonas}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;




