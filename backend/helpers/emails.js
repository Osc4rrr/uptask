import nodemailer from 'nodemailer';

export const emailRegistro = async (datos) => {
  const { email, nombre, token } = datos;

  const transport = nodemailer.createTransport({
    host: 'sandbox.smtp.mailtrap.io',
    port: 2525,
    auth: {
      user: 'ec8e84ae7a7296',
      pass: 'c70fff9b16cab9',
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

  //TODO: mover hacia variables de entorno
  const transport = nodemailer.createTransport({
    host: 'sandbox.smtp.mailtrap.io',
    port: 2525,
    auth: {
      user: 'ec8e84ae7a7296',
      pass: 'c70fff9b16cab9',
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
