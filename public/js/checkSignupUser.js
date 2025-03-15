async function signupUser() {
    const signupUrl = 'http://localhost:3000/signup'; 
    try {
        const response = await fetch(signupUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData)
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('There was a problem with the signup request:', error);
        throw error;
    }
}
signupUser().then((result)=>{
    console.log(result);
}).catch((error)=>{
    console.log("some error occurred " + error.message);
})