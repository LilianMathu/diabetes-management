import sendMessage from "../services/sms";
import * as userServices from "../services/user.service";

const smsController = {
  sendSMS: async (req, res) => {
    const { recipients, message } = req.body;
    try {
      let users = [];
      switch (true) {
        case recipients.includes("All"):
          users = await userServices.getUsers();

          break;

        case recipients.includes("Children"):
          const result = await userServices.getAgeGroup(0, 12);

          users = [...users, ...result];

          break;

        case recipients.includes("Teens"):
          const result1 = await userServices.getAgeGroup(13, 19);

          users = [...users, ...result1];
          break;

        case recipients.includes("Adults"):
          const result2 = await userServices.getAgeGroup(20, 120);

          users = [...users, ...result2];
          break;

        default:
          break;
      }

      await sendMessage(message, [...new Set(users.map((user) => user.phone))]);

      res.status(200).json({
        message: "Messages sent",
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "failed", error });
    }
  },
};

export default smsController;
