import { useState, useEffect } from 'react';
import useProyectos from '../hooks/useProyectos';
import { useParams } from 'react-router-dom';
import Alerta from './Alerta';
const FormularioProyecto = () => {
  const [id, setId] = useState(null);
  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [fechaEntrega, setFechaEntrega] = useState('');
  const [cliente, setCliente] = useState('');

  const { mostrarAlerta, alerta, submitProyecto, proyecto } = useProyectos();

  const params = useParams();
  useEffect(() => {
    if (params.id) {
      setId(proyecto._id);
      setNombre(proyecto.nombre);
      setDescripcion(proyecto.descripcion);
      setFechaEntrega(proyecto.fechaEntrega?.split('T')[0]);
      setCliente(proyecto.cliente);
    } else {
      console.log('nuevo');
    }
  }, [params]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if ([nombre, descripcion, fechaEntrega, cliente].includes('')) {
      mostrarAlerta({
        msg: 'Todos los campos son obligatorios',
        error: true,
      });
      return;
    }

    //Pasar los datos al provider
    await submitProyecto({ id, nombre, descripcion, fechaEntrega, cliente });

    setId(null);
    setNombre('');
    setDescripcion('');
    setFechaEntrega('');
    setCliente('');
  };

  const { msg } = alerta;
  return (
    <form
      className='bg-white py-10 px-5 md:w-1/2 rounded-lg'
      onSubmit={handleSubmit}
    >
      {msg && <Alerta alerta={alerta} />}
      <div className='mb-5'>
        <label
          className='text-gray-700 uppercase font-bold text-sm'
          htmlFor='nombre'
        >
          Nombre Proyecto
        </label>
        <input
          type='text'
          id='nombre'
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          className='border w-full p-2 mt-2 placeholder-gray-400 rounded-md'
          placeholder='Nombre Proyecto'
        />
      </div>

      <div className='mb-5'>
        <label
          className='text-gray-700 uppercase font-bold text-sm'
          htmlFor='descripcion'
        >
          Descripción
        </label>
        <textarea
          id='descripcion'
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
          className='border w-full p-2 mt-2 placeholder-gray-400 rounded-md'
          placeholder='Descripción Proyecto'
        />
      </div>

      <div className='mb-5'>
        <label
          className='text-gray-700 uppercase font-bold text-sm'
          htmlFor='fecha-entrega'
        >
          Fecha de entrega
        </label>
        <input
          id='fecha-entrega'
          type='date'
          value={fechaEntrega}
          onChange={(e) => setFechaEntrega(e.target.value)}
          className='border w-full p-2 mt-2 placeholder-gray-400 rounded-md'
        />
      </div>

      <div className='mb-5'>
        <label
          className='text-gray-700 uppercase font-bold text-sm'
          htmlFor='nombre-cliente'
        >
          Nombre Cliente
        </label>
        <input
          type='text'
          id='nombre-cliente'
          value={cliente}
          onChange={(e) => setCliente(e.target.value)}
          className='border w-full p-2 mt-2 placeholder-gray-400 rounded-md'
          placeholder='Nombre Cliente'
        />
      </div>

      <input
        type='submit'
        value={id ? 'Actualizar Proyecto' : 'Crear Proyecto'}
        className='bg-sky-600 w-full p-3 uppercase font-bold text-white rounded cursor-pointer hover:bg-sky-700 transition:colors'
      />
    </form>
  );
};

export default FormularioProyecto;