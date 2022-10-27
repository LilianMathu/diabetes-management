import bcrypt from "bcryptjs";
import * as userServices from "./user.service";
import * as glucoseService from "./glucoseService";

// Initialize the user data (req.body) to an empty object
const userData = {};

export const register = async (text, phoneNumber) => {
  let response = "";

  // Extract user's phone number from the phone dialing the ussd
  userData.phone = phoneNumber;

  // Split the response array, using * as the delimiter
  const glucoseResponses = text.split("*");

  // Use length of the response array to go to next query on ussd
  const length = glucoseResponses.length;

  const prevResponse = glucoseResponses[length - 1];

  if (text == "") {
    response =
      "CON Greetings. This is a Diabetes management and Information App. \nTo register, Enter your name: ";
  } else if (length == 1) {
    userData.name = prevResponse;

    response = "CON Enter your year of birth: (YYYY).";
  } else if (length == 2) {
    userData.dob = new Date(`${prevResponse}-01-01`);

    response = "CON Enter your village/estate: ";
  } else if (length == 3) {
    userData.residence = prevResponse;

    response = "CON Enter the year you were diagnosed with diabetes: ";
  } else if (length == 4) {
    userData.dateOfDiagnosis = new Date(`${prevResponse}-01-01`);

    response =
      "CON Enter your current treatment regimen, that is, type of insulin: ";
  } else if (length == 5) {
    userData.currentRegimen = prevResponse;

    response = "CON Enter your current clinic:";
  } else if (length == 6) {
    userData.clinic = prevResponse;

    response = "CON Enter a PIN you will remember:";
  } else if (length == 7) {
    userData.pin = prevResponse;

    response = "CON Enter the PIN again: ";
  } else if (length > 7) {
    if (prevResponse !== userData.pin) {
      response = "CON Pins do not match. Please re-enter the pin: ";
    } else {
      userData.pin = await bcrypt.hash(userData.pin, 10);

      await userServices.saveUser(userData);

      response = "END registration successful!";
    }
  }
  return response;
};


const glucoseData = {};

export const glucoseReadings = async (text, phoneNumber) => {
  let response = "";

  glucoseData.phone = phoneNumber;

  // Split the response array, using * as the delimiter
  const glucoseResponses = text.split("*");

  // Use length of the response array to go to next query on ussd
  const length = glucoseResponses.length;

  const prevResponse = glucoseResponses[length - 1];

  if (text == "") {
    response = "CON Greetings. \nEnter the glucose reading: ";
  } else if (length == 1) {
    glucoseData.reading = prevResponse;

    response = "CON Enter the time of the reading: (hh:mm)";
  } else if (length == 2) {
    const [hour, minute] = prevResponse.split(":");
    const date = new Date();
    date.setHours(hour);
    date.setMinutes(minute);
    date.setSeconds(0);
    date.setMilliseconds(0);

    glucoseData.time = date;

    response = "CON Enter the food taken: ";
  } else if (length == 3) {
    glucoseData.food = prevResponse;

    response = "CON How are you feeling? ";
  } else if (length == 4) {
    glucoseData.mood = prevResponse;

    await glucoseService.saveReadings(glucoseData);

    response = "END Thank you for entering the data.";
  }

  return response;
};
