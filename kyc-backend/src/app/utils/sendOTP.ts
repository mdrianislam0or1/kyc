import nodemailer from 'nodemailer';
import config from '../config';

// export const sendOTP = async (email: string): Promise<void> => {
//   try {
//     const transporter = nodemailer.createTransport({
//       host: 'smtp.gmail.com',
//       port: 587,
//       secure: config.NODE_ENV === 'production',
//       auth: {
//         user: 'rianislam50@gmail.com',
//         pass: 'soff akrv ikfv ssrw',
//       },
//     });

//     const OTP = Math.floor(100000 + Math.random() * 900000);

//     const mailOptions = {
//       from: 'rianislam50@gmail.com',
//       to: email,
//       subject: 'Your OTP for verification',
//       text: `Your OTP is: ${OTP}. This OTP is valid for 10 minutes.`,
//     };

//     await transporter.sendMail(mailOptions);

//     console.log('OTP sent successfully');
//   } catch (error) {
//     console.error('Error sending OTP:', error);
//     throw new Error('Failed to send OTP');
//   }
// };

export const sendOTP = async (email: string, OTP: string): Promise<void> => {
  try {
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: config.NODE_ENV === 'production',
      auth: {
        user: 'rianislam50@gmail.com',
        pass: 'soff akrv ikfv ssrw',
      },
    });

    const mailOptions = {
      from: 'rianislam50@gmail.com',
      to: email,
      subject: 'Your OTP for verification',
      text: `Your OTP is: ${OTP}. This OTP is valid for 10 minutes.`,
    };

    await transporter.sendMail(mailOptions);

    console.log('OTP sent successfully');
  } catch (error) {
    console.error('Error sending OTP:', error);
    throw new Error('Failed to send OTP');
  }
};
