// ------------- //
// GENERATE GRID //
// ------------- //

const gridContainer = document.querySelector('div.grid-container');
//...generate grid
function genGrid(userInput) {
    let gridSize = (userInput ** 2)
    // TODO allow user input for size of grid
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
    gridContainer.style.grid = '50px';
}
// ----------- //
// INIT SCRIPT //
// ----------- //

//get input
let size = prompt('? x ?');
//generate grid...
let start = genGrid(size)
