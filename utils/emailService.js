const nodemailer = require('nodemailer');

// Email transporter configuration
const createTransporter = () => {
  return nodemailer.createTransporter({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER || 'sudhakarnatarajan501@gmail.com',
      pass: process.env.EMAIL_PASS || 'your-app-password'
    },
    tls: {
      rejectUnauthorized: false
    }
  });
};

// Utility function to send email
const sendEmail = async (mailOptions) => {
  try {
    const transporter = createTransporter();
    const info = await transporter.sendMail(mailOptions);
    console.log('📧 Email sent successfully:', info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('❌ Email sending failed:', error);
    return { success: false, error: error.message };
  }
};

// Create contact form email template
const createContactEmailTemplate = (name, email, message, ipAddress) => {
  return {
    from: process.env.EMAIL_USER || 'sudhakarnatarajan501@gmail.com',
    to: 'sudhakarnatarajan501@gmail.com',
    subject: `🎯 New Contact Form Submission from ${name}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f8f9fa; border-radius: 10px;">
        <h2 style="color: #2c3e50; text-align: center; margin-bottom: 30px;">📧 New Contact Form Submission</h2>
        
        <div style="background-color: white; padding: 20px; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
          <div style="margin-bottom: 15px;">
            <strong style="color: #34495e;">👤 Name:</strong>
            <span style="color: #2c3e50; margin-left: 10px;">${name}</span>
          </div>
          
          <div style="margin-bottom: 15px;">
            <strong style="color: #34495e;">📧 Email:</strong>
            <span style="color: #2c3e50; margin-left: 10px;">${email}</span>
          </div>
          
          <div style="margin-bottom: 15px;">
            <strong style="color: #34495e;">💬 Message:</strong>
            <div style="color: #2c3e50; margin-top: 10px; padding: 15px; background-color: #f8f9fa; border-radius: 5px; line-height: 1.6;">
              ${message.replace(/\n/g, '<br>')}
            </div>
          </div>
          
          <div style="margin-top: 20px; padding-top: 15px; border-top: 1px solid #ecf0f1; font-size: 12px; color: #7f8c8d;">
            <p><strong>📅 Submitted:</strong> ${new Date().toLocaleString()}</p>
            <p><strong>🌐 IP Address:</strong> ${ipAddress}</p>
          </div>
        </div>
        
        <div style="text-align: center; margin-top: 20px; font-size: 12px; color: #7f8c8d;">
          <p>Sent from your portfolio website</p>
        </div>
      </div>
    `
  };
};

module.exports = {
  sendEmail,
  createContactEmailTemplate
};
