import User from "../models/UserModel";

export const saveUser = async (userData) => {
  try { 
    const user = await User.create(userData);
    return user;
  } catch (error) {
    console.log(error);
  }
};

export const getUsers = async (query = {}) => {
  try {
    const users = await User.find(query)
      .select("-pin")
      .sort({ createdAt: -1 });
    return users;
  } catch (error) {
    console.log(error);
  }
};

export const getUser = async (userId) => {
  try {
    const user = await User.findById(userId);
    return user;
  } catch (error) {
    console.log(error);
  }
};

export const updateUser = async (userData) => {
  try {
    const user = await User.findByIdAndUpdate(userData._id, userData, { new: true });
    return user;
  } catch (error) {
    console.log(error);
  }
};

export const getAgeGroup = async (min, max) => {
  const users = await User.find({
    dob: {
      $gte: new Date(new Date().setFullYear(new Date().getFullYear() - max)),
      $lt: new Date(new Date().setFullYear(new Date().getFullYear() - min)),
    },
  });

  return users;
};