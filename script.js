// Global variables to store the calculated axis scale and origin values
let yBoxValue = null;
let xBoxValue = null;
let lowestYValue = null;
let lowestXValue = null;

/**
 * Calculates the value of a single box on the Y-axis.
 */
function calculateY() {
    const highest = parseFloat(document.getElementById("yHighest").value);
    const lowest = parseFloat(document.getElementById("yLowest").value);
    const boxes = parseFloat(document.getElementById("yBoxes").value);
    const resultP = document.getElementById("yResult");

    if (!isNaN(highest) && !isNaN(lowest) && !isNaN(boxes) && boxes > 0) {
        const value = (highest - lowest) / boxes;
        // Store calculated values globally
        yBoxValue = value;
        lowestYValue = lowest;
        
        resultP.textContent = `Value of 1 Y-Box: ${value.toFixed(4)}`;
        resultP.className = "text-green-600 font-medium text-center mt-2";
    } else {
        resultP.textContent = "⚠️ Please enter valid, positive numbers.";
        resultP.className = "text-red-500 font-medium text-center mt-2";
        // Reset global values on error
        yBoxValue = null;
        lowestYValue = null;
    }
}

/**
 * Calculates the value of a single box on the X-axis.
 */
function calculateX() {
    const highest = parseFloat(document.getElementById("xHighest").value);
    const lowest = parseFloat(document.getElementById("xLowest").value);
    const boxes = parseFloat(document.getElementById("xBoxes").value);
    const resultP = document.getElementById("xResult");

    if (!isNaN(highest) && !isNaN(lowest) && !isNaN(boxes) && boxes > 0) {
        const value = (highest - lowest) / boxes;
        // Store calculated values globally
        xBoxValue = value;
        lowestXValue = lowest;
        
        resultP.textContent = `Value of 1 X-Box: ${value.toFixed(4)}`;
        resultP.className = "text-green-600 font-medium text-center mt-2";
    } else {
        resultP.textContent = "⚠️ Please enter valid, positive numbers.";
        resultP.className = "text-red-500 font-medium text-center mt-2";
        // Reset global values on error
        xBoxValue = null;
        lowestXValue = null;
    }
}

/**
 * Calculates the box position for a given coordinate and adds it to the table.
 */
function addPoint() {
    const xCoordInput = document.getElementById("newXCoord");
    const yCoordInput = document.getElementById("newYCoord");
    const errorP = document.getElementById("pointError");
    const tableBody = document.getElementById("coordTableBody");

    errorP.textContent = ''; // Clear previous error message

    // 1. Validate that axis scales have been calculated first
    if (yBoxValue === null || xBoxValue === null) {
        errorP.textContent = "⚠️ Please calculate both X and Y axis scales first.";
        return;
    }

    // 2. Get and validate new coordinate inputs
    const xCoord = parseFloat(xCoordInput.value);
    const yCoord = parseFloat(yCoordInput.value);

    if (isNaN(xCoord) || isNaN(yCoord)) {
        errorP.textContent = "⚠️ Please enter valid numbers for the coordinates.";
        return;
    }

    // 3. Calculate the number of boxes from the origin for each coordinate
    // Formula: Boxes = (Coordinate - OriginValue) / ValuePerBox
    const xBoxesNeeded = (xCoord - lowestXValue) / xBoxValue;
    const yBoxesNeeded = (yCoord - lowestYValue) / yBoxValue;

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

/**
 * Clears all entries from the coordinate table.
 */
function clearTable() {
    document.getElementById("coordTableBody").innerHTML = '';
    document.getElementById("pointError").textContent = ''; // Also clear any lingering error messages
}

/**
 * Calculates the X and Y coordinates based on the number of boxes from the origin.
 * This is the reverse of the addPoint calculation.
 */
function calculateCoordinatesFromBoxes() {
    const xBoxesInput = document.getElementById("xBoxesInput");
    const yBoxesInput = document.getElementById("yBoxesInput");
    const resultP = document.getElementById("coordResult");

    resultP.textContent = ''; // Clear previous result/error

    // 1. Validate that axis scales have been calculated first
    if (yBoxValue === null || xBoxValue === null) {
        resultP.textContent = "⚠️ Please calculate both X and Y axis scales first.";
        resultP.className = "text-red-500 font-medium mt-2 text-center";
        return;
    }

    // 2. Get and validate the number of boxes from input
    const numXBoxes = parseFloat(xBoxesInput.value);
    const numYBoxes = parseFloat(yBoxesInput.value);

    if (isNaN(numXBoxes) || isNaN(numYBoxes)) {
        resultP.textContent = "⚠️ Please enter valid numbers for the boxes.";
        resultP.className = "text-red-500 font-medium mt-2 text-center";
        return;
    }

    // 3. Calculate the coordinates using the reverse formula
    // Formula: Coordinate = (NumberOfBoxes * ValuePerBox) + OriginValue
    const calculatedX = (numXBoxes * xBoxValue) + lowestXValue;
    const calculatedY = (numYBoxes * yBoxValue) + lowestYValue;

    // 4. Display the result
    resultP.textContent = `Coordinates: (X: ${calculatedX.toFixed(4)}, Y: ${calculatedY.toFixed(4)})`;
    resultP.className = "text-green-600 font-medium mt-2 text-center";
}
