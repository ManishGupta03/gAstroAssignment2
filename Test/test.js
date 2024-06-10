const request = require('supertest');
const express = require("express");
const mongoose = require('mongoose');
const Astrologer = require('../Models/astrologerModel');
const User = require('../Models/userModel');
const app = express();

beforeAll(async () => {
  const dbUri = process.env.MONGO_URI;
  await mongoose.connect(dbUri, { useNewUrlParser: true, useUnifiedTopology: true });
});

afterAll(async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
});

describe('Flow Distribution Algorithm', () => {
  test('Distribute users evenly among astrologers', async () => {
    const astrologers = [      { name: 'Astrologer 1' },      { name: 'Astrologer 2' },      { name: 'Astrologer 3' }    ];
    await Astrologer.insertMany(astrologers);

    const users = [      { name: 'User 1' },      { name: 'User 2' },      { name: 'User 3' }    ];
    await User.insertMany(users);

    const res = await request(app).post('/api/distribute');
    expect(res.status).toBe(200);
    expect(res.text).toBe('Users distributed successfully');

    const updatedUsers = await User.find();
    expect(updatedUsers.every(user => user.assignedAstrologer)).toBe(true);
  });

  test('Toggle top astrologer status', async () => {
    const astrologer = new Astrologer({ name: 'Astrologer 4' });
    await astrologer.save();

    let res = await request(app)
      .post('/api/toggle-top')
      .send({ astrologerId: astrologer._id, isTop: true });
    expect(res.status).toBe(200);

    const updatedAstrologer = await Astrologer.findById(astrologer._id);
    expect(updatedAstrologer.isTop).toBe(true);
  });
});