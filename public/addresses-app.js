// token must be saved in localStorage, otherwise 

function generateTable(data) {
    var table = document.createElement('table');
    var head = table.createTHead();
    var headRow = head.insertRow();

    var columns = ["Name", "Mobile", "Street"];
    columns.forEach(column => {
        var cell = document.createElement('th');
        cell.innerHTML = column;
        headRow.appendChild(cell);
    });

    var body = table.createTBody();
    var mydata = JSON.parse(data);

    for (const key in mydata) {
        if (mydata.hasOwnProperty(key)) {
            const element = mydata[key];
            var row = body.insertRow();

            var name = row.insertCell();
            name.textContent = key;
            var mobile = row.insertCell();
            mobile.textContent = element.mobile;
            var street = row.insertCell();
            street.textContent = element.street;
        }
    }

    $("#addresstable").append(table);
}

function newEntry () {
    window.location.href = "./newentry.html";
}