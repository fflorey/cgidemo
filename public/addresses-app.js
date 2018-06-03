// token must be saved in localStorage, otherwise 

function generateTable(data) {
    var html = '<table><thead><tr><th>Name</th><th>Mobile</th><th>Street</th></tr></thead><tbody>';
    var mydata = JSON.parse(data);
    // var data = {"Hermann Meier":{"mobile":"01726019443","street":"fasanenweg"},"Knud Fabian":{"mobile":"017427281272","street":"ahornkringel"}};
    for (const key in mydata) {
        if (mydata.hasOwnProperty(key)) {
            const element = mydata[key];
            html += '<tr><td>'+key+'</td>' + '<td>' + element.mobile +'</td><td>' + element.street +'</td></tr>'
        }
    }
    html += '</tbody></table>';
    $("#addresstable").html ( html );
    console.log('html '+ html);
}

function newEntry ( )
{
    window.location.href = "./newentry.html";
}