import { Link } from 'react-router-dom';
const NuevoPassword = () => {
  return (
    <>
      <h1 className='text-sky-600 font-black text-6xl capitalize'>
        Reestablece tu password y no pierdas acceso a tus{' '}
        <span className='text-slate-700'>proyectos</span>
      </h1>

      <form className='my-10 bg-white shadow rounded-lg px-10 py-5'>
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
            className='w-full mt-3 p-3 border rounded-xl bg-gray-50'
          />
        </div>

        <input
          type='submit'
          value='Reestablecer Password'
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

export default NuevoPassword;
