const express = require("express");
const axios = require("axios");
require('dotenv').config();
const router = express.Router();

let token;

async function authenticate() {
    try {
      const response = await axios.post("https://carapi.app/api/auth/login", {
        api_token: process.env.API_KEY,
        api_secret: process.env.API_SECRET,
      });

      token = response.data;
    } catch (err) {
      console.error('There is an error');
    }
}

async function getDecode(vin) {
  const url = `https://carapi.app/api/vin/${vin}`;
  try {
    const response = await axios.get(url, {
      headers: { Authorization: `Bearer ${token}` },
    });
    console.log(response.data);
    return response.data;
  } catch (err) {
    console.log(err);
    //await authenticate();
    //return await getDecode(vin);
  }
}

router.get("/decode/:vin", async (req, res) => {
  if (!token) await authenticate();
  const data = await getDecode(req.params.vin);
  console.log(data);
  res.json(data);
});

module.exports = router;
