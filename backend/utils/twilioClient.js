const twilio = require('twilio');
const client = new twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

module.exports.sendWhatsAppMessage = (phone, message) => {
  return client.messages.create({
    from: 'whatsapp:' + process.env.TWILIO_PHONE_NUMBER,
    to: 'whatsapp:' + phone,
    body: message,
  });
};