const emailVerificationLink = (url, firstName) => {
  return `
<!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Email Verification</title>
      <style>
        body {
          margin: 0;
          padding: 0;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
          line-height: 1.6;
          color: #333333;
          background-color: #f4f4f4;
        }
        .email-container {
          max-width: 600px;
          margin: 0 auto;
          background-color: #ffffff;
          border-radius: 8px;
          overflow: hidden;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }
        .header {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          padding: 40px 30px;
          text-align: center;
        }
        .header h1 {
          color: #ffffff;
          margin: 0;
          font-size: 28px;
          font-weight: 600;
        }
        .content {
          padding: 40px 30px;
        }
        .greeting {
          font-size: 18px;
          margin-bottom: 20px;
          color: #333333;
        }
        .message {
          font-size: 16px;
          margin-bottom: 30px;
          color: #666666;
          line-height: 1.8;
        }
        .verify-button {
          display: inline-block;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: #ffffff;
          text-decoration: none;
          padding: 16px 32px;
          border-radius: 6px;
          font-weight: 600;
          font-size: 16px;
          text-align: center;
          margin: 20px 0;
        }
        .alternative-link {
          margin-top: 30px;
          padding: 20px;
          background-color: #f8f9fa;
          border-radius: 6px;
          border-left: 4px solid #667eea;
        }
        .alternative-link p {
          margin: 0 0 10px 0;
          font-size: 14px;
          color: #666666;
        }
        .alternative-link a {
          color: #667eea;
          word-break: break-all;
          font-size: 14px;
        }
        .security-notice {
          margin-top: 30px;
          padding: 15px;
          background-color: #fff3cd;
          border-radius: 6px;
          border-left: 4px solid #ffc107;
        }
        .security-notice p {
          margin: 0;
          font-size: 14px;
          color: #856404;
        }
        .footer {
          background-color: #f8f9fa;
          padding: 30px;
          text-align: center;
          border-top: 1px solid #e9ecef;
        }
        .footer p {
          margin: 0 0 10px 0;
          font-size: 14px;
          color: #666666;
        }
        @media only screen and (max-width: 600px) {
          .email-container {
            margin: 0;
            border-radius: 0;
          }
          .header, .content, .footer {
            padding: 20px;
          }
          .verify-button {
            display: block;
            width: 100%;
            box-sizing: border-box;
          }
        }
      </style>
    </head>
    <body>
      <div class="email-container">
        <div class="header">
          <h1>Verify Your Email</h1>
        </div>
        
        <div class="content">
          <div class="greeting">
            Hello ${firstName}!
          </div>
          
          <div class="message">
            Thank you for signing up! To complete your registration and secure your account, please verify your email address by clicking the button below.
          </div>
          
          <div style="text-align: center;">
            <a href="${url}" class="verify-button">
              Verify Email Address
            </a>
          </div>
          
          <div class="alternative-link">
            <p><strong>Button not working?</strong></p>
            <p>Copy and paste this link into your browser:</p>
            <a href="${url}">${url}</a>
          </div>
          
          <div class="security-notice">
            <p><strong>Security Notice:</strong> This verification link will expire in 24 hours. If you didn't create an account, please ignore this email.</p>
          </div>
        </div>
        
        <div class="footer">
          <p>Need help? Contact us at support@yourapp.com</p>
          <p>&copy; 2024 Your App. All rights reserved.</p>
        </div>
      </div>
    </body>
    </html>
  `;
};

export default emailVerificationLink;
