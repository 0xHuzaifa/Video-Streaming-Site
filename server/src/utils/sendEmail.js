import nodeMailer from "nodemailer";
import ApiError from "./ApiError.js";

const createTransporter = () => {
  try {
    const transporter = nodeMailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT), // Convert to number
      secure: process.env.SMTP_SECURE === "true", // Ensure boolean
      auth: {
        user: process.env.SMTP_MAIL,
        pass: process.env.SMTP_PASS,
      },
      // Add timeout and connection settings
      // connectionTimeout: 5000,
      // greetingTimeout: 5000,
    });

    return transporter;
  } catch (error) {
    console.error("Error creating transporter:", error);
    throw error;
  }
};

const sendEmail = async ({ email, subject, message }) => {
  try {
    const transporter = createTransporter();

    // Verify connection before sending
    await new Promise((resolve, reject) => {
      transporter.verify((error) => {
        if (error) {
          reject(new ApiError(400, "SMTP Connection Error", [error]));
        } else {
          resolve();
        }
      });
    });

    const options = {
      from: process.env.SMTP_MAIL,
      to: email,
      subject,
      html: message,
    };

    await transporter.sendMail(options);
    return true;
  } catch (error) {
    return false;
  }
};

export default sendEmail;
