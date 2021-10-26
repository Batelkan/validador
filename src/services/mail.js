/* eslint-disable */
const nodemailer = require('nodemailer');
const {ipcMain} =  require('electron');


export function SendIt(doc) {
  const transporter = nodemailer.createTransport({
    host: "mail.desur.mx",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: 'pagos@grupodesur.com',
      pass: '}fUrvHvI*0Hw',
    },
    tls: {
    rejectUnauthorized: false
    }
  });

  const mailOptions = {
    from: 'facturas@grupodesur.com',
    to: doc.Correo,
    subject: 'Validacion de Factura',
    html: `<p>La factura ${doc.Folio} del proveedor ${doc.Proveedor} ha sido validada</p>`,
  };

  transporter.sendMail(mailOptions, function (err, info) {
    if (err) console.log(err);
    else console.log(info);
  });
}

ipcMain.on("EnvialEmail", (event, args) => {
  console.log("ipcMain: Executing SendIt");
  SendIt(args);
});
