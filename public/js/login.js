const loginHandler = async function (event){
    event.preventDefault();

    const email = document.querySelector('#email').value;
    const password = document.querySelector('#password').value;
    if(email && password){
        const response = await fetch('/api/user-routes/login',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
              },
            body: JSON.stringify({email, password})
        });
        if(response.ok){
            document.location.replace('/homepage');
        } else {
            window.prompt('incorrect username or password');
        }
    }
}

document.querySelector('#login').addEventListener('click', loginHandler)