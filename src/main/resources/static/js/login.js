$(document).ready(function() {
   let loginBtn = document.getElementById('loginBtn');
   loginBtn.addEventListener('click', login);
});

async function login(){
   let data = {};
   data.email = document.getElementById('exampleInputEmail').value;
   data.password = document.getElementById('exampleInputPassword').value;

   const request = await fetch('api/login', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
   });
   const answer = await request.text();

   if(answer != 'fail'){
      localStorage.token = answer;
      localStorage.email = data.email;
      window.location.href = 'usuarios.html'
   }else{
      alert('credenciales invalidas')
   }
}