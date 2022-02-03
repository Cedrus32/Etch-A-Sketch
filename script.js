// ------------ //
// DRAW EFFECTS //
// ------------ //

//...erase color
function drawErase(e) {
    e.target.style.backgroundColor = '';
}

//...clear grid & reset draw...
function clearGrid() {
    btns.forEach(btn => btn.setAttribute('class', ''));
    gridItems.forEach(gridItem => {
        gridItem.style.backgroundColor = '';
        gridItem.removeEventListener('mouseenter', startDraw);
    });
    gridContainer.classList.remove('drawOn');
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

// --------------- //
// LISTEN FOR DRAW //
// --------------- //

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
    gridContainer.classList.toggle('drawOn');
    drawOn = gridContainer.classList.contains('drawOn');
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
        
        //check if draw is truthy/falsey...
        if (drawOn === false) {
            gridItems.forEach(gridItem => {
                gridItem.addEventListener('mouseenter', startDraw);
            });
            toggleDraw();
        } else if (drawOn === true) {
            gridItems.forEach(gridItem => {
                gridItem.removeEventListener('mouseenter', startDraw);
            });
            toggleDraw();
        }
    });
}

const btns = document.querySelectorAll('button');
function selectButton(btnNum) {
    btns.forEach(btn => btn.setAttribute('class', ''));
    btns[btnNum].classList.add('btnOn');
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
        selectButton(0);
    });
    
    //listen for picker & draw in picker color...
    btnPicker.addEventListener('click', () => {
        mode = 'picker';
        color = '"white"';
        selectButton(1);
    });

    //listen for rainbow & draw in rainbow color...
    btnRainbow.addEventListener('click', () => {
        mode = 'rainbow';
        color = '"red"';
        selectButton(2);
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

// ----------------- //
// CREATE GRID ITEMS //
// ----------------- //

///...layout grid structure
function layoutGrid(gridWH, itemSize) {
    gridContainer.style.gridTemplateColumns = `repeat(${gridWH}, ${itemSize}px)`;
    gridContainer.style.gridTemplateRows = `repeat(${gridWH}, ${itemSize}px)`;
}

//...clear grid items
function clearItems() {
    while (gridContainer.firstChild) {
        gridContainer.removeChild(gridContainer.firstChild);
    }
}

//...create grid items & capture gridItem nodeList...
function createItems() {
    clearItems();
    itemSize = (500 / gridWH);
    gridSize = (gridWH ** 2);
    for (let i = 1; i <= gridSize; i++) {
        //create gridItems
        let gridItem = document.createElement('div');
        gridItem.classList.add('grid-item');
        gridItem.addEventListener('click', startDraw);
        //append gridItem to gridContainer
        gridContainer.appendChild(gridItem);
    }
    gridItems = gridContainer.querySelectorAll('div.grid-item');
    return gridItems;
}

// ---------------------------------------- //
// CREATE INITIAL GRID, LISTEN FOR NEW GRID //
// ---------------------------------------- //

const gridContainer = document.querySelector('div.grid-container');
const sizeInput = document.querySelector('#size-input'); //from slider
const sliderThumb = document.querySelector('input.slider::-webkit-slider-thumb');
let gridWH = Number(sizeInput.value); //# items >>/vv
let itemSize;

//...listen for new size...
sizeInput.addEventListener('mouseup', () => {
    // use slider to get size
    gridWH = Number(sizeInput.value);
    // create gridItems, append to gridContainer...
    createItems(gridWH);
    //layout items in grid...
    layoutGrid(gridWH, itemSize);
    //initiate draw...
});

//...generate initial grid...
function genGrid() {
    gridWH = sizeInput.value;
    createItems(gridWH);
    layoutGrid(gridWH, itemSize);
}

// --------------- //
// START SKETCHING //
// --------------- //

genGrid();
initDraw();