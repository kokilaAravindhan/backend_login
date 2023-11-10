import nodemailer from 'nodemailer';

export const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'koks1.kvsd@gmail.com',
    pass: 'otea pkfq ubvw dhgw'
  }
});

export const mailOptions = {
  from: 'koara9923@gmail.com',
  to: 'koks1.kvsd@gmail.com',
  subject: 'Sending Email using Node.js',
  text: 'That was easy!'
};