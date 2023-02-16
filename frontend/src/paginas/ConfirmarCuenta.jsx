import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import Alerta from '../components/Alerta';
const ConfirmarCuenta = () => {
  const params = useParams();
  const { token } = params;
  const [alerta, setAlerta] = useState({});
  const [cuentaConfirmada, setCuentaConfirmada] = useState(false);

  useEffect(() => {
    const confirmarCuenta = async () => {
      //TODO: Mover hacia un cliente axios
      try {
        const url = `${
          import.meta.env.VITE_BACKEND_URL
        }/api/usuarios/confirmar/${token}`;
        const { data } = await axios(url);

        setAlerta({
          msg: data.msg,
          error: false,
        });

        setCuentaConfirmada(true);
      } catch (error) {
        setAlerta({
          msg: error.response.data.msg,
          error: true,
        });
      }
    };

    confirmarCuenta();
  }, []);

  const { msg } = alerta;

  return (
    <>
      <h1 className='text-sky-600 font-black text-6xl capitalize'>
        Confirma tu cuenta y comienza a crear tus{' '}
        <span className='text-slate-700'>proyectos</span>
      </h1>

      <div className='mt-20 md:mt-10 shadow-lg px-5 py-10 rounded-xl bg-white'>
        {msg && <Alerta alerta={alerta} />}
        {cuentaConfirmada && (
          <Link
            to='/'
            className='block text-center my-2 text-slate-500 uppercase text-sm'
          >
            Inicia Sesión
          </Link>
        )}
      </div>
    </>
  );
};

export default ConfirmarCuenta;
