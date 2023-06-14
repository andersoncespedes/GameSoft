const formCompra = document.getElementById("compra");
const localSto = window.localStorage;
if(typeof localSto["videojuegos"] === "undefined"){
    localSto.setItem("videojuegos", JSON.stringify([]));
}
else{
    let objValue = JSON.parse( localSto["videojuegos"] );
    let videojuego = document.getElementById("videojuego");
    objValue.map(e => { videojuego.innerHTML += `<option value="${e["id"]}">${e["nombre"]} </option> `;})
}
if(typeof localSto["cliente"] === "undefined"){
    localSto.setItem("cliente", JSON.stringify([]));
}
else{
    let objValue = JSON.parse( localSto["cliente"] );
    let cliente = document.getElementById("cliente");
    objValue.map(e => { cliente.innerHTML += `<option value="${e["id"]}">${e["nombre"]} </option> `;})
}
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
    return errors
}
function cambioVideojuego(ev){
    
    let id = ev.target.value;
    let videojuego = JSON.parse(localSto["videojuegos"]);
    let selected = videojuego.find(e => e.id == id);
    formCompra["precio"].value = selected["precio"];
    let iva = (selected["precio"] * 16) / 100;
    let specialTax = (selected["precio"] * 4) / 100;
    formCompra["iva"].value = iva.toFixed(2);
    formCompra["impuesto"].value = specialTax.toFixed(2);
    formCompra["total"].value = [iva, specialTax, selected["precio"]].reduce((a,b) => parseFloat(a) + parseFloat(b));
    formCompra["puntos"].value = selected["puntos"]
}
function resumenCompra(ev){
    if(validacion(formCompra).length > 0){
        return;
    }
    let idCliente = formCompra["cliente"].value;
    let cliente = JSON.parse(localSto["cliente"]);
    cliente.find((e,i) => {
        if(e.id == idCliente){
            cliente[i]["puntos"] = parseInt(cliente[i]["puntos"]) + parseInt(formCompra["puntos"].value);
            return;
        }
    })
    alert("Compra Realizada");
    window.location = "./Puntos.html";
    localSto.setItem("cliente", JSON.stringify(cliente));
}
formCompra["videojuego"].addEventListener("click", cambioVideojuego);
formCompra["guardar"].addEventListener("click", resumenCompra);