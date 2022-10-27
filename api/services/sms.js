import config from "../../config";
// Set your app credentials
const credentials = {
  apiKey: config.at_key,
  username: config.at_username,
};

// Initialize the SDK
const AfricasTalking = require("africastalking")(credentials);

// Get the SMS service
const sms = AfricasTalking.SMS;

function sendMessage(text, phoneNumber) {
  const options = {
    // Set the numbers you want to send to in international format
    to: phoneNumber,
    // Set your message
    message: text,
  };

  // That’s it, hit send and we’ll take care of the rest
  sms.send(options).then(console.log).catch(console.log);
}

export default sendMessage;
