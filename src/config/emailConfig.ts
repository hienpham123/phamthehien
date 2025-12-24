// EmailJS Configuration
// To use EmailJS, you need to:
// 1. Register an account at https://www.emailjs.com/
// 2. Create Email Service (Gmail, Outlook, etc.)
// 3. Create Email Template
// 4. Get Public Key, Service ID, Template ID
// 5. Fill in the variables below

export const emailConfig = {
  // Public Key from EmailJS Dashboard
  publicKey: process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || 'YOUR_PUBLIC_KEY',
  
  // Service ID from EmailJS Dashboard
  serviceId: process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || 'YOUR_SERVICE_ID',
  
  // Template ID from EmailJS Dashboard
  templateId: process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || 'YOUR_TEMPLATE_ID',
}

// Check if EmailJS has been configured
export const isEmailJSConfigured = () => {
  // Check if values are valid (not empty and not placeholder)
  return (
    emailConfig.publicKey &&
    emailConfig.publicKey !== 'YOUR_PUBLIC_KEY' &&
    emailConfig.serviceId &&
    emailConfig.serviceId !== 'YOUR_SERVICE_ID' &&
    emailConfig.serviceId.startsWith('service_') &&
    emailConfig.templateId &&
    emailConfig.templateId !== 'YOUR_TEMPLATE_ID' &&
    emailConfig.templateId.startsWith('template_')
  )
}

