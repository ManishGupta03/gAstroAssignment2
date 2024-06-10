const Queue = require('bull');
const taskQueue = new Queue('taskQueue', {
  redis: {
    host: '127.0.0.1',
    port: 6379
  }
});

taskQueue.process(async (task) => {
  const { userId } = task.data;
  const user = await User.findById(userId);
  const astrologers = await Astrologer.find();

  let totalWeight = astrologers.reduce((sum, ast) => sum + ast.weight, 0);

  let random = Math.random() * totalWeight;
  for (const astrologer of astrologers) {
    if (random < astrologer.weight) {
      user.assignedAstrologer = astrologer._id;
      astrologer.connections += 1;
      await user.save();
      await astrologer.save();
      break;
    }
    random -= astrologer.weight;
  }
});