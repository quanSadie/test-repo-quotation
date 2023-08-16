                        // multiple quantity --------------------------------
let rowCounter_quantity = 0;

const addQuantityButton = document.getElementById("add_row_quantity_btn");

addQuantityButton.addEventListener("click", function() {

        // ------------ Take quantity ---------------
        // Get the input element

        // quantity
        const quantity_input_1 = document.getElementById("quantityPerDesign");

        // Get the td quantity
        const quantityCell = document.getElementById("quantity_cell");

        // Create a new table row
        // Set the appropriate IDs for the inputs in the new row
        const newQuantityId = "quantityPerDesign" + (rowCounter_quantity + 1);

        // Create the input elements with the assigned IDs
        const newQuantityInput = document.createElement("input");
        newQuantityInput.id = newQuantityId;
        newQuantityInput.className = "form-control";
        newQuantityInput.type = "text";
        newQuantityInput.name = "";

        // Create and append the inputs
        quantityCell.appendChild(newQuantityInput);
        $('#numbers_of_quantity').val(rowCounter_quantity + 2);
        // Increment the row counter
        rowCounter_quantity++;

});
// multiple quantity --------------------------------