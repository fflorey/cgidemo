// token must be saved in localStorage, otherwise 


const baseurl = "/cgidemo";

// server decides which where to store 
function setNewAddressForUser ( name, phone, street, callback ) {
    console.log('aha, setdings called with name' + name);
    token = localStorage.getItem('token');
    uri=baseurl+"/storedb";
    console.log('aha, setdings called with name' + name + "uri: " + uri);
    $.ajax({
        type: 'POST',
        url: uri,
        headers: {
            "Authorization": 'Bearer '+token,
        },
        data:  { "name": name, "phone": phone, "street": street },
        dataType: 'json'
    }).done(function(data) { 
        console.log('set data:' + data);
        callback( data );
    });
}

function getAddressesFromFirebaseDB ( callback ) {
    token = localStorage.getItem('token');
    url=baseurl +"/readdb";
    $.ajax({
        type: 'GET',
        url: url,
        headers: {
            "Authorization": 'Bearer '+token,
        }
    }).done(function(data) { 
        console.log('get data' + data);
        callback ( data );
    });
}

function newEntry ( ) {
    window.location.href = "./newentry.html";
}