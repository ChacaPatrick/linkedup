const logout = document.querySelector('#logout');
logout.addEventListener('click', (e) =>{
    e.preventDefault();
    firebase.auth().signOut().then(() =>{
        window.location.replace("index.php")
    })
})

