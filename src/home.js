

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
const wardrobeManager = {
    shirtImageArray: [],
    pantsImageArray: [],
    folderPath: '../users/json',

    loadImagesIntoArrays: function () {
        fs.readdir(this.folderPath, (err, files) => {
            if (err) {
                console.error(err);
                return;
            }

            files.forEach(file => {
                if (path.extname(file) === '.json') {
                    const filePath = path.join(this.folderPath, file);
                    this.readAndProcessJsonFile(filePath);
                }
            });
        });
    },

    readAndProcessJsonFile: function (filePath) {
        const jsonData = JSON.parse(fs.readFileSync(filePath, 'utf8'));
        console.log(jsonData);

        switch (jsonData.type) {
            case 'shirt':
                this.shirtImageArray.push(jsonData.imagePath);
                break;
            case 'pants':
                this.pantsImageArray.push(jsonData.imagePath);
                break;
        }
    },

    loadImages: function (clothingType) {
        const imagesContainer = document.getElementById(`${clothingType}-images`);
        imagesContainer.innerHTML = ''; // Clear existing images

        let imageArray;
        switch (clothingType) {
            case 'shirts':
                imageArray = this.shirtImageArray;
                break;
            case 'pants':
                imageArray = this.pantsImageArray;
                break;
            default:
                return;
        }

        if (imageArray.length === 0) {
            return;
        }

        // Dynamically create img elements and append them to the container
        imageArray.forEach(imagePath => {
            const img = document.createElement('img');
            img.src = imagePath;
            imagesContainer.appendChild(img);
        });
    },
};

// Call the function to load images into arrays on script load
wardrobeManager.loadImagesIntoArrays();

function loadImages(clothingType) {
    wardrobeManager.loadImages(clothingType);
}
/*------------- Wardrobe.html functions -------------------------*/