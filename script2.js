// start sketch
    ////get WH
    ////generate grid
        ////layout grid
        ////draw grid
    //listen for draw effects
        //listen for picker click
            //listen for gridItem mouseover --> color picker
                // add class
        //listen for rainbow click
            //listen for gridItem mouseover --> color rainbow
        // listen for clear click
            //reset class list (remove bg classes)
        //switch
            //case 'picker'
            //case 'rainbow'
            //case 'clear'

// ------------------------- //
// LISTEN FOR DRAW & EFFECTS //
// ------------------------- //

//...clear grid
function clearGrid() {
    gridItems.forEach(div => div.style.backgroundColor = 'transparent');
}

//...erase
function drawErase() {
    gridItems.forEach(div => div.addEventListener('mouseenter', () => {
        div.style.backgroundColor = 'transparent';
    }));
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

function startDraw() {
    console.log('mouseover')
    switch (mode) {
        case 'picker':
            console.log(mode);
            drawPicker();
            break;
        case 'rainbow':
            console.log(mode);
            drawRainbow();
    }
}

//...toggle draw...
function toggleDraw() {
    gridContainer.addEventListener('click', () => {
        //toggle gridContainer.draw
        gridContainer.classList.toggle('draw')
        let drawOn = gridContainer.classList.contains('draw');
        console.log(gridContainer.classList);
    
        //check if draw is truthy/falsey...
        if (drawOn === true) {
            //listen for draw mode switch-case on mouseover
            gridContainer.addEventListener('mouseover', startDraw);
        } else if (drawOn === false) {
            //stop listening for draw mode switch-case on mouseover
            gridContainer.removeEventListener('mouseover', startDraw);
            //TODO removeEventListener from gridItems
            gridItems.forEach(div => div.addEventListener('mouseenter', () => {
                //TODO stops coloring, but also erases existing color
                //TODO add conditional to check if div already has bg styling?
                //TODO if yes --> skip, else if no --> run as normal
                div.style.backgroundColor = '';
            }));
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
    //listen for clear & clear grid...
    btnClear.addEventListener('click', () => {
        // mode = 'clear';
        // color = '"transparent"';
        clearGrid();
        gridContainer.removeEventListener('mouseover', startDraw);
    });
}

//...listen for draw
let mode;
let color;
function listenForDraw() {
    //listen for draw effects...
    listenForEffects();
    //toggle draw...
    toggleDraw();
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
    //TODO uncomment after debug
    // getWH();
    //generate grid...
    //TODO 40 --> size after debug
    genGrid(40);
    //listen for effects...
    listenForDraw();
    //TODO might need to add a while loop to continuously check on each click?
}

let start = startSketch();