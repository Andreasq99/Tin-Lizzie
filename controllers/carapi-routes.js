const express = require("express");
const axios = require("axios");
require("dotenv").config();
const router = express.Router();

const { OpenAI } = require("openai");

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

let token;
let prompt;
let vehicleData;
let vin;

// Function to authenticate with the carapi.app API
async function authenticate() {
  try {
    const response = await axios.post("https://carapi.app/api/auth/login", {
      api_token: process.env.API_KEY,
      api_secret: process.env.API_SECRET,
    });

    token = response.data;
    console.log(token);
  } catch (err) {
    console.error("There is an error in the authentication process: " + err);
  }
}

// Function to retrieve vehicle information based on VIN
async function getDecode(vin) {
  const url = `https://carapi.app/api/vin/${vin}`;
  try {
    const response = await axios.get(url, {
      headers: { Authorization: `Bearer ${token}` },
    });
    //console.log(response.data);
    return response.data;
  } catch (err) {
    await authenticate();
    console.log(`An error occurred while fetching vehicle data: ${err}`);
    return await getDecode(vin);
  }
}

// Function to interact with the GPT-3 API
async function chat() {
  try {
    const response = await openai.completions.create({
      model: "gpt-3.5-turbo-instruct",
      prompt: prompt,
      max_tokens: 256,
      temperature: 0,
    });

    //console.log(response);

    const numberRegex = /\d+/;

    const text = response.choices[0].text;
    const match = text.match(numberRegex);
    let extractedNumber;
    if (match) {
      extractedNumber = match[0];
      console.log(`Extracted Number: ${extractedNumber}`);
    } else {
      console.log('No number found in the text.');
    }

    return extractedNumber;
  } catch (err) {
    console.error(`An error occurred during interaction with GPT-3: ${err}`);
    throw err;
  }
}

router.get("/decode/:vin", async (req, res) => {
  try {
    // if (!token) await authenticate();
    vehicleData = await getDecode(req.params.vin);
    //console.log(vehicleData);

    prompt = `Based on this vehicle data: ${JSON.stringify(
      vehicleData
    )}, rate the coolness of the vehicle on a scale of 1 to 100. Only respond with a whole integer number and do not include any letters in your response. That means no words and only a number.`;

    vin = await chat();
    console.log(parseInt(vin, 10));
    return res.json(parseInt(vin, 10));
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
