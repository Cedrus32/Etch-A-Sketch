// ------------------------- //
// LISTEN FOR DRAW & EFFECTS //
// ------------------------- //

//...erase color
function drawErase() {
    gridItems.forEach(div => div.addEventListener('mouseenter', () => {
        div.style.backgroundColor = '';
    }));
}

//...clear grid & reset draw...
function clearGrid() {
    //set all gridItem BGs to ''
    gridItems.forEach(div => div.style.backgroundColor = '');
    //reset gridContainer class list
    gridContainer.setAttribute('class', 'grid-container')
    drawOn = false;
    //stop listening for draw mode switch-case on mouseover --> erase
    gridContainer.removeEventListener('mouseover', startDraw);
    drawErase();

    console.log(mode);
    console.log(color);
    console.log(drawOn);
}

//...draw in rainbow color
function drawRainbow() {
    gridItems.forEach(div => div.addEventListener('mouseenter', () => {
        div.style.backgroundColor = 'red';
    }));
}

//...draw in picker color
function drawPicker() {
    gridItems.forEach(div => div.addEventListener('mouseenter', () => {
        div.style.backgroundColor = 'white';
    }));
}

//...switch-case on mouseover...
function startDraw() {
    switch (mode) {
        case 'picker':
            drawPicker();
            break;
        case 'rainbow':
            drawRainbow();
    }
}

//...toggle draw
function toggleDraw() {
    gridContainer.classList.toggle('draw');
    drawOn = gridContainer.classList.contains('draw');
    return drawOn
}

//...check draw on...
let mode;
let color;
let drawOn;
let clear;
function checkDrawOn() {
    gridContainer.addEventListener('click', () => {
        //toggle draw class...
        toggleDraw();
    
        console.log(mode);
        console.log(color);
        console.log(drawOn);

        //check if draw is truthy/falsey...
        if (drawOn === true) {
            //listen for draw mode switch-case on mouseover --> draw
            gridContainer.addEventListener('mouseover', startDraw);
        } else if (drawOn === false) {
            //stop listening for draw mode switch-case on mouseover --> erase
            gridContainer.removeEventListener('mouseover', startDraw);
            drawErase();
        }
    });
}

//...listen for draw effects...
const btnPicker = document.querySelector('#picker');
const btnRainbow = document.querySelector('#rainbow');
const btnClear = document.querySelector('#clear');
function listenForEffects() {
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
        // mode = 'clear';
        // color = '';
        clearGrid();
    });
}

//...initiate draw...
function initDraw() {
    //listen for draw effects...
    listenForEffects();
    //toggle draw...
    checkDrawOn();
}

// ------------- //
// GENERATE GRID //
// ------------- //

//...draw grid elements & capture gridItem nodeList
function drawGrid(size) {
    let gridSize = (size ** 2);
    for (let i = 1; i <= gridSize; i++) {
        //create gridItem
        const gridItem = document.createElement('div');
        gridItem.classList.add('grid-item');
        //append gridItem to gridContainer
        gridContainer.appendChild(gridItem);
    }
    gridItems = gridContainer.querySelectorAll('div.grid-item');
    return gridItems;
}

//...layout grid structure
const layoutGrid = (size) => {
    gridContainer.style.gridTemplateColumns = `repeat(${size}, 10px)`;
    gridContainer.style.gridTemplateRows = `repeat(${size}, 10px)`;
}

//...generate grid...
const gridContainer = document.querySelector('div.grid-container');
function genGrid(size) {
    //layout grid...
    layoutGrid(size);
    //draw grid...
    drawGrid(size);
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
    getWH();
    //generate grid...
    genGrid(size);
    //initiate draw...
    initDraw();
}

let start = startSketch();