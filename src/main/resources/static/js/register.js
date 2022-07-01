$(document).ready(function() {

});

async function registerUser(){
   let data = {};
   data.name = document.getElementById('exampleFirstName').value;
   data.surname = document.getElementById('exampleLastName').value;
   data.email = document.getElementById('exampleInputEmail').value;
   data.password = document.getElementById('exampleInputPassword').value;
   let userRepeatPassword = document.getElementById('exampleRepeatPassword').value;
   console.log(data);
   if(data.password != userRepeatPassword){
      alert('Incorrect passwords, try again');
      return;
   }
   const request = await fetch('api/usuarios', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
   });
   alert("Account created!");
   window.location.href = 'login.html';

}
