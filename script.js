// ------------- //
// GENERATE GRID //
// ------------- //

function drawGrid(gridWH) {
    let gridSize = (gridWH ** 2)
    for (let i=1; i<=gridSize; i++) {
        // create grid item
        const gridItem = document.createElement('div');
        gridItem.classList.add('grid-item');
        gridItem.textContent = i;
        console.log(gridItem);
        //append grid item to grid container
        gridContainer.appendChild(gridItem);
        console.log(gridContainer);
    }
    // gridContainer.style.grid = '50px';
}

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

// ----------- //
// INIT SCRIPT //
// ----------- //

//get input
let size = prompt('? x ?');
//generate grid...
let start = genGrid(size)
