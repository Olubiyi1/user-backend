import { emailTransporter } from "./emailTransport";
import config from "../config/config";

const baseUrl = config.base_Url;

export const sendVerifcationEmail = async (to: string, token: string) => {
  const verificationLink = `${baseUrl}/api/users/verify-email?token=${token}`;

  const subject = "Verify your Email Address";
  const html = `
    <h3>Email Verification</h3>
    <p>Thanks for regsitering. Please verify your Email by clicking the link below</p>
    <a href="${verificationLink}">${verificationLink}</a>
    <p>This link will expire in 24 hours </p>`;

    await emailTransporter.sendMail({
    from: config.user,
    to,
    subject,
    html
})
};

