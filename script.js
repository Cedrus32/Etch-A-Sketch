// --------------- //
// CONTROL BUTTONS //
// --------------- //

// ------------- //
// HOVER EFFECTS //
// ------------- //

function addHover(div) {
    div.classList.add('change-bg');
}

// ------------- //
// GENERATE GRID //
// ------------- //

const gridContainer = document.querySelector('div.grid-container');
//...draw grid elements & create array of grid items
function drawGrid(gridWH) {
    let gridSize = (gridWH ** 2)
    for (let i=1; i<=gridSize; i++) {
        //create grid item
        const gridItem = document.createElement('div');
        gridItem.classList.add('grid-item');
        //append grid item to grid container
        gridContainer.appendChild(gridItem);
    }
    let gridItems = gridContainer.querySelectorAll('div.grid-item');
    //add hover effects...
    gridItems.forEach(div => div.addEventListener('mouseover', (e) => {
        console.log(e);
        addHover(div);
    }));
}

//...layout grid structure
const layoutGrid = (gridWH) => {
    gridContainer.style.gridTemplateColumns = `repeat(${gridWH}, 10px)`;
    gridContainer.style.gridTemplateRows = `repeat(${gridWH}, 10px)`;
}

//...generate grid
function genGrid(userInput) {
    //layout grid...
    layoutGrid(userInput);
    //draw grid...
    drawGrid(userInput);
}

// ----------- //
// INIT SCRIPTS //
// ----------- //

let size;
//...get width/height --> size
function getWH() {
    const maxWH = 75;
    const minWH = 10;
    console.log(size);
    while (!(size <= maxWH && size >= minWH)) {
        size = prompt('? x ?');
    }
    return size;
}

function startSketch() {
    //get width/height...
    getWH();
    //generate grid...
    genGrid(size);
}

// --------------- //
// START SKETCHING //
// --------------- //

let start = startSketch();
