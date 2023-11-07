async function registrationHandler(event) {
  event.preventDefault();

  const make = document.querySelector("#vehicle-make").value;
  const model = document.querySelector("#vehicle-model").value;
  const type = document.querySelector("#type").value;
  const year = document.querySelector("#year").value;
  const color = document.querySelector("#color").value;
  const vin = document.querySelector("#vin").value;
  const price = document.querySelector("#price").value;
  const condition = document.querySelector("#condition").value;
  const mileage = document.querySelector("#mileage").value;
  const description = document.querySelector("#description").value;

  const userId = req.session.userId;
  console.log(userId);

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
    
    if (response.ok) {
      document.location.replace("/");
    }
  } catch (err) {
    console.error(err);
    window.prompt('Please enter in all parts of the registration form.')
  }
}

document
  .querySelector("#register-button")
  .addEventListener("click", registrationHandler);
