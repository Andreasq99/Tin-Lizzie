const loginHandler = async function (event){
    event.preventDefault();

    const incorrectMsgEl = document.getElementById('incorrect-text');



    const email = document.querySelector('#email').value;
    const password = document.querySelector('#password').value;
    if((email!==null) && (password!==null)){
        console.log(email+" "+password);
        console.log(JSON.stringify({email: email,password: password}));
        try {
            const response = await fetch('/api/users/login',{
                method: 'POST',
                body: JSON.stringify({ email, password}),
                headers: {
                    "Content-Type": "application/json",
                },
            });
            if(response.ok){
                document.location.replace('/');
            } else {
                incorrectMsgEl.style.display = 'block';
            }
        } catch (err) {
            incorrectMsgEl.style.display = 'block';
        }

    }
}

document.querySelector('#login').addEventListener('click', loginHandler)