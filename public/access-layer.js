// token must be saved in localStorage, otherwise 


const baseurl = "/cgidemo";

// server decides which where to store 
function setNewAddressForUser ( user, mycallback ) {
    console.log('aha, setdings called with name' + JSON.stringify(user));
    token = localStorage.getItem('token');
    uri=baseurl+"/storedb";
    $.ajax({
        type: 'POST',
        url: uri,
        headers: {
            "Authorization": 'Bearer '+token,
        },
        data:  user,
        dataType: 'json'
    }).done(function(data) { 
        mycallback( data );
    }).fail(function(jqXHR, textStatus, errorThrown) {
        console.log('error: ' + textStatus);
    });
}

function getAddressesFromFirebaseDB ( mycallback ) {
    token = localStorage.getItem('token');
    url=baseurl +"/readdb";
    $.ajax({
        type: 'GET',
        url: url,
        headers: {
            "Authorization": 'Bearer '+token,
        }
    }).done(function(data) { 
        mycallback ( data );
    }).fail(function(jqXHR, textStatus, errorThrown) {
        console.log('error: ' + textStatus);
    });
}
