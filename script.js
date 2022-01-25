// ------------- //
// GENERATE GRID //
// ------------- //

let gridItems;
//...draw grid elements & create array of grid items
function drawGrid(gridWH) {
    let gridSize = (gridWH ** 2)
    for (let i=1; i<=gridSize; i++) {
        // create grid item
        const gridItem = document.createElement('div');
        gridItem.classList.add('grid-item');
        gridItem.textContent = i;
        //append grid item to grid container
        gridContainer.appendChild(gridItem);
        // gridItems.push(gridItem);
    }
    console.log(gridContainer);
    const gridItems = gridContainer.querySelectorAll('div.grid-item');
    console.log(gridItems);
}

//...layout grid structure
const layoutGrid = (gridWH) => {
    gridContainer.style.gridTemplateColumns = `repeat(${gridWH}, 50px)`;
    gridContainer.style.gridTemplateRows = `repeat(${gridWH}, 50px)`;
}

const gridContainer = document.querySelector('div.grid-container');
//...generate grid
function genGrid(userInput) {
    //layout grid...
    layoutGrid(userInput);
    //draw grid...
    drawGrid(userInput);
}

// ------------ //
// HOVER EFFECT //
// ------------ //

// function changeBG(e) {
//     //TODO change bg
//     e.classList.add('change-bg');
// }

// gridItems.forEach(div => div.addEventListener('mouseover', (e) => {
//     console.log(e);
// }));

// ----------- //
// INIT SCRIPT //
// ----------- //

//get input
let size = prompt('? x ?');
//generate grid...
let start = genGrid(size)
