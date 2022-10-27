import Reading from "../models/glucoseModel";
import User from "../models/UserModel";

export const saveReadings = async (glucoseData) => {
  try {
    const user = await User.findOne({ phone: glucoseData.phone });
    const reading = await Reading.create({ glucoseData, user: user._id }); // Add the user reference
    return reading;
  } catch (error) {
    console.log(error);
  }
};

export const getReadings = async (query = {}) => {
  try {
    const readings = await Reading.find(query).sort({ createdAt: -1 });
    return readings;
  } catch (error) {
    console.log(error);
  }
};

export const getReading = async (userId) => {
  try {
    const reading = await Reading.findById(userId);
    return reading;
  } catch (error) {
    console.log(error);
  }
};
