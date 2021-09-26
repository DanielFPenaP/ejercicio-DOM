const url = "https://gist.githubusercontent.com/josejbocanegra/b1873c6b7e732144355bb1627b6895ed/raw/d91df4c8093c23c41dce6292d5c1ffce0f01a68b/newDatalog.json"
fetch(url).then(res => res.json()).then(res => {writeInfo(res); correlation(res)});
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
function correlation(info)
{
    table = document.getElementById("co");
    console.log(info);
    var events = new Array;
    

}