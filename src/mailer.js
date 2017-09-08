import nodemailer from 'nodemailer';

const from = '"Bookshelf" <info@bookshelf.com>';

function setup() {
  return nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });
}

export function sendConfirmationEmail(user) {
  const transport = setup();

  const email = {
    to: user.email,
    from,
    subject: 'Welcome to Bookshelf',
    text: `
        Welcome to Bookshelf, please confirm your email.
        
        ${user.generateConfirmationUrl()}
        `,
  };

  transport.sendMail(email);
}
