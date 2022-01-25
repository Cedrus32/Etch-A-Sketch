// ------------- //
// GENERATE GRID //
// ------------- //

const gridContainer = document.querySelector('div.grid-container');
function genGrid() {
    // TODO allow user input for size of grid
    for (let i=1; i<=16; i++) {
        // create grid item
        const gridItem = document.createElement('div');
        gridItem.classList.add('grid-item');
        gridItem.textContent = i;
        console.log(gridItem);
        //append grid item to grid container
        gridContainer.appendChild(gridItem);
        console.log(gridContainer);
    }
}
// ----------- //
// INIT SCRIPT //
// ----------- //

let start = genGrid()
