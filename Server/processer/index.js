const Queue = require("bull");
const { REDIS_PORT, REDIS_URI } = require("../servers/redis/redisCredentials");
const path = require("path");

const expiredQueue = new Queue("expiredQueue", {
  redis: {
    port: REDIS_PORT,
    host: REDIS_URI,
  },
});

exports.callingQueues = () => {
  expiredQueue.process(path.join(__dirname, "expiredQueueProcessor.js"));
};

// expiredQueue.on("completed", (job) => {
//   // console.log(`Completed ${job.id}`);
// });
