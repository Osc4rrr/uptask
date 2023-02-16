import { useState } from 'react';
import { Link } from 'react-router-dom';
import Alerta from '../components/Alerta';
import clienteAxios from '../config/clienteAxios';
const OlvidePassword = () => {
  const [email, setEmail] = useState('');
  const [alerta, setAlerta] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();

    //regex to check email format
    const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (email === '' || !regex.test(email) || email.length < 6) {
      setAlerta({
        msg: 'Por favor ingrese un email valido',
        error: true,
      });
      return;
    }

    try {
      const { data } = await clienteAxios.post(`/usuarios/olvide-password`, {
        email,
      });

      setAlerta({
        msg: data.msg,
        error: false,
      });
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
        Recupera tu acceso y no pierdas tus{' '}
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
        <input
          type='submit'
          value='Enviar Instrucciones'
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
          to='/registrar'
          className='block text-center my-2 text-slate-500 uppercase text-sm'
        >
          ¿No tienes una cuenta? Registrate
        </Link>
      </nav>
    </>
  );
};

export default OlvidePassword;
