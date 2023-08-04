const Queue = require("bull");
const ShopDb = require("../servers/model/model");
const ConnectDb = require("../servers/database/connection");

const { REDIS_PORT, REDIS_URI } = require("../servers/redis/redisCredentials");

const deleteQueue = new Queue("deleteQueue", {
  redis: {
    port: REDIS_PORT,
    host: REDIS_URI,
  },
});

const { Worker } = require("bullmq");

const expiredQueueProcessor = (job, done) => {
  console.log("Reached");
  const dt = new Date();

  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const mIndex = dt.getMonth();
  const year = dt.getFullYear();

  const mName = months[mIndex];

  const currDate = mName + " " + year;

  // const d1 = new Date(currDate);
  const retDate = job.data.item.expiry;

  const dateCurr = new Date(currDate + "01");
  const dateRet = new Date(retDate + "01");

  const dateC = Date.parse(dateCurr);

  const dateR = Date.parse(dateRet);

  // console.log();

  const differenceInMilliseconds = dateR - dateC;

  // console.log(job.data.item.name, differenceInMilliseconds);
  const itemId = job.data.item._id;
  const itemName = job.data.item.name;

  deleteQueue.add(
    "removeExpiredItem",
    { itemId, itemName },
    { delay: differenceInMilliseconds }
  );

  console.log(
    itemName,
    "Added In The deleteQueue With Delay Of",
    differenceInMilliseconds,
    "milliseconds"
  );
  console.log();
  done();
};

const removeExpiredItem = async (itemId) => {
  console.log("finally to the delete");
  console.log(itemId);
  try {
    ConnectDb();
    await ShopDb.deleteOne({ _id: itemId });

    console.log("Deleted From The Queue Successfully");
  } catch (e) {
    console.log("Failure While Deleting Item From The Backend", e);
  }
};

async function processJobs() {
  // console.log('hey');
  const worker = new Worker("deleteQueue", async (job) => {
    console.log(job.delay);
    // console.log(job.data.itemId);

    await removeExpiredItem(job.data.itemId);
  });

  worker.on("completed", (job) => {
    console.log("Job Completed", job.name, "for", job.data.itemName);
  });

  worker.on("failed", (job, err) => {
    console.log("Job Failed", job.name, err);
  });
}

processJobs();

module.exports = expiredQueueProcessor;
