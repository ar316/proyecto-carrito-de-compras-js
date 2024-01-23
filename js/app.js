const carritohtml = document.querySelector('#carrito');
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const listaCursos = document.querySelector('#lista-cursos');
const btnVaciarCarrito = document.querySelector('#vaciar-carrito');
let carrito = [];

cargarEventListener()
function cargarEventListener(){
    //agregar el curso al carrtio 
    listaCursos.addEventListener('click', agregarCurso);

    carritohtml.addEventListener('click', eliminarCurso);
    btnVaciarCarrito.addEventListener('click', eliminarCarrito);
    document.addEventListener('DOMContentLoaded', cargarLocalStorage);
}



//eliminando curso 
function cargarLocalStorage(){
    carrito = JSON.parse(localStorage.getItem('cursos')) || [];
    llenarCarrito();
}
function eliminarCarrito(e){
   e.stopPropagation();
   limpiarCarrito()
   carrito = [];
   console.log(carrito)

}

function eliminarCurso(e) {
    e.stopPropagation();
    const idCurso = e.target.getAttribute('data-id');
    console.log(idCurso)
    //verifica si ya existe
    const curs = carrito.find( curso => curso.id === idCurso);
    console.log(curs)
    if(curs){
        if(curs.cantidad > 1){
            const cursos = carrito.map( curso => {
                if(curso.cantidad > 1 ){
                     curso.cantidad--;
                     return curso;
                }
                return curso;
                
             });
             carrito = [...cursos]
        }else{
            carrito = carrito.filter(curso => curso.id !== idCurso);
        }
        
    }
    limpiarCarrito()
    llenarCarrito() 
}



//funciones 


function agregarCurso(e){
    e.preventDefault();
    if(e.target.classList.contains('agregar-carrito')){
        console.log('precioando en el curso');
        const cursoSeleccionado = e.target.parentElement.parentElement;
        leerDatosCurso(cursoSeleccionado)

    }
}



function leerDatosCurso(curso){
    
    const infocurso = {
        imagen: curso.querySelector('img').src,
        nombre: curso.querySelector('h4').textContent,
        precio: curso.querySelector('.precio span').textContent,
        id: curso.querySelector('a').getAttribute('data-id'),
        cantidad: 1
    }

    //revisa si un curso ya existe
    const existe  = carrito.some( curso => curso.id === infocurso.id );
    if(!existe){
        carrito = [...carrito, infocurso]
    }else{
       const cursos = carrito.map(curso =>{
        if(curso.id === infocurso.id){
            curso.cantidad++;
            return curso;
        }else{
            return curso;
        }
       });
       carrito = [...cursos]
       
    }
   
    const {imagen, nombre, precio , id , cantidad} = infocurso;
   
    // console.table(carrito)
    limpiarCarrito();
    llenarCarrito();
    

}


//muestra el carrito de compras en el html
function llenarCarrito(){
    
    carrito.forEach( curso => {  
        const {imagen, nombre, precio , id , cantidad} = curso;
        const row = document.createElement("tr");
  
            row.innerHTML =`
            <td> 
                <img src="${imagen}"  width="140px">
            </td>
            <td> 
                ${nombre}
            </td>
            <td> 
                ${precio}
            </td>
            <td> 
                ${cantidad}
            </td>
            <td> 
                <a href="#" class="borrar-curso" data-id="${id}"> x </a>
            </td>
        `;
        
        contenedorCarrito.appendChild(row);

       
        
    })
    
    sincronizar();
}


function sincronizar(){
    localStorage.setItem("cursos", JSON.stringify(carrito));
}

function limpiarCarrito(){
    contenedorCarrito.innerHTML = '';
}

function validarSiExiste(id){
    return carrito.some( cursor => cursor.id === id);
}