//variables constantes

const localSto = window.localStorage;
const tableCliente = document.getElementById("TableCLiente");

// verificar si existe el objeto cliente en el local storage

if(typeof localSto["cliente"] === "undefined"){
    localSto.setItem("cliente", JSON.stringify([]));
}
else{

//creacion de los elementos html si existe el objeto cliente en el local storage

    let objValue = JSON.parse( localSto["cliente"] );
    objValue.sort((a,b) => b["puntos"]-a["puntos"]);
     for(let i = 0; i < objValue.length; i++){
        if(objValue[i]["puntos"] > 0){
          let arr = Object.values( objValue[i]);
            let tr = document.createElement("tr");
            arr.map((e, i) => {
            // los elementos por debajo del 4 y encima del 7 son los que deseo mostrar
                if(i < 4 || i > 7 ){
                    let td = document.createElement("td");
                    td.innerHTML = e;
                    tr.appendChild(td);
                }
               
            })
            console.log(JSON.parse( localSto["cliente"]))
            tableCliente.childNodes[1].appendChild(tr);

        }
        }
          
}