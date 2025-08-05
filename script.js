// Global variables to store the calculated values for use in other functions
let yBoxValue = null;
let xBoxValue = null;
let lowestYValue = null;
let lowestXValue = null;

function calculateY() {
    const highest = parseFloat(document.getElementById("yHighest").value);
    const lowest = parseFloat(document.getElementById("yLowest").value);
    const boxes = parseFloat(document.getElementById("yBoxes").value);
    const resultP = document.getElementById("yResult");

    if (!isNaN(highest) && !isNaN(lowest) && !isNaN(boxes) && boxes !== 0) {
        const value = (highest - lowest) / boxes;
        // Store calculated values globally
        yBoxValue = value;
        lowestYValue = lowest;
        
        resultP.textContent = `Value of 1 Box (Y-axis): ${value.toFixed(4)}`;
        resultP.className = "text-green-600 font-medium"; // Set class for success
    } else {
        resultP.textContent = "⚠️ Please enter valid numbers.";
        resultP.className = "text-red-500 font-medium"; // Set class for error
        // Reset global values on error
        yBoxValue = null;
        lowestYValue = null;
    }
}

function calculateX() {
    const highest = parseFloat(document.getElementById("xHighest").value);
    const lowest = parseFloat(document.getElementById("xLowest").value);
    const boxes = parseFloat(document.getElementById("xBoxes").value);
    const resultP = document.getElementById("xResult");

    if (!isNaN(highest) && !isNaN(lowest) && !isNaN(boxes) && boxes !== 0) {
        const value = (highest - lowest) / boxes;
        // Store calculated values globally
        xBoxValue = value;
        lowestXValue = lowest;
        
        resultP.textContent = `Value of 1 Box (X-axis): ${value.toFixed(4)}`;
        resultP.className = "text-green-600 font-medium"; // Set class for success
    } else {
        resultP.textContent = "⚠️ Please enter valid numbers.";
        resultP.className = "text-red-500 font-medium"; // Set class for error
        // Reset global values on error
        xBoxValue = null;
        lowestXValue = null;
    }
}

function addPoint() {
    const xCoordInput = document.getElementById("newXCoord");
    const yCoordInput = document.getElementById("newYCoord");
    const errorP = document.getElementById("pointError");
    const tableBody = document.getElementById("coordTableBody");

    // Clear previous error message
    errorP.textContent = '';

    // 1. Validate that axis values have been calculated first
    if (yBoxValue === null || xBoxValue === null) {
        errorP.textContent = "⚠️ Please calculate both X and Y axis values first.";
        return;
    }

    // 2. Get and validate new coordinate inputs
    const xCoord = parseFloat(xCoordInput.value);
    const yCoord = parseFloat(yCoordInput.value);

    if (isNaN(xCoord) || isNaN(yCoord)) {
        errorP.textContent = "⚠️ Please enter valid numbers for the coordinates.";
        return;
    }

    // 3. Calculate the number of boxes needed for each coordinate
    // Formula: (Coordinate - Lowest Axis Value) / Value per Box
    const yBoxesNeeded = (yCoord - lowestYValue) / yBoxValue;
    const xBoxesNeeded = (xCoord - lowestXValue) / xBoxValue;

    // 4. Create and append the new row to the table
    const newRow = tableBody.insertRow(); // Creates a new <tr> element
    newRow.innerHTML = `
        <td class="border px-4 py-2">${xCoord}</td>
        <td class="border px-4 py-2">${yCoord}</td>
        <td class="border px-4 py-2">${xBoxesNeeded.toFixed(2)}</td>
        <td class="border px-4 py-2">${yBoxesNeeded.toFixed(2)}</td>
    `;
    
    // 5. Clear input fields for the next entry and focus on the first one
    xCoordInput.value = '';
    yCoordInput.value = '';
    xCoordInput.focus();
}

function clearTable() {
    document.getElementById("coordTableBody").innerHTML = '';
    document.getElementById("pointError").textContent = ''; // Also clear any lingering error messages
}