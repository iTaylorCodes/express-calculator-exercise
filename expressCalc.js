const express = require("express");
const ExpressError = require("./expressError");

const app = express();

app.get("/mean", (req, res, next) => {
  try {
    // Check for nums query string
    if (!req.query.nums) {
      throw new ExpressError("nums are required", 400);
    }

    // Convert to array of numbers
    let arrayOfStrings = req.query.nums.split(",");
    let nums = [];
    for (let val of arrayOfStrings) {
      let num = Number(val);
      if (typeof num != "number" || Number.isNaN(num)) {
        throw new ExpressError(`${val} is not a number`, 400);
      }
      nums.push(num);
    }

    // Find the mean
    let total = nums.reduce((accum, currVal) => {
      return accum + currVal;
    });
    let mean = total / nums.length;

    return res.json({
      response: {
        operation: "mean",
        value: mean,
      },
    });
  } catch (e) {
    next(e);
  }
});

app.get("/median", (req, res, next) => {
  try {
    // Check for nums query string
    if (!req.query.nums) {
      throw new ExpressError("nums are required", 400);
    }

    // Convert to array of numbers
    let arrayOfStrings = req.query.nums.split(",");
    let nums = [];
    for (let val of arrayOfStrings) {
      let num = Number(val);
      if (typeof num != "number" || Number.isNaN(num)) {
        throw new ExpressError(`${val} is not a number`, 400);
      }
      nums.push(num);
    }

    // Sort the nums
    nums.sort((a, b) => a - b);

    let middleIndex = Math.floor(nums.length / 2);

    // Find the median
    let median;
    if (nums.length % 2 === 0) {
      median = (nums[middleIndex] + nums[middleIndex - 1]) / 2;
    } else {
      median = nums[middleIndex];
    }

    return res.json({
      response: {
        operation: "median",
        value: median,
      },
    });
  } catch (e) {
    next(e);
  }
});

app.get("/mode", (req, res, next) => {
  try {
    // Check for nums query string
    if (!req.query.nums) {
      throw new ExpressError("nums are required", 400);
    }

    // Convert to array of numbers
    let arrayOfStrings = req.query.nums.split(",");
    let nums = [];
    for (let val of arrayOfStrings) {
      let num = Number(val);
      if (typeof num != "number" || Number.isNaN(num)) {
        throw new ExpressError(`${val} is not a number`, 400);
      }
      nums.push(num);
    }

    // Count frequency
    let frequencyCounter = nums.reduce(function (accum, next) {
      accum[next] = (accum[next] || 0) + 1;
      return accum;
    }, {});

    // Find the mode
    let count = 0;
    let mode;

    for (let key in frequencyCounter) {
      if (frequencyCounter[key] > count) {
        mode = key;
        count = frequencyCounter[key];
      }
    }

    return res.json({
      response: {
        operation: "mode",
        value: mode,
      },
    });
  } catch (e) {
    next(e);
  }
});

app.use((req, res, next) => {
  // Custom 404 Page
  const err = new ExpressError("Page not found", 404);
  return next(err);
});

app.use(function (err, req, res, next) {
  // Set a default status code
  let status = err.status || 500;
  let msg = err.msg;

  // Set status and alert the user
  return res.status(status).json({ error: { msg, status } });
});

app.listen(3000, function () {
  console.log("App on port 3000");
});
