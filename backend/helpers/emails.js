import nodemailer from 'nodemailer';

export const emailRegistro = async (datos) => {
  const { email, nombre, token } = datos;

  const transport = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  //Información del email
  const info = await transport.sendMail({
    from: '"Uptask - Administrador de proyectos" <cuentas@uptask.com>',
    to: email,
    subject: 'Uptask - Confirma tu cuenta',
    text: 'Confirma tu cuenta en Uptask',
    html: `
        <p> Hola ${nombre} Comprueba tu cuenta en Uptask</p>
        <p>Tu cuenta ya esta casi lista, solo debes comprobarla en el siguiente enlace: </p>
        <a href="${process.env.FRONTEND_URL}/confirmar/${token}">Confirmar cuenta</a>
        <p>Si no has creado una cuenta en Uptask, ignora este email</p>
    `,
  });
};

export const emailOlvidePassword = async (datos) => {
  const { email, nombre, token } = datos;

  const transport = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  //Información del email
  const info = await transport.sendMail({
    from: '"Uptask - Administrador de proyectos" <cuentas@uptask.com>',
    to: email,
    subject: 'Uptask - Reestablece tu password',
    text: 'Reestablece tu password en Uptask',
    html: `
        <p> Hola ${nombre} has solicitado reestablecer tu password</p>
        <p>Sigue el siguiente enlace para generar un nuevo password: </p>
        <a href="${process.env.FRONTEND_URL}/olvide-password/${token}">Reestablecer Password</a>
        <p>Si tu no solicitaste este email, ignora este mensaje</p>
    `,
  });
};
