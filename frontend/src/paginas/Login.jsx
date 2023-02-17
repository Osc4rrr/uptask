import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Alerta from '../components/Alerta';
import clienteAxios from '../config/clienteAxios';

import useAuth from '../hooks/useAuth';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [alerta, setAlerta] = useState({});

  const { setAuth, cargando } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if ([email, password].includes('')) {
      setAlerta({
        msg: 'Todos los campos son obligatorios',
        error: true,
      });
      return;
    }

    try {
      const { data } = await clienteAxios.post('/usuarios/login', {
        email,
        password,
      });

      setAlerta({});
      localStorage.setItem('token', data.token);
      setAuth(data);
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
        Iniciar Sesion y administra tus{'  '}
        <span className='text-slate-700'>proyectos</span>
      </h1>

      {msg && <Alerta alerta={alerta} />}

      <form
        onSubmit={handleSubmit}
        className='my-10 bg-white shadow rounded-lg px-10 py-5'
      >
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

        <input
          type='submit'
          value='Iniciar Sesion'
          className='w-full mt-3 p-3 mb-3 border rounded-xl bg-sky-600 text-white uppercase font-bold hover:cursor-pointer hover:bg-sky-700 transition-colors'
        />
      </form>

      <nav className='lg:flex lg:justify-between'>
        <Link
          to='registrar'
          className='block text-center my-2 text-slate-500 uppercase text-sm'
        >
          ¿No tienes una cuenta? Registrate
        </Link>

        <Link
          to='olvide-password'
          className='block text-center my-2 text-slate-500 uppercase text-sm'
        >
          Olvide mi password
        </Link>
      </nav>
    </>
  );
};

export default Login;
