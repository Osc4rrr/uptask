import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import Alerta from '../components/Alerta';
const NuevoPassword = () => {
  const [password, setPassword] = useState('');
  const [tokenValido, setTokenValido] = useState(false);
  const [passwordModificado, setPasswordModificado] = useState(false);
  const [alerta, setAlerta] = useState({});
  const params = useParams();
  const { token } = params;
  useEffect(() => {
    const comprobarToken = async () => {
      try {
        await axios(
          `${
            import.meta.env.VITE_BACKEND_URL
          }/api/usuarios/olvide-password/${token}`
        );

        setTokenValido(true);
      } catch (error) {
        setAlerta({
          msg: error.response.data.msg,
          error: true,
        });
      }
    };

    comprobarToken();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password.length < 6) {
      setAlerta({
        msg: 'El password debe tener al menos 6 caracteres',
        error: true,
      });
      return;
    }

    try {
      const url = `${
        import.meta.env.VITE_BACKEND_URL
      }/api/usuarios/olvide-password/${token}`;

      const data = await axios.post(url, { password });
      setAlerta({
        msg: data.data.msg,
        error: false,
      });

      setPasswordModificado(true);
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
        Reestablece tu password y no pierdas acceso a tus{' '}
        <span className='text-slate-700'>proyectos</span>
      </h1>

      {msg && <Alerta alerta={alerta} />}

      {tokenValido && (
        <form
          onSubmit={handleSubmit}
          className='my-10 bg-white shadow rounded-lg px-10 py-5'
        >
          <div className='my-5'>
            <label
              className='uppercase text-gray-600 block text-xl font-bold'
              htmlFor='password'
            >
              Nuevo Password
            </label>
            <input
              id='password'
              type='password'
              placeholder='Escribe tu nuevo password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className='w-full mt-3 p-3 border rounded-xl bg-gray-50'
            />
          </div>

          <input
            type='submit'
            value='Reestablecer Password'
            className='w-full mt-3 p-3 mb-3 border rounded-xl bg-sky-600 text-white uppercase font-bold hover:cursor-pointer hover:bg-sky-700 transition-colors'
          />
        </form>
      )}

      {passwordModificado && (
        <Link
          to='/'
          className='block text-center my-2 text-slate-500 uppercase text-sm'
        >
          Inicia Sesión
        </Link>
      )}
    </>
  );
};

export default NuevoPassword;
