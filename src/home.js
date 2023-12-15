

/*------------- Home.html functions -------------------------*/
var header_text;
header_text = "wardrobe";
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
/*------------- Home.html functions -------------------------*/


/*------------- Wardrobe.html functions -------------------------*/

const shirtImageArray = new Array();
const pantsImageArray = new Array();
var folderPath = '/users/json';

function loadImagesIntoArrays () {
    fetch('/users/json-list')
        .then(response => {
            console.log('Response:', response);
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            const jsonFiles = data.jsonFiles;
            // Map each fetchAndProcessJsonFile call to a promise
            const promises = jsonFiles.map(jsonFile => fetchAndProcessJsonFile(jsonFile));
            // Use Promise.all to wait for all promises to resolve
            return Promise.all(promises);
        })
        .catch(error => console.error('Error fetching JSON files:', error));
    }

function fetchAndProcessJsonFile(jsonFile) {
    fetch(`/users/json/${jsonFile}`)
        .then(response => response.json())
        .then(data => {
            var str_to_push = `../users/${data.imagePath}`;
            switch (data.type) {
                case 'shirt':
                    shirtImageArray.push(str_to_push);
                    break;
                case 'pants':
                    pantsImageArray.push(str_to_push);
                    break;
                // Add more cases as needed
            }
        })
        .catch(error => console.error(`Error fetching ${jsonFile}:`, error));
}

function loadImages (clothingType) {
    const imagesContainer = document.getElementById(`${clothingType}-images`);
    imagesContainer.innerHTML = ''; // Clear existing images

    let imageArray;
    switch (clothingType) {
        case 'shirts':
            imageArray = shirtImageArray;
            break;
        case 'pants':
            imageArray = pantsImageArray;
            break;
        default:
            return "Invalid Clothing Type";
    }

    if (imageArray.length === 0) {
        return "No Image Found";
    }

    // Dynamically create img elements and append them to the container
    imageArray.forEach(imagePath => {
        const img = document.createElement('img');
        img.src = imagePath;
        imagesContainer.appendChild(img);
    });
}
loadImagesIntoArrays();

/*------------- Wardrobe.html functions -------------------------*/



// lastly load the html file
load_iframe("wardrobe.html");