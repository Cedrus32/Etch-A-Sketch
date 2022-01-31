// ------------------------- //
// LISTEN FOR DRAW & EFFECTS //
// ------------------------- //

//...erase color
function drawErase(e) {
    e.target.style.backgroundColor = '';
}

//...clear grid & reset draw...
function clearGrid() {
    gridItems.forEach(gridItem => {
        gridItem.style.backgroundColor = '';
        gridItem.removeEventListener('mouseenter', startDraw);
    });
    drawOn = false;
}

//...draw in rainbow color
function drawRainbow(e) {
    e.target.style.backgroundColor = 'red';
}

//...draw in picker color
function drawPicker(e) {
    e.target.style.backgroundColor = 'white';
}

//...switch-case on mouseover...
function startDraw(e) {
    switch (mode) {
        case 'picker':
            drawPicker(e);
            break;
        case 'rainbow':
            drawRainbow(e);
            break;
        case 'erase':
            drawErase(e);
    }
}

//...toggle draw
function toggleDraw() {
    gridContainer.classList.toggle('draw');
    drawOn = gridContainer.classList.contains('draw');
    console.log(drawOn);
    return drawOn
}

//...check draw on...
let mode;
let color;
let drawOn = false;
let clear;
function checkDrawOn() {
    //DRAWON FALSEY BY DEFAULT
    gridContainer.addEventListener('click', () => {
        console.log(drawOn);
        
        //TODO change conditionals to reflect drawOn default
        //check if draw is truthy/falsey...
        if (drawOn === false) {
            gridItems.forEach(gridItem => {
                gridItem.addEventListener('mouseleave', startDraw);
            });
            toggleDraw();
        } else if (drawOn === true) {
            gridItems.forEach(gridItem => {
                gridItem.removeEventListener('mouseleave', startDraw);
            });
            toggleDraw();
        }
    });
}

//...listen for draw effects...
const btnErase = document.querySelector('#erase');
const btnPicker = document.querySelector('#picker');
const btnRainbow = document.querySelector('#rainbow');
const btnClear = document.querySelector('#clear');
function getMode() {
    //listen for erase & draw in '' (erase)
    btnErase.addEventListener('click', () => {
        mode = 'erase';
        color = ''
    });
    
    //listen for picker & draw in picker color...
    btnPicker.addEventListener('click', () => {
        mode = 'picker';
        color = '"white"';
    });

    //listen for rainbow & draw in rainbow color...
    btnRainbow.addEventListener('click', () => {
        mode = 'rainbow';
        color = '"red"';
    });
    
    //listen for clear & clear grid/reset draw...
    btnClear.addEventListener('click', () => {
        clearGrid();
    });
}

//...initiate draw...
function initDraw() {
    //listen for draw effects...
    getMode();
    //toggle draw...
    checkDrawOn();
}

// ------------- //
// GENERATE GRID //
// ------------- //

//...layout grid structure
const layoutGrid = (size) => {
    gridContainer.style.gridTemplateColumns = `repeat(${size}, 10px)`;
    gridContainer.style.gridTemplateRows = `repeat(${size}, 10px)`;
}

//...create grid items & capture gridItem nodeList
function createItems(size) {
    let gridSize = (size ** 2);
    for (let i = 1; i <= gridSize; i++) {
        //create gridItem
        let gridItem = document.createElement('div');
        gridItem.classList.add('grid-item');
        gridItem.addEventListener('click', startDraw);
        //append gridItem to gridContainer
        gridContainer.appendChild(gridItem);
    }
    gridItems = gridContainer.querySelectorAll('div.grid-item');
    return gridItems;
}

//...generate grid...
const gridContainer = document.querySelector('div.grid-container');
function genGrid(size) {
    //create grid items...
    createItems(size);
    //layout grid...
    layoutGrid(size);
}

//...get width/height
let size;
function getWH() {
    const maxWH = 70;
    const minWH = 10;
    while (!(size <= maxWH && size >= minWH)) {
        size = prompt('? x ?');
    }
    return size;
}

// --------------- //
// START SKETCHING //
// --------------- //

//start sketching...
function startSketch() {
    //get width/height...
    //TODO getWH() uncomment after debug
    // getWH();
    //generate grid...
    //TODO 40 --> size after debug
    genGrid(50);
    //initiate draw...
    initDraw();
}

let start = startSketch();