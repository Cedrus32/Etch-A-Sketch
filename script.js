//TODO deselect buttons when changing grid size

// ------------ //
// DRAW EFFECTS //
// ------------ //

let color;
let colors = ['#000000',
        '#A69C8A',
        '#FFFEE1',
        '#322A91',
        '#9166F1',
        '#6A2E32',
        '#B43330',
        '#BC4DA3',
        '#D9747A',
        '#E893D2',
        '#4B3C26',
        '#514F43',
        '#A16529',
        '#EBBB97',
        '#AA9E46',
        '#DA5425',
        '#E68C3B',
        '#EFB741',
        '#FFE06D',
        '#3A4743',
        '#2B5D37',
        '#5E8628',
        '#B7CB40',
        '#3B7E7D',
        '#5ABFA6',
        '#3259ED',
        '#202629',
        '#2E5670',
        '#65A0CF',
        '#C8DAD0',
]

//...select random color from colors[]
function getRandColor() {
    color = colors[Math.floor(Math.random() * colors.length)]
}

//...draw in rainbow color...
function drawRainbow(e) {
    getRandColor();
    e.target.style.backgroundColor = color;
}

//...draw in picker color...
function drawPicker(e) {
    e.target.style.backgroundColor = color;
}

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

// --------------- //
// LISTEN FOR DRAW //
// --------------- //

//...switch-case on mouseover...
function startDraw(e) {
    switch (mode) {
        case 'picker':
            if (!(color === '')) {
                drawPicker(e);
            }
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
// let color;
let drawOn = false;
// let clear;
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

//...toggle pickerCell highlight
let cellArray = [];
function togglePickerHL() {
    pickerTable.addEventListener('click', (e) => {
            //load targets into cellArray
            cellArray.unshift(e.target);
            if (cellArray.length === 1) {
                //toggle first target
                cellArray[0].classList.toggle('colorOn');
            } else if (cellArray.length === 2) {
                //target first/second targets
                cellArray[0].classList.toggle('colorOn');
                cellArray[1].classList.toggle('colorOn');
                cellArray.pop();
            }
        });
}

//...select button
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
        selectButton(0);
        pickerContainer.classList.add('hide');
    });
    
    //listen for picker & draw in picker color...
    btnPicker.addEventListener('click', () => {
        mode = 'picker';
        selectButton(1);
        color = '';
        pickerContainer.setAttribute('class', '');
    });

    //listen for rainbow & draw in rainbow color...
    btnRainbow.addEventListener('click', () => {
        mode = 'rainbow';
        selectButton(2);
        pickerContainer.classList.add('hide');
    });
    
    //listen for clear & clear grid/reset draw...
    btnClear.addEventListener('click', () => {
        clearGrid();
        pickerContainer.classList.add('hide');
    });
}

//...initiate draw...
function initDraw() {
    //listen for draw effects...
    getMode();
    //toggle pickerCell highlight...
    togglePickerHL();
    //toggle draw...
    checkDrawOn();
}

// ------------------- //
// CREATE PICKER TABLE //
// ------------------- //

//...create picker table...
const pickerContainer = document.querySelector('div.picker');
pickerContainer.classList.add('hide');
const pickerTable = document.querySelector('tr');
let pickerCells;
function createPickerTable() {
    for (let i = 0; i < colors.length; i++) {
        let pickerCell = document.createElement('td');
        pickerCell.style.backgroundColor = colors[i];
        pickerCell.addEventListener('click', (e) => {
            //get picker color
            color = e.target.style.backgroundColor;
        });
        pickerTable.appendChild(pickerCell);
    }
    pickerCells = pickerTable.querySelectorAll('td');
    return pickerCells;
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
    //clear interface selection...
    //reset buttons
    btns.forEach(btn => btn.setAttribute('class', ''));
    //reset drawOn
    gridContainer.classList.remove('drawOn');
    drawOn = false;
    //reset picker color & highlight
    color = '';
    pickerCells = pickerTable.querySelectorAll('td');
    pickerCells.forEach(td => td.setAttribute('class', ''));
    pickerContainer.classList.add('hide');
});

//...generate initial grid...
function genGrid() {
    gridWH = sizeInput.value;
    createItems(gridWH);
    layoutGrid(gridWH, itemSize);
    createPickerTable();
}

// --------------- //
// START SKETCHING //
// --------------- //

genGrid();
initDraw();