

/*------------- Home.html functions -------------------------*/
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
/*------------- Home.html functions -------------------------*/


/*------------- Wardrobe.html functions -------------------------*/
var shirt_imgage_array = [];
var pants_imgage_array = [];
loadImagesIntoArrays();

// Assume you have a function to load images dynamically based on clothing type
function loadImages(clothingType) {
    // Example: Get the images for shirts
    var imagesContainer = document.getElementById(`${clothingType}-images`);
    imagesContainer.innerHTML = ''; // Clear existing images

    // Assume you have a function that returns an array of image URLs
    //var imageUrls = getImagesForClothingType(clothingType);
    switch (clothingType) {
        case'shirt':
            var imageUrls = shirt_imgage_array;
            break;
        case 'pants':
            var imageUrls = pants_imgage_array;
            break;
    }

    // Dynamically create img elements and append them to the container
    imageUrls.forEach(function (imageUrl) {
        var img = document.createElement('img');
        img.src = imageUrl;
        imagesContainer.appendChild(img);
    });
}

// Example function that returns an array of image URLs based on clothing type
function loadImagesIntoArrays() {
    // Replace this with your actual logic to fetch image URLs
    // For demonstration, using static URLs here

    // loop through all json objects in file
    const fs = require('fs');
    const path = require('path');
    const folderPath = '../users/wardrobe';

    fs.readdir(folderPath, (err, files) => {

        if (err) {
            console.error(err);
            return;
        }

        files.forEach(file => {
            if (path.extname(file) === '.json') {
                const filePath = path.join(folderPath, file);
                readAndProcessJsonFile(filePath);
            }
        });
    });
}

function readAndProcessJsonFile(filePath) {

    jsonData = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    switch (jsonData.type) {
        case 'shirt':
            shirt_imgage_array.push(jsonData.imagePath);
            break;
        case 'pants':
            pants_imgage_array.push(jsonData.imagePath);
            break;
    }
}
/*------------- Wardrobe.html functions -------------------------*/