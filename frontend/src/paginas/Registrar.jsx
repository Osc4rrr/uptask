import { useState } from 'react';
import { Link } from 'react-router-dom';
import Alerta from '../components/Alerta';
import clienteAxios from '../config/clienteAxios';
const Registrar = () => {
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const [alerta, setAlerta] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();

    if ([nombre, email, password, password2].includes('')) {
      setAlerta({
        msg: 'Todos los campos son obligatorios',
        error: true,
      });
      return;
    }

    if (password !== password2) {
      setAlerta({
        msg: 'Los passwords no coinciden',
        error: true,
      });
      return;
    }

    if (password.length < 6) {
      setAlerta({
        msg: 'El password debe tener al menos 6 caracteres',
        error: true,
      });
      return;
    }

    setAlerta({});

    //Crear usuario en api

    try {
      const { data } = await clienteAxios.post(`/usuarios`, {
        nombre,
        email,
        password,
      });

      setAlerta({
        msg: data.msg,
        error: false,
      });

      setNombre('');
      setEmail('');
      setPassword('');
      setPassword2('');
    } catch (error) {
      setAlerta({
        msg: error.response.data.msg,
        error: true,
      });
    }
  };

  const { msg } = alerta;
  return (
    <>
      <h1 className='text-sky-600 font-black text-6xl capitalize'>
        Crea tu cuenta y administra tus{' '}
        <span className='text-slate-700'>proyectos</span>
      </h1>

      {msg && <Alerta alerta={alerta} />}

      <form
        className='my-10 bg-white shadow rounded-lg px-10 py-5'
        onSubmit={handleSubmit}
      >
        <div className='my-5'>
          <label
            className='uppercase text-gray-600 block text-xl font-bold'
            htmlFor='nombre'
          >
            Nombre
          </label>
          <input
            id='nombre'
            type='text'
            placeholder='Tu nombre'
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            className='w-full mt-3 p-3 border rounded-xl bg-gray-50'
          />
        </div>
        <div className='my-5'>
          <label
            className='uppercase text-gray-600 block text-xl font-bold'
            htmlFor='email'
          >
            Email
          </label>
          <input
            id='email'
            type='email'
            placeholder='Email de registro'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className='w-full mt-3 p-3 border rounded-xl bg-gray-50'
          />
        </div>

        <div className='my-5'>
          <label
            className='uppercase text-gray-600 block text-xl font-bold'
            htmlFor='password'
          >
            Password
          </label>
          <input
            id='password'
            type='password'
            placeholder='Password de registro'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className='w-full mt-3 p-3 border rounded-xl bg-gray-50'
          />
        </div>

        <div className='my-5'>
          <label
            className='uppercase text-gray-600 block text-xl font-bold'
            htmlFor='password2'
          >
            Repetir Password
          </label>
          <input
            id='password2'
            type='password'
            placeholder='Repite tu password'
            value={password2}
            onChange={(e) => setPassword2(e.target.value)}
            className='w-full mt-3 p-3 border rounded-xl bg-gray-50'
          />
        </div>

        <input
          type='submit'
          value='Crear Cuenta'
          className='w-full mt-3 p-3 mb-3 border rounded-xl bg-sky-600 text-white uppercase font-bold hover:cursor-pointer hover:bg-sky-700 transition-colors'
        />
      </form>

      <nav className='lg:flex lg:justify-between'>
        <Link
          to='/'
          className='block text-center my-2 text-slate-500 uppercase text-sm'
        >
          ¿Tienes una cuenta? Inicia Sesión
        </Link>

        <Link
          to='/olvide-password'
          className='block text-center my-2 text-slate-500 uppercase text-sm'
        >
          Olvide mi password
        </Link>
      </nav>
    </>
  );
};

export default Registrar;
