const express = require("express");
const User = require("../Models/userModel");
const Astrologer = require("../Models/astrologerModel");
const taskQueue = require("../Queue/taskQueue");

const distributeRouter = express.Router();

async function distributeUsers(userId) {
    const user = await User.findById(userId);
    if (!user) throw new Error('User not found');

    const astrologers = await Astrologer.find();
    if (astrologers.length === 0) throw new Error('No astrologers available');

    const users = await User.find({ assignedAstrologer: null });

    for (const user of users) {
      taskQueue.add({ userId: user._id });
    }
  
    res.send('Users distribution tasks added to the queue');
}

  
   
async function toggleAstrologers(astrologerId, status) {
    const astrologer = await Astrologer.findById(astrologerId);
    if (!astrologer) throw new Error('Astrologer not found');

    astrologer.top = status;
    await astrologer.save();

    return astrologer;
}
  
  
  distributeRouter.post("/connectUser", async (req, res) => {
    try {
        const userId = req.body.userId;
        const astrologer = await distributeUsers(userId);
        res.status(200).json(astrologer);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
  });

  distributeRouter.post("/setTopAstrologer", async (req, res) => {
    try {
        const { astrologerId, status } = req.body;
        const astrologer = await toggleAstrologers(astrologerId, status);
        res.status(200).json(astrologer);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
  });


  distributeRouter.post("/createUser", async (req, res) => {
    try {
        const user = new User(req.body);
        await user.save();
        res.status(201).json({ userId: user._id, message: 'User created successfully' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
  });


  distributeRouter.post("/createAstrologer", async (req, res) => {
    try {
        const astrologer = new Astrologer(req.body);  // req.body should contain { name: "Astrologer 1" }
        await astrologer.save();
        res.status(201).json({ astrologerId: astrologer._id, message: 'Astrologer created successfully' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
  });

  module.exports = distributeRouter;
