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
        price,
        condition,
        mileage,
        description,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (err) {
    console.error(err);
    window.prompt('Please enter in all parts of the registration form.')
  }
}

document
  .querySelector("#register-button")
  .addEventListener("click", registrationHandler);
