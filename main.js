const url = "https://gist.githubusercontent.com/josejbocanegra/b1873c6b7e732144355bb1627b6895ed/raw/d91df4c8093c23c41dce6292d5c1ffce0f01a68b/newDatalog.json"
fetch(url).then(res => res.json()).then(res => {writeInfo(res); correlation(res)});
//Crea nuevas columnas en la  tabal de eventos para cada entrada nueva
function writeInfo(info){
    table = document.getElementById("events");
    
    for (let index = 0; index < info.length; index++) {
        table.insertRow(index+1);
        table.rows[index+1].insertCell(0);
        table.rows[index+1].insertCell(1);
        table.rows[index+1].insertCell(2);

        table.rows[index+1].cells[0].innerHTML = index+1;
        table.rows[index+1].cells[1].innerHTML = info[index].events;
        table.rows[index+1].cells[2].innerHTML = info[index].squirrel;
        if(info[index].squirrel){
            table.rows[index+1].style.backgroundColor = "red";
        }
    }
}
//Encuentra la correlacion de cada elemento individual y lo coloca en la tabla de
//correlacion
function correlation(info)
{
    table = document.getElementById("co");
    //lista de posibilidades
    var events = new Array;
    for (let i = 0; i < info.length; i++) {
        //Evento actual
        list = info[i].events;
        //si o no ardilla
        bool = info[i].squirrel;
        for (let j = 0; j < list.length; j++) {
            var e = list[j];
            //Si es ardilla 
            if(bool)
            {
                //creacion objeto nuevo
                e = {name: e, t: 1, f:0,co:0};
            }
            else
            {
                e = {name: e, t: 0, f:1,co:0};
            }
            //buscando si ya se adjunto el elemento en la lista
            original = events.find(r => r.name==e.name);
            if(original!=undefined)
            {
                //actualiszando variables
                original.t += e.t;
                original.f += e.f;
            }
            //añadiendo nuevo elemento a la lista
            else
            {
                
                events.push(e);
            }
            
        }
    }
    totalF = 85;
    totalT = 5;
    //calculando MCC
    for (let i = 0; i < events.length; i++) {
        fn = events[i].f;
        tn = totalF - fn;
        tp = events[i].t;
        fp = totalT - tp;
        mcc = (tp*tn - fp*fn)/(Math.sqrt((tp+fp)*(tp+fn)*(tn+fp)*(tn+fn)))
        events[i].co = mcc;
    }
    events.sort((b,a)=> a.co-b.co);
    for (let i = 0; i < events.length; i++) {
        table.insertRow(i+1);
        table.rows[i+1].insertCell(0);
        table.rows[i+1].insertCell(1);
        table.rows[i+1].insertCell(2);

        table.rows[i+1].cells[0].innerHTML = i+1;
        table.rows[i+1].cells[1].innerHTML = events[i].name;
        table.rows[i+1].cells[2].innerHTML = events[i].co;
        
    }
}