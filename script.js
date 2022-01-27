// ------------- //
// HOVER EFFECTS //
// ------------- //

// function addHover(div) {
//     div.classList.add('change-bg');
// }

// //add hover effects...
// gridItems.forEach(div => div.addEventListener('mouseover', (e) => {
//     console.log(e);
//     addHover(div);
// }));

// ------------- //
// GENERATE GRID //
// ------------- //

const gridContainer = document.querySelector('div.grid-container');
let gridItems;
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
    gridItems = gridContainer.querySelectorAll('div.grid-item');
    return gridItems;
}

//...layout grid structure
const styleGrid = (gridWH) => {
    gridContainer.style.gridTemplateColumns = `repeat(${gridWH}, 10px)`;
    gridContainer.style.gridTemplateRows = `repeat(${gridWH}, 10px)`;
}

//...generate grid
function genGrid(userInput) {
    //layout grid...
    styleGrid(userInput);
    //draw grid...
    drawGrid(userInput);
    console.log(gridItems);
    //add effects...
    addEffects(gridItems);
}

// ----------- //
// INIT SCRIPTS //
// ----------- //

let size;
//...get width/height --> size
function getWH() {
    const maxWH = 75;
    const minWH = 10;
    while (!(size <= maxWH && size >= minWH)) {
        size = prompt('? x ?');
    }
    return size;
}

function startSketch() {
    //get width/height...
    getWH();
    console.log(size);
    //generate grid...
    genGrid(size);
}

// --------------- //
// START SKETCHING //
// --------------- //

let start = startSketch();
