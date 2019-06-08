const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

router.get("/", async (req, res, next) => {
  let insert = {
    username: "quoccuong81",
    password: "123"
  };
  insert.password = await bcrypt.hash(insert.password, 10);
  let usersInfo = await mongoose.model("user").create(insert);
  console.log(usersInfo);
  return res.send("Done");
});


module.exports = router;