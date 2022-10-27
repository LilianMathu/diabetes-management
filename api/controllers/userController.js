import { response } from "express";
import User from "../models/UserModel";
import * as ussdMethods from "../services/ussd";

const userController = {
  register: async (req, res) => {
    const { phoneNumber, text } = req.body;

    try {
      const user = await User.findOne({ phone: phoneNumber });

      if (!user) {
        const response = await ussdMethods.register(text, phoneNumber);

        return res.status(201).send(response);
      } else {
       const response = await ussdMethods.glucoseReadings(text, phoneNumber);

        return res.status(201).send(response);
        // USSD for readings
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "" });
    }
  },

  listUsers: async (req, res) => {},

  listOneUser: async (req, res) => {},

  deleteUser: async (req, res) => {},

  updateUser: async (req, res) => {},
};

export default userController;
