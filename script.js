// ------------- //
// DRAW EFFECTS //
// ------------- //

// TODO include rainbow draw
// TODO include color picker

function changeBG() {
    switch (colorMode) {
        case 'rainbow':
            gridItems.forEach(div => div.addEventListener('mouseover', () => {
                div.classList.add('red-bg');
                // div.style.backgroundColor = 'red';
            }));
            break;
        case '':
            gridItems.forEach(div => div.addEventListener('mouseover', () => {
                div.classList.add('white-bg');
                // div.style.backgroundColor = 'white';
            }));
    }
    // gridItems.forEach(div => div.addEventListener('mouseover', () => {
    //     div.classList.add('change-bg');
    // }));
}

function stopChangeBG() {
    gridContainer.removeEventListener('mouseover', changeBG);
    // gridItems.forEach(div => div.addEventListener('mouseenter', () => {
    //     div.style.backgroundColor = '';
    // }));
}

function startChangeBG() {
    gridContainer.addEventListener('mouseover', changeBG);
    // gridItems.forEach(div => div.addEventListener('mouseenter', () => {
    //     div.style.backgroundColor = 'pink';
    // }));
}

function clearGrid() {
    gridItems.forEach(div => div.setAttribute('class', 'grid-item'));
    // gridItems.forEach(div => () => {
    //     div.style.backgroundColor = '';
    // });
    gridContainer.setAttribute('class', 'grid-container');
    console.log(false);
}

let colorMode;
//listen for effects...
function listenForEffects() {
    //listen for container click...
    gridContainer.addEventListener('click', () => {
        gridContainer.classList.toggle('draw-on');
        // let classListLength = gridContainer.classList.length;
        let drawOn = gridContainer.classList.contains('draw-on');
        switch (drawOn) {
            case true:
                console.log(drawOn);
                startChangeBG(colorMode);
                break;
            case false:
                //TODO removeEventListener does not work
                console.log(drawOn);
                stopChangeBG(colorMode);
        }
    });

    const btnPicker = document.querySelector('#picker');
    //listen for picker...
    btnPicker.addEventListener('click', () => {
        colorMode = '';
        console.log(colorMode);
    });

    //TODO colorMode does not work
    const btnRainbow = document.querySelector('#rainbow');
    //listen for rainbow...
    btnRainbow.addEventListener('click', () => {
        colorMode += 'rainbow';
        console.log(colorMode);
    });

    const btnClear = document.querySelector('#clear');
    //listen for clear...
    btnClear.addEventListener('click', clearGrid);
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
    //add effects...
    listenForEffects();
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
