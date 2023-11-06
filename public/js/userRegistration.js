const registrationHandler = async (event)=>{
    event.preventDefault();

    const email = document.querySelector('#email').value;
    const password = document.querySelector('#password').value;
    const confPassword = document.querySelector('#password_confirmation').value;
    const first_name = document.querySelector('#first_name').value;
    const last_name = document.querySelector('#last_name').value;
    if ((email !== null) && (password !== null) && (password===confPassword) && (first_name !== null) && (last_name !== null)){
        const response = await fetch('/api/auth/register',{
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
              },
            body: JSON.stringify({first_name, last_name, email, password})
        });

        if (response.ok){
            document.location.replace('/login');
        } else {
            window.prompt('please enter all required information');
        }
    }
}

document.querySelector('#register-button').addEventListener('click',registrationHandler);