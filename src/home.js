
var header_text = "Wardrobe";
var dynamic_frame;

function load_iframe(html_filename) {
    dynamic_frame.src = html_filename;
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
}

function loadLaundry() {
    header_text = "Laundry";
    reloadHeader();
}

function loadWishList() {
    header_text = "WishList";
    reloadHeader();
}

function loadSettings() {
    header_text = "Settings";
    reloadHeader();
}