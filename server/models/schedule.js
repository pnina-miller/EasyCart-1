const schedule = require("node-schedule");
const Business = require("./business");

const rule = new schedule.RecurrenceRule();
rule.seconds = 02;
const startTime = new Date(Date.now() + 10000);
const endTime = new Date(startTime.getTime() + 10000);

const job = async (req, res) => {
  try {
    await schedule.scheduleJob(
      { start: startTime, end: endTime, rule: "*/1 * * * * *" },
      async () => {
        try {
          await Business.updateMany({
            history: {
              date: new Date(),
            },
          });
        } catch (err) {
          console.error("error on job", err);
          res.send("error on job ", err);
        }
      }
    );
  } catch (err) {
    res.send("error on job ", err);
  }
};
module.exports = {
  job,
};
