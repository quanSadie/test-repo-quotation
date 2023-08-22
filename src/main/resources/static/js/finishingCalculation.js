document.addEventListener('DOMContentLoaded', () => {

$(document).ready(function() {
    				// other finishing --------------------------------
            		    let rowCounter = 0;

                        const addButton = document.getElementById("addRowButton");

                        addButton.addEventListener("click", function() {
                            // Get the table body element
                            const tableBody = document.getElementById("tableBody");

                            // Create a new table row
                            const newRow = document.createElement("tr");

                            // Set the appropriate IDs for the inputs in the new row
                            const newFinishingId = "other_finishing" + (rowCounter + 1);
                            const newPriceId = "other_finishing" + (rowCounter + 1) + "_price";

                            // Create the input elements with the assigned IDs
                            const finishingInput = document.createElement("input");
                            finishingInput.id = newFinishingId;
                            finishingInput.placeholder = "Enter finishing name";
                            finishingInput.className = "form-control";
                            finishingInput.type = "text";
                            finishingInput.name = "";

                            const priceInput = document.createElement("input");
                            priceInput.id = newPriceId;
                            priceInput.placeholder = "Enter finishing price";
                            priceInput.className = "form-control";
                            priceInput.type = "text";
                            priceInput.name = "";

                            // Create the table cells and append the inputs
                            const cell1 = document.createElement("td");
                            cell1.appendChild(finishingInput);

                            const cell2 = document.createElement("td");
                            cell2.appendChild(priceInput);

                            // Append the cells to the new row
                            newRow.appendChild(cell1);
                            newRow.appendChild(cell2);
                            newRow.innerHTML += "<td style='border:none;'></td>";

                            // Append the new row to the table body
                            tableBody.appendChild(newRow);

                            // Increment the row counter
                            rowCounter++;
                        });

                        // other finishing --------------------------------

	function checkEmpty(value) {
		return value == '' ? 0 : value;
	}

	function ToNumber(val) {
		if (isNaN(val) || !isFinite(val) || typeof (val) === "undefined" || val == '') {
			return 0;
		}
		return Number(val);
	}
	// calculate GLOSS LAMINATION price

	// --------------------------------------------

	// ---------------- Calculate Offset lamination (A12) ----------------
	// Calculate quantity (both front end back)
	// E14 = quantity front + quantity back
	function CalculateQuantity(paperNeeded, amount, finishedProductTotalQuantity, option, cut) {
	    if (cut == 1) {
          if (option == "Yes") {
            return paperNeeded * (amount / finishedProductTotalQuantity) * 2;
          } else {
            return 0;
          }
        } else {
          if (option === "Yes") {
            return paperNeeded * (amount / finishedProductTotalQuantity);
          } else {
            return 0;
          }
        }
//		var result = (paperNeeded * amount / finishedProductTotalQuantity) / 2;
//		if (cut == 1) {
//			if (option == 'Yes') {
//				result = result * 2;
//			} else {
//				result = 0;
//			}
//
//		} else {
//			if (option == 'Yes') {
//				result = result;
//			} else {
//				result = 0;
//			}
//		}
//		return result;
	}

	// Calculate Testing Quantity (E15)
	function TestingQuantity(offsetLamTestingQuantity, cut) {
		if (cut == 1) {
			return offsetLamTestingQuantity / 2;
		}
		return offsetLamTestingQuantity;
	}

	// E16 (New Total quantity) = E14 + E15

	// Calculate A12
	function CalculateOffsetLamination(paperNeeded, amountFront, optionFront, amountBack, optionBack,
		quantityPerDesign, offsetLamTestingQuantity, cut, squareInches, offsetLamPrice, offsetLamMinimumCost, finishedProductTotalQuantity) {
		var e12 = CalculateQuantity(paperNeeded, amountFront, finishedProductTotalQuantity, optionFront, cut);
		var e13 = CalculateQuantity(paperNeeded, amountBack, finishedProductTotalQuantity, optionBack, cut);
		var e14 = e12 + e13;
		var e15 = offsetLamTestingQuantity;
		var e16 = e15 + e14;
		var result;
		if (e14 == 0) {
			result = 0;
		} else {
		    if (cut == 0) {
		        if (e16 * squareInches * offsetLamPrice < offsetLamMinimumCost) {
		            result = offsetLamMinimumCost;
		        } else {
		            result = e16 * squareInches * offsetLamPrice;
		        }
		    } else if (cut == 1){
		        if (e16 * (squareInches/2) * offsetLamPrice < offsetLamMinimumCost) {
		            result = offsetLamMinimumCost;
		        } else {
		            result = e16 * (squareInches/2) * offsetLamPrice;
		        }
		    }
//			if (e16 * squareInches * offsetLamPrice < offsetLamMinimumCost) {
//				result = offsetLamMinimumCost;
//			} else {
//				result = e16 * squareInches * offsetLamPrice;
//			}
		}
		return result;
	}

	// --------------------------------------------

	// ---------------- Calculate Digital lamination (A10) ----------------
	// Calculate A10
	function CalculateDigitalLamination(amountFront, optionFront, amountBack, optionBack,
		upsAfterCut, digitalLamTestingThreshold, digitalLamTestingQuantity,
		digitalLam1SidePrice, digitalLamMinimumCost) {
		var e3;
		if (optionFront == 'Yes') {
			e3 = amountFront / upsAfterCut;
		} else {
			e3 = 0;
		}
		var e4;
		if (optionBack == 'Yes') {
			e4 = amountBack / upsAfterCut;
		} else {
			e4 = 0;
		}
		var e5 = e3 + e4;
		var e6;
		if (e5 < digitalLamTestingThreshold) {
			e6 = 0;
		} else {
			e6 = digitalLamTestingQuantity;
		}

		var e7 = e5 + e6;
		var result;
		if (e7 == 0) {
			result = 0;
		} else {
			if (e7 * digitalLam1SidePrice < digitalLamMinimumCost) {
				result = digitalLamMinimumCost;
			} else {
				result = e7 * digitalLam1SidePrice;
			}
		}

		return result;
	}

	// --------------------------------------------

	// ---------------- Calculate Offset Lamination A3 Size (A14) ----------------
	// Calculate A14
	function CalculateOffsetLaminationA3(amountFront, optionFront, amountBack, optionBack,
		upsAfterCut, offsetLamTestingQuantity, a3SquareInches, offsetLamPrice, offsetLamMinimumCost) {
		var e3;
		if (optionFront == 'Yes') {
			e3 = amountFront / upsAfterCut;
		} else {
			e3 = 0;
		}
		var e4;
		if (optionBack == 'Yes') {
			e4 = amountBack / upsAfterCut;
		} else {
			e4 = 0;
		}
		var e20 = e3;
		var e21 = e4;
		var e22 = e21 + e20;
		var e23 = offsetLamTestingQuantity;
		var e24 = e23 + e22;
		var result;
		if (e22 == 0) {
			result = 0;
		} else {
			if (e24 * a3SquareInches * offsetLamPrice < offsetLamMinimumCost) {
				result = offsetLamMinimumCost;
			} else {
				result = e24 * a3SquareInches * offsetLamPrice;
			}
		}
		return result;
	}
	// calculate water based price

	// --------------------------------------------

	// ---------------- Calculate Water Based A3 Size (B17) ----------------
	function CalculateWaterBasedA3(amountFront, optionFront, amountBack, optionBack,
		upsAfterCut, waterBasedPrice, waterBasedTestingQuantity, a3SquareInches,
		waterBasedMinimumCost, cut) {

		var j28;
		var j29;
		if (optionFront == 'Yes') {
			j28 = amountFront / upsAfterCut;
		} else {
			j28 = 0;
		}
		if (optionBack == 'Yes') {
			j29 = amountBack / upsAfterCut;
		} else {
			j29 = 0;
		}

		// total quantity
		var j30 = j29 + j28;

		var j31 = waterBasedTestingQuantity;
		// new total quantity
		var j32 = j30 + j31;

		var result;
		if (j30 == 0) {
			result = 0;
		} else {
			if (j32 * a3SquareInches * waterBasedPrice > waterBasedMinimumCost) {
				result = waterBasedMinimumCost;
			} else {
				result = j32 * a3SquareInches * waterBasedPrice;
			}
		}

		return result;
	}
	// ---------------- Calculate Water Based Offset Size (A17) ----------------
	function CalculateWaterBasedOffsetSize(paperNeeded, amountFront, optionFront, amountBack, optionBack,
		waterBasedPrice, waterBasedTestingQuantity, squareInches,
		waterBasedMinimumCost, cut, quantityPerDesign, finishedProductTotalQuantity) {

		var e28 = CalculateQuantity(paperNeeded, amountFront, finishedProductTotalQuantity, optionFront, cut);
		var e29 = CalculateQuantity(paperNeeded, amountBack, finishedProductTotalQuantity, optionBack, cut);
		var e30 = e28 + e29;
		var e31 = waterBasedTestingQuantity;
		var e32 = e30 + e31;
		var result;
		if (e30 == 0) {
			result = 0;
		} else {
		    if (cut == 0) {
		        if (e32 * squareInches * waterBasedPrice < waterBasedMinimumCost) {
		            result = waterBasedMinimumCost;
		        } else {
		            result = e32 * squareInches * waterBasedPrice;
		        }
		    } else if (cut == 1) {
		         if (e32 * squareInches/2 * waterBasedPrice < waterBasedMinimumCost) {
                	result = waterBasedMinimumCost;
                } else {
                	result = e32 * squareInches/2 * waterBasedPrice;
                }
		    }

//			if (e32 * squareInches * waterBasedPrice < waterBasedMinimumCost) {
//				result = waterBasedMinimumCost;
//			} else {
//				result = e32 * squareInches * waterBasedPrice;
//			}
		}
		return result;
	}

	// ---------------- Calculate UV Offset Size (A20) ----------------
	function CalculateUVOffsetSize(paperNeeded, amountFront, optionFront, amountBack, optionBack
		, quantityPerDesign, cut, uvTestingQuantity, customerSupplyPaper, squareInches, uvCardPrice,
		uvPaperPrice, uvMinimumCost, finishedProductTotalQuantity) {

		var e36 = CalculateQuantity(paperNeeded, amountFront, finishedProductTotalQuantity, optionFront, cut);
		var e37 = CalculateQuantity(paperNeeded, amountBack, finishedProductTotalQuantity, optionBack, cut);
		var e38 = e37 + e36;
		var e39 = uvTestingQuantity;

		var e40 = e39 + e38;
		var result;
		if (e38 == 0) {
			result = 0;
		} else {
		    if (cut == 0) {
		        if (isCard == 'Yes') {
                    if (e40 * squareInches * uvCardPrice < uvMinimumCost) {
                        result = uvMinimumCost;
                    } else {
                        result = e40 * squareInches * uvCardPrice;
                    }
            	} else {
            	     if (e40 * squareInches * uvPaperPrice < uvMinimumCost) {
                        result = uvMinimumCost;
                     } else {
                        result = e40 * squareInches * uvPaperPrice;
                     }
            	}
		    } else if (cut == 1) {
		        if (isCard == 'Yes') {
                    if (e40 * squareInches/2 * uvCardPrice < uvMinimumCost) {
                        result = uvMinimumCost;
                    } else {
                        result = e40 * squareInches/2 * uvCardPrice;
                    }
            	} else {
            	     if (e40 * squareInches/2 * uvPaperPrice < uvMinimumCost) {
                        result = uvMinimumCost;
                     } else {
                        result = e40 * squareInches/2 * uvPaperPrice;
                     }
            	}
		    }

//			if (customerSupplyPaper == 'Yes') {
//				if (e40 * squareInches * uvCardPrice < uvMinimumCost) {
//					result = uvMinimumCost;
//				} else {
//					result = e40 * squareInches * uvCardPrice;
//				}
//			} else {
//				if (e40 * squareInches * uvPaperPrice < uvMinimumCost) {
//					result = uvMinimumCost;
//				} else {
//					result = e40 * squareInches * uvPaperPrice;
//				}
//			}
		}
		return result;
	}

	// ---------------- Calculate Varnish A3 Size (B23) ----------------
	function CalculateVarnishdA3(amountFront, optionFront, amountBack, optionBack,
		upsAfterCut, varnishPrice, varnishTestingQuantity, a3SquareInches,
		varnishMinimumCost, cut) {

		var j44 = 0;
		var j45 = 0;

		if (optionFront == 'Yes') {
			j44 = amountFront / upsAfterCut;
		}
		if (optionBack == 'Yes') {
			j45 = amountBack / upsAfterCut;
		}

		var j46 = j45 + j44;
		var j47 = varnishTestingQuantity;
		var j48 = j47 + j46;
		var result;
		if (j46 == 0) {
			result = 0;
		} else {
			if (j48 * a3SquareInches * varnishPrice < varnishMinimumCost) {
				result = varnishMinimumCost;
			} else {
				result = j48 * a3SquareInches * varnishPrice;
			}
		}
		return result;
	}

	// ---------------- Calculate Varnish Offset Size (A23) ----------------
	function CalculateVarnishOffset(paperNeeded, amountFront, optionFront, amountBack, optionBack,
		varnishPrice, varnishTestingQuantity, squareInches,
		varnishMinimumCost, cut, quantityPerDesign, finishedProductTotalQuantity) {

		var e44 = CalculateQuantity(paperNeeded, amountFront, finishedProductTotalQuantity, optionFront, cut);
		var e45 = CalculateQuantity(paperNeeded, amountBack, finishedProductTotalQuantity, optionBack, cut);
		var e46 = e45 + e44;
		var e47 = varnishTestingQuantity;
		var e48 = e47 + e46;
		var result;
		if (e46 == 0) {
			result = 0;
		} else {
		    if (cut == 0) {
		        if (e48 * squareInches * varnishPrice < varnishMinimumCost) {
                	result = varnishMinimumCost;
                } else {
                	result = e48 * squareInches/2 * varnishPrice;
                }
		    } else if (cut == 1) {
		        if (e48 * squareInches * varnishPrice < varnishMinimumCost) {
                    result = varnishMinimumCost;
                } else {
                    result = e48 * squareInches/2 * varnishPrice;
                }
		    }
//			if (e48 * squareInches * varnishPrice < varnishMinimumCost) {
//				result = varnishMinimumCost;
//			} else {
//				result = e48 * squareInches * varnishPrice;
//			}
		}
		return result;
	}

	// ---------------- Calculate Spot UV Cost ----------------
	// Calculate Front and Back quantity
	function calculateSpotUVQuantity(cut, option, lengthAfterCut, amount, finishedProductTotalQuantity) {
        if (cut == 1) {
            if (option == "Yes") {
                return lengthAfterCut * (amount / finishedProductTotalQuantity) * 2 || 0;
            } else {
                return 0;
            }
        } else {
            if (option == "Yes") {
                return lengthAfterCut * (amount / finishedProductTotalQuantity) || 0;
            } else {
                return 0;
            }
        }
    }
	// Calculate Spot UV offset size (A26)
	function CalculateSpotUVOffsetSize(inchesSquareAfterCuthidden, spotUVTestingQuantity,spotUVPrice, minimumCost, cut, optionFront, optionBack,amountFront, amountBack,
	lengthAfterCut,finishedProductTotalQuantity) {
	    var E51 = calculateSpotUVQuantity(cut, optionFront, lengthAfterCut, amountFront, finishedProductTotalQuantity);
	    var E52 = calculateSpotUVQuantity(cut, optionBack, lengthAfterCut, amountBack, finishedProductTotalQuantity);
	    var E53 = E51 + E52;
	    var E54 = spotUVTestingQuantity;
	    var E55 = E53 + E54;
	    var B4 = inchesSquareAfterCuthidden;
	    if (E53 === 0) {
            return 0;
        }
          let cost;
        if (cut == 0) {
            cost = E55 * B4 * spotUVPrice;
        } else {
            cost = E55 * B4 / 2 * spotUVPrice;
        }
        if (cost < minimumCost) {
            return minimumCost;
        }
        return cost;
	}
	// ---------------- Calculate Spot UV price ----------------
    function CalculateSpotUVPrice(inchesSquareAfterCuthidden, spotUVTestingQuantity, printTechnique,spotUVPrice, minimumCost, cut, optionFront, optionBack,
    amountFront, amountBack, lengthAfterCut, finishedProductTotalQuantity) {
        var A26 = CalculateSpotUVOffsetSize(inchesSquareAfterCuthidden, spotUVTestingQuantity, spotUVPrice, minimumCost, cut, optionFront, optionBack,
                    amountFront, amountBack, lengthAfterCut, finishedProductTotalQuantity);
        if (printTechnique == 'Digital Print') {
            return 0;
        }
        return A26;
    }
    // ---------------- Calculate Soft Touch ----------------
    function calculatej3637(cut, option, paperNeeded, amount, finishProductTotalQuantity) {
      if (cut == 1) {
        if (option === "Yes") {
          return paperNeeded * (amount / finishProductTotalQuantity) * 2;
        } else {
          return 0;
        }
      } else {
        if (option === "Yes") {
          return paperNeeded * (amount / finishProductTotalQuantity);
        } else {
          return 0;
        }
      }
    }

    function softtouchsize(cut, optionFront, optionBack, paperNeeded, amountFront, amountBack, finishProductTotalQuantity,
    softTouchLaminationPrice, minimumCost, offsetLamTestingQuantity, squareInches) {
        var j36 = calculatej3637(cut, optionFront, paperNeeded, amountFront, finishProductTotalQuantity);
        var j37 = calculatej3637(cut, optionBack, paperNeeded, amountBack, finishProductTotalQuantity);
        var j38 = j37 + j36;
        var j39 = offsetLamTestingQuantity;
        var j40 = j38 + j39;
        var B4 = squareInches;
        if (j38 === 0) {
            return 0;
        } else if (cut != 1) {
            if (j40 * B4 * softTouchLaminationPrice < minimumCost) {
                return minimumCost;
            } else {
                return j40 * B4 * softTouchLaminationPrice;
            }
        } else {
            if (j40 * (B4/2) * softTouchLaminationPrice < minimumCost) {
              return minimumCost;
            } else {
              return j40 * (B4/2) * softTouchLaminationPrice;
            }
        }
    }

    function softtouchoffsetcal(cut, optionFront, optionBack, paperNeeded, amountFront, amountBack, finishProductTotalQuantity,
                                    softTouchLaminationPrice, minimumCost, offsetLamTestingQuantity, squareInches) {
        var a29 = softtouchsize(cut, optionFront, optionBack, paperNeeded, amountFront, amountBack, finishProductTotalQuantity,
                                    softTouchLaminationPrice, minimumCost, offsetLamTestingQuantity, squareInches);
        var j36 = calculatej3637(cut, optionFront, paperNeeded, amountFront, finishProductTotalQuantity);
        var j37 = calculatej3637(cut, optionBack, paperNeeded, amountBack, finishProductTotalQuantity);
        var j38 = j36 + j37;
        var k36 = j36/j38;
        var k37 = j37/j38;
        var l36 = a29 * k36;
        var l37 = a29 * k37;
        var l40 = l37 + l36;
        return l40;
    }
	// ---------------- Calculate Emboss / Deboss ----------------
	function CalculatefnsSize(opt, width, length) {
    	if (opt == 'Yes') {
    		return width * length / 645;
    	}
    	return 0;
    }

	function CalculateEDBossSum(option, width, length, amount, embossBlockPrice, embossCostPer1000, minimumCost, actualUpsPerPaper, cut) {

		var size = CalculatefnsSize(option, width, length);

		// calculate quantity (G58 -> G69)
		var quantity;
		if (size == 0) {
			quantity = 0;
		} else {
		    if (cut == 1){
            	quantity = Math.ceil(amount/(actualUpsPerPaper/2)/1000) * embossCostPer1000;
            } else {
                quantity = Math.ceil(amount/actualUpsPerPaper/1000) * embossCostPer1000;
            }
		}

		// ------------
		// calculate block
		var block;
		if (size == 0) {
			block = 0;
		} else {
			if (size * embossBlockPrice < minimumCost) {
				block = minimumCost;
			} else {
				block = size * embossBlockPrice;
			}
		}
		// ------------
		return block * actualUpsPerPaper + quantity;
	}
	// ---------------- Calculate DieCut price ----------------
	// Calculate diecut size (b61 -> ...)
	function CalculateDiecutSize(option, width, length) {
    	if (option == 'Yes') {
    		width = parseFloat(width);
    		length = parseFloat(length);
    		return width + length;
    	}
    	return 0;
    }
	// Calculate print count mutiplier (b7)
	function PrintCountMutiplier(printTechnique, upsAfterCut) {
		if (printTechnique == 'Digital Print') {
			return 4;
		}
		return upsAfterCut;
	}

	// Calculate I(100->104)
	function CalculateDiecutQuantityPrice(option, width, length, amount, printTechnique, upsAfterCut, diecutPricePer1000, actualUpsPerPaper, cut) {

		var diecutSize = CalculateDiecutSize(option, width, length);
		if (diecutSize == 0) {
			return 0;
		} else {
		    if (cut == 1) {
		        return Math.ceil((amount / actualUpsPerPaper /2) / 1000) * diecutPricePer1000;
		    }
		    else {
		        return Math.ceil(amount / actualUpsPerPaper / 1000) * diecutPricePer1000;
		    }
		}
//		var printCountMul = PrintCountMutiplier(printTechnique, upsAfterCut);

//		return Math.ceil((amount / printCountMul) / 1000) * diecutPricePer1000;

	}

	// B66 -> B70
	function CalculateKnifePrice(option, numberOfKnife, diecutKnifeMinAmount) {
         if (option == "Yes") {
            return numberOfKnife > diecutKnifeMinAmount ? numberOfKnife * 15 : numberOfKnife * 20;
         } else {
            return 0;
         }
	}

	// Calculate Block (E100->104)
	function CalculateDiecutBlock(option, width, length, minimumCost, numberOfKnife, diecutKnifeMinAmount) {
	    var diecutKnifePrice = CalculateKnifePrice(option, numberOfKnife, diecutKnifeMinAmount);
		var diecutSize = CalculateDiecutSize(option, width, length);
		if (diecutSize == 0) {
			return 0;
		}
//		if (diecutSize * 0.25 < minimumCost) {
//			return minimumCost;
//		}
//		return diecutSize * 0.25;
        return (diecutSize * 0.25 < minimumCost) ? minimumCost : diecutSize * 0.25 + diecutKnifePrice;
	}
	// Calculate G(100->104) g100
	function CalculateBlockAndUp(option, width, length, minimumCost, printTechnique, upsAfterCut, actualUpsPerPaper, numberOfKnife, diecutKnifeMinAmount, cut) {
		var diecutBlock = CalculateDiecutBlock(option, width, length, minimumCost, numberOfKnife, diecutKnifeMinAmount);
		if (printTechnique == 'Digital Print') {
			return diecutBlock * upsAfterCut;
		} else {
		    /*if (cut == 1) {
		        return diecutBlock * actualUpsPerPaper / 2;
		    } else {
		        return diecutBlock * actualUpsPerPaper;
		    }*/
		    return diecutBlock * actualUpsPerPaper;
		}
	}
	function CalculateDieCutPrice(option, width, length, amount, printTechnique,
		upsAfterCut, diecutPricePer1000, minimumCost, actualUpsPerPaper, numberOfKnife, diecutKnifeMinAmount, cut) {

		var i = CalculateDiecutQuantityPrice(option, width, length, amount, printTechnique,
			upsAfterCut, diecutPricePer1000, actualUpsPerPaper, cut);
		var g = CalculateBlockAndUp(option, width, length, minimumCost, printTechnique, upsAfterCut, actualUpsPerPaper, numberOfKnife, diecutKnifeMinAmount, cut);
		return g + i;
	}
	// ---------------- Calculate Hot Stamping ----------------

	// ---------- Calculate B57 (Hot Stamping 2531 Ups) ----------
	function onlyUnique(value, index, self) {
		return self.indexOf(value) === index;
	}

	function SUGGESTEDUPS(ups, lastCount) {
		var upsFromPage = ups;
		var countFromPage = lastCount;
		var resultForLoop = 1;
		var lastCountForLoop = 0;

		for (lastCountForLoop = countFromPage + 1; lastCountForLoop < upsFromPage + 1; lastCountForLoop++) {
			resultForLoop = upsFromPage / lastCountForLoop;

			if (Number.isInteger(resultForLoop)) {
				break;
			}
		}

		return upsFromPage / resultForLoop;
	}

	// c23
	function C23FromFormula(upsAfterCut, areaInMM, actualUpsPerPaper) {
		const upsCutSuggestion = [];
		var a = 0;
		for (var i = 11; i <= 20; i++) {
			a = SUGGESTEDUPS(upsAfterCut, a);
			upsCutSuggestion.push(a);
		}
		var unique = upsCutSuggestion.filter(onlyUnique);
		var max = unique[0] * areaInMM;
		var index = unique[0];
		for (var i = 1; i < unique.length; i++) {
			if (unique[i] * areaInMM > max && unique[i] * areaInMM < 499999) {
				max = unique[i] * areaInMM;
				index = unique[i];
			}
		}
		if (index > actualUpsPerPaper) {
		    return actualUpsPerPaper;
		}
		return index;
	}

	// b57
	function HotStamping2531Ups(upsAfterCut, upsAfterCutDigital, printTechnique, areaInMM, actualUpsPerPaper) {
		var c23 = C23FromFormula(upsAfterCut, areaInMM, actualUpsPerPaper);
		if (printTechnique == 'Digital Print') {
			return upsAfterCutDigital;
		}
		return c23;
	}
	// ---------- Calculate B57 (Hot Stamping 2531 Ups) ----------

	// ---------- Calculate B58 (Hot Stamping Normal Ups) ----------

	// b58
	function HotStampingNormalUps(upsAfterCutDigital, printTechnique, actualUpsPerPaper, cut) {
		if (printTechnique == 'Digital Print') {
			return upsAfterCutDigital;
		}
		if (cut == 1) {
		    actualUpsPerPaper / 2;
		}
		return actualUpsPerPaper;
	}
	// ---------- Calculate B58 (Hot Stamping Normal Ups) ----------

	// ---------- Calculate B59 (Hot Stamping Quantity Multiplier) ----------

	// b59
	function HotStampingQuantityMultiplier(upsAfterCut, upsAfterCutDigital, printTechnique, actualUpsPerPaper, areaInMM, cut) {
		return HotStampingNormalUps(upsAfterCutDigital, printTechnique, actualUpsPerPaper, cut) / HotStamping2531Ups(upsAfterCut, upsAfterCutDigital, printTechnique, areaInMM, actualUpsPerPaper);
	}
	// ---------- Calculate B59 (Hot Stamping Quantity Multiplier) ----------

	// ---------- Calculate B46->B50 and B51 -> B55 (Hot Stamping Front/Back 1->5 Size) ----------
	// B46 -> B50 | B51 -> B55
	function HotStampingSize(option, width, length) {
		if (option == 'Yes') {
			return width * length / 645;
		}
		return 0;
	}
	// ---------- Calculate B46->B50 and B51 -> B55 (Hot Stamping Front/Back 1->5 Size) ----------

	/*
	*
	* ---------- Calculate M72 (Sum of 2531) = K72 + K79 ----------
	*
	*/
	// Calculate K72 (Front) / K79 (Back) (Total price hot stamping front) = SUM (E72 -> E76) x B57 + SUM (I72 -> I76)
	// => Calculate SUM (E72 -> E76) : Hot Stamping front 2531
	function HotStampingFrontBackSum(option, widthArray, lengthArray, upsAfterCut, upsAfterCutDigital, printTechnique,
		hotStampingBlockPrice, hotStampingBlockMinimumCost, areaInMM, actualUpsPerPaper) {
		var b57 = HotStamping2531Ups(upsAfterCut, upsAfterCutDigital, printTechnique, areaInMM, actualUpsPerPaper);
		const b = [];
		for (i = 0; i < 5; i++) {
			var a = HotStampingSize(option, widthArray[i], lengthArray[i]);
			b.push(a);
		}
		var sum = 0;
		for (var i = 0; i < b.length; i++) {

			var a = 0;
			if (b[i] == 0) {
				a = 0;
			} else if (b[i] * hotStampingBlockPrice < hotStampingBlockMinimumCost) {
				a = hotStampingBlockMinimumCost;
			} else {
				a = b[i] * hotStampingBlockPrice;
			}
			sum += a * b57;
		}
		return sum;
	}
	function HotStampingFrontBackSumB58(option, widthArray, lengthArray, upsAfterCut, upsAfterCutDigital, printTechnique,
    		hotStampingBlockPrice, hotStampingBlockMinimumCost, areaInMM, actualUpsPerPaper, cut) {
    		var b57 = HotStamping2531Ups(upsAfterCut, upsAfterCutDigital, printTechnique, areaInMM, actualUpsPerPaper);
    		var b58 = HotStampingNormalUps(upsAfterCutDigital, printTechnique, actualUpsPerPaper, cut);
    		const b = [];
    		for (i = 0; i < 5; i++) {
    			var a = HotStampingSize(option, widthArray[i], lengthArray[i]);
    			b.push(a);
    		}
    		var sum = 0;
    		for (var i = 0; i < b.length; i++) {

    			var a = 0;
    			if (b[i] == 0) {
    				a = 0;
    			} else if (b[i] * hotStampingBlockPrice < hotStampingBlockMinimumCost) {
    				a = hotStampingBlockMinimumCost;
    			} else {
    				a = b[i] * hotStampingBlockPrice;
    			}
    			sum += a * b58;
    		}
    		return sum;
    	}
	// => Calculate SUM (I72 -> I76) : Hot Stamping front 2531
	function HotStampingFrontBack2531QuantityPrice(option, widthArray, lengthArray, upsAfterCut, actualUpsPerPaper, upsAfterCutDigital, printTechnique,
		hotStamping2531Price, hotStamping2531MinimumCost, areaInMM, amount, cut) {
		var b57 = HotStamping2531Ups(upsAfterCut, upsAfterCutDigital, printTechnique, areaInMM, actualUpsPerPaper);
		var b59 = HotStampingQuantityMultiplier(upsAfterCut, upsAfterCutDigital, printTechnique, actualUpsPerPaper, areaInMM, cut);
		const b = [];
		for (i = 0; i < 5; i++) {
			var a = HotStampingSize(option, widthArray[i], lengthArray[i]);
			b.push(a);
		}

        // G72
		var g = 0;
		if (b[0] == 0) {
			g = 0;
		} else {
			g = amount;
		}
		var sum = 0;
		for (var i = 0; i < 5; i++) {
			var a = 0;
			if (b[i] == 0) {
				a = 0;
			} else {
				a = b[i] * g * hotStamping2531Price < hotStamping2531MinimumCost ? hotStamping2531MinimumCost : b[i] * g * hotStamping2531Price;
				sum += a;
			}
		}
		return sum;
	}

	// Calculate K72 (Front) / K79 (Back) (Total price hot stamping front) ===== DONE ======

	// Calculate M72
	function SumOf2531(optionFront, optionBack, widthArrayFront, lengthArrayFront, widthArrayBack, lengthArrayBack, amountFront, amountBack, upsAfterCut, upsAfterCutDigital, printTechnique,
		hotStampingBlockPrice, hotStampingBlockMinimumCost, areaInMM, hotStamping2531Price, hotStamping2531MinimumCost, actualUpsPerPaper, cut) {
		var b57 = HotStamping2531Ups(upsAfterCut, upsAfterCutDigital, printTechnique, areaInMM, actualUpsPerPaper);

		// front
		var SumE72toE76 = HotStampingFrontBackSum(optionFront, widthArrayFront, lengthArrayFront, upsAfterCut, upsAfterCutDigital, printTechnique,
			hotStampingBlockPrice, hotStampingBlockMinimumCost, areaInMM, actualUpsPerPaper);
		var SumI72toI76 = HotStampingFrontBack2531QuantityPrice(optionFront, widthArrayFront, lengthArrayFront, upsAfterCut, actualUpsPerPaper, upsAfterCutDigital, printTechnique,
			hotStamping2531Price, hotStamping2531MinimumCost, areaInMM, amountFront, cut);
		var k72 = SumE72toE76 + SumI72toI76;

		// back
		var SumE79toE83 = HotStampingFrontBackSum(optionBack, widthArrayBack, lengthArrayBack, upsAfterCut, upsAfterCutDigital, printTechnique,
			hotStampingBlockPrice, hotStampingBlockMinimumCost, areaInMM, actualUpsPerPaper);
		var SumI79toI83 = HotStampingFrontBack2531QuantityPrice(optionBack, widthArrayBack, lengthArrayBack, upsAfterCut, actualUpsPerPaper, upsAfterCutDigital, printTechnique,
			hotStamping2531Price, hotStamping2531MinimumCost, areaInMM, amountBack, cut);
		var k79 = SumE79toE83 + SumI79toI83;
		return k72 + k79;
	}
	/*
	*
	* ---------- Calculate M72 (Sum of 2531) = K72 + K79 ---------- DONE
	*
	*/


	/*
	*
	* ---------- Calculate M73 (Sum of Normal) = K86 + K93
	*
	*/

	// Calculate K86 = SUM (E86 -> E90) x B58 + SUM (I86 -> I90)
	// => Calculate SUM (E86 -> E90): Hot stamping front normal
	// => SAME AS E72 -> E76 -> use same function HotStampingFrontBackSum
	// => Calculate SUM (I86 -> I90)
	function HotStampingFrontBackNormalQuantityPrice(option, widthArray, lengthArray, actualUpsPerPaper, upsAfterCutDigital, printTechnique,
		hotStampingNormalPrice, hotStampingNormalMinimumCost, amount, cut) {
		var b58 = HotStampingNormalUps(upsAfterCutDigital, printTechnique, actualUpsPerPaper, cut);
		const b = [];
		for (i = 0; i < 5; i++) {
			var a = HotStampingSize(option, widthArray[i], lengthArray[i]);
			b.push(a);
		}
		var g = 0;
		if (b[0] == 0) {
			g = 0;
		} else {
			g = amount;
		}

		var sum = 0;
		for (var i = 0; i < 5; i++) {
			var a = 0;
			if (b[i] == 0) {
				a = 0;
			} else if (b[i] * g * hotStampingNormalPrice < hotStampingNormalMinimumCost) {
				a = hotStampingNormalMinimumCost;
			} else {
				a = b[i] * g * hotStampingNormalPrice;
			}
			sum += a;
		}
		return sum;
	}
	// => Calculate K93 = SUM (E93 -> E97) * B57 + SUM(I93 -> I97)
	// => Calculate SUM(E93 -> E97): Hot Stamping Back Normal
	// => SAME AS E72 -> E76 -> use same function HotStampingFrontBackSum
	// => Calculate SUM (I93 -> I97)
	// => SAME AS SUM (I86 => I90)
	// => USE Function HotStampingFrontBackNormalQuantityPrice

	// M73
	function SumOfNormal(optionFront, optionBack, widthArrayFront, lengthArrayFront, widthArrayBack, lengthArrayBack, amountFront, amountBack, upsAfterCut, upsAfterCutDigital, printTechnique,
		hotStampingBlockPrice, hotStampingBlockMinimumCost, areaInMM, hotStampingNormalPrice, hotStampingNormalMinimumCost, actualUpsPerPaper, cut) {
		var b57 = HotStamping2531Ups(upsAfterCut, upsAfterCutDigital, printTechnique, areaInMM, actualUpsPerPaper);
		var b58 = HotStampingNormalUps(upsAfterCutDigital, printTechnique, actualUpsPerPaper, cut);
		// front
		var SumE86toE90 = HotStampingFrontBackSumB58(optionFront, widthArrayFront, lengthArrayFront, upsAfterCut, upsAfterCutDigital, printTechnique,
			hotStampingBlockPrice, hotStampingBlockMinimumCost, areaInMM, actualUpsPerPaper, cut);
		var SumI86toI90 = HotStampingFrontBackNormalQuantityPrice(optionFront, widthArrayFront, lengthArrayFront, actualUpsPerPaper, upsAfterCutDigital, printTechnique,
			hotStampingNormalPrice, hotStampingNormalMinimumCost, amountFront, cut);
		var k86 = SumE86toE90 + SumI86toI90;

		// back
		var SumE93toE97 = HotStampingFrontBackSumB58(optionBack, widthArrayBack, lengthArrayBack, upsAfterCut, upsAfterCutDigital, printTechnique,
			hotStampingBlockPrice, hotStampingBlockMinimumCost, areaInMM, actualUpsPerPaper, cut);
		var SumI93toU97 = HotStampingFrontBackNormalQuantityPrice(optionBack, widthArrayBack, lengthArrayBack, actualUpsPerPaper, upsAfterCutDigital, printTechnique,
			hotStampingNormalPrice, hotStampingNormalMinimumCost, amountBack, cut);
		var k93 = SumE93toE97 + SumI93toU97;
		return k86 + k93;
	}
	// -----------------------------------------------------------------------------
	// -----------------------------------------------------------------------------
	// Perfect bind
	function PerfectBindPrice(totalDesigns, actualUpsPerPaper, quantity, colorname, option, perfectBindMinimumCharge,
	                          bookUps, perfectBindPerSectionCharge, perfectBindBindingCharge, cut) {
	    var e108 = PriceCountWithoutLow(totalDesigns, actualUpsPerPaper, quantity, colorname, bookUps, perfectBindPerSectionCharge, perfectBindBindingCharge, cut);
	    if (option == 'No') {
	        return 0;
	    }
	    return e108 < perfectBindMinimumCharge ? perfectBindMinimumCharge : e108;
	}
    // calculate e108
    // old version of this function
//	function PriceCountWithoutLow(totalDesigns, actualUpsPerPaper, quantity, colorname) {
//	    var E107 = twoSidePrint(colorname);
//	    let result = 0;
//         if (E107 === 'Yes') {
//            result = Math.ceil(totalDesigns / actualUpsPerPaper / 2);
//         } else {
//            result = Math.ceil(totalDesigns / actualUpsPerPaper);
//         }
//            result = (result * 0.03 + 0.3) * quantity;
//         return result;
//	}
	// ---------------------- new version of PriceCountWithoutLow
	function PriceCountWithoutLow(totalDesigns, actualUpsPerPaper, quantity, colorname, bookUps, perfectBindPerSectionCharge, perfectBindBindingCharge, cut) {
    	    var E107 = twoSidePrint(colorname);
    	    let result = 0;
/*
    	    if (cut == 1) {
*/
/*    	        if (E107 === 'Yes') {
                    result = Math.ceil(totalDesigns / bookUps / 2) / 2;
                } else {
                    result = Math.ceil(totalDesigns / bookUps);
                }*/
//                result = result / 2;
/*    	    } else {
    	        if (E107 === 'Yes') {
                    result = Math.ceil(totalDesigns / bookUps / 2) / 2;
                } else {
                    result = Math.ceil(totalDesigns / bookUps);
                }
    	    }*/
            result = ((Math.ceil((E107 === "Yes" ? Math.ceil(totalDesigns / bookUps / 2) : Math.ceil(totalDesigns / bookUps))) * perfectBindPerSectionCharge) + perfectBindBindingCharge) * quantity;
/*
            result = (result * perfectBindPerSectionCharge + perfectBindBindingCharge) * quantity;
*/
            return result;
    	}

	// calculate e107
    function twoSidePrint(colorname) {
       if (colorname === "4C+4C" || colorname === "4C+1C" || colorname === "1C+1C") {
            return "Yes";
        } else {
            return "No";
        }
    }

    // -----------------------------------------------------------------------------
    // Staple bind
    function stapleBindCost(option, quantity, stapleBindLowThreshhold, stapleBindLowFlatPrice, stapleBindMinimumCharge, stapleBindIncrementPrice) {
        if (option === "No") {
            return 0;
        }
        if (quantity < stapleBindLowThreshhold) {
            return stapleBindLowFlatPrice;
        }
        return stapleBindMinimumCharge + ((Math.ceil(quantity / 1000) - 1) * stapleBindIncrementPrice);
    }
    // Hard cover
    function hardCoverCost(option, quantity,totalDesigns, actualUpsPerPaper, colorname, threadsewMinimumCharge, perfectBindThreadsewPerSectionCharge, perfectBindBindingCharge, bookUps, cut) {
        var e111 = ThreadsewPriceCountWithOutLow(totalDesigns, actualUpsPerPaper, quantity, colorname, perfectBindThreadsewPerSectionCharge, perfectBindBindingCharge, bookUps, cut);
        if (option === "No") {
             return 0;
        }
        if (e111 < threadsewMinimumCharge) {
             return threadsewMinimumCharge;
        }
        return e111;
    }

    // e111
    function ThreadsewPriceCountWithOutLow(totalDesigns, actualUpsPerPaper, quantity, colorname, perfectBindThreadsewPerSectionCharge, perfectBindBindingCharge, bookUps, cut) {
     var E107 = twoSidePrint(colorname);
     let val1 = 0;
//      if (E107 === "Yes") {
//        result = Math.ceil(totalDesigns / actualUpsPerPaper / 2);
//      } else {
//        result = Math.ceil(totalDesigns / actualUpsPerPaper);
//      }
//      result = (result * perfectBindThreadsewPerSectionCharge + 0.3) * quantity;
//      return result;
          if (cut == 1) {
            if (E107 === 'Yes') {
                val1 = Math.ceil(totalDesigns / bookUps / 2) / 2;
            } else {
                val1 = Math.ceil(totalDesigns / bookUps);
            }
          } else {
                if (E107 === "YES") {
                    val1 = Math.ceil(totalDesigns / (bookUps * 2));
                } else {
                    val1 = Math.ceil(totalDesigns / bookUps);
                }
          }

          let result = ((val1 * perfectBindThreadsewPerSectionCharge) + perfectBindBindingCharge) * quantity;
          return result;
    }
    // --------------------------------------------------------------------------------------------------------------
    // --------------------------------------------------------------------------------------------------------------
    // calculate fold price
    function foldCost(option, folds, fold_quantity, foldChargePer1000sm2, foldChargePer1000gr2) {
        if (option === "Yes") {
          let result;
          if (folds < 3) {
            result = Math.ceil(fold_quantity / 1000) * foldChargePer1000sm2;
          } else {
            result = Math.ceil(fold_quantity / 1000) * foldChargePer1000gr2;
          }
          return result;
        } else {
          return 0;
        }
    }

    // calculate finished product total quantity
    function CalculateFinishedProductTotalQuantity(colorname, quantityPerDesign, totalDesigns) {
		return (colorname == '4C+1C' || colorname == '1C+1C' || colorname == '4C+4C') ? Math.round(quantityPerDesign * totalDesigns / 2) : Math.round(quantityPerDesign * totalDesigns);
    }
	// --------------------------------------------------------------------------------------------------------------
	$("#checkfinishing").click(function() {
		$(".listoffinishing").remove();

        // new version ___ looping through array of quantities
        // take quantity
        const quantityPerDesign_quantity_arr = [];
        quantityPerDesign_quantity_arr.push($('#quantityPerDesign').val());

        const markup_quantity_arr = [];
        markup_quantity_arr.push($('#inputmarkup').val() !=0 ? $('#inputmarkup').val() : 0);
        var quantityPerDesign_quantity = $('#numbers_of_quantity').val();

        	    // quantity starts with 0, means that first one is quantityPerDesign, second one is quantityPerDesign1, ... so forth
        	    // taking the valid quantities
        	    // into quantityPerDesign_quantity_arr
        	    for (var q = 0; q < quantityPerDesign_quantity; q++) {
                    var quantity_order = "quantityPerDesign";
                    var markup_order = "inputmarkup";
                    if (q > 0) {
                        quantity_order = "quantityPerDesign" + q;
                        markup_order = "inputmarkup" + q;
                        if ($('#' + quantity_order).val() != 0 && $('#' + quantity_order).val() != null && $('#' + quantity_order).val() != '') {
                            quantityPerDesign_quantity_arr.push($('#' + quantity_order).val());
                            markup_quantity_arr.push($('#' + markup_order).val() !=0 ? $('#inputmarkup').val() : 0);
                        }
                    }
        	    }

        // list of paper (from category - top)
		var pp = papers;

		// array of papertypes_name
		const pptype_typename_arr = [];
		for (let q = 0; q < quantityPerDesign_quantity_arr.length; q++) {
		    var table_quantity_index = q == 0 ? '' : q;
		    pptype_typename_arr.push($('#suggestionPaperUsed' + table_quantity_index).html());
		}
		// array of papertypes (object)
		const pptype_arr = [];

		var papertype = $('#suggestionPaperUsed').html();
		// handle & auto conversion to &amp;
		if (papertype.includes("&amp;")) {
		    papertype = papertype.replace("&amp;", "&");
		}

		var squareInches;
		var cut;
		var a3squareInches;
		var bookUps;

        // get paper type based on paper calculation
		$.each(pp, function(index, item) {
			$.each(item.pgList, function(index1, item1) {
				$.each(item1.ptList, function(index2, item2) {

					if (papertype == item2.type) {
						squareInches = item2.inchesSquare;
						cut = item2.cut;
						a3squareInches = item2.a3SquareInches;
						bookUps = item2.maxUpForBooks;
					}

					// store matching paper type
					for (let pptype_index = 0; pptype_index < pptype_typename_arr.length; pptype_index++) {
					    if (pptype_typename_arr[pptype_index] == item2.type) {
					        pptype_arr.push(item2);
					    }
					}

				});
			});
		});


		// get info of finishing prope
		var pr = props;
		var offsetLamTestingQuantity;
		var digitalLam1SidePrice;
		var offsetLamPrice;
		var offsetlamMinimumCost;
		var digitalLamTestingThreshold;
		var digitalLamMinimumCost;
		var digitalLamTestingQuantity;
		var waterBasedPrice;
		var waterBasedMinimumCost;
		var uvCardPrice;
		var uvPaperPrice;
		var uvMinimumCost;
		var varnishPrice;
		var varnishMinimumCost;
		var spotUVPrice;
		var spotUVMinimumCost;
		var embossBlockPrice;
		var embossCostPer1000;
		var embossMinimunCost;
		var debossBlockPrice;
		var debossCostPer1000;
		var debossMinimunCost;
		var diecutPricePer1000;
		var dieCutMinimumCost;
		var creasingLineChargePer1000;
		var hotStampingBlockPrice;
		var hotStampingBlockMinimumCost;
		var hotStamping2531Price;
		var hotStamping2531MinimumCost;
		var hotStampingNormalPrice;
		var hotStampingNormalMinimumCost;
		var perfectBindMinimumCharge;
		var stapleBindLowThreshhold;
        var stapleBindLowFlatPrice;
        var stapleBindMinimumCharge;
        var stapleBindIncrementPrice;
        var threadsewMinimumCharge;
        var foldChargePer1000sm2;
        var foldChargePer1000gr2;
        var diecutKnifeMinAmount;
        var waterBasedTestingQuantity;
        var uvTestingQuantity;
        var varnishTestingQuantity;
        var spotUVTestingQuantity;
        var perfectBindThreadsewPerSectionCharge;
        var perfectBindBindingCharge;
        var softTouchLaminationPrice;
        var softtouchminimumCost;
        var perfectBindPerSectionCharge;

		$.each(pr, function(index3, item3) {
			if (item3.property == 'Digital Lam 1 Side Price') {
				digitalLam1SidePrice = item3.number;
			}

			if (item3.property == 'Offset Lam Testing Quantity') {
				offsetLamTestingQuantity = item3.number;
			}
			if (item3.property == 'Offset Lam Price') {
				offsetLamPrice = item3.number;
			}
			if (item3.property == 'Offset Lam Minimum Cost') {
				offsetlamMinimumCost = item3.number;
			}
			if (item3.property == 'Digital Lam Testing Threshold') {
				digitalLamTestingThreshold = item3.number;
			}
			if (item3.property == 'Digital Lam Minimum Cost') {
				digitalLamMinimumCost = item3.number;
			}
			if (item3.property == 'Digital Lam Testing Quantity') {
				digitalLamTestingQuantity = item3.number;
			}
			if (item3.property == 'Water Based Price') {
				waterBasedPrice = item3.number;
			}
			if (item3.property == 'Water Based Minimum Cost') {
				waterBasedMinimumCost = item3.number;
			}
			if (item3.property == 'UV Card Price') {
				uvCardPrice = item3.number;
			}
			if (item3.property == 'UV Paper Price') {
				uvPaperPrice = item3.number;
			}
			if (item3.property == 'UV Minimum Cost') {
				uvMinimumCost = item3.number;
			}
			if (item3.property == 'Varnish Price') {
				varnishPrice = item3.number;
			}
			if (item3.property == 'Varnish Minimum Cost') {
				varnishMinimumCost = item3.number;
			}
			if (item3.property == 'Spot UV Price') {
				spotUVPrice = item3.number;
			}
			if (item3.property == 'Spot UV Minimum Cost') {
				spotUVMinimumCost = item3.number;
			}
			if (item3.property == 'Emboss Block Price') {
				embossBlockPrice = item3.number;
			}
			if (item3.property == 'Emboss Block Minimum Cost') {
				embossMinimunCost = item3.number;
			}
			if (item3.property == 'Emboss Cost Per 1000') {
				embossCostPer1000 = item3.number;
			}
			if (item3.property == 'Deboss Block Price') {
				debossBlockPrice = item3.number;
			}
			if (item3.property == 'Deboss Block Minimum Cost') {
				debossMinimunCost = item3.number;
			}
			if (item3.property == 'Deboss Cost Per 1000') {
				debossCostPer1000 = item3.number;
			}
			if (item3.property == 'Diecut Price Per 1000') {
				diecutPricePer1000 = item3.number;
			}
			if (item3.property == 'Diecut Block Mininum Cost') {
				dieCutMinimumCost = item3.number;
			}
			if (item3.property == 'Creasling Line Charge Per 1000') {
				creasingLineChargePer1000 = item3.number;
			}
			if (item3.property == 'Hot Stamping Block Price') {
				hotStampingBlockPrice = item3.number;
			}
			if (item3.property == 'Hot Stamping Block Minimum Cost') {
				hotStampingBlockMinimumCost = item3.number;
			}
			if (item3.property == 'Hot Stamping 2531 Price') {
				hotStamping2531Price = item3.number;
			}
			if (item3.property == 'Hot Stamping 2531 Minimum Cost') {
				hotStamping2531MinimumCost = item3.number;
			}
			if (item3.property == 'Hot Stamping Normal Price') {
				hotStampingNormalPrice = item3.number;
			}
			if (item3.property == 'Hot Stamping Normal Minimum Cost') {
				hotStampingNormalMinimumCost = item3.number;
			}

            if (item3.property == 'Perfect Bind Minimum Charge') {
				perfectBindMinimumCharge = item3.number;
			}

            if (item3.property == 'Staple Bind Low Threshold') {
            	stapleBindLowThreshhold = item3.number;
            }

			if (item3.property == 'Staple Bind Low Flat Price') {
            	stapleBindLowFlatPrice = item3.number;
            }
			if (item3.property == 'Staple Bind Minimum Charge') {
            	stapleBindMinimumCharge = item3.number;
            }
			if (item3.property == 'Staple Bind Increment Price') {
            	stapleBindIncrementPrice = item3.number;
            }

            if (item3.property == 'Threadsew Minimum Charge') {
                threadsewMinimumCharge = item3.number;
            }

            if (item3.property == 'Folding Charge Per 1000 (<2)') {
                foldChargePer1000sm2 = item3.number;
            }

            if (item3.property == 'Folding Charge Per 1000 (>=2)') {
                foldChargePer1000gr2 = item3.number;
            }

            if (item3.property == 'Diecut Knife Min Amount') {
                diecutKnifeMinAmount = item3.number;
            }

            if (item3.property == 'Water Based Testing Quantity') {
                waterBasedTestingQuantity = item3.number;
            }

            if (item3.property == 'UV Testing Quantity') {
                uvTestingQuantity = item3.number;
            }

            if (item3.property == 'Varnish Testing Quantity') {
                varnishTestingQuantity = item3.number;
            }

            if (item3.property == 'Spot UV Testing Quantity') {
                spotUVTestingQuantity = item3.number;
            }

            if (item3.property == 'Perfect Bind Threadsew Per Section Charge') {
                perfectBindThreadsewPerSectionCharge = item3.number;
            }

            if (item3.property == 'Perfect Bind Binding Charge') {
                perfectBindBindingCharge = item3.number;
            }
            if (item3.property == 'Soft Touch Lamination Price') {
                softTouchLaminationPrice = item3.number;
            }

            if (item3.property == 'Soft Touch Lamination Minimum Cost') {
                softtouchminimumCost = item3.number;
            }
            if (item3.property == 'Perfect Bind Per Section Charge') {
                perfectBindPerSectionCharge = item3.number;
            }
		});
		// ------------------------------


        // values that are not affected by the quantity

        var areaInMM = $('#areaInMM').val();
        var printTechnique = $('#printTechnique').html();
        var urgent = $('#urgentprint').find(":selected").text();
        var totalDesigns = $('#totalDesigns').val();
        var colorname = $('#paperColor').find(":selected").text();
		var customerSupplyPaper1 = $('#customerSupplyPaper').prop('checked');
		var customerSupplyPaper = 'No';
		if (customerSupplyPaper1) {
		    customerSupplyPaper = 'Yes';
		}




        // take 1 quantity (old version) ______ values that are affected by the quantity
        var quantityPerDesign = $('#quantityPerDesign').val();
        var finishedProductTotalQuantity = $('#totalQuantity').val();
        var paperNeeded = $('#paperneededlowest').val();

        // total price for multiple quantity
        var totalpricesum = 0;
        var totalpricerounded = 0;


        // other finishings price
        var other_finishing_price_sum = 0;
		var other_finishing_string = '';
		  if (rowCounter > 0) {
              for (let i = 1; i <= rowCounter; i++) {
                     if ($('#other_finishing' + i).val() != '' && $('#other_finishing' + i + '_price').val() != 0 && $('#other_finishing' + i + '_price').val() != '') {
                     			var newRow = $(
                     				"<tr class='listoffinishing'>" +
                     				"<td>" + $('#other_finishing' + i).val() + "</td>" +
                     				"<td>" + $('#other_finishing' + i + '_price').val() + "</td> " +
                     				+"</tr>");


                     			for (let q = 0; q < quantityPerDesign_quantity_arr.length; q++) {
                                    var table_quantity_index = q == 0 ? '' : q;
                                    $("#finishingtableresult" + table_quantity_index).before(newRow.clone());
                                }


                     }
                     		other_finishing_price_sum += ToNumber($('#other_finishing' + i + '_price').val());
                     		other_finishing_string +=  $('#other_finishing' + i).val() + ',' + $('#other_finishing' + i + '_price').val() + '-';


              }
        }
        // ----------------------------
        // finishing form variables

        var multi_quantity_form = ''; 	// quantity form

        var multi_quantity_papertype = '';

        var multi_iscard = '';

        var multi_finished_quantity = '';

        var multi_glosslam = '';

        var multi_mattlam = '';

        var multi_waterbased = '';

        var multi_uv = '';

        var multi_varnish = '';

        var multi_spotuv = '';

        var multi_softtouch = '';

        var multi_emboss_deboss = '';

        var multi_hs = '';

        var multi_diecut = '';

        var multi_creasing = '';

        var multi_perfectbind = '';

        var multi_staplebind = '';

        var multi_hardcover = '';

        var multi_fold = '';

        var multi_totalprice = '';

        var multi_finalsellingprice = '';

        var multi_markup = '';

        var multi_finalprice = '';

        var multi_finalpricerounded = '';

        var multi_other = '';



        // default finishing price
        for (let q = 0; q < quantityPerDesign_quantity_arr.length; q++) {
            var table_quantity_index = q == 0 ? '' : q;

                squareInches = pptype_arr[q].inchesSquare;
                cut = pptype_arr[q].cut;
                a3squareInches = pptype_arr[q].a3SquareInches;
                bookUps = pptype_arr[q].maxUpForBooks;


                paperNeeded = $('#paperneededlowest' + table_quantity_index).val();
                finishedProductTotalQuantity = CalculateFinishedProductTotalQuantity(colorname, quantityPerDesign_quantity_arr[q], totalDesigns);

                // values that are affected by the quantity
                var lengthAfterCut = $('#lengthaftercuthidden' + table_quantity_index).val();
                var inchesSquareAfterCuthidden = $('#InchesSquareAfterCuthidden' + table_quantity_index).val();
        		var upsAfterCut = $('#upsaftercutLowest' + table_quantity_index).val();
                var upsAfterCutDigital = $('#upsaftercutdigital' + table_quantity_index).html();
                var actualUpsPerPaper = $('#suggestionActualUp' + table_quantity_index).html();

                var quantity_index_value = quantityPerDesign_quantity_arr[q];
		// -------------------- EMBOSS AND DEBOSS price --------------------

		// emboss width

		const embosswidths = [];
		embosswidths.push($('#embosswidth1').val());
		embosswidths.push($('#embosswidth2').val());
		embosswidths.push($('#embosswidth3').val());
		embosswidths.push($('#embosswidth4').val());
		embosswidths.push($('#embosswidth5').val());

		// emboss length
		const embosslengths = [];
		embosslengths.push($('#embosslength1').val());
		embosslengths.push($('#embosslength2').val());
		embosslengths.push($('#embosslength3').val());
		embosslengths.push($('#embosslength4').val());
		embosslengths.push($('#embosslength5').val());

		// emboss amount
		const embossamounts = [];
		embossamounts.push(quantity_index_value);
		embossamounts.push(quantity_index_value);
		embossamounts.push(quantity_index_value);
		embossamounts.push(quantity_index_value);
		embossamounts.push(quantity_index_value);

		// -----

		// deboss width

		const debosswidths = [];
		debosswidths.push($('#debosswidth1').val());
		debosswidths.push($('#debosswidth2').val());
		debosswidths.push($('#debosswidth3').val());
		debosswidths.push($('#debosswidth4').val());
		debosswidths.push($('#debosswidth5').val());

		// deboss length
		const debosslengths = [];
		debosslengths.push($('#debosslength1').val());
		debosslengths.push($('#debosslength2').val());
		debosslengths.push($('#debosslength3').val());
		debosslengths.push($('#debosslength4').val());
		debosslengths.push($('#debosslength5').val());

		// deboss amount
		const debossamounts = [];
		debossamounts.push(quantity_index_value);
		debossamounts.push(quantity_index_value);
		debossamounts.push(quantity_index_value);
		debossamounts.push(quantity_index_value);
		debossamounts.push(quantity_index_value);

		// -----

		// options
		var embossoption = $('#emboss').find(":selected").text();
		var debossoption = $('#deboss').find(":selected").text();

		var embosssum = 0;
		// -----
		for (var i = 0; i < 5; i++) {
			if (embosswidths[i] == '') {
				embosswidths[i] = 0;
			}
			if (embosslengths[i] == '') {
				embosslengths[i] = 0;
			}
			if (embossamounts[i] == '') {
				embossamounts[i] = 0;
			}
			embosssum += CalculateEDBossSum(embossoption, embosswidths[i], embosslengths[i], embossamounts[i],
				embossBlockPrice, embossCostPer1000, embossMinimunCost, actualUpsPerPaper, cut);
		}
		// -----
		var debosssum = 0;
		for (var i = 0; i < 5; i++) {
			if (debosswidths[i] == '') {
				debosswidths[i] = 0;
			}
			if (debosslengths[i] == '') {
				debosslengths[i] = 0;
			}
			if (debossamounts[i] == '') {
				debossamounts[i] = 0;
			}
			debosssum += CalculateEDBossSum(debossoption, debosswidths[i], debosslengths[i], debossamounts[i],
				debossBlockPrice, debossCostPer1000, debossMinimunCost, actualUpsPerPaper, cut);
		}
		$('#embossdebossprice').val((embosssum + debosssum));

		// ------------------------------------------------------------

		// ------------------------------------------------------------
		// -------------------- HOT STAMPING price --------------------
		const widthArrayFront = [];
		widthArrayFront.push($('#hswidthfront1').val());
		widthArrayFront.push($('#hswidthfront2').val());
		widthArrayFront.push($('#hswidthfront3').val());
		widthArrayFront.push($('#hswidthfront4').val());
		widthArrayFront.push($('#hswidthfront5').val());

		const lengthArrayFront = [];
		lengthArrayFront.push($('#hslengthfront1').val());
		lengthArrayFront.push($('#hslengthfront2').val());
		lengthArrayFront.push($('#hslengthfront3').val());
		lengthArrayFront.push($('#hslengthfront4').val());
		lengthArrayFront.push($('#hslengthfront5').val());



		const widthArrayback = [];
		widthArrayback.push($('#hswidthback1').val());
		widthArrayback.push($('#hswidthback2').val());
		widthArrayback.push($('#hswidthback3').val());
		widthArrayback.push($('#hswidthback4').val());
		widthArrayback.push($('#hswidthback5').val());

		const lengthArrayback = [];
		lengthArrayback.push($('#hslengthback1').val());
		lengthArrayback.push($('#hslengthback2').val());
		lengthArrayback.push($('#hslengthback3').val());
		lengthArrayback.push($('#hslengthback4').val());
		lengthArrayback.push($('#hslengthback5').val());

		var hsoptionFront = $('#hotstampingfront').find(":selected").text();
		var hsoptionBack = $('#hotstampingback').find(":selected").text();

		var hsamountfront = quantity_index_value;
		var hsamountback = quantity_index_value;

		var hsm72 = SumOf2531(
			hsoptionFront,
			hsoptionBack,
			widthArrayFront,
			lengthArrayFront,
			widthArrayback,
			lengthArrayback,
			hsamountfront,
			hsamountback,
			upsAfterCut,
			upsAfterCutDigital,
			printTechnique,
			hotStampingBlockPrice,
			hotStampingBlockMinimumCost,
			areaInMM,
			hotStamping2531Price,
			hotStamping2531MinimumCost,
			actualUpsPerPaper, cut)
			;

		var hsm73 = SumOfNormal(
			hsoptionFront,
			hsoptionBack,
			widthArrayFront,
			lengthArrayFront,
			widthArrayback,
			lengthArrayback,
			hsamountfront,
			hsamountback,
			upsAfterCut,
			upsAfterCutDigital,
			printTechnique,
			hotStampingBlockPrice,
			hotStampingBlockMinimumCost,
			areaInMM,
			hotStampingNormalPrice,
			hotStampingNormalMinimumCost,
			actualUpsPerPaper, cut);
		var hsm74 = Math.min(hsm72, hsm73);
		$('#hsprice').val(hsm74);


		// ------------------------------------------------------------

		// -------------------- DIECUT price --------------------
		// diecut width

		const diecutwidths = [];
		diecutwidths.push(checkEmpty($('#diecutwidth1').val()));
		diecutwidths.push(checkEmpty($('#diecutwidth2').val()));
		diecutwidths.push(checkEmpty($('#diecutwidth3').val()));
		diecutwidths.push(checkEmpty($('#diecutwidth4').val()));
		diecutwidths.push(checkEmpty($('#diecutwidth5').val()));

		// diecut length
		const diecutlengths = [];
		diecutlengths.push(checkEmpty($('#diecutlength1').val()));
		diecutlengths.push(checkEmpty($('#diecutlength2').val()));
		diecutlengths.push(checkEmpty($('#diecutlength3').val()));
		diecutlengths.push(checkEmpty($('#diecutlength4').val()));
		diecutlengths.push(checkEmpty($('#diecutlength5').val()));

		// diecut amount
		const diecutamounts = [];
		diecutamounts.push(checkEmpty(quantity_index_value));
		diecutamounts.push(checkEmpty(quantity_index_value));
		diecutamounts.push(checkEmpty(quantity_index_value));
		diecutamounts.push(checkEmpty(quantity_index_value));
		diecutamounts.push(checkEmpty(quantity_index_value));

		// diecut knives
		const numberofknives = [];
		numberofknives.push(checkEmpty($('#numberofknives1').val()));
		numberofknives.push(checkEmpty($('#numberofknives2').val()));
		numberofknives.push(checkEmpty($('#numberofknives3').val()));
		numberofknives.push(checkEmpty($('#numberofknives4').val()));
		numberofknives.push(checkEmpty($('#numberofknives5').val()));

		// -----

		// options
		var diecutoption = $('#diecut').find(":selected").text();
		var hiddendiecutblock = CalculateDiecutBlock(diecutoption, diecutwidths[0], diecutlengths[0], dieCutMinimumCost, numberofknives[0], diecutKnifeMinAmount);
		$('#hiddendiecutblock').val(hiddendiecutblock);
		var diecutsum = 0;
		for (var i = 0; i < 5; i++) {
			var k = CalculateDieCutPrice(diecutoption, diecutwidths[i], diecutlengths[i], diecutamounts[i],
				printTechnique, upsAfterCut, diecutPricePer1000, dieCutMinimumCost, actualUpsPerPaper, numberofknives[i], diecutKnifeMinAmount, cut);
			diecutsum += k;
		}
		$('#diecutprice').html(diecutsum);

		// ------------------------------------------------------------
		// -------------------- CREASING LINE price --------------------
		// options
		var creasinglineoption = $('#creasingline').find(":selected").text();
		var creasinglinequantity = $('#creasinglinequantity').val() != '' ? $('#creasinglinequantity').val() : 0;
		if (creasinglineoption == 'Yes') {
			$('#creasinglineprice').html(Math.ceil(creasinglinequantity / 1000) * creasingLineChargePer1000);
		} else {
			$('#creasinglineprice').html(0);
		}

		// ------------------------------------------------------------
        // -------------------- Bind price --------------------

        // perfect bind
        var perfectbindoption = $('#perfectbindoption').find(":selected").text();
        var perfectbindquantity = $('#perfectbindquantity').val();
        var perfectbindprice = PerfectBindPrice(totalDesigns, actualUpsPerPaper, perfectbindquantity, colorname, perfectBindMinimumCharge, perfectBindMinimumCharge,
                                                bookUps, perfectBindPerSectionCharge, perfectBindBindingCharge, cut);
        if (perfectbindoption == 'Yes') {
            $('#perfectbindprice').html(perfectbindprice);
        } else {
        	$('#perfectbindprice').html('');
        }

        // staple bind
         var staplebindoption = $('#staplebindoption').find(":selected").text();
         var staplebindquantity = $('#staplebindquantity').val();
         var staplebindprice = stapleBindCost(staplebindoption, staplebindquantity,stapleBindLowThreshhold, stapleBindLowFlatPrice, stapleBindMinimumCharge,stapleBindIncrementPrice);
         if (staplebindoption == 'Yes') {
                    $('#staplebindprice').html(staplebindprice);
          } else {
                	$('#staplebindprice').html('');
          }
        // hard cover
         var hardcoveroption = $('#hardcoveroption').find(":selected").text();
         var hardcoverquantity = $('#hardcoverquantity').val();
         var hardcoverprice = hardCoverCost(hardcoveroption, hardcoverquantity,totalDesigns, actualUpsPerPaper, colorname, threadsewMinimumCharge, perfectBindThreadsewPerSectionCharge, perfectBindBindingCharge, bookUps, cut) ;
		 if (hardcoveroption == 'Yes') {
            $('#hardcoverprice').html(hardcoverprice);
         } else {
            $('#hardcoverprice').html('');
         }
        // ---------------------------------------------------------------------------------------
         var foldoption = $('#foldoption').find(":selected").text();
         var fold_number = $('#foldnumber').val();
         var fold_quantity = $('#foldquantity').val();
         var foldprice = foldCost(foldoption, fold_number, fold_quantity, foldChargePer1000sm2, foldChargePer1000gr2);
         if (foldoption == 'Yes') {
           $('#foldprice').html(foldprice);
         } else {
           $('#foldprice').html('');
         }





        // -------------------- Calculate gloss lamination price --------------------
        		var amountFrontGlossLamination = quantity_index_value; /*$('#glAmountf').val() != '' ? $('#glAmountf').val() : 0;*/
        		var optionFrontGlossLamination = $('#glosslaminationf').find(":selected").text();
        		var amountBackGlossLamination  = quantity_index_value; /*$('#glAmountb').val() != '' ? $('#glAmountb').val() : 0;*/
        		var optionBackGlossLamination = $('#glosslaminationb').find(":selected").text();

        		// Calculate A12 gloss lam
        		var a12 = CalculateOffsetLamination(paperNeeded, amountFrontGlossLamination, optionFrontGlossLamination,
        			amountBackGlossLamination, optionBackGlossLamination, quantityPerDesign_quantity_arr[q], offsetLamTestingQuantity,
        			cut, squareInches, offsetLamPrice, offsetlamMinimumCost, finishedProductTotalQuantity);

        		var a10 = CalculateDigitalLamination(amountFrontGlossLamination, optionFrontGlossLamination,
        			amountBackGlossLamination, optionBackGlossLamination, upsAfterCut,
        			digitalLamTestingThreshold, digitalLamTestingQuantity, digitalLam1SidePrice, digitalLamMinimumCost);

        		var a14 = CalculateOffsetLaminationA3(amountFrontGlossLamination, optionFrontGlossLamination,
        			amountBackGlossLamination, optionBackGlossLamination, upsAfterCut, offsetLamTestingQuantity, a3squareInches
        			, offsetLamPrice, offsetlamMinimumCost);


        		if (printTechnique == 'Offset Print') {
        			$('#glossLaminationPrice').val(a12.toFixed(2));
        			$('#glossLaminationType').val("Offset Lamination");
        		} else if (printTechnique == "Digital Print") {
        			if (urgent == 'No') {
        				$('#glossLaminationPrice').val((Math.min(a10, a14)).toFixed(2));
        				$('#glossLaminationType').val("Digital Lamination");
        			} else {
        				$('#glossLaminationPrice').val(a10.toFixed(2));
        				$('#glossLaminationType').val("Digital Lamination");
        			}
        		} else {
        			$('#glossLaminationPrice').val('');
        			$('#glossLaminationType').val("");
        		}
        		if (optionFrontGlossLamination == 'No' && optionBackGlossLamination == 'No') {
        			$('#glossLaminationPrice').val('');
        			$('#glossLaminationType').val('');
        		}

        		// -------------------- Calculate Matt lamination price --------------------
        		var amountFrontMattLamination = quantity_index_value;
        		var optionFrontMattLamination = $('#mattLaminationf').find(":selected").text();
        		var amountBackMattLamination = quantity_index_value;
        		var optionBackMattLamination = $('#mattLaminationb').find(":selected").text();

        		var b12 = CalculateOffsetLamination(paperNeeded, amountFrontMattLamination, optionFrontMattLamination,
        			amountBackMattLamination, optionBackMattLamination, quantityPerDesign_quantity_arr[q], offsetLamTestingQuantity,
        			cut, squareInches, offsetLamPrice, offsetlamMinimumCost, finishedProductTotalQuantity);

        		var b10 = CalculateDigitalLamination(amountFrontMattLamination, optionFrontMattLamination,
        			amountBackMattLamination, optionBackMattLamination, upsAfterCut,
        			digitalLamTestingThreshold, digitalLamTestingQuantity, digitalLam1SidePrice, digitalLamMinimumCost);

        		var b14 = CalculateOffsetLaminationA3(amountFrontMattLamination, optionFrontMattLamination,
        			amountBackMattLamination, optionBackMattLamination, upsAfterCut, offsetLamTestingQuantity, a3squareInches
        			, offsetLamPrice, offsetlamMinimumCost);


        		if (printTechnique == 'Offset Print') {
        			$('#mattLaminationPrice').val(b12.toFixed(2));
        			$('#mattLaminationType').val("Offset Lamination");
        		} else if (printTechnique == "Digital Print") {
        			if (urgent == 'No') {
        				$('#mattLaminationPrice').val((Math.min(b10, b14)).toFixed(2));
        				$('#mattLaminationType').val("Digital Lamination");
        			} else {
        				$('#mattLaminationPrice').val(b10.toFixed(2));
        				$('#mattLaminationType').val("Digital Lamination");
        			}
        		} else {
        			$('#mattLaminationPrice').val('');
        			$('#mattLaminationType').val('');
        		}
        		if (optionFrontMattLamination == 'No' && optionBackMattLamination == 'No') {
        			$('#mattLaminationPrice').val('');
        			$('#mattLaminationType').val('');
        		}


        		// -------------------- Water based price --------------------
        		var amountFrontWaterBased = quantity_index_value;
        		var optionFrontWaterBased = $('#waterbasedf').find(":selected").text();
        		var amountBackWaterBased = quantity_index_value;
        		var optionBackWaterBased = $('#waterbasedb').find(":selected").text();
        		var a17 = CalculateWaterBasedOffsetSize(paperNeeded, amountFrontWaterBased, optionFrontWaterBased, amountBackWaterBased,
        			optionBackWaterBased, waterBasedPrice, waterBasedTestingQuantity
        			, squareInches, waterBasedMinimumCost, cut, quantityPerDesign_quantity_arr[q], finishedProductTotalQuantity);
        		var b17 = CalculateWaterBasedA3(amountFrontWaterBased, optionFrontWaterBased, amountBackWaterBased,
        			optionBackWaterBased, waterBasedPrice, waterBasedTestingQuantity, a3squareInches, waterBasedMinimumCost, cut);
        		if (optionFrontWaterBased == 'No' && optionBackWaterBased == 'No') {
        			$('#waterbasedPrice').val('');
        		} else {
        			if (printTechnique == 'Digital Print') {
        				$('#waterbasedPrice').val(b17);
        			} else {
        				$('#waterbasedPrice').val(a17);
        			}
        		}

        		// ------------------------------------------------------------
        		// -------------------- UV price --------------------
        		var amountFrontUV = quantity_index_value;
        		var optionFrontUV = $('#uvfront').find(":selected").text();
        		var amountBackUV = quantity_index_value;
        		var optionBackUV = $('#uvback').find(":selected").text();


        		var a20 = CalculateUVOffsetSize(paperNeeded, amountFrontUV, optionFrontUV, amountBackUV, optionBackUV
        			, quantityPerDesign_quantity_arr[q], cut, uvTestingQuantity, customerSupplyPaper, squareInches, uvCardPrice,
        			uvPaperPrice, uvMinimumCost, finishedProductTotalQuantity);

        		if (optionFrontUV == 'No' && optionBackUV == 'No') {
        			$('#uvprice').val('');
        		} else {
        			if (printTechnique != 'Offset Print') {
        				$('#uvprice').val(0);
        			} else {
        				$('#uvprice').val(a20);
        			}
        		}


        		// ------------------------------------------------------------
        		// -------------------- Varnish price --------------------
        		var amountFrontVarnish = quantity_index_value;
        		var optionFrontVarnish = $('#varnishfront').find(":selected").text();
        		var amountBackVarnish = quantity_index_value;
        		var optionBackVarnish = $('#varnishback').find(":selected").text();

        		var b23 = CalculateVarnishdA3(amountFrontVarnish, optionFrontVarnish, amountBackVarnish, optionBackVarnish
        			, upsAfterCut, varnishPrice, varnishTestingQuantity, a3squareInches, varnishMinimumCost, cut);
        		var a23 = CalculateVarnishOffset(paperNeeded, amountFrontVarnish, optionFrontVarnish, amountBackVarnish, optionBackVarnish
        			, varnishPrice, varnishTestingQuantity, squareInches, varnishMinimumCost, cut, quantityPerDesign_quantity_arr[q], finishedProductTotalQuantity);

        		if (optionFrontVarnish == 'No' && optionBackVarnish == 'No') {
        			$('#varnishprice').val('');
        		} else {
        			if (printTechnique != 'Offset Print') {
        				$('#varnishprice').val(b23);
        			} else {
        				$('#varnishprice').val(a23);
        			}
        		}

                // -------------------- spotuv price --------------------
        		var amountFrontSpotUV = quantity_index_value;
        		var optionFrontSpotUV = $('#spotuvfront').find(":selected").text();
        		var amountBackSpotUV = quantity_index_value;
        		var optionBackSpotUV = $('#spotuvback').find(":selected").text();

                var spotuvpricee = CalculateSpotUVPrice(inchesSquareAfterCuthidden, spotUVTestingQuantity, printTechnique, spotUVPrice, spotUVMinimumCost, cut, optionFrontSpotUV, optionBackSpotUV, amountFrontSpotUV, amountBackSpotUV, paperNeeded, finishedProductTotalQuantity);

        		if (optionFrontSpotUV == 'No' && optionBackSpotUV == 'No') {
        			$('#spotuvprice').val('');
        		} else {
        			$('#spotuvprice').val(spotuvpricee.toFixed(2));
        		}

                // ------------------------------------------------------------
                // -------------------- Soft touch price --------------------
                if (printTechnique == "Digital Print") {
                    $('#softtouchprice').val(0);
                } else {
                    var optionFrontSoftTouch = $('#softtouchfront').find(":selected").text();
                    var optionBackSoftTouch = $('#softtouchback').find(":selected").text();
                    var amountFrontSoftTouch = quantity_index_value;
                    var amountBackSoftTouch = quantity_index_value;

                    var softtouchprice = softtouchoffsetcal(cut, optionFrontSoftTouch, optionBackSoftTouch, paperNeeded,
                                                            amountFrontSoftTouch, amountBackSoftTouch,
                                                            finishedProductTotalQuantity, softTouchLaminationPrice,
                                                            softtouchminimumCost, offsetLamTestingQuantity, squareInches);
                    $('#softtouchprice').val(softtouchprice.toFixed(2));
                }


		// ------------------------------------------------------------

		// ---------------------------------------------------------------------------------------
		// insert result into table (finishing price table)
		if ($('#glossLaminationPrice').val() != 0 && $('#glossLaminationPrice').val() != '' && $('#glossLaminationPrice').val() != '') {
			var newRow = $(
				"<tr class='listoffinishing'>" +
				"<td>Gloss Lamination</td>" +
				"<td style='border: none;'>" + $('#glossLaminationPrice').val() + "</td> " +
				"<td>" + $('#glossLaminationType').val() + "</td> " +
				+"</tr>");
			$("#finishingtableresult" + table_quantity_index).before(newRow);
		}
		if ($('#mattLaminationPrice').val() != 0 && $('#mattLaminationPrice').val() != '' && $('#mattLaminationPrice').val() != '-') {
			var newRow = $(
				"<tr class='listoffinishing'>" +
				"<td>Matt Lamination</td>" +
				"<td style='border: none;'>" + $('#mattLaminationPrice').val() + "</td> " +
				"<td>" + $('#mattLaminationType').val() + "</td> " +
				+"</tr>");
			$("#finishingtableresult" + table_quantity_index).before(newRow);
		}
		if ($('#waterbasedPrice').val() != 0 && $('#waterbasedPrice').val() != '') {
			var newRow = $(
				"<tr class='listoffinishing'>" +
				"<td>Water Based</td>" +
				"<td style='border: none;'>" + $('#waterbasedPrice').val() + "</td> " +
				+"</tr>");
			$("#finishingtableresult" + table_quantity_index).before(newRow);
		}
		if ($('#uvprice').val() != 0 && $('#uvprice').val() != '') {
			var newRow = $(
				"<tr class='listoffinishing'>" +
				"<td>UV</td>" +
				"<td style='border: none;'>" + $('#uvprice').val() + "</td> " +
				+"</tr>");
			$("#finishingtableresult" + table_quantity_index).before(newRow);
		}
		if ($('#varnishprice').val() != 0 && $('#varnishprice').val() != '') {
			var newRow = $(
				"<tr class='listoffinishing'>" +
				"<td>Varnish</td>" +
				"<td style='border: none;'>" + $('#varnishprice').val() + "</td> " +
				+"</tr>");
			$("#finishingtableresult" + table_quantity_index).before(newRow);
		}
		if ($('#spotuvprice').val() != 0 && $('#spotuvprice').val() != '') {
			var newRow = $(
				"<tr class='listoffinishing'>" +
				"<td>Spot UV</td>" +
				"<td style='border: none;'>" + $('#spotuvprice').val() + "</td> " +
				+"</tr>");
			$("#finishingtableresult" + table_quantity_index).before(newRow);
		}
        if ($('#softtouchprice').val() != 0 && $('#softtouchprice').val() != '' && ToNumber($('#softtouchprice').val()) != 0) {
			var newRow = $(
				"<tr class='listoffinishing'>" +
				"<td>Soft Touch Lamination</td>" +
				"<td style='border: none;'>" + $('#softtouchprice').val() + "</td> " +
				+"</tr>");
			$("#finishingtableresult" + table_quantity_index).before(newRow);
			$('#hiddensofttouch').val($('#softtouchprice').val());
		}
		// need special check
		if ($('#embossdebossprice').val() != 0 && $('#embossdebossprice').val() != '') {
			var newRow = $(
				"<tr class='listoffinishing'>" +
				"<td>Emboss and Deboss price</td>" +
				"<td style='border: none;'>" + $('#embossdebossprice').val() + "</td> " +
				+"</tr>");
			$("#finishingtableresult" + table_quantity_index).before(newRow);
		}

		if ($('#hsprice').val() != 0 && $('#hsprice').val() != '') {
			var newRow = $(
				"<tr class='listoffinishing'>" +
				"<td>Hot Stamping</td>" +
				"<td style='border: none;'>" + $('#hsprice').val() + "</td> " +
				+"</tr>");
			$("#finishingtableresult" + table_quantity_index).before(newRow);
		}
		if ($('#diecutprice').html() != 0 && $('#diecutprice').html() != '') {
			var newRow = $(
				"<tr class='listoffinishing'>" +
				"<td>Diecut</td>" +
				"<td style='border: none;'>" + $('#diecutprice').html() + "</td> " +
				+"</tr>");
			$("#finishingtableresult" + table_quantity_index).before(newRow);
		}
        if ($('#perfectbindprice').html() != 0 && $('#perfectbindprice').html() != '') {
			var newRow = $(
				"<tr class='listoffinishing'>" +
				"<td>Perfect Bind</td>" +
				"<td style='border: none;'>" + $('#perfectbindprice').html() + "</td> " +
				+"</tr>");
			$("#finishingtableresult" + table_quantity_index).before(newRow);
			$('#hiddenperfectbind').val($('#perfectbindprice').html());
		}
        if ($('#staplebindprice').html() != 0 && $('#staplebindprice').html() != '') {
			var newRow = $(
				"<tr class='listoffinishing'>" +
				"<td>Staple Bind</td>" +
				"<td style='border: none;'>" + $('#staplebindprice').html() + "</td> " +
				+"</tr>");
			$("#finishingtableresult" + table_quantity_index).before(newRow);
			$('#hiddenstaplebind').val($('#staplebindprice').html());
		}
        if ($('#hardcoverprice').html() != 0 && $('#hardcoverprice').html() != '') {
			var newRow = $(
				"<tr class='listoffinishing'>" +
				"<td>Perfect Bind (Threadsew)</td>" +
				"<td style='border: none;'>" + $('#hardcoverprice').html() + "</td> " +
				+"</tr>");
			$("#finishingtableresult" + table_quantity_index).before(newRow);
			$('#hiddenhardcover').val($('#hardcoverprice').html());
		}
		if ($('#creasinglineprice').html() != 0 && $('#creasinglineprice').html() != '') {
			var newRow = $(
				"<tr class='listoffinishing'>" +
				"<td>Creasing Line</td>" +
				"<td style='border: none;'>" + $('#creasinglineprice').html() + "</td> " +
				+"</tr>");
			$("#finishingtableresult" + table_quantity_index).before(newRow);
			$('#hiddencreasingline').val($('#creasinglineprice').html());
		}
        if ($('#foldprice').html() != 0 && $('#foldprice').html() != '') {
			var newRow = $(
				"<tr class='listoffinishing'>" +
				"<td>Folding</td>" +
				"<td style='border: none;'>" + $('#foldprice').html() + "</td> " +
				+"</tr>");
			$("#finishingtableresult" + table_quantity_index).before(newRow);
			$('#hiddenfold').val($('#foldprice').html());
		 }

            // add price to sum
            totalpricesum = ToNumber($('#lowestCostFound' + table_quantity_index).html()) + ToNumber($('#glossLaminationPrice').val()) + ToNumber($('#mattLaminationPrice').val()) +
            			ToNumber($('#waterbasedPrice').val()) + ToNumber($('#uvprice').val()) + ToNumber($('#varnishprice').val()) + ToNumber($('#spotuvprice').val()) + ToNumber($('#softtouchprice').val()) + ToNumber($('#embossdebossprice').val()) +
            			ToNumber($('#hsprice').val()) + ToNumber($('#diecutprice').html()) + ToNumber($('#perfectbindprice').html()) + ToNumber($('#staplebindprice').html()) + ToNumber($('#hardcoverprice').html()) + ToNumber($('#creasinglineprice').html())
            			+ ToNumber($('#foldprice').html()) + ToNumber($('#suggestionCutPrice' + table_quantity_index).html()) + ToNumber(other_finishing_price_sum);

            totalpricerounded = ToNumber($('#suggestionRoundedPrice' + table_quantity_index).html()) + ToNumber($('#glossLaminationPrice').val()) + ToNumber($('#mattLaminationPrice').val()) +
        			ToNumber($('#waterbasedPrice').val()) + ToNumber($('#uvprice').val()) + ToNumber($('#varnishprice').val()) + ToNumber($('#spotuvprice').val()) + ToNumber($('#softtouchprice').val()) + ToNumber($('#embossdebossprice').val()) +
        			ToNumber($('#hsprice').val()) + ToNumber($('#diecutprice').html()) + ToNumber($('#perfectbindprice').html()) + ToNumber($('#staplebindprice').html()) + ToNumber($('#hardcoverprice').html()) + ToNumber($('#creasinglineprice').html())
        			+ ToNumber($('#foldprice').html()) + ToNumber($('#suggestionCutPrice' + table_quantity_index).html()) + ToNumber(other_finishing_price_sum);

            $('#totalpricesum'+table_quantity_index).html(totalpricesum.toFixed(2));
            $('#totalpricerounded'+table_quantity_index).html(totalpricerounded.toFixed(2));
            var markup = markup_quantity_arr[q] / 100;

            var finalpricesum = ToNumber(totalpricesum * markup + totalpricesum);
            $('#finalpricesum'+table_quantity_index).html(finalpricesum.toFixed(2));

            var finalpricerounded = ToNumber(totalpricerounded * markup + totalpricerounded);
            $('#finalpricerounded'+table_quantity_index).html(finalpricerounded.toFixed(2));
            $('#finalsellingprice'+table_quantity_index).val(finalpricerounded.toFixed(2));



            // form for multiple quantity
            // modify data for form (add more declarations)
            		if (quantityPerDesign_quantity_arr.length > 1){
            		    multi_totalprice += "&&&Quantity" + ":" + totalpricesum;

                        multi_markup += "&&&Quantity" + ":" + markup_quantity_arr[q];

            		    multi_finalsellingprice += "&&&Quantity" + ":" + $('#finalsellingprice'+table_quantity_index).val();

                        multi_finalprice += "&&&Quantity" + ":" + finalpricesum;

                        multi_finalpricerounded += "&&&Quantity" + ":" + finalpricerounded;

                        multi_other += "&&&Quantity" + ":" + other_finishing_string;

                        multi_quantity_form += "&&&Quantity" + ":" + quantityPerDesign_quantity_arr[q];

                        multi_quantity_papertype += "&&&Quantity" + ":" + pptype_arr[q].type;

            		    $('#formiscard').val($('#isCard').val() == 'Yes' ? true : false);

            		    multi_finished_quantity += "&&&Quantity:" + finishedProductTotalQuantity;


            		    // gloss lam
            		    if (ToNumber($('#glossLaminationPrice').val()) != 0) {
            		        multi_glosslam += "&&&Quantity" + ":" + 'Front Amount: ' + $('#glAmountf').val() + '-Back Amount: ' + $('#glAmountb').val() + '-Price: ' + $('#glossLaminationPrice').val() + '-Type: ' + $('#glossLaminationType').val();
            		    } else {
            		        multi_glosslam += "&&&Quantity" + ":" + "Null";
            		    }
            		    // matt lam
                        if (ToNumber($('#mattLaminationPrice').val()) != 0) {
            		        multi_mattlam += "&&&Quantity" + ":" + 'Front Amount: ' + $('#mlAmountf').val() + '-Back Amount: ' + $('#mlAmountb').val() + '-Price: ' + $('#mattLaminationPrice').val() + '-Type: ' + $('#mattLaminationType').val();
            		    } else{
            		        multi_mattlam += "&&&Quantity" + ":" + "Null";
            		    }
            		    // water based
                        if (ToNumber($('#waterbasedPrice').val()) != 0) {
                             multi_waterbased += "&&&Quantity" + ":" + 'Front Amount: ' + $('#wbAmountf').val() + '-Back Amount: ' + $('#wbAmountb').val() + '-Price: ' + $('#waterbasedPrice').val();
            		    } else{
            		         multi_waterbased += "&&&Quantity" + ":" + "Null";
            		    }
            		    // uv
                        if (ToNumber($('#uvprice').val()) != 0) {
            		        multi_uv += "&&&Quantity" + ":" + 'Front Amount: ' + $('#uvAmountf').val() + '-Back Amount: ' + $('#uvAmountb').val() + '-Price: ' + $('#uvprice').val();
            		    } else {
            		        multi_uv += "&&&Quantity" + ":" + "Null";
            		    }
            		    // varnish
                        if (ToNumber($('#varnishprice').val()) != 0) {
                            multi_varnish += "&&&Quantity" + ":" + 'Front Amount: ' + $('#vnAmountf').val() + '-Back Amount: ' + $('#vnAmountb').val() + '-Price: ' + $('#varnishprice').val();
            		    } else{
            		        multi_varnish += "&&&Quantity" + ":" + "Null";
            		    }
                        // spot uv
                        if (ToNumber($('#spotuvprice').val()) != 0) {
                            multi_spotuv += "&&&Quantity" + ":" + 'Front Amount: ' + $('#spotuvfrontamount').val() + ',Back Amount: ' + $('#spotuvbackamount').val() + ',Price: ' + $('#spotuvprice').val();
            		    }else{
                            multi_spotuv += "&&&Quantity" + ":" + "Null";
                        }
            		    // soft touch
                        if (ToNumber($('#softtouchprice').val()) != 0) {
                            multi_softtouch += "&&&Quantity" + ":" + 'Front Amount: ' + $('#softtouchfrontamount').val() + ',Back Amount: ' + $('#softtouchbackamount').val() + ',Price: ' + $('#softtouchprice').val();
            		    }else{
                            multi_softtouch += "&&&Quantity" + ":" + "Null";
                        }

            		// -----------
            		// Emboss and Deboss
                        if (ToNumber($('#embossdebossprice').val()) != 0) {
                            multi_emboss_deboss += "&&&Quantity" + ":" + "EMBOSS,Width: " +  $('#embosswidth1').val() + " Length: " +  $('#embosslength1').val() +  " Amount: " + $('#embossamount1').val() +
                                                    "," + "Width: " +  $('#embosswidth2').val() + " Length: " +  $('#embosslength2').val() +  " Amount: " + $('#embossamount2').val() +
                                                    "," +  "Width: " +  $('#embosswidth3').val() + " Length: " +  $('#embosslength3').val() +  " Amount: " + $('#embossamount3').val() +
                                                    "," + "Width: " +  $('#embosswidth4').val() + " Length: " +  $('#embosslength4').val() +  " Amount: " + $('#embossamount4').val() +
                                                    "," + "Width: " +  $('#embosswidth5').val() + " Length: " +  $('#embosslength5').val() +  " Amount: " + $('#embossamount5').val() +
                                                    ",DEBOSS," + "Width: " +  $('#debosswidth1').val() + " Length 1: " +  $('#debosslength1').val() +  " Amount: " + $('#debossamount1').val() +
                                                    "," + "Width: " +  $('#debosswidth2').val() + " Length: " +  $('#debosslength2').val() +  " Amount: " + $('#debossamount2').val() +
                                                    "," + "Width: " +  $('#debosswidth3').val() + " Length: " +  $('#debosslength3').val() +  " Amount: " + $('#debossamount3').val() +
                                                    "," + "Width: " +  $('#debosswidth4').val() + " Length: " +  $('#debosslength4').val() +  " Amount: " + $('#debossamount4').val() +
                                                    "," + "Width: " +  $('#debosswidth5').val() + " Length: " +  $('#debosslength5').val() +  " Amount: " + $('#debossamount5').val() +
                                                    "," + "Price: " + $('#embossdebossprice').val();

            		    } else {
            		        multi_emboss_deboss += "&&&Quantity" + ":" + "Null";
            		    }


            		    // ------------
            		    // Hot stamping
                        if (ToNumber($('#hsprice').val()) != 0) {
                            multi_hs += "&&&Quantity" + ":" + "FRONT,Width: " +  $('#hswidthfront1').val() + " Length: " +  $('#hslengthfront1').val() +
                                        "," + "Width: " +  $('#hswidthfront2').val() + " Length: " +  $('#hslengthfront2').val() +
                                        "," + "Width: " +  $('#hswidthfront3').val() + " Length: " +  $('#hslengthfront3').val() +
                                        "," + "Width: " +  $('#hswidthfront4').val() + " Length: " +  $('#hslengthfront4').val() +
                                        "," + "Width: " +  $('#hswidthfront5').val() + " Length: " +  $('#hslengthfront5').val() +  ",Amount: " + $('#hsamountfront').val() +
                                        "," + "BACK,Width: " +  $('#hswidthback1').val() + " Length: " +  $('#hslengthback1').val() +
                                        "," + "Width: " +  $('#hswidthback2').val() + " Length: " +  $('#hslengthback2').val() +
                                        "," +  "Width: " +  $('#hswidthback3').val() + " Length: " +  $('#hslengthback3').val() +
                                        "," + "Width: " +  $('#hswidthback4').val() + " Length: " +  $('#hslengthback4').val() +
                                        "," + "Width: " +  $('#hswidthback5').val() + " Length: " +  $('#hslengthback5').val() + ",Amount: " + $('#hsamountback').val() +
                                        "," + "Price: " + $('#hsprice').val();

            		        }else {
                                multi_hs += "&&&Quantity" + ":" + "Null";
                            }

                        // ------------
                        // Diecut
                        if (ToNumber($('#diecutprice').html()) != 0) {
                            multi_diecut += "&&&Quantity" + ":" + "Width: " +  $('#diecutwidth1').val() + " Length: " +  $('#diecutlength1').val() + " Amount: " + $('#diecutamount1').val() + " Number of Knives: " + $('#numberofknives1').val() +
                                            "," + "Width: " +  $('#diecutwidth2').val() + " Length: " +  $('#diecutlength2').val() + " Amount: " + $('#diecutamount2').val() + " Number of Knives: " + $('#numberofknives2').val() +
                                            "," + "Width: " +  $('#diecutwidth3').val() + " Length: " +  $('#diecutlength3').val() + " Amount: " + $('#diecutamount3').val() + " Number of Knives: " + $('#numberofknives3').val() +
                                            "," + "Width: " +  $('#diecutwidth4').val() + " Length: " +  $('#diecutlength4').val() + " Amount: " + $('#diecutamount4').val() + " Number of Knives: " + $('#numberofknives4').val() +
                                            "," + "Price: " + $('#diecutprice').html();
            		    }else {
                            multi_diecut += "&&&Quantity" + ":" + "Null";
                        }

                        // creasing line
                        if (ToNumber($('#creasinglineprice').html()) != 0) {
                            multi_creasing += "&&&Quantity" + ":" + "Quantity: " + $('#creasinglinequantity').val() + "-Price: " + $('#creasinglineprice').html();
            		    }else {
                            multi_creasing += "&&&Quantity" + ":" + "Null";
                        }

            		    // perfect bind
                        if (ToNumber($('#hiddenperfectbind').val()) != 0) {
                            multi_perfectbind += "&&&Quantity" + ":" + "Quantity: " + $('#perfectbindquantity').val()+ ",Price: " + $('#hiddenperfectbind').val();
            		    }else {
                            multi_perfectbind += "&&&Quantity" + ":" + "Null";
                        }
            		    // staple bind
                        if (ToNumber($('#hiddenstaplebind').val()) != 0) {
                            multi_staplebind += "&&&Quantity" + ":" + "Quantity: " + $('#staplebindquantity').val()+ ",Price: " + $('#hiddenstaplebind').val();
            		    }else {
                            multi_staplebind += "&&&Quantity" + ":" + "Null";
                        }
            		    // hard cover
                        if (ToNumber($('#hiddenhardcover').val()) != 0) {
                            multi_hardcover += "&&&Quantity" + ":" + "Quantity: " + $('#hardcoverquantity').val()+ ",Price: " + $('#hiddenhardcover').val();
            		    }else {
                            multi_hardcover += "&&&Quantity" + ":" + "Null";
                        }
            		    // folding
                        if (ToNumber($('#hiddenfold').val()) != 0) {
                            multi_fold += "&&&Quantity" + ":" + "Folds: " + $('#foldnumber').val() +",Quantity: " + $('#foldquantity').val()+ ",Price: " + $('#hiddenfold').val();
            		    }else {
                            multi_fold += "&&&Quantity" + ":" + "Null";
                        }

            	    } // multiple quantity form
        }
        // ----------------------------------------------------------------
        // for loop ends here


        // done finishing price calculation





        $('#formsize').val($('#sizeSelect').find(":selected").text() + '-Width: ' + $('#widthDisplay').val() + '-Length: ' + $('#lengthDisplay').val());
        $('#formbleedwidthlength').val('Width: ' + $('#bleedWidthDisplay').val() + '-Length: ' + $('#bleedLengthDisplay').val());
        $('#formfinalwidthlengthbleed').val('Width: ' + $('#finalWidthDisplay').val() + '-Length: ' + $('#finalLengthDisplay').val());
        $('#formisbookinnercontent').val($('#bookInner').find(":selected").text() == 'Yes' ? true : false);
        $('#formareasize').val('MM2: ' + $('#areaInMM').val() + '-Inches2: ' + $('#areaInInches').val());
        $('#formurgentprint').val($('#urgentprint').find(":selected").text() == 'Yes' ? true : false);
        $('#formtotaldesigns').val($('#totalDesigns').val());
        $('#formcolor').val($('#suggestionColor').html());
        $('#formcustomersupplypaper').val($('#customerSupplyPaper').prop('checked') ? 'Yes' : 'No');
        $('#formcustomersupplyplate').val($('#customerSupplyPlate').prop('checked') ? 'Yes' : 'No');

        $('#formpending').val(false);

		// declare values for form
		if (quantityPerDesign_quantity_arr.length <= 1){

		    $('#hiddentotalprice').val($('#totalpricesum').html());
            $('#finalsellingprice').val($('#finalpricerounded').html());
            $('#hiddenfinalsellingprice').val($('#finalsellingprice').val());
            $('#hiddenmarkup').val($('#inputmarkup').val());
            $('#hiddenfinalprice').val($('#finalpricesum').html());
            $('#hiddenfinalpricerounded').val($('#finalpricerounded').html());

		    $('#other_finishing_form').val(other_finishing_string);
		    $('#formquantityperdesign').val($('#quantityPerDesign').val());
		    $('#formpapertype').val($('#suggestionPaperUsed').html());
		    $('#formiscard').val($('#isCard').val() == 'Yes' ? true : false);
		    $('#formfinishproducttotalquantity').val($('#totalQuantity').val());

		    // gloss lam
		    if (ToNumber($('#glossLaminationPrice').val()) != 0) {
		        $('#formglosslam').val('Front Amount: ' + $('#glAmountf').val() + '-Back Amount: ' + $('#glAmountb').val() + '-Price: ' + $('#glossLaminationPrice').val() + '-Type: ' + $('#glossLaminationType').val());
		    } else {
		        $('#formglosslam').val("Null");
		    }
		    // matt lam
            if (ToNumber($('#mattLaminationPrice').val()) != 0) {
		        $('#formmattlam').val('Front Amount: ' + $('#mlAmountf').val() + '-Back Amount: ' + $('#mlAmountb').val() + '-Price: ' + $('#mattLaminationPrice').val() + '-Type: ' + $('#mattLaminationType').val());
		    } else {
		        $('#formmattlam').val("Null");
		    }
		    // water based
            if (ToNumber($('#waterbasedPrice').val()) != 0) {
		        $('#formwaterbased').val('Front Amount: ' + $('#wbAmountf').val() + '-Back Amount: ' + $('#wbAmountb').val() + '-Price: ' + $('#waterbasedPrice').val());
		    } else {
		        $('#formwaterbased').val("Null");
		    }
		    // uv
            if (ToNumber($('#uvprice').val()) != 0) {
		        $('#formuv').val('Front Amount: ' + $('#uvAmountf').val() + '-Back Amount: ' + $('#uvAmountb').val() + '-Price: ' + $('#uvprice').val());
		    } else {
		        $('#formuv').val("Null");
		    }
		    // varnish
            if (ToNumber($('#varnishprice').val()) != 0) {
		       $('#formvarnish').val('Front Amount: ' + $('#vnAmountf').val() + '-Back Amount: ' + $('#vnAmountb').val() + '-Price: ' + $('#varnishprice').val());
		    } else {
		        $('#formvarnish').val("Null");
		    }
            // spot uv
            if (ToNumber($('#spotuvprice').val()) != 0) {
		        $('#formspotuv').val('Front Amount: ' + $('#spotuvfrontamount').val() + ',Back Amount: ' + $('#spotuvbackamount').val() + ',Price: ' + $('#spotuvprice').val());
		    } else {
		        $('#formspotuv').val("Null");
		    }
		    // soft touch
            if (ToNumber($('#softtouchprice').val()) != 0) {
		        $('#hiddensofttouch').val('Front Amount: ' + $('#softtouchfrontamount').val() + ',Back Amount: ' + $('#softtouchbackamount').val() + ',Price: ' + $('#softtouchprice').val());
		    } else {
		        $('#hiddensofttouch').val("Null");
		    }

		    // -----------
		    // Emboss and Deboss
            if (ToNumber($('#embossdebossprice').val()) != 0) {
		        $('#formembossdeboss').val("EMBOSS,Width: " +  $('#embosswidth1').val() + " Length: " +  $('#embosslength1').val() +  " Amount: " + $('#embossamount1').val() +
		        "," + "Width: " +  $('#embosswidth2').val() + " Length: " +  $('#embosslength2').val() +  " Amount: " + $('#embossamount2').val() +
		        "," +  "Width: " +  $('#embosswidth3').val() + " Length: " +  $('#embosslength3').val() +  " Amount: " + $('#embossamount3').val() +
		        "," + "Width: " +  $('#embosswidth4').val() + " Length: " +  $('#embosslength4').val() +  " Amount: " + $('#embossamount4').val() +
		        "," + "Width: " +  $('#embosswidth5').val() + " Length: " +  $('#embosslength5').val() +  " Amount: " + $('#embossamount5').val() +
		        ",DEBOSS," + "Width: " +  $('#debosswidth1').val() + " Length 1: " +  $('#debosslength1').val() +  " Amount: " + $('#debossamount1').val() +
		        "," + "Width: " +  $('#debosswidth2').val() + " Length: " +  $('#debosslength2').val() +  " Amount: " + $('#debossamount2').val() +
		        "," + "Width: " +  $('#debosswidth3').val() + " Length: " +  $('#debosslength3').val() +  " Amount: " + $('#debossamount3').val() +
		        "," + "Width: " +  $('#debosswidth4').val() + " Length: " +  $('#debosslength4').val() +  " Amount: " + $('#debossamount4').val() +
		        "," + "Width: " +  $('#debosswidth5').val() + " Length: " +  $('#debosslength5').val() +  " Amount: " + $('#debossamount5').val() +
		        "," + "Price: " + $('#embossdebossprice').val());		}
		    else {
		        $('#formembossdeboss').val("Null");
		    }

		    // ------------
		    // Hot stamping
            if (ToNumber($('#hsprice').val()) != 0) {
                $('#formhotstamping').val("FRONT,Width: " +  $('#hswidthfront1').val() + " Length: " +  $('#hslengthfront1').val() +
		        "," + "Width: " +  $('#hswidthfront2').val() + " Length: " +  $('#hslengthfront2').val() +
		        "," + "Width: " +  $('#hswidthfront3').val() + " Length: " +  $('#hslengthfront3').val() +
		        "," + "Width: " +  $('#hswidthfront4').val() + " Length: " +  $('#hslengthfront4').val() +
		        "," + "Width: " +  $('#hswidthfront5').val() + " Length: " +  $('#hslengthfront5').val() +  ",Amount: " + $('#hsamountfront').val() +
		        "," + "BACK,Width: " +  $('#hswidthback1').val() + " Length: " +  $('#hslengthback1').val() +
		        "," + "Width: " +  $('#hswidthback2').val() + " Length: " +  $('#hslengthback2').val() +
		        "," +  "Width: " +  $('#hswidthback3').val() + " Length: " +  $('#hslengthback3').val() +
		        "," + "Width: " +  $('#hswidthback4').val() + " Length: " +  $('#hslengthback4').val() +
		        "," + "Width: " +  $('#hswidthback5').val() + " Length: " +  $('#hslengthback5').val() + ",Amount: " + $('#hsamountback').val() +
		        "," + "Price: " + $('#hsprice').val());
		        } else {
		        $('#formhotstamping').val("Null");
		    }

            // ------------
            // Diecut
            if (ToNumber($('#diecutprice').html()) != 0) {
                $('#formdiecut').val("Width: " +  $('#diecutwidth1').val() + " Length: " +  $('#diecutlength1').val() + " Amount: " + $('#diecutamount1').val() + " Number of Knives: " + $('#numberofknives1').val() +
		        "," + "Width: " +  $('#diecutwidth2').val() + " Length: " +  $('#diecutlength2').val() + " Amount: " + $('#diecutamount2').val() + " Number of Knives: " + $('#numberofknives2').val() +
		        "," + "Width: " +  $('#diecutwidth3').val() + " Length: " +  $('#diecutlength3').val() + " Amount: " + $('#diecutamount3').val() + " Number of Knives: " + $('#numberofknives3').val() +
		        "," + "Width: " +  $('#diecutwidth4').val() + " Length: " +  $('#diecutlength4').val() + " Amount: " + $('#diecutamount4').val() + " Number of Knives: " + $('#numberofknives4').val() +
		        "," + "Price: " + $('#diecutprice').html());
		    } else {
		        $('#formdiecut').val("Null");
		    }

            // creasing line
            if (ToNumber($('#creasinglineprice').html()) != 0) {
		        $('#hiddencreasingline').val("Quantity: " + $('#creasinglinequantity').val() + "-Price: " + $('#creasinglineprice').html());
		    } else {
		        $('#hiddencreasingline').val("Null");
		    }

		    // perfect bind
            if (ToNumber($('#hiddenperfectbind').val()) != 0) {
		        $('#hiddenperfectbind').val("Quantity: " + $('#perfectbindquantity').val()+ ",Price: " + $('#hiddenperfectbind').val());
		    } else {
		        $('#hiddenperfectbind').val("Null");
		    }
		    // staple bind
            if (ToNumber($('#hiddenstaplebind').val()) != 0) {
		        $('#hiddenstaplebind').val("Quantity: " + $('#staplebindquantity').val()+ ",Price: " + $('#hiddenstaplebind').val());
		    } else {
		        $('#hiddenstaplebind').val("Null");
		    }
		    // hard cover
            if (ToNumber($('#hiddenhardcover').val()) != 0) {
		        $('#hiddenhardcover').val("Quantity: " + $('#hardcoverquantity').val()+ ",Price: " + $('#hiddenhardcover').val());
		    } else {
		        $('#hiddenhardcover').val("Null");
		    }
		    // folding
            if (ToNumber($('#hiddenfold').val()) != 0) {
		        $('#hiddenfold').val("Folds: " + $('#foldnumber').val() +",Quantity: " + $('#foldquantity').val()+ ",Price: " + $('#hiddenfold').val());
		    } else {
		        $('#hiddenfold').val("Null");
		    }

	    } else {
	        $('#hiddentotalprice').val(multi_totalprice);
	        console.log(multi_totalprice);
            $('#hiddenmarkup').val(multi_markup);
            $('#hiddenfinalsellingprice').val(multi_finalsellingprice);
            $('#hiddenfinalprice').val(multi_finalprice);
            $('#hiddenfinalpricerounded').val(multi_finalpricerounded);
	        $('#other_finishing_form').val(multi_other);
            $('#formquantityperdesign').val(multi_quantity_form);
            $('#formpapertype').val(multi_quantity_papertype);
            $('#formfinishproducttotalquantity').val(multi_finished_quantity);
            $('#formglosslam').val(multi_glosslam);
            $('#formmattlam').val(multi_mattlam);
            $('#formwaterbased').val(multi_waterbased);
            $('#formuv').val(multi_uv);
            $('#formvarnish').val(multi_varnish);
            $('#formspotuv').val(multi_spotuv);
            $('#hiddensofttouch').val(multi_softtouch);

            $('#formembossdeboss').val(multi_emboss_deboss);
            $('#formhotstamping').val(multi_hs);
            $('#formdiecut').val(multi_diecut);
            $('#hiddencreasingline').val(multi_creasing);
            $('#hiddenperfectbind').val(multi_perfectbind);
            $('#hiddenstaplebind').val(multi_staplebind);
            $('#hiddenhardcover').val(multi_hardcover);
            $('#hiddenfold').val(multi_fold);
	    }
		// done form ----------------------------------------------- for 1 quantity
	});

});
});
