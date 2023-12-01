import SymptomsModel from '../models/SymptomsModel.js';

export const createSymptoms = async (req, res) => {
    try {
        const { user_id, username, symptomsdate } = req.body;

        if (!user_id || !username || !symptomsdate) {
            return res.status(400).send({ message: 'All fields are required' });
        }

        const existingSymptoms = await SymptomsModel.findOne({ user_id });

        if (existingSymptoms) {
            return res.status(400).send({ message: 'Symptoms already exist for this user' });
        }

        const newSymptoms = await SymptomsModel.create({ user_id, username, symptomsdate });
        res.status(201).send({ success: true, message: 'Symptoms added', symptoms: newSymptoms });
    } catch (error) {
        res.status(500).send({ success: false, error, message: 'Error creating symptoms' });
    }
};

export const updateSymptoms = async (req, res) => {
    try {
        const { user_id } = req.params;
        const { username, symptomsdate } = req.body;

        if (!user_id || !username || !symptomsdate) {
            return res.status(400).send({ message: 'All fields are required' });
        }

        const existingSymptoms = await SymptomsModel.findOne({ user_id });

        if (!existingSymptoms) {
            return res.status(404).send({ message: 'Symptoms not found' });
        }

        existingSymptoms.username = username;
        existingSymptoms.symptomsdate = symptomsdate;

        await existingSymptoms.save();
        res.status(200).send({ success: true, message: 'Symptoms updated', symptoms: existingSymptoms });
    } catch (error) {
        res.status(500).send({ success: false, error, message: 'Error updating symptoms' });
    }
};

export const getAllSymptoms = async (req, res) => {
    try {
        const symptoms = await SymptomsModel.find({});
        res.status(200).send({ success: true, message: 'All symptoms', symptoms });
    } catch (error) {
        res.status(500).send({ success: false, error, message: 'Error getting symptoms' });
    }
};

export const getSymptomsByUserId = async (req, res) => {
    try {
        const { user_id } = req.params;
        const symptoms = await SymptomsModel.findOne({ user_id });
        if (!symptoms) {
            return res.status(404).send({ message: 'Symptoms not found for this user' });
        }
        res.status(200).send({ success: true, message: 'Symptoms found', symptoms });
    } catch (error) {
        res.status(500).send({ success: false, error, message: 'Error getting symptoms for user' });
    }
};

export const deleteSymptoms = async (req, res) => {
    try {
        const { user_id } = req.params;
        const deletedSymptoms = await SymptomsModel.findOneAndDelete({ user_id });
        if (!deletedSymptoms) {
            return res.status(404).send({ message: 'Symptoms not found' });
        }
        res.status(200).send({ success: true, message: 'Symptoms deleted', symptoms: deletedSymptoms });
    } catch (error) {
        res.status(500).send({ success: false, error, message: 'Error deleting symptoms' });
    }
};
