async function registrationHandler(event) {
  event.preventDefault();

  const vehicleMake = document.querySelector("#vehicle-make").value;
  const vehicleModel = document.querySelector("#vehicle-model").value;
  const year = document.querySelector("#year").value;
  const color = document.querySelector("#color").value;
  const vin = document.querySelector("#vin").value;
  const price = document.querySelector("#price").value;
  const condition = document.querySelector("#condition").value;
  const mileage = document.querySelector("#mileage").value;
  const description = document.querySelector("#description").value;

  try {
    const response = await fetch("/api/auth", {
      method: "POST",
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
  .addEventListener("submit", registrationHandler);
