const loginHandler = async function (event){
    event.preventDefault();

    const email = document.querySelector('#email').value;
    const password = document.querySelector('#password').value;
    if(email && password){
        const response = await fetch('/api/user-routes/login',{
            method: 'POST',
            body: JSON.stringify({email,password})
        });
        if(response.ok){
            document.location.replace('/');
        }
    }
}

document.querySelector('#login').addEventListener('click', loginHandler)