
var header_text;
var iframe;

function load_iframe(html_filename) {
    iframe = document.getElementById("dynamic_frame");
    iframe.src = html_filename;
}

function reloadHeader() {
    document.getElementById("header_text").innerHTML = header_text;
    closeNav();
}

function openNav() {
    document.getElementById("mySidenav").style.width = "250px";
}

function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
}

function logout() {

    alert("None of the backend has been implemented yet.");
    window.location.href = 'MainPage.html';
}

function loadWardrobe() {
    header_text = "Wardrobe";
    reloadHeader();
    load_iframe("Wardrobe.html");
}

function loadLaundry() {
    header_text = "Laundry";
    reloadHeader();
    load_iframe("Laundry.html");
}

function loadWishList() {
    header_text = "WishList";
    reloadHeader();
    load_iframe("WishList.html");
}

function loadSettings() {
    header_text = "Settings";
    reloadHeader();
    load_iframe("Settings.html");
}


// will run immediately
header_text = "Wardrobe";
load_iframe("wardrobe.html");