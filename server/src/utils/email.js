// backend/src/utils/email.js
import brevo from '@getbrevo/brevo';
import dotenv from 'dotenv';
dotenv.config();

export const sendEmail = async (mailOptions) => {
  try {
    const apiInstance = new brevo.TransactionalEmailsApi();
    apiInstance.setApiKey(brevo.TransactionalEmailsApiApiKeys.apiKey, process.env.BREVO_API_KEY);

    const sendSmtpEmail = {
      to: [{ email: mailOptions.to }],
      sender: { email: process.env.EMAIL_FROM, name: 'TaskPro' },
      subject: mailOptions.subject,
      htmlContent: mailOptions.html,
    };

    await apiInstance.sendTransacEmail(sendSmtpEmail);
    console.log('✅ E-posta başarıyla gönderildi:', mailOptions.to);
  } catch (error) {
    console.error('❌ E-posta Gönderme Hatası:', error.message);
    throw new Error('E-posta gönderimi başarısız oldu.');
  }
};