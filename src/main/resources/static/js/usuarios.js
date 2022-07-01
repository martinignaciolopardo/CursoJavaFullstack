$(document).ready(function() {
   cargarUsuarios();
   $('#usuarios').DataTable();
   refreshUserEmail();
});

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
    console.log(usuarios);

    let listadoHTML = '';
    for (let usuario of usuarios){
        console.log(usuario);
        let phoneText = usuario.phone == null ? '-' : usuario.phone
        let userHtml = '<tr>'+
                            '<td>'+usuario.id+'</td>'+
                            '<td>'+usuario.name+'</td>'+
                            '<td>'+usuario.surname+'</td>'+
                            '<td>'+usuario.email+'</td>'+
                            '<td>'+phoneText+'</td>'+
                            '<td>'+
                                '<a href="#" onclick="deleteUser('+usuario.id+')" class="btn btn-danger btn-circle btn-sm">'+
                                    '<i class="fas fa-trash"></i>'+
                                '</a>'+
                            '</td>'+
                        '</tr>';
        listadoHTML += userHtml;
    }
    document.querySelector('#usuarios tbody').outerHTML = listadoHTML;
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
