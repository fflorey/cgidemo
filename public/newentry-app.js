// token must be saved in localStorage, otherwise 

function checkAndLeavePage() {
    window.location.href = "/addresses.html";
}

function leavePage( dummy ) {
    alert('super');
    window.location.href = "/addresses.html";
}

function newEntry() {
    name = $("#name").val();
    phone = $("#mobile").val();
    street = $("#street").val();
    setNewAddressForUser ( name,phone,street, leavePage );
}

