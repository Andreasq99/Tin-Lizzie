const loginHandler = async function (event){
    event.preventDefault();

    const email = document.querySelector('#email').value;
    const password = document.querySelector('#password').value;
    if((email!==null) && (password!==null)){
        console.log(email+" "+password);
        console.log(JSON.stringify({email: email,password: password}));
        const response = await fetch('/api/users/login',{
            method: 'POST',
            body: JSON.stringify({email: email,password: password}),
            headers: {
                "Content-Type": "application/json",
            },
        });
        if(response.ok){
            document.location.replace('/');
        }
    }
}

document.querySelector('#login').addEventListener('click', loginHandler)