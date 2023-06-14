const formVideojuego = document.getElementById("guardarVideojuego");
const tableVideojuego = document.getElementById("TableVideojuego");
const localSto = window.localStorage;

if(typeof localSto["videojuegos"] === "undefined"){
    localSto.setItem("videojuegos", JSON.stringify([]));
}
else{
    let objValue = JSON.parse( localSto["videojuegos"] );
     for(let i = 0; i < objValue.length; i++){
            let arr = Object.values( objValue[i]);
            let tr = document.createElement("tr");
            arr.map(e => {
                let td = document.createElement("td");
                td.innerHTML = e;
                tr.appendChild(td);
            })
            let btn = document.createElement("td");
            btn.innerHTML = `<button type="button" class = "btn btn-danger" onclick = "eliminarVideojuego(this)">ELiminar</button>
            `;
            tr.appendChild(btn);
            console.log(JSON.parse( localSto["videojuegos"]))
            tableVideojuego.childNodes[1].appendChild(tr);

        }
}
function eliminarVideojuego(ev){
    let id = ev.parentNode.parentNode.childNodes[0];
    let partent = ev.parentNode.parentNode;
    let jsonVideojuego = JSON.parse(localSto.getItem("videojuegos"));
    let eliminado = jsonVideojuego.filter(e => e.id != id.innerHTML);
    partent.innerHTML = "";
    localSto.setItem("videojuegos", JSON.stringify(eliminado));
}
function guardarVideojuego(ev){
    let jsonVideojuego = JSON.parse(localSto.getItem("videojuegos"));
    let generos = document.getElementsByName("genero");
    let genero = [...generos].filter(e => e.checked).map(e => e.value).join("/")
    let id = jsonVideojuego.length + 1;
    let tr = document.createElement("tr");
    let tdid = document.createElement("td");
    tdid.innerHTML = id;
    tr.appendChild(tdid);
    let datos = [...formVideojuego];
    let obj= {}
    obj["id"] = id;
    datos.forEach((e,i ) => {
        if(e.name != "guardar" && e.name != "genero"){
            let td = document.createElement("td");
            td.innerHTML = e.value;
            obj[e.name] = e.value;
            tr.appendChild(td);
        }
        if(i == 2){
            let td = document.createElement("td");
            td.innerHTML = genero;
            obj["tematica"] = genero;
            tr.appendChild(td);
        }
    })
    jsonVideojuego.push(obj);
    localSto.setItem("videojuegos", JSON.stringify(jsonVideojuego));
    let btn = document.createElement("td");
            btn.innerHTML = `<button type="button" class = "btn btn-danger" onclick = "eliminarVideojuego(this)">ELiminar</button>
            `
    tr.appendChild(btn);
    tableVideojuego.childNodes[1].appendChild(tr);
}
formVideojuego["guardar"].addEventListener("click", guardarVideojuego);