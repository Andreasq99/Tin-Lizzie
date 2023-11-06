const registrationHandler = async (event)=>{
    event.preventDefault();

    const email = document.querySelector('#email');
    const password = document.querySelector('#password');
    const confPassword = document.querySelector('#password_confirmation')
    const first_name = document.querySelector('#first_name');
    const last_name = document.querySelector('#last_name');
    if(email && password && password===confPassword && first_name && last_name){
        const response = await fetch('/api/auth',{
            method: 'POST',
            body: JSON.stringify({first_name, last_name, email, password})
        });

        if (response.ok){
            document.location.replace('/');
        }
    }
}

document.querySelector('#register-button').addEventListener('submit',registrationHandler);