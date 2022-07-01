$(document).ready(function() {
   if(localStorage.token == null){
      window.location.href = 'login.html';
   }
   cargarUsuarios();
   $('#usuarios').DataTable();
   refreshUserEmail();
});

document.querySelector('#logout').addEventListener('click', logout);

function refreshUserEmail(){
   document.getElementById('user_email').outerHTML = localStorage.email;
}

// request para obtener todos los usuarios
async function cargarUsuarios(){
   const request = await fetch('api/usuarios', {
      method: 'GET',
      headers: getHeaders()
   });
   const usuarios = await request.json();
   //console.log(usuarios);
   let table = document.getElementById('usuarios');
   let body = table.getElementsByTagName('tbody')[0];
   let listadoHTML = '';
   for (let usuario of usuarios){
      //console.log(usuario);
      let phoneText = usuario.phone == null ? '-' : usuario.phone
      let row = document.createElement('tr');
      let idCell = document.createElement('td');
      let nameCell = document.createElement('td');
      let SurnameCell = document.createElement('td');
      let emailCell = document.createElement('td');
      let phoneCell = document.createElement('td');
      let deleteBtnCell = document.createElement('td');
      let link = document.createElement('a');
      let icon = document.createElement('i');

      idCell.innerHTML = usuario.id;
      nameCell.innerHTML = usuario.name;
      SurnameCell.innerHTML = usuario.surname;
      emailCell.innerHTML = usuario.email;
      phoneCell.innerHTML = phoneText;
      deleteBtnCell.appendChild(link);
      link.id = usuario.id;
      icon.id = usuario.id;
      link.classList.add('btn', 'btn-danger', 'btn-sm', 'delete');
      link.href = '#';
      link.appendChild(icon);
      icon.classList.add('fas', 'fa-trash-alt', 'delete');

      row.appendChild(idCell);
      row.appendChild(nameCell);
      row.appendChild(SurnameCell);
      row.appendChild(emailCell);
      row.appendChild(phoneCell);
      row.appendChild(deleteBtnCell);
      body.appendChild(row);

      let emailName = document.getElementById('user_email');
      if(emailName != null){
         emailName.outerHTML = localStorage.email;
      }
   }
   document.addEventListener('click', function(e){
      if((e.target.tagName == 'I' || e.target.tagName == 'A') && e.target.classList.contains('delete')){
         deleteUser(e.target.id);
      }
   });
}

// request para eliminar 1 usuario por id
async function deleteUser(id){
   if(confirm('Eliminar este usuario?')){
      const request = await fetch('api/usuarios/'+ id, {
         method: 'DELETE',
         headers: getHeaders()
      });
      location.reload();
   }
   return;
}

function getHeaders(){
   return {
             'Accept': 'application/json',
             'Content-Type': 'application/json',
             'Authorization': localStorage.token
          }
}

function logout(){
   localStorage.removeItem('token');
   localStorage.removeItem('email');
   window.location.href = 'login.html';
}
