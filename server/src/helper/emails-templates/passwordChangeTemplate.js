const passwordChangeTemplate = (verificationCode) => {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Password Change Verification</title>
    </head>
    <body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f4f4f4;">
      <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
        <tr>
          <td style="padding: 20px 0; text-align: center; background-color: #ffffff;">
            <table role="presentation" width="600" cellspacing="0" cellpadding="0" border="0" align="center" style="margin: auto; border: 1px solid #dddddd; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.05);">
              <!-- Header -->
              <tr>
                <td style="padding: 30px 30px 20px; background-color: #2563EB; text-align: center;">
                  <h1 style="color: #ffffff; margin: 0; font-size: 24px; font-weight: 600;">Password Change Request</h1>
                </td>
              </tr>
              
              <!-- Content -->
              <tr>
                <td style="padding: 40px 30px; background-color: #ffffff;">
                  <p style="margin: 0 0 20px; font-size: 16px; line-height: 1.5; color: #333333;">
                    We received a request to change the password for your account. To verify this request, please use the verification code below:
                  </p>
                  
                  <div style="background-color: #f0f7ff; border: 1px solid #dbeafe; border-radius: 6px; padding: 20px; margin: 30px 0; text-align: center;">
                    <p style="margin: 0 0 10px; font-size: 14px; color: #1e40af;">Your verification code is:</p>
                    <p style="margin: 0; font-size: 32px; font-weight: bold; letter-spacing: 5px; color: #2563EB;">${verificationCode}</p>
                  </div>
                  
                  <p style="margin: 0 0 20px; font-size: 16px; line-height: 1.5; color: #333333;">
                    This code will expire in 15 minutes. If you didn't request a password change, please ignore this email and consider updating your account security.
                  </p>
                  
                  <div style="background-color: #fff7ed; border-left: 4px solid #f97316; padding: 15px; margin: 25px 0;">
                    <p style="margin: 0; font-size: 14px; line-height: 1.5; color: #9a3412;">
                      <strong>Security Tip:</strong> We will never ask for your password or personal information via email. Always access your account through our official website.
                    </p>
                  </div>
                  
                  <p style="margin: 0; font-size: 16px; line-height: 1.5; color: #333333;">
                    Thank you,<br>
                    The Security Team
                  </p>
                </td>
              </tr>
              
              <!-- Footer -->
              <tr>
                <td style="padding: 20px 30px; background-color: #f8f9fa; text-align: center; border-top: 1px solid #dddddd;">
                  <p style="margin: 0; font-size: 14px; color: #666666;">
                    © 2024 Your Company. All rights reserved.
                  </p>
                  <p style="margin: 10px 0 0; font-size: 12px; color: #999999;">
                    This is an automated message, please do not reply.
                  </p>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </body>
    </html>
      `;
};

export default passwordChangeTemplate;
