import nodemailer from 'nodemailer';
import { getSettings } from '../modules/settings/settings.service';

let transporter: nodemailer.Transporter | null = null;

const getTransporter = async () => {
  if (transporter) return transporter;

  const account = await nodemailer.createTestAccount();

  transporter = nodemailer.createTransport({
    host: account.smtp.host,
    port: account.smtp.port,
    secure: account.smtp.secure,
    auth: {
      user: account.user,
      pass: account.pass,
    },
  });

  console.log('📧 Ethereal email account created:', account.user);

  return transporter;
};

export const sendReservationConfirmation = async (options: {
  to: string;
  name: string;
  date: Date;
  guests: number;
  tableNumber: number;
  locationName: string;
  locationAddress: string;
  preOrders: { dishName: string; quantity: number }[];
}) => {
  const transport = await getTransporter();
  const settings = await getSettings();

  const preOrderHtml =
    options.preOrders.length > 0
      ? `<h3>Pre-ordered dishes:</h3>
         <ul>${options.preOrders.map(p => `<li>${p.dishName} x${p.quantity}</li>`).join('')}</ul>`
      : '';

  const info = await transport.sendMail({
    from: `"${settings.restaurantName}" <noreply@restaurantjolie.com>`,
    to: options.to,
    subject: `Reservation Confirmed — ${settings.restaurantName}`,
    html: `
      <h2>Your reservation is confirmed!</h2>
      <p>Hi ${options.name},</p>
      <p><strong>Date:</strong> ${options.date.toLocaleString()}</p>
      <p><strong>Guests:</strong> ${options.guests}</p>
      <p><strong>Table:</strong> #${options.tableNumber}</p>
      <p><strong>Location:</strong> ${options.locationName} — ${options.locationAddress}</p>
      ${preOrderHtml}
      <p>See you soon!</p>
    `,
  });

  console.log('📧 Email sent. Preview URL:', nodemailer.getTestMessageUrl(info));
};
