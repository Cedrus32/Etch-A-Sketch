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

// ------------ //
// DRAW EFFECTS //
// ------------ //

//...clear grid
function clearGrid() {
    // gridItems.forEach(div => div.setAttribute('class', 'grid-item'));
    gridItems.forEach(div => div.style.backgroundColor = 'transparent');
}

//...draw in rainbow color
function drawRainbow() {
    gridItems.forEach(div => div.addEventListener('mouseenter', () => {
        // div.classList.add('rainbow-bg');
        div.style.backgroundColor = 'red';
    }));
}

//...draw in picker color
function drawPicker() {
    gridItems.forEach(div => div.addEventListener('mouseenter', () => {
        // div.classList.add('picker-bg');
        div.style.backgroundColor = 'white';
    }));
}

//...listen for effects...
const btnPicker = document.querySelector('#picker');
const btnRainbow = document.querySelector('#rainbow');
const btnClear = document.querySelector('#clear');
let mode;
function listenForEffects() {
    //listen for picker & draw in picker color...
    btnPicker.addEventListener('click', () => {
        mode = 'picker'
        console.log(mode);
        drawPicker();
    });
    //listen for rainbow & draw in rainbow color...
    btnRainbow.addEventListener('click', () => {
        mode = 'rainbow';
        console.log(mode);
        drawRainbow();
    });
    //listen for clear & clear grid...
    btnClear.addEventListener('click', () => {
        mode = 'clear';
        console.log(mode);
        clearGrid();
    });
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
    listenForEffects();
}

let start = startSketch();