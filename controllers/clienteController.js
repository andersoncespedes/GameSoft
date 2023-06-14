//variables constantes

const formCliente = document.getElementById("guardarCliente");
const formEditarCliente = document.getElementById("editarCliente");
const tableCliente = document.getElementById("TableCLiente");
const formBusqueda = document.getElementById("busqueda");
const localSto = window.localStorage;

// verificar si existe el objeto cliente en el local storage


if(typeof localSto["cliente"] === "undefined"){
    localSto.setItem("cliente", JSON.stringify([]));
}
else{

//creacion de los elementos html si existe el objeto cliente en el local storage

    let objValue = JSON.parse( localSto["cliente"] );
     for(let i = 0; i < objValue.length; i++){
            let arr = Object.values( objValue[i]);
            let tr = document.createElement("tr");
            arr.map((e,i) => {
                if(i < 8){
                    let td = document.createElement("td");
                    td.innerHTML = e;
                    tr.appendChild(td);
                }
            })
            let btn = document.createElement("td");
            btn.innerHTML = `<button type="button" class = "btn btn-danger" onclick = "eliminarCliente(this)">ELiminar</button>
            <button type="button" class = "btn btn-warning" data-bs-target="#ModalEditar" onclick = "editarCliente(this)" data-bs-toggle="modal">Editar</button>
            `;
            tr.appendChild(btn);
            console.log(JSON.parse( localSto["cliente"]))
            tableCliente.childNodes[1].appendChild(tr);
        }
}

// modulo de elimicacion de clientes

function eliminarCliente(ev){
    let id = ev.parentNode.parentNode.childNodes[0];
    let partent = ev.parentNode.parentNode;
    let jsonCliente = JSON.parse(localSto.getItem("cliente"));
    let eliminado = jsonCliente.filter(e => e.id != id.innerHTML);
    partent.innerHTML = "";
    localSto.setItem("cliente", JSON.stringify(eliminado));
}

// modulo de captura de valores de clientes

function editarCliente(ev){
        let id = ev.parentNode.parentNode.children[0].innerHTML;
        let cedula = ev.parentNode.parentNode.children[1].innerHTML;
        let nombre = ev.parentNode.parentNode.children[2].innerHTML;
        let apellido = ev.parentNode.parentNode.children[3].innerHTML;
        let telefono = ev.parentNode.parentNode.children[4].innerHTML;
        let email = ev.parentNode.parentNode.children[5].innerHTML;
        let nacimiento = ev.parentNode.parentNode.children[6].innerHTML;
        let nacionalidad = ev.parentNode.parentNode.children[7].innerHTML;
        let form = document.getElementById("editarCliente");
        form["detect"].value = id;
        form["nombre"].value = nombre;
        form["apellido"].value = apellido;
        form["telefono"].value = telefono;
        form["nacimiento"].value = nacimiento;
        form["email"].value = email;
        form["nacionalidad"].value = nacionalidad;
        form["numero de identificacion"].value = cedula;
        let updated = JSON.parse(localSto.getItem("cliente"));
        updated[id - 1] 
}

//validacion de formularios automatizado

function validacion(valores){
    let errors = [];
    [...valores].forEach(e => {
        if(e.name != "guardar"){
                if(e.value.length == 0){ 
                alert("Error:  " + e.name + " se encuentra vacio")
                errors.push(true)
            }
        }
       
    })
    if(/[0-9]/g.test(valores["nombre"].value) ){
        alert("el nombre no puede llevar numeros");
        errors.push(true);
    }
    if(/[a-z]/gi.test(valores["numero de identificacion"].value) ){
        alert("la cedula no puede llevar letras");
        errors.push(true);
    }
    return errors
}

//guardado de clientes y generador de elementos html

function guardarClientes(ev){
    if(validacion(formCliente).length > 0){
        return;
    }
    let jsonCliente = JSON.parse(localSto.getItem("cliente"));
    let id = jsonCliente.length + 1;
    let tr = document.createElement("tr");
    let tdid = document.createElement("td");
    tdid.innerHTML = id;
    tr.appendChild(tdid);
    let datos = [...formCliente];
    let obj= {}
    obj["id"] = id;
    datos.forEach(e => {
        if(e.name != "guardar"){
            let td = document.createElement("td");
            td.innerHTML = e.value;
            obj[e.name] = e.value;
            tr.appendChild(td);
        }
    })
    obj["puntos"] = 0;
    jsonCliente.push(obj);
    localSto.setItem("cliente", JSON.stringify(jsonCliente));
    let btn = document.createElement("td");
            btn.innerHTML = `<button type="button" class = "btn btn-danger" onclick = "eliminarCliente(this)">ELiminar</button>
            <button type="button" class = "btn btn-warning" data-bs-target="#ModalEditar"  onclick = "editarCliente(this)"  data-bs-toggle="modal">Editar</button>
            `
    tr.appendChild(btn);
    
    tableCliente.childNodes[1].appendChild(tr);
}
// edicion de clientes 
function updatedCliente(ev){
    let id = formEditarCliente["detect"].value;
    let jsonCliente = JSON.parse(localSto.getItem("cliente"));
    let trs = [...document.getElementsByTagName("tr")];
    if(validacion(formEditarCliente).length > 0){
        return;
    }
    jsonCliente.find((e,i) => {
        if(e.id == id){
            jsonCliente[i]["nombre"] =    formEditarCliente["nombre"].value 
            jsonCliente[i]["apellido"] =  formEditarCliente["apellido"].value 
            jsonCliente[i]["telefono"] =  formEditarCliente["telefono"].value
            jsonCliente[i]["nacimiento"] =  formEditarCliente["nacimiento"].value
            jsonCliente[i]["email"] =  formEditarCliente["email"].value 
            jsonCliente[i]["nacionalidad"] =  formEditarCliente["nacionalidad"].value 
            jsonCliente[i]["numero de identificacion"] =  formEditarCliente["numero de identificacion"].value 
            return;
        }
    })
    localSto.setItem("cliente", JSON.stringify(jsonCliente)); 
    for(let i = 1 ; i < trs.length; i++){
        if(trs[i].childNodes[0].innerHTML == id){
            trs[i].childNodes[1].innerHTML =  formEditarCliente["numero de identificacion"].value 
            trs[i].childNodes[2].innerHTML =   formEditarCliente["nombre"].value 
            trs[i].childNodes[3].innerHTML =  formEditarCliente["apellido"].value 
            trs[i].childNodes[4].innerHTML =  formEditarCliente["telefono"].value
            trs[i].childNodes[5].innerHTML =  formEditarCliente["email"].value
            trs[i].childNodes[6].innerHTML =  formEditarCliente["nacimiento"].value 
            trs[i].childNodes[7].innerHTML =  formEditarCliente["nacionalidad"].value 
            
        }
    }
    console.log(jsonCliente);
}

//busqueda de clientes
function busqueda(ev){
    tableCliente.childNodes[1].innerHTML = "";
    let jsonCliente = JSON.parse(localSto.getItem("cliente"));
    console.log(bus);
    jsonCliente.map(e => {
        let nombre =  e.nombre.toLowerCase().split(" ")
        let apellido =  e.apellido.toLowerCase().split(" ")
        if(nombre.indexOf(formBusqueda["valorBusqueda"].value.toLowerCase()) > -1
        || apellido.indexOf(formBusqueda["valorBusqueda"].value.toLowerCase()) > -1
        ){
            console.log(e)
        }
    })
}
formCliente["guardar"].addEventListener("click", guardarClientes)
formEditarCliente["guardar"].addEventListener("click", updatedCliente);
formBusqueda["buscar"].addEventListener("click", busqueda)
