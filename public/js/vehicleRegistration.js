//const vinDecoder = require('../../controllers/carapi-routes');

async function registrationHandler(event) {
  event.preventDefault();

  const userId = window.userId;
  console.log(userId);
  const make = document.querySelector("#vehicle-make").value;
  console.log(make);
  const model = document.querySelector("#vehicle-model").value;
  console.log(model);
  const type = document.querySelector("#type").value;
  console.log(type);
  const year = document.querySelector("#year").value;
  console.log(year);
  const color = document.querySelector("#color").value;
  console.log(color);
  const vin = document.querySelector("#vin").value;
  console.log(vin);
  let rating;
  try {
    const response = await fetch(`/carapi/decode/${vin}`, {
      method: "GET",
    });

    if (response.ok) {
      rating = await response.json();
      console.log("Rating:", rating);
    } else {
      console.log("status:", response.status);
    }
  } catch (err) {
    console.log(err);
  }
  console.log(rating);
  const price = document.querySelector("#price").value;
  console.log(price);
  const condition = document.querySelector("#condition").value;
  console.log(condition);
  const mileage = document.querySelector("#mileage").value;
  console.log(mileage);
  const description = document.querySelector("#description").value;
  console.log(description);

  try {
    const response = await fetch("/api/vehicles", {
      method: "POST",
      body: JSON.stringify({
        userId,
        type,
        make,
        model,
        year,
        color,
        vin,
        rating,
        price,
        condition,
        mileage,
        description,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      const vehicleData = await response.json();
      console.log("Vehicle Data:", vehicleData);

     
      const vehicleImageResponse = await fetch("/api/vehicleimages", {
        method: "POST",
        body: JSON.stringify({
          vehicleId: vehicleData.id, 
          imagePath: "https://www.corvetteblogger.com/images/content/2021/042421_6d.jpg", 
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (vehicleImageResponse.ok) {
        // Vehicle image record successfully created
        console.log("Vehicle Image Record Created");
        document.location.replace("/");
      } else {
        console.log("Vehicle Image Record creation failed with status:", vehicleImageResponse.status);
      }
    } else {
      console.log("Vehicle creation failed with status:", response.status);
    }
  } catch (err) {
    console.error(err);
    window.prompt('Please enter in all parts of the registration form.')
  }
}

document
  .querySelector("#register-button")
  .addEventListener("click", registrationHandler);
