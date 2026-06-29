export const generateAdminEmailHtml = (data: {
  full_name: string;
  email: string;
  phone?: string;
  subject: string;
  order_number?: string;
  preferred_contact?: string;
  message: string;
}) => `
<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #333; line-height: 1.6;">
  <h2 style="color: #C4622D; border-bottom: 1px solid #eee; padding-bottom: 10px;">New Contact Form Submission</h2>
  
  <p><strong>From:</strong> ${data.full_name} (<a href="mailto:${data.email}">${data.email}</a>)</p>
  ${data.phone ? `<p><strong>Phone:</strong> ${data.phone}</p>` : ''}
  
  <p><strong>Subject:</strong> ${data.subject}</p>
  ${data.order_number ? `<p><strong>Order Number:</strong> ${data.order_number}</p>` : ''}
  ${data.preferred_contact ? `<p><strong>Preferred Contact:</strong> ${data.preferred_contact}</p>` : ''}
  
  <div style="background-color: #f9f9f9; padding: 20px; border-left: 4px solid #C4622D; margin: 20px 0; white-space: pre-wrap;">
    ${data.message.replace(/</g, "&lt;").replace(/>/g, "&gt;")}
  </div>
  
  <hr style="border: 0; border-top: 1px solid #eee; margin: 30px 0;" />
  <p style="font-size: 12px; color: #888;">
    Sent via OWL FAMILY Contact Form | ${new Date().toLocaleString('en-US', { timeZone: 'Africa/Lagos' })} WAT
  </p>
</div>
`;

export const generateAutoReplyHtml = (data: {
  full_name: string;
  subject: string;
  message: string;
}) => `
<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #333; line-height: 1.6;">
  <div style="text-align: center; margin-bottom: 30px;">
    <h1 style="color: #111; letter-spacing: 2px; text-transform: uppercase;">OWL <span style="color: #C4622D;">FAMILY</span></h1>
  </div>

  <h2>Thank You for Contacting Us</h2>
  
  <p>Dear ${data.full_name},</p>
  
  <p>Thank you for reaching out to OWL FAMILY. We have received your inquiry and our team will get back to you within 24-48 hours.</p>
  
  <p><strong>Your inquiry details:</strong></p>
  <p><strong>Subject:</strong> ${data.subject}</p>
  <div style="background-color: #f9f9f9; padding: 15px; border-left: 2px solid #ccc; margin-bottom: 20px; font-style: italic; white-space: pre-wrap;">
    ${data.message.replace(/</g, "&lt;").replace(/>/g, "&gt;")}
  </div>
  
  <p>If your matter is urgent, please contact us directly at <strong>+234 706 741 5318</strong>.</p>
  
  <br />
  <p>Best regards,</p>
  <p><strong>The OWL FAMILY Team</strong></p>
  
  <hr style="border: 0; border-top: 1px solid #eee; margin: 30px 0;" />
  <div style="font-size: 11px; color: #888; text-align: center;">
    <p>OWL FAMILY | Wear the culture. Own the look.</p>
    <p>Abuja, Nigeria | London, UK</p>
    <p><a href="https://owlfamily.com" style="color: #C4622D;">www.owlfamily.com</a></p>
  </div>
</div>
`;
