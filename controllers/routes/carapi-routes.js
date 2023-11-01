const express = require("express");
const axios = require("axios");

const router = express.Router();

let token;

function authenticate() {
  router.post("/auth", async (req, res) => {
    const { API_KEY, API_SECRET } = req.body;

    try {
      const response = await axios.post("https://carapi.app/api/auth/login", {
        api_token: API_KEY,
        api_secret: API_SECRET,
      });

      token = response;
      console.log(token);
      res.json({ token });
    } catch (err) {
      console.error(err);
      res.status(401).send("auth failed");
    }
  });
}

async function getDecode(vin) {
  const url = `https://carapi.app/api/vin/${vin}`;
  try {
    const response = await axios.get(url, {
      headers: { Authorization: `Bearer ${token}` },
    });
    console.log(response);
    return response;
  } catch (err) {
    console.log(err);
    authenticate();
    return await getDecode(vin);
  }
}

router.get("/decode/:vin", async (req, res) => {
  const data = await getDecode(req.params.vin);
  res.json(data);
});

module.exports = {
  router: router,
  token: token,
};
