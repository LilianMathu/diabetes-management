import * as glucoseService from '../services/glucoseService';

const glucoseController = {
  saveReadings: async (req, res) => {
    try {
      const reading = await glucoseService.saveReadings(req.body);
      res.status(200).json({
        message: 'Reading saved',
        reading,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'failed', error });
    }
  },

  getReadings: async (req, res) => {
    try {
      const readings = await glucoseService.getReadings();
      res.status(200).json({
        message: 'Readings retrieved',
        readings,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'failed', error });
    }
  },
};

export default glucoseController;