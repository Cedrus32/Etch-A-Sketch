// ------------- //
// HOVER EFFECTS //
// ------------- //

// TODO include a global 'click' event on grid to turn off change-bg
// TODO include rainbow draw
// TODO include color picker

function changeBG(gridItems) {
    gridItems.forEach(div => div.addEventListener('mouseenter', () => {
        div.classList.add('change-bg');
    }));
}

function stopChangeBG(gridItems) {
    gridContainer.removeEventListener('mouseover', changeBG(gridItems));
}

function startChangeBG(gridItems) {
    gridContainer.addEventListener('mouseover', changeBG(gridItems));
}

const btnClear = document.querySelector('#clear');
console.log(btnClear);
//add effects...
function addEffects(gridItems) {
    //listen for click...
    gridContainer.addEventListener('click', () => {
        gridContainer.classList.toggle('draw-on');
        if (gridContainer.classList.length === 2) {
            startChangeBG(gridItems);
        } else if (gridContainer.classList.length === 1) {
            stopChangeBG(gridItems);
        }
    });

    //listen for clear...
}

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
    // console.log(gridItems);
    //add effects...
    addEffects(gridItems);
}

// ------------ //
// INIT SCRIPTS //
// ------------ //

//TODO uncomment after debug
// let size;
// //...get width/height --> size
// function getWH() {
//     const maxWH = 70;
//     const minWH = 10;
//     while (!(size <= maxWH && size >= minWH)) {
//         size = prompt('? x ?');
//     }
//     return size;
// }

function startSketch() {
    //get width/height...
    //TODO uncomment after debug
    // getWH();
    //generate grid...
    //TODO 40 --> size after debug
    genGrid(40);
}

// --------------- //
// START SKETCHING //
// --------------- //
let start = startSketch();
