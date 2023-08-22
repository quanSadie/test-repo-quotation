// disable menu click
// Disable click event for the menu button
document.getElementById('dropdownMenuButton').addEventListener('click', function(event) {
    event.preventDefault();
});

var tab_clickCount = 0;


$("#calculateallprice").click(function () {
  // Trigger the calculations first
  if ($("#totalDesigns").val() != null && $("#totalDesigns").val() != "") {
      generateTabsAndTables();


      $("#calculateprice").click();
      $("#calculatefinishing").click();


      // Scroll to the calculation table
      document.getElementById('calculationtable').scrollIntoView();

      // Trigger the calculations again (if needed)
      $("#calculateprice").click();
      $("#calculatefinishing").click();
  } else {
        alert("Please enter Total Designs");
      }

});


$( "#saveDraft" ).click(function() {
    // set tilte here
    $("#hiddentitle").val($("#drafttitle").val());
    $("#hiddendate").val($("#deliveryDate").val());
	$("#draftFormSubmit").click();
});

// Rest of your code remains the same


  function generateTabsAndTables() {


    const quantityPerDesign_quantity_arr = [];
    quantityPerDesign_quantity_arr.push($('#quantityPerDesign').val());
    var quantityPerDesign_quantity = $('#numbers_of_quantity').val();

    // quantity starts with 0, means that first one is quantityPerDesign, second one is quantityPerDesign1, ... so forth
    			    for (var q = 0; q < quantityPerDesign_quantity; q++) {
                        var quantity_order = "quantityPerDesign";
                        if (q > 0) {
                            quantity_order = "quantityPerDesign" + q;
                            if ($('#' + quantity_order).val() != 0 && $('#' + quantity_order).val() != null && $('#' + quantity_order).val() != '') {
                                quantityPerDesign_quantity_arr.push($('#' + quantity_order).val())
                            }
                        }
    			    }


    const tabs = $("#tabs");
    const tabsList = $("#tabs-list");
    const tableContainer = $("#table-container");

    if (tab_clickCount > 0) {
        console.log('click count: ' + tab_clickCount);
        tabs.tabs("destroy");
    }

    tabsList.empty();
    tableContainer.empty();


    // Loop through the quantity array
    quantityPerDesign_quantity_arr.forEach((quantity, index) => {
      // Increment the index by 1 to get the correct tab number
      const tabNumber = index + 1;

      // Create the tab list item
      const tabListItem = $("<li style='font-weight: bold; font-size: 1.5rem;'></li>").html(`<a href="#tabs-${tabNumber}">Quantity: ${quantity}</a>`);
      tabsList.append(tabListItem);

      // Create the table div with the corresponding ID
      const tableDiv = $(`<div id="tabs-${tabNumber}"></div>`);
      var index_convert = index == 0 ? '' : index;

      tableDiv.html(`
                         <div id="calculationtable${index_convert}" class="row">
      						<div class="col-sm-12">
      							<div class="tableWrapper custom-scrollbar">
                                            <table class="table CalculationTable">
                                              <tr id="calculationTableHead${index_convert}">
                                              										<td class="finishingPropsHead-print">Paper type:</td>
                                              										<td class="finishingPropsHead-print" id="finalPaperCategory${index_convert}"
                                              											style="text-decoration: underline;"></td>
                                              										<td class="finishingPropsHead-print">Paper Size</td>
                                              										<td class="finishingPropsHead-print">Max Ups Per Paper</td>
                                              										<td class="finishingPropsHead-print">Ups After Cut/Book ups</td>
                                              										<td class="finishingPropsHead-print">Horizontal Ups</td>
                                              										<td class="finishingPropsHead-print">Vertical Ups</td>
                                              										<td class="finishingPropsHead-print">Plates Needed</td>
                                              										<td class="finishingPropsHead-print">Plates Cost</td>
                                              										<td class="finishingPropsHead-print">Paper Needed</td>
                                              										<td class="finishingPropsHead-print">Paper Cost</td>
                                              										<td class="finishingPropsHead-print">Testing Paper Needed For
                                              											Print</td>
                                              										<td class="finishingPropsHead-print">Testing Paper Cost (Print)</td>
                                              										<td class="finishingPropsHead-print">Total Paper Needed</td>
                                              										<td class="finishingPropsHead-print">Total Paper Cost</td>
                                              										<td class="finishingPropsHead-print">Printing Cost</td>
                                              										<td class="finishingPropsHead-print">Extra Plate Cost (Over
                                              											64,000)</td>
                                              										<td class="finishingPropsHead-print">Cut Amount</td>
                                              										<td class="finishingPropsHead-print">Cutting Cost</td>
                                              										<td class="finishingPropsHead-print">Testing Paper For Finishing</td>
                                              										<td class="finishingPropsHead-print">Testing Paper Cost (Finishing)</td>
                                              										<td class="finishingPropsHead-print">Total Cost (RM)</td>
                                              										<td class="finishingPropsHead-print">Rounded Up Paper Amount</td>
                                              										<td class="finishingPropsHead-print">Rounded Up Rims Needed</td>
                                              										<td class="finishingPropsHead-print">Rounded Up Paper Cost</td>
                                              										<td class="finishingPropsHead-print">Rounded Up Price</td>
                                              									</tr>
                                              									<!-- ------------------ Paper type display starts ------------------ -->
                                              									<!-- Paper type #1 onwards -->

                                              									<!-- ------------------ Paper type display ends ------------------ -->
                                              									<tr id="digitalprintpaper${index_convert}">
                                              										<th class="finishingPropsHead-print">Digital print</th>
                                              									</tr>
                                            </table>
              							</div>
              						</div>
                            </div>


                             <div class="col-sm-12">
        						<input type="hidden" id="paperneededlowest${index_convert}" />
        						<input type="hidden" id="upsaftercutLowest${index_convert}" />
        						<input type="hidden" id="lengthaftercuthidden${index_convert}" />
        						<input type="hidden" id="InchesSquareAfterCuthidden${index_convert}" />
        						<div>
        							<table class="table suggestingPropsTable">
        								<caption>Printing</caption>
        								<tr>
        									<th class="finishingPropsHead-print">Lowest Cost Found (RM)</th>
        									<td id="lowestCostFound${index_convert}"></td>
        									<th style="color: skyblue; text-decoration: underline;">Quantity</th>
        									<td style="color: skyblue; text-decoration: underline;" id="suggestionQuantity${index_convert}"></td>
        									<th class="finishingPropsHead-print">Rounded Up Price</th>
        									<td id="suggestionRoundedPrice${index_convert}"></td>
        								</tr>
        								<tr>
        									<th class="finishingPropsHead-print">Paper Used</th>
        									<td id="suggestionPaperUsed${index_convert}"></td>
        									<th class="finishingPropsHead-print">Color</th>
        									<td id="suggestionColor${index_convert}"></td>
        								</tr>
        								<tr>
        									<th class="finishingPropsHead-print">Print Type</th>
        									<td id="printTechnique${index_convert}"></td>
        									<th class="finishingPropsHead-print">Size</th>
        									<td id="suggestionSize${index_convert}"></td>
        								</tr>
        								<tr>
        									<th class="finishingPropsHead-print">Actual Up Per Paper</th>
        									<td id="suggestionActualUp${index_convert}"></td>
        									<th class="finishingPropsHead-print">Cut Price</th>
        									<td id="suggestionCutPrice${index_convert}"></td>
        								</tr>
        							</table>
        						</div>
        					</div>


        					<div class="col-sm-12">
                            				<div>
                            					<table class="table suggestingPropsTable">
                            						<caption>Finishing</caption>
                            						<thead>
                            							<tr>
                            								<th class="finishingPropsHead-print">Types</th>
                            								<th class="finishingPropsHead-print">Price</th>
                            								<th class="finishingPropsHead-print">Print Type</th>
                            							</tr>
                            						</thead>

                            						<tbody>
                            							<tr id="finishingtableresult${index_convert}">
                            							</tr>
                            						</tbody>

                            					</table>
                            				</div>
                            			</div>

                         <hr>

                         			<div class="col-sm-12">
                         				<table class="table table-striped">
                         					<tr style="background: #999999;">
                         						<td><h2 style="font-weight: bold;">Total Price</h2></td>
                         						<td><h2 id="totalpricesum${index_convert}"></h2></td>
                         						<td><h2>RM</h2></td>
                         					</tr>
                         					<tr style="background: #999999;">
                         						<td><h2 style="font-weight: bold;">Total Rounded Up Price</h2></td>
                         						<td><h2 id="totalpricerounded${index_convert}"></h2></td>
                         						<td><h2>RM</h2></td>
                         					</tr>
                         					<tr style="background: black; color: white;">
                         						<td><h2 style="text-decoration: underline; font-weight: bold;">Final Price</h2></td>
                         						<td><h2 style="color: #90EE90;" id="finalpricesum${index_convert}"></h2></td>
                         						<td><h2>RM</h2></td>
                         					</tr>
                         					<tr style="background: black; color: white;">
                         						<td><h2 style="text-decoration: underline; font-weight: bold;color: white;">Rounded Up Final Price</h2></td>
                         						<td><h2 style="color: #90EE90;" id="finalpricerounded${index_convert}"></h2></td>
                         						<td><h2 style="color: white;">RM</h2></td>
                         					</tr>
                         					<tr style="background: black; color: white;">
                                            	<td><h2 style="text-decoration: underline; font-weight: bold;color: white;">Final Selling Price</h2></td>
                                            	<td><input style="border: none; background: gray; color: white; height: 60px; font-size: 2rem; font-weight: bold;" type="text" placeholder="Enter Price" class="form-control" id="finalsellingprice${index_convert}" required></td>
                                            	<td><h2 style="color: white;">RM</h2></td>
                                            </tr>
                         				</table>
                         			</div>

      `);
      tableContainer.append(tableDiv);
    });

    // Initialize jQuery UI tabs
    $('#tabs').tabs({
            show: { effect: 'fade', duration: 300 } // Add the fade effect with a duration of 300ms
        });
    tab_clickCount++;
  }
