import { emailTransporter } from "./emailTransport";
import config from "../config/config";

const baseUrl = config.base_Url;

export const sendVerifcationEmail = async (to: string, token: string) => {
  const verificationLink = `${baseUrl}/api/users/verify-email?token=${token}`;

  const subject = "Verify your Email Address";
  const html = `
    <h3>Email Verification</h3>
    <p>Thanks for registering. Please verify your Email by clicking the link below</p>
    <a href="${verificationLink}">${verificationLink}</a>
    <p>This link will expire in 24 hours </p>`;

    await emailTransporter.sendMail({
    from: config.user,
    to,
    subject,
    html
})
};

export const sendResetPasswordEmal = async (to: string, resetToken: string)=>{
  const resetLink = `${baseUrl}/reset-password/${resetToken}`;
  const subject = "Reset your password";
  const html = `
  <h3>Reset your passowrd </h3>
  <p>You requested a password reset, click the link below to reset your password </p>
  <a href="${resetLink}">${resetLink} </a>
  <p>If you didn't request for this, kindly ignore this email.</p>
  <p> This link will expire in 10minutes.</p>
  `;
  await emailTransporter.sendMail({
    from: config.user,
    to,
    subject,
    html
  })
}

