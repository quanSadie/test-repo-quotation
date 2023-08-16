document.addEventListener('DOMContentLoaded', () => {
$(document).ready(function() {
	function ToNumber(val) {
		if (isNaN(val) || !isFinite(val) || typeof (val) === "undefined" || val == '' || val == '-') {
			return 0;
		}
		return Number(val);
	}

	// this function for calculating J, or printcounts
	function printcounts(designAmount, upsAmount) {

		var design = designAmount;
		var ups = upsAmount;
		var result = 0.1;
		var designForLoop = 0;

		for (designForLoop = design; designForLoop > 0; designForLoop--) {
			result = ups / designForLoop;
			if (Number.isInteger(result)) {
				break;
			}
		}

		return designForLoop;
	}
	// To calculate Print Cost (N), we have to calculate Quantity(M)
	// To calculate Quantity(M), we have to calculate J, and to do it with J
	// , we need to calculate K
	// Calculation of print cost
	function findJsOfAnActualUp(totaldesign, hs) {
		var j;
		var k = totaldesign;
		const jss = [];
		while (k != 0) {
			j = printcounts(k, hs);
			k = k - j;
			jss.push(j);
		}
		return jss;
	}

	//find print quantity m
	function findPrintQuantity(quantityPerDesign, upAfterCut, totaldesign, hs, cut) {
		var js = findJsOfAnActualUp(totaldesign, hs);
		const quantityArr = [];
		for (let i = 0; i < js.length; i++) {
		    var m = quantityPerDesign / (upAfterCut / js[i]) * (upAfterCut / hs);
		    /*if (cut == 1) {
                m = quantityPerDesign / (upAfterCut / js[i]) * (upAfterCut / hs) * 2;
            }*/
			quantityArr.push(m);
		}
		return quantityArr;
	}

	// find print cost based on quantity
	function findPrintCost(iscard, colorname, quantityPerDesign, upAfterCut, totaldesign, hs,
	    printingChargesPer1000_C, printingBaseCharges_1C, printingChargesPer1000_4C,
	    printingBaseCharges_4C, printingBaseCharges_Card, printingBaseChargesPer1000_Card, cut) {
		var quantityArr = findPrintQuantity(quantityPerDesign, upAfterCut, totaldesign, hs, cut);
		const costarr = [];
		for (let i = 0; i < quantityArr.length; i++) {
			var n;
			var m = quantityArr[i];
			if (iscard == "No") {
                if (colorname == "1C" || colorname == "1C+1C") {
                    n = ((Math.ceil(m/1000)-1)*printingChargesPer1000_C+printingBaseCharges_1C);
                } else {
                    n = ((Math.ceil(m/1000)-1)*printingChargesPer1000_4C+printingBaseCharges_4C);
                }
             } else {
                 n = ((Math.ceil(m/1000)-1)*printingBaseChargesPer1000_Card+printingBaseCharges_Card);
             }
           costarr.push(n);
//			if (iscard == 'No') {
//				if (colorname == '1C' || colorname == '1C+1C') {
//					n = m * 20 + 50;
//				}
//				else {
//					n = m * 55 + 165;
//				}
//			} else {
//				n = m * 55 + 220;
//			}
//			costarr.push(n);
		}
		var sum = 0;
		for (let i = 0; i < costarr.length; i++) {
			sum += costarr[i];
		}
		return sum;
	}
	// --------------------------------
	function findGCD(upsAfterCut) {
		const gcds = [];
		for (let i = 1; i <= upsAfterCut; i++) {
			if (upsAfterCut % i === 0) {
				gcds.push(i);
			}
		}
		return gcds;
	}

	// find Actual Ups Per Printed Paper
	function findActualUpsPerPrintedPaper(upsAfterCut) {
		const gcds = findGCD(upsAfterCut);
		const hs = [];
		for (let i = 0; i < gcds.length; i++) {
			var a = upsAfterCut / gcds[i];
			hs.push(a);
		}
		return hs;
	}

	// get index of array

	function printups(designAmount, upsAmount) {

		var design = designAmount;
		var ups = upsAmount;
		var result = 0.1;
		var plateCount = 1;
		var designForLoop = 0;
		var subtractedDesign = 0;

		for (designForLoop = design; designForLoop > 0; designForLoop--) {
			result = ups / designForLoop;


			if (Number.isInteger(result)) {
				break;
			}
		}

		subtractedDesign = design - designForLoop;

		while (subtractedDesign != 0) {
			var temp = subtractedDesign;

			plateCount++;

			for (designForLoop = temp; designForLoop > 0; designForLoop--) {
				result = ups / designForLoop;

				if (Number.isInteger(result)) {
					break;
				}
			}
			subtractedDesign = temp - designForLoop;
		}
		return (plateCount);
	}

	// find Actual Plates
	function findActualPlates(upsAfterCut, totaldesign) {
		var hs = findActualUpsPerPrintedPaper(upsAfterCut);
		const actualplates = [];
		for (let i = 0; i < hs.length; i++) {
			actualplates.push(
				{
					'actualplate': printups(totaldesign, hs[i]),
					'up': hs[i]
				});
		}
		return actualplates;
	}

	// find testing paper count
	// ppc is 'testing paper count' from properties tabble
	function testingPaperCount(cut, ppc, actualplate, upsFromFormula, color) {
//		var result = ppc * actualplate / upsFromFormula;
        var result = ppc * actualplate / upsFromFormula;
		if (color == '4C+4C' || color == '4C+1C' || color == '4C') {
		    if (cut == 1) {
                result = result / 2 * 4;
		    } else {
		        result = result * 4;
		    }
		} else {
		    if (cut == 1){
                result = result / 2;
		    } else {
		        result = result;
		    }
		}
		/*if (cut == 1) {
			result = result / 2;
		}*/
		return Math.ceil(result);
	}

	// find min in array
	function getMin(arr) {
        const minarr = arr;
        var min = Math.min(...minarr);
		return min;
	}

	// Calculate extraplate cost 64000
	function extraplateCost(cut, colorname, totalpaperneeded, actualplate, actualplatecost, upsfromformula) {
		var result;
		if (cut == 1) {
			if (colorname == '4C+4C' || colorname == '4C+1C' || colorname == '1C+1C') {
				result = totalpaperneeded / actualplate * 4;
			} else {
				result = totalpaperneeded * actualplate * 2;
			}
		} else {
			if (colorname == '4C+4C' || colorname == '4C+1C' || colorname == '1C+1C') {
				result = totalpaperneeded / actualplate * 2;
			} else {
				result = totalpaperneeded * actualplate;
			}
		}
		var a = Math.ceil(result / 64000);
		return (a - 1) * actualplatecost * upsfromformula;
	}

    // calculate ups if 3143 (R column)
    function upsIf3143(cut, actualsUps) {
        if (cut == 1) {
            return Math.ceil(actualsUps / 2);
        }
        return Math.ceil(actualsUps);
    }
	// Calculate cost
	// actualplate bao gom mang cac actual plate duoc tinh boi ham findActualPlates
	function calculatecost(pricePerPiece, cut, ppc, upsAfterCut, totalDesign, paperCost, platecost,
		iscard, colorname, quantityPerDesign, papesrneeded, testingPaperCostFinishing,
		printingChargesPer1000_C, printingBaseCharges_1C, printingChargesPer1000_4C,
        printingBaseCharges_4C, printingBaseCharges_Card, printingBaseChargesPer1000_Card, bookInner,
        diecutpricefinishing, diecutamount, diecutwidth, diecutlength, diecutpriceper1000) {
		const arr = findActualPlates(upsAfterCut, totalDesign);
		const total = [];
		const rs = [];
		const prcost = [];
		for (let i = 0; i < arr.length; i++) {
		    var printcost = findPrintCost(iscard, colorname, quantityPerDesign, upsAfterCut, totalDesign,
		    upsAfterCut / arr[i].up, printingChargesPer1000_C, printingBaseCharges_1C, printingChargesPer1000_4C,
            printingBaseCharges_4C, printingBaseCharges_Card, printingBaseChargesPer1000_Card, cut);
		    prcost.unshift(printcost);
		}
		for (let i = 0; i < arr.length; i++) {
			var papercount = testingPaperCount(cut, ppc, arr[i].actualplate, upsAfterCut / arr[i].up, colorname);
			if (bookInner == "Yes") {
                papercount = Math.ceil(papercount / 2);
            }
			var testingPaperCost = papercount * pricePerPiece;
			var actualplatecost = arr[i].actualplate * platecost;
//			var printcost = findPrintCost(iscard, colorname, quantityPerDesign, upsAfterCut, totalDesign, upsAfterCut / arr[i].up);
			var extraPlateCost = extraplateCost(cut, colorname, papercount + papesrneeded, arr[i].actualplate, actualplatecost, upsAfterCut / arr[i].up);
			var result = testingPaperCost + prcost[i] + paperCost + actualplatecost + extraPlateCost + testingPaperCostFinishing;

			// calculate diecut
			var upsIf3143R = upsIf3143(cut, arr[i].up);
			var o100 = diecutpricefinishing * upsIf3143R;
			var p100 = 0;
			var b61 = diecutwidth + diecutlength;
            if (b61 != 0) {
                p100 = Math.ceil((diecutamount / arr[i].up) /1000) * diecutpriceper1000;
            }
			var diecutprice = o100 + p100;
			var diecut_total = result + diecutprice;
			// --------------------------
			total.push(diecut_total);
			rs.push(
				{
					'testingpapercount': papercount,
					'testingPaperCost': testingPaperCost,
					'actualplate': arr[i].actualplate,
					'actualups' : arr[i].up,
					'extraplatecost': extraPlateCost,
					'printcost': prcost[i],
					'totalcost': result,
					'diecuttotal': diecut_total
				}
			);
		}
		let minimum = getMin(total);
		for (let i = 0; i < rs.length; i++) {
			if (rs[i].diecuttotal == minimum) {
				return rs[i];
			}
		}
	}

	function getNum(val) {
		if (isNaN(val) || !isFinite(val) || typeof (val) === "undefined") {
			return '-';
		}
		return val;
	}
	// ------------

	// Calculate paper needed
	function findPPNeeded(colorname, quantityPerDesign, totalDesign, upsAfterCut, cut) {

	    // old formula
		/*if (colorname == '4C+4C' || colorname == '4C+1C' || colorname == '1C+1C') {
			return Math.ceil(quantityPerDesign * totalDesign / upsAfterCut / 2);
		}
		return Math.ceil(quantityPerDesign * totalDesign / upsAfterCut);*/

		// new formula
        if (cut == 1) {
            if (colorname == '4C+4C' || colorname == '4C+1C' || colorname == '1C+1C') {
                return Math.ceil(quantityPerDesign * totalDesign / upsAfterCut / 2 / 2);
            } else {
                return Math.ceil(quantityPerDesign * totalDesign / upsAfterCut / 2);
            }
        } else {
            if (colorname == '4C+4C' || colorname == '4C+1C' || colorname == '1C+1C') {
                return Math.ceil(quantityPerDesign * totalDesign / upsAfterCut / 2);
            } else {
                return Math.ceil(quantityPerDesign * totalDesign / upsAfterCut);
            }
        }
	}

	// Calculate the vertical ups
	function verticalUps(a, b, c, d, e, f) {
		var x = Math.floor((a - 2 * c) / d) * Math.floor((b - 2 * c) / e);
		var y = Math.floor((a - 2 * c) / e) * Math.floor((b - 2 * c) / d);
		var result;
		var y1 = Math.floor((b - 2 * c) / e);
		var y2 = Math.floor((b - 2 * c) / d);
		if (f == 1) {
			result = (x > y) ? (2 * y1 + ' x ' + e + 'mm') : (2 * y2 + ' x ' + d + 'mm');
		} else {
			result = (x > y) ? (y1 + ' x ' + e + 'mm') : (y2 + ' x ' + d + 'mm');
		}

		return result;
	}

	// Calculate the horizontal ups
	function horizontalUps(a, b, c, d, e) {
		var x = Math.floor((a - 2 * c) / d) * Math.floor((b - 2 * c) / e);
		var y = Math.floor((a - 2 * c) / e) * Math.floor((b - 2 * c) / d);
		var result;
		var x1 = Math.floor((a - 2 * c) / d);
		var x2 = Math.floor((a - 2 * c) / e);
		if (x > y) {
			result = x1 + ' x ' + d + 'mm';
		} else {
			result = x2 + ' x ' + e + 'mm';
		}
		return result;
	}


	// Calculate the max ups
	// a is "width", b is "length after cut", c is "unprintable area"
	// d is "final width with bleed", e is "final length with bleed"
	// f is "cut" if cut == 1 => x * y * 2
	function maxUp(a, b, c, d, e, f) {
		var x = Math.floor((a - 2 * c) / d) * Math.floor((b - 2 * c) / e);
		var y = Math.floor((a - 2 * c) / e) * Math.floor((b - 2 * c) / d);
		var result;
		if (f == 1) {
			result = (x > y) ? 2 * x : 2 * y;
		} else {
			result = (x > y) ? x : y;
		}
		return result;
	}
	// ---------------------

	// function tinh max up after cut
	// a is cut, b is max ups for book
	// c is max up per paper

	// calculate G63
	function g63Cal(D63, B63) {
      if ((D63/B63) % 1 === 0 || D63/B63 === 2 || B63/D63 === 2) {
        return "Yes";
      } else {
        return "No";
      }
    }

    function h63Cal(F63, B63) {
      if ((F63 % B63 === 0) || (F63 / B63 === 2) || (B63 / F63 === 2)) {
        return "Yes";
      } else {
        return "No";
      }
    }

    function e63Cal(cut, width, ua, finalWidth, length, finalLength) {
      if (cut == 1) {
        return Math.min(
          Math.trunc((width - (ua * 2)) / finalWidth) * Math.trunc((length - (ua * 2)) / finalLength),
          Math.trunc((width - (ua * 2)) / finalLength) * Math.trunc((length - (ua * 2)) / finalWidth)
        ) * 2;
      } else {
        return Math.min(
          Math.trunc((width - (ua * 2)) / finalWidth) * Math.trunc((length - (ua * 2)) / finalLength),
          Math.trunc((width - (ua * 2)) / finalLength) * Math.trunc((length - (ua * 2)) / finalWidth)
        );
      }
    }

    // C62 / C63
	function maxUpAfterCutCal(cut, width, ua, finalWidth, length, finalLength, maxUpsPerPaper, bookUps) {


		var D63;
		if (cut == 1) {
			D63 = maxUpsPerPaper / 2;
		}else {
			D63 = maxUpsPerPaper;
		}
		var B63 = bookUps;
		var G63 = g63Cal(D63, B63);
		var E63 = e63Cal(cut, width, ua, finalWidth, length, finalLength);
		var F63 = E63;
		if (cut == 1) {
		    F63 = E63 / 2;
		}
		var H63 = h63Cal(F63, B63);

// ------------ OLD VERSION --------------------
//         if (G63 === "Yes") {
//            return D63;
//         } else if (H63 === "Yes") {
//            return F63;
//         } else if (D63 % B63 === 0) {
//            return D63;
//         } else if (D63 >= B63) {
//            return B63;
//         } else if (D63 < B63 && D63 >= B63 / 2) {
//            return B63 / 2;
//         } else if (D63 < B63 / 2 && D63 >= B63 / 4) {
//            return B63 / 4;
//         } else if (D63 < B63 / 4 && D63 >= B63 / 8) {
//            return B63 / 8;
//         } else if (D63 === 1) {
//            return 1;
//         }

    // NEW VERSION ----------------------------------------------------------------
    var final_result;
        /*if (D63 === 9) {
            final_result= 4;
        } else*/ if (G63 === "Yes") {
            final_result= D63;
        } else if (H63 === "Yes") {
            final_result= F63;
        } else if (D63 % B63 === 0) {
            final_result= D63;
        } else if (D63 >= B63) {
            final_result= B63;
        } else if (D63 < B63 && D63 >= B63 / 2) {
            final_result= B63 / 2;
        } else if (D63 < B63 / 2 && D63 >= B63 / 4) {
            final_result= B63 / 4;
        } else if (D63 < B63 / 4 && D63 >= B63 / 8) {
            final_result= B63 / 8;
        } else if (D63 === 1) {
            final_result= 1;
        }
        return final_result;
	}

	// Calculate cut amount
	function verticalCut(cut, width, length, ua, finalW, finalL) {
		var result;
		var x = Math.floor((width - 2 * ua) / finalW);
		var y = Math.floor((length - 2 * ua) / finalL);
		var z = Math.floor((width - 2 * ua) / finalL);
		var t = Math.floor((length - 2 * ua) / finalW);
		if (cut == 1) {
			if (x * y > z * t) {
				result = y * 2;
			}
			else {
				result = t * 2;
			}
		}
		else {
			if (x * y > z * t) {
				result = y;
			}
			else {
				result = t;
			}
		}
		return result;
	}

	function horizontalCut(width, length, ua, finalW, finalL) {
		var result;
		var x = Math.floor((width - 2 * ua) / finalW);
		var y = Math.floor((length - 2 * ua) / finalL);
		var z = Math.floor((width - 2 * ua) / finalL);
		var t = Math.floor((length - 2 * ua) / finalW);

		if (x * y > z * t) {
			result = x;
		}
		else {
			result = z;
		}
		return result;
	}

	function cutAmount(cut, width, length, ua, finalW, finalL, offsetFixedCut, offset3143FixedCut) {
		var result;
		var vcut = verticalCut(cut, width, length, ua, finalW, finalL);
		var hcut = horizontalCut(width, length, ua, finalW, finalL);
		var totalcut = vcut + hcut - 2;
		if (cut == 1) {
			result = totalcut + offset3143FixedCut;
		}
		else {
			result = totalcut + offsetFixedCut;
		}
		return result;
	}

	// end calculating cut amount

	// DIGITAL PRINT: calculate max ups per paper

	function MaxUpPerPaperDigital(digitalWidth, digitalLength, ua, finalWidth, finalLength) {
//        let val1 = Math.trunc((digitalWidth - (ua * 2)) / finalWidth) * Math.trunc((digitalLength - (ua * 2)) / finalLength);
//        let val2 = Math.trunc((digitalWidth - (ua * 2)) / finalLength) * Math.trunc((digitalLength - (ua * 2)) / finalWidth);
//        let result = val1 > val2 ? Math.trunc((digitalWidth - (ua * 2)) / finalWidth) : Math.trunc((digitalWidth - (ua * 2)) / finalLength);
//        result *= 4;
//        return result;


		var x = Math.trunc((digitalWidth - ua * 2) / finalWidth);
		var y = Math.trunc((digitalLength - ua * 2) / finalLength);
		var z = Math.trunc((digitalWidth - ua * 2) / finalLength);
		var t = Math.trunc((digitalLength - ua * 2) / finalWidth);
		var rs1;
		if (x * y > z * t) {
			rs1 = x;
		} else {
			rs1 = z;
		}

		var rs2;
		if (x * y > z * t) {
			rs2 = y;
		} else {
			rs2 = t;
		}

		return rs1 * rs2 * 4;
	}

	// calculate horizontal ups
	function horizontalUpsDigital(digitalWidth, digitalLength, ua, finalWidth, finalLength) {

		var x = Math.floor((digitalWidth - ua * 2) / finalWidth);
		var y = Math.floor((digitalLength - ua * 2) / finalLength);
		var z = Math.floor((digitalWidth - ua * 2) / finalLength);
		var t = Math.floor((digitalLength - ua * 2) / digitalWidth);
		var result;

		if (x * y > z * t) {
			result = x + ' x ' + finalWidth + 'mm';
		} else {
			result = z + ' x ' + finalLength + 'mm';
		}

		return result;
	}

	// calculate vertical ups
	function verticalUpsDigital(digitalWidth, digitalLength, ua, finalWidth, finalLength) {

		var x = Math.floor((digitalWidth - ua * 2) / finalWidth);
		var y = Math.floor((digitalLength - ua * 2) / finalLength);
		var z = Math.floor((digitalWidth - ua * 2) / finalLength);
		var t = Math.floor((digitalLength - ua * 2) / digitalWidth);
		var result;

		if (x * y > z * t) {
			result = y + ' x ' + finalLength + 'mm';
		} else {
			result = t + ' x ' + finalWidth + 'mm';
		}

		return result;
	}

	// calculate printing cost digital
	function PrintCostDigital(colorname, paperneeded, digitalClickCharge) {
		if (colorname == '4C+4C' || colorname == '4C+1C' || colorname == '1C+1C') {
			return paperneeded * 4 * digitalClickCharge * 2;
		}
		return paperneeded * 4 * digitalClickCharge;
	}


	// ----------------------------------------
	// Check
	function checkfinishingoption(optionfrontgloss, optionbackgloss,
                                                             optionfrontmatt, optionbackmatt, optionfrontwaterbased, optionbackwaterbased,
                                                             optionfrontuv, optionbackuv, optionfrontvarnish, optionbackvarnish, optionfrontspotuv, optionbackspotuv,
                                                             optionemboss, optiondeboss, optionfronths, optionbackhs, optiondiecut, offsetLamTestingQuantity,
                                                             waterBasedTestingQuantity, uvTestingQuantity,
                                                             varnishTestingQuantity, spotuvTestingQuantity, embossdebossTestingQuantity,
                                                             hotstampingTestingQuantity, diecutTestingQuantity,
                                                             softtouchfront, softtouchback) {
	    var sum = 0;
	    if (optionfrontgloss == "Yes" || optionbackgloss == "Yes") {
            sum += offsetLamTestingQuantity;
	    }
        if (optionfrontmatt == "Yes" || optionbackmatt == "Yes") {
            sum += offsetLamTestingQuantity;
	    }
        if (optionfrontwaterbased == "Yes" || optionbackwaterbased == "Yes") {
            sum += waterBasedTestingQuantity;
	    }
        if (optionfrontuv == "Yes" || optionbackuv == "Yes") {
            sum += uvTestingQuantity;
	    }
        if (optionfrontvarnish == "Yes" || optionbackvarnish == "Yes") {
            sum += varnishTestingQuantity;
	    }
        if (optionfrontspotuv == "Yes" || optionbackspotuv == "Yes") {
            sum += spotuvTestingQuantity;
	    }
        if (softtouchfront == "Yes" || softtouchback == "Yes") {
            sum += offsetLamTestingQuantity;
	    }
        if (optionemboss == "Yes" || optiondeboss == "Yes") {
            sum += embossdebossTestingQuantity;
	    }
        if (optionfronths == "Yes" || optionbackhs == "Yes") {
            sum += hotstampingTestingQuantity;
	    }
        if (optiondiecut == "Yes") {
            sum += diecutTestingQuantity;
	    }
	    return sum;
	}
	// CalculateTestPaperForFinishing
	function CalculateTestPaperForFinishing(cut, optionfrontgloss,optionbackgloss
                                            ,optionfrontmatt,optionbackmatt,optionfrontwaterbased,optionbackwaterbased,
                                             optionfrontuv,optionbackuv,optionfrontvarnish,optionbackvarnish,optionfrontspotuv,optionbackspotuv,
                                             optionemboss,optiondeboss,optionfronths,optionbackhs,optiondiecut,offsetLamTestingQuantity,
                                             waterBasedTestingQuantity,uvTestingQuantity,
                                              varnishTestingQuantity,spotuvTestingQuantity,embossdebossTestingQuantity,hotstampingTestingQuantity,diecutTestingQuantity, softtouchfront, softtouchback) {
	    var sum = checkfinishingoption(optionfrontgloss, optionbackgloss,
                           optionfrontmatt, optionbackmatt, optionfrontwaterbased, optionbackwaterbased,
                           optionfrontuv, optionbackuv, optionfrontvarnish, optionbackvarnish, optionfrontspotuv, optionbackspotuv,
                           optionemboss, optiondeboss, optionfronths, optionbackhs, optiondiecut, offsetLamTestingQuantity,
                           waterBasedTestingQuantity, uvTestingQuantity,
                           varnishTestingQuantity, spotuvTestingQuantity, embossdebossTestingQuantity,
                           hotstampingTestingQuantity, diecutTestingQuantity, softtouchfront, softtouchback);
	    return cut == 1 ? sum/2 : sum;
	}

	// ----------------------------------------
    // Calculate cutting costs
	function calculateCuttingCost(totalPaperNeeded, perReam, cuttingPriceBelow10Rim, cuttingPriceBetween, cuttingPriceAbove30Rim) {
      var reamsNeeded = Math.ceil(totalPaperNeeded / perReam);

      if (reamsNeeded > 30) {
        return reamsNeeded * cuttingPriceAbove30Rim;
      } else if (reamsNeeded <= 10) {
        return reamsNeeded * cuttingPriceBelow10Rim;
      } else {
        return reamsNeeded * cuttingPriceBetween;
      }
    }

	// ----------------------------------------

	var pp = papers;
	var pr = props;
	var colorlist = colors;
	var unprintable;
	var offsetppc;
	var offsetppcpp;
	var offsetFixedCut;
	var offset3143Cut;
	var digitalPrintPaperCount;
	var digitalClickCharge;
	// -------
	var offsetLamTestingQuantity;
    var waterBasedTestingQuantity;
    var uvTestingQuantity;
    var varnishTestingQuantity;
    var spotuvTestingQuantity;
    var embossdebossTestingQuantity;
    var hotstampingTestingQuantity;
    var diecutTestingQuantity;
    var uttingPriceBelow10Rim;
    var cuttingPriceBetween;
    var cuttingPriceAbove30Rim;
    var diecutpriceper1000;
    var printingChargesPer1000_C;
    var printingBaseCharges_1C;
    var printingChargesPer1000_4C;
    var printingBaseCharges_4C;
    var printingBaseCharges_Card;
    var printingBaseChargesPer1000_Card;


	$.each(pr, function(index3, item3) {
		if (item3.property == 'Unprintable Area(mm)') {
			unprintable = item3.number;
		}

		if (item3.property == 'Offset Testing Paper Count') {
			offsetppc = item3.number;
		}

		if (item3.property == 'Offset Testing Paper Count Per Plate') {
        	offsetppcpp = item3.number;
        }

		if (item3.property == 'Offset Fixed Cut') {
			offsetFixedCut = item3.number;
		}

		if (item3.property == 'Offset 3143 Fixed Cut') {
			offset3143Cut = item3.number;
		}

		if (item3.property == 'Digital Print Testing Paper Count') {
			digitalPrintPaperCount = item3.number;
		}
		if (item3.property == 'Digital Click Charge') {
			digitalClickCharge = item3.number;
		}
		// -------------------------------------------------
		// -------------------------------------------------
        if (item3.property == 'Offset Lam Testing Quantity') {
			offsetLamTestingQuantity = item3.number;
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
			spotuvTestingQuantity = item3.number;
		}

		if (item3.property == 'Emboss/Deboss Testing Quantity') {
			embossdebossTestingQuantity = item3.number;
		}
		if (item3.property == 'Hot Stamping Testing Quantity') {
			hotstampingTestingQuantity = item3.number;
		}
        if (item3.property == 'Diecut Testing Quantity') {
			diecutTestingQuantity = item3.number;
		}
        if (item3.property == 'Cutting Price Below 10 Rim') {
			cuttingPriceBelow10Rim = item3.number;
		}
		if (item3.property == 'Cutting Price 11 Rim - 30 Rim') {
			cuttingPriceBetween = item3.number;
		}
        if (item3.property == 'Cutting Price Above 30 Rim') {
			cuttingPriceAbove30Rim = item3.number;
		}

        if (item3.property == 'Printing Base Charges 1C') {
			printingBaseCharges_1C = item3.number;
		}
		if (item3.property == 'Printing Charges Per 1000 1C') {
			printingChargesPer1000_C = item3.number;
		}
        if (item3.property == 'Printing Base Charges 4C') {
			printingBaseCharges_4C = item3.number;
		}
        if (item3.property == 'Printing Charges Per 1000 4C') {
			printingChargesPer1000_4C = item3.number;
		}
		if (item3.property == 'Printing Base Charges Card') {
			printingBaseCharges_Card = item3.number;
		}
        if (item3.property == 'Printing Charges Per 1000 Card') {
			printingBaseChargesPer1000_Card = item3.number;
		}
        if (item3.property == 'Diecut Price Per 1000') {
			diecutpriceper1000 = item3.number;
		}
	});
	// hien thi paper name
	$("#paperGrammage").change(function() {

		var papergr = $('#paperGrammage').find(":selected").text();
		$('#finalPaperCategory').html(papergr);


		// hien thi cac paper type phu hop
		$.each(pp, function(index, item) {

			$("#calculateprice").click(function() {
			    $('#suggestingPropsTable').remove();

				// -------------------------------------------------

				var totaldesign = parseInt($('#totalDesigns').val());
				var colorname = $('#paperColor').find(":selected").text();
				var iscard = $('#isCard').val();

				// -------------------------------------------------

                // old single quantity
				var quantityPerDesign = parseInt($('#quantityPerDesign').val());

			    // Get numbers of quantity per design
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

				var colorcost;
				for (let index = 0; index < colorlist.length; index++) {
					if (colorname == colorlist[index].color_name) {
						colorcost = colorlist[index].platecost;
					}
				}
				var val = $('#paperGrammage').val();
				var finalwidth = parseInt($('#finalWidthDisplay').val());
				var finallength = parseInt($('#finalLengthDisplay').val());
				var isBookInner = $('#bookInner').find(":selected").text();
				// ----------------------------------------------------------------

                // ----------------------------------------------------------------
				$.each(item.pgList, function(index1, item1) {
					if (val == item1.grammage) {
						$(".listofppc").remove();
						// add loop of quantity here
                        for (let q = 0; q < quantityPerDesign_quantity_arr.length; q++) {
                            const printResults = [];
                            const minPrices = [];
                            var table_quantity_index = q == 0 ? '' : q;

                            $.each(item1.ptList, function(index2, item2) {
                            					        if (item2.isEnable == true) {
                            						    var pricePerPiece;

                            							// ---------------------------------------------------
                            							// calculate offset print

                            							// tinh max up per paper
                            							var maxupperpaper = parseInt(maxUp(parseInt(item2.width), parseInt(item2.lengthAfterCut), parseInt(unprintable),
                            								finalwidth, finallength, item2.cut));

                            							// tinh up after cut/book ups
                            							var maxUpAfterCut;
                            							if (isBookInner === 'No') {
                            							    maxUpAfterCut = item2.cut == 1 ? maxupperpaper/2 : maxupperpaper;
                            							}
                            							else {
                                                            maxUpAfterCut = maxUpAfterCutCal(item2.cut, item2.width, unprintable, finalwidth, item2.length, finallength,  maxupperpaper, item2.maxUpForBooks);
                            							}
                            							// ---------------------

                            							// ---------------------
                            							// tinh horizontal ups
                            							var hUps = horizontalUps(parseInt(item2.width), parseInt(item2.lengthAfterCut), parseInt(unprintable),
                            								finalwidth, finallength, item2.cut)
                            							// tinh vertical ups
                            							var vUps = verticalUps(parseInt(item2.width), parseInt(item2.lengthAfterCut), parseInt(unprintable),
                            								finalwidth, finallength, item2.cut);

                            							// tinh lowest cost -> actual plate, ... etc
                            							// --------------------------------
                            							var optionFrontGlossLamination = $('#glosslaminationf').find(":selected").text();
                                                        var optionBackGlossLamination = $('#glosslaminationb').find(":selected").text();
                                                        var optionFrontMattLamination = $('#mattLaminationf').find(":selected").text();
                                                        var optionBackMattLamination = $('#mattLaminationb').find(":selected").text();
                                                        var optionFrontWaterBased = $('#waterbasedf').find(":selected").text();
                                                        var optionBackWaterBased = $('#waterbasedb').find(":selected").text();
                                                        var optionFrontUV = $('#uvfront').find(":selected").text();
                                                        var optionBackUV = $('#uvback').find(":selected").text();
                                                        var optionFrontVarnish = $('#varnishfront').find(":selected").text();
                                                        var optionBackVarnish = $('#varnishback').find(":selected").text();
                                                        var spotuvoptionfront = $('#spotuvfront').find(":selected").text();
                                                        var spotuvoptionback = $('#spotuvback').find(":selected").text();;
                                                        var embossoption = $('#emboss').find(":selected").text();
                                                        var debossoption = $('#deboss').find(":selected").text();
                                                        var hsoptionFront = $('#hotstampingfront').find(":selected").text();
                                                        var hsoptionBack = $('#hotstampingback').find(":selected").text();
                                                        var diecutoption = $('#diecut').find(":selected").text();
                                                        var softtouchfront = $('#softtouchfront').find(":selected").text();
                                                        var softtouchback = $('#softtouchback').find(":selected").text();
                                                        var diecutpricefinishing = $('#hiddendiecutblock').val();
                                                        var diecutamount = $('#diecutamount1').val();
                                                        var diecutwidth = $('#diecutwidth1').val();
                                                        var diecutlength = $('#diecutlength1').val();
                            							// --------------------------------

                            							var testPaperForFinishing = CalculateTestPaperForFinishing(item2.cut,
                            							                            optionFrontGlossLamination,optionBackGlossLamination,
                            							                            optionFrontMattLamination, optionBackMattLamination,
                            							                            optionFrontWaterBased, optionBackWaterBased,
                            							                            optionFrontUV, optionBackUV,
                            							                            optionFrontVarnish, optionBackVarnish,
                            							                            spotuvoptionfront, spotuvoptionback,
                            							                            embossoption, debossoption,
                            							                            hsoptionFront, hsoptionBack,
                            							                            diecutoption,
                            							                            offsetLamTestingQuantity,
                                                                                    waterBasedTestingQuantity,
                                                                                    uvTestingQuantity,
                                                                                    varnishTestingQuantity,
                                                                                    spotuvTestingQuantity,
                                                                                    embossdebossTestingQuantity,
                                                                                    hotstampingTestingQuantity,
                                                                                    diecutTestingQuantity,softtouchfront, softtouchback);

                            							// ------------------------------------------
                            							var testPaperForFinishingDigital = checkfinishingoption(optionFrontGlossLamination,optionBackGlossLamination,
                                                                                           optionFrontMattLamination, optionBackMattLamination,
                                                                                           optionFrontWaterBased, optionBackWaterBased,
                                                                                           optionFrontUV, optionBackUV,
                                                                                           optionFrontVarnish, optionBackVarnish,
                                                                                           spotuvoptionfront, spotuvoptionback,
                                                                                           embossoption, debossoption,
                                                                                           hsoptionFront, hsoptionBack,
                                                                                           diecutoption,
                                                                                           offsetLamTestingQuantity,
                                                                                           waterBasedTestingQuantity,
                                                                                           uvTestingQuantity,
                                                                                           varnishTestingQuantity,
                                                                                           spotuvTestingQuantity,
                                                                                           embossdebossTestingQuantity,
                                                                                           hotstampingTestingQuantity,
                                                                                           diecutTestingQuantity,
                                                                                           softtouchfront, softtouchback
                                                                                           ) / 4;

                                                        var bookInner = $('#bookInner').find(":selected").text();


                            							var ppneeded = findPPNeeded(colorname, quantityPerDesign_quantity_arr[q], totaldesign, maxUpAfterCut, item2.cut);

                            							// make an array of ppneeded based on numbers on quantityPerDesigns



                            							var lowestarr = calculatecost(item2.pricePerCuts, item2.cut, offsetppcpp, maxUpAfterCut,
                            								totaldesign, ppneeded * item2.pricePerCuts, colorcost, iscard,
                            								colorname, quantityPerDesign_quantity_arr[q], ppneeded, item2.pricePerCuts * getNum(testPaperForFinishing),
                            								printingChargesPer1000_C, printingBaseCharges_1C, printingChargesPer1000_4C,
                                                            printingBaseCharges_4C, printingBaseCharges_Card, printingBaseChargesPer1000_Card, bookInner,
                                                            diecutpricefinishing, diecutamount, diecutwidth, diecutlength, diecutpriceper1000);


                                                        var customerSupplyPlate = $('#customerSupplyPlate').prop('checked');
                                                        var customerSupplyPaper = $('#customerSupplyPaper').prop('checked');
                                                        // tinh cut amount
                                                        var cutamount = cutAmount(item2.cut, item2.width, item2.lengthAfterCut, unprintable, finalwidth, finallength, offsetFixedCut, offset3143Cut);



                                                        // values that used lowestarr which uses multiple quantity

                            							var actualplate = lowestarr?.actualplate;
                            							var testppcount = lowestarr?.testingpapercount;
                            							var testppcost = ToNumber(lowestarr?.testingPaperCost).toFixed(2);

                            							var printcost = lowestarr?.printcost;
                            							var ppcost = ToNumber(ppneeded * item2.pricePerCuts);
                            							var totalppneeded = testppcount + ppneeded + testPaperForFinishing;
                            							var extraplatecost = lowestarr?.extraplatecost;


                                                        // tinh cut price
                                                        var cuttingCost = calculateCuttingCost(totalppneeded, item2.perReamPackage, cuttingPriceBelow10Rim, cuttingPriceBetween, cuttingPriceAbove30Rim);
                            							// calculate total price
                            							var totalprice = lowestarr?.totalcost;


                            							if (customerSupplyPlate) {
                            								if (customerSupplyPaper) {
                            									totalprice = lowestarr?.totalcost - (lowestarr?.testingPaperCost + ppneeded * item2.pricePerCuts) - lowestarr?.actualplate * colorcost;
                            								} else {
                            									totalprice = lowestarr?.totalcost - lowestarr?.actualplate * colorcost;
                            								}
                            							} else {
                            								if (customerSupplyPaper) {
                            									totalprice = lowestarr?.totalcost - (lowestarr?.testingPaperCost + ppneeded * item2.pricePerCuts);
                            								} else {
                            									totalprice = lowestarr?.totalcost;
                            								}
                            							}


                            							// offset print (big machine)
                            							var newRow = $(
                            								"<tr class='listofppc' style='background-color: black; color: white;'>" +
                            								"<th class='finishingPropsHead-print'>...</th>" +
                            								"<td>" + item2.type + "</td>" +
                            								"<td>" + item2.width.toFixed(2) + " mm x" + item2.length.toFixed(2) + " mm" + "</td> " +
                            								"<td>" + getNum(maxupperpaper) + "" + "</td>" +
                            								"<td>" + getNum(maxUpAfterCut) + "</td>" +
                            								"<td>" + hUps + "</td>" +
                            								"<td>" + vUps + "</td>" +
                            								"<td>" + getNum(actualplate) + "</td>" +
                            								"<td>" + getNum((actualplate * colorcost).toFixed(2)) + "</td>" +
                            								"<td>" + getNum(ppneeded) + "</td>" +
                            								"<td>" + getNum(ppcost.toFixed(2)) + "</td>" +
                            								"<td>" + getNum(testppcount) + "</td>" +
                            								"<td>" + getNum(testppcost) + "</td>" +
                            								"<td>" + getNum(totalppneeded) + "</td>" +
                            								"<td>" + getNum((lowestarr?.testingPaperCost + ppneeded * item2.pricePerCuts + getNum(item2.pricePerCuts * getNum(testPaperForFinishing))).toFixed(2)) + "</td>" +
                            								"<td>" + getNum(printcost) + "</td>" +
                            								"<td>" + getNum(extraplatecost) + "</td>" +
                            								"<td>" + getNum(cutamount) + "</td>" +
                            								"<td>" + getNum(cuttingCost) + "</td>" +
                            								"<td>" + (testPaperForFinishing) + "</td>" +
                            								"<td>" + getNum(item2.pricePerCuts * getNum(testPaperForFinishing)) + "</td>" +
                            								"<td style='color: green; font-style: italic; font-weight: bold;'>" + ToNumber(totalprice).toFixed(2) + "</td>" +
                            		                        "<td>" + getNum(getNum(Math.ceil(getNum(totalppneeded)/item2.perReamPackage)) * item2.perReamPackage) +"</td>" +
                            								"<td>" + getNum(Math.ceil(getNum(totalppneeded)/item2.perReamPackage)) +"</td>" +
                            								"<td>" + getNum(Math.ceil(getNum(totalppneeded)/item2.perReamPackage) * item2.price) +"</td>" +
                            								"<td>" + getNum(ToNumber(totalprice).toFixed(2) - getNum((lowestarr?.testingPaperCost + ppneeded * item2.pricePerCuts + getNum(item2.pricePerCuts * getNum(testPaperForFinishing))).toFixed(2)) + getNum(Math.ceil(getNum(totalppneeded)/item2.perReamPackage) * item2.price)) +"</td>"
                            								+"</tr>");
                            							if (ToNumber(totalprice) != 0 && ToNumber(totalprice)!= 0.00) {
                            							    minPrices.push(ToNumber(totalprice).toFixed(2));
                            							}
                            							printResults.push(
                            								{
                            								    'Max_Ups_Per_Paper': getNum(maxupperpaper),
                            								    'Horizontal_ups':  hUps,
                            								    'Vertical_ups': vUps,
                            								    'Plates_needed': getNum(actualplate),
                            								    'Testing_paper_needed': getNum(testppcount),
                            								    'Cut_amount': getNum(cutamount),
                            								    'Testing_paper_finishing': testPaperForFinishing,

                            									'PaperUsed': item2.type,
                            									'PrintType': 'Offset Print',
                            									'ActualUp': lowestarr?.actualups,
                            									'Quantity': quantityPerDesign_quantity_arr[q],
                            									'Color': colorname,
                            									'Size': $('#sizeSelect').find(":selected").text(),
                            									'PaperNeed': ppneeded,
                            									'upsaftercut': maxUpAfterCut,
                            									'Cost': ToNumber(totalprice).toFixed(2),
                            									'LengthAfterCut': item2.lengthAfterCut,
                            									'InchesSquareAfterCut': item2.inchesSquareAfterCut,
                            									'CuttingCost': getNum(cuttingCost),
                            									'RoundedPrice': getNum(ToNumber(totalprice).toFixed(2) - getNum((lowestarr?.testingPaperCost + ppneeded * item2.pricePerCuts + getNum(item2.pricePerCuts * getNum(testPaperForFinishing))).toFixed(2)) + getNum(Math.ceil(getNum(totalppneeded)/item2.perReamPackage) * item2.price))
                            								}
                            							);
                            							// append rows

                            							$("#calculationTableHead" + table_quantity_index).after(newRow);

                            							// --------------------------------------------

                            							// calculate digital print
                            							// digital print (small machine)
                            							var invaliddigitalSize = "31' x 43'";
                            							var productSize = $('#sizeSelect').find(":selected").text();
                            							var a3PaperSize = 124740;
                            							var productSizeValid = ToNumber($('#widthDisplay').val()) * ToNumber($('#lengthDisplay').val());
                            							// check for digital print condition
                            							if (!item2.type.includes(invaliddigitalSize) && productSize != 'A1'
                            								&& productSize != 'A2' && productSize != 'B1' && productSize != 'B2'
                            								&& productSize != 'B3' && productSizeValid <= a3PaperSize) {
                            								// calculate max ups per paper
                            								var maxUpsPerPaperDigital = MaxUpPerPaperDigital(item2.digitalWidth, item2.digitalLength, unprintable, finalwidth, finallength);
                            								// calculate horizontal and vertical ups
                            								var digitalHorizontalUps = horizontalUpsDigital(item2.digitalWidth, item2.digitalLength, unprintable, finalwidth, finallength);
                            								var digitalVerticalUps = verticalUpsDigital(item2.digitalWidth, item2.digitalLength, unprintable, finalwidth, finallength);
                            								// calculate paper needed
                            								var upsAfterCutdigital = maxUpsPerPaperDigital / 4;
                            								var paperNeededDigital = findPPNeeded(colorname, quantityPerDesign_quantity_arr[q], totaldesign, maxUpsPerPaperDigital, item2.cut);
                            								// calculate testing paper needed
                            								var testingPaperNeedDigital = Math.ceil(paperNeededDigital * 4 / 1000) * digitalPrintPaperCount;
                            								var testingPaperNeedDigitalCost = testingPaperNeedDigital * item2.pricePerCuts;

                            								// calculate print cost digital
                            								var printingCostDigital = PrintCostDigital(colorname, paperNeededDigital, digitalClickCharge);

                            								// calculate total price
                            								var cuttingCostDigital = calculateCuttingCost(getNum(paperNeededDigital + testingPaperNeedDigital), item2.perReamPackage, cuttingPriceBelow10Rim, cuttingPriceBetween, cuttingPriceAbove30Rim);
                            								var totalpricedigital = printingCostDigital + paperNeededDigital * item2.pricePerCuts + testingPaperNeedDigitalCost + item2.pricePerCuts * getNum(testPaperForFinishingDigital);
                            								var customerSupplyPaperDigital = $('#customerSupplyPaper').prop('checked');
                            								if (customerSupplyPaperDigital) {
                            									totalpricedigital = printingCostDigital;
                            								}
                            								// call new row
                            								var newRowDigital = $(
                            									"<tr class='listofppc' style='color: white; background-color: black;'>" +
                            									"<th class='finishingPropsHead-print'>...</th>" +
                            									"<td>" + item2.type + "</td>" +
                            									"<td>" + item2.width.toFixed(2) + " mm x" + item2.length.toFixed(2) + " mm" + "</td> " +
                            									"<td>" + getNum(maxUpsPerPaperDigital) + "" + "</td>" +
                            									"<td id='upsaftercutdigital" + table_quantity_index + "'>" + getNum(maxUpsPerPaperDigital / 4) + "</td>" +
                            									"<td>" + digitalHorizontalUps + "</td>" +
                            									"<td>" + digitalVerticalUps + "</td>" +
                            									"<td>-</td>" +
                            									"<td>-</td>" +
                            									"<td>" + getNum(paperNeededDigital) + "</td>" +
                            									"<td>" + getNum((paperNeededDigital * item2.pricePerCuts).toFixed(2)) + "</td>" +
                            									"<td>" + getNum(testingPaperNeedDigital) + "</td>" +
                            									"<td>" + getNum(testingPaperNeedDigitalCost.toFixed(2)) + "</td>" +
                            									"<td>" + getNum(paperNeededDigital + testingPaperNeedDigital + testPaperForFinishingDigital) + "</td>" +
                            									"<td>" + getNum((paperNeededDigital * item2.pricePerCuts + testingPaperNeedDigitalCost + getNum(item2.pricePerCuts * getNum(testPaperForFinishingDigital))).toFixed(2)) + "</td>" +
                            									"<td>" + getNum(printingCostDigital.toFixed(2)) + "</td>" +
                            									"<td>-</td>" +
                            									"<td>-</td>" +
                            									"<td>" + getNum(cuttingCostDigital) +"</td>" +
                            									"<td>" + getNum(testPaperForFinishingDigital) +"</td>" +
                            									"<td>" + getNum(item2.pricePerCuts * getNum(testPaperForFinishingDigital)) + "</td>" +
                            									"<td style='color: green; font-style: italic; font-weight: bold;'>" + totalpricedigital.toFixed(2) + "</td>" +
                                                                "<td>" + getNum(getNum(Math.ceil(getNum(paperNeededDigital + testingPaperNeedDigital)/item2.perReamPackage)) * item2.perReamPackage) +"</td>" +
                            							    	"<td>" + getNum(Math.ceil(getNum(paperNeededDigital + testingPaperNeedDigital)/item2.perReamPackage)) +"</td>" +
                            								    "<td>" + getNum(Math.ceil(getNum(paperNeededDigital + testingPaperNeedDigital)/item2.perReamPackage) * item2.price) +"</td>" +
                            								    "<td>" + getNum(totalpricedigital.toFixed(2) - getNum((paperNeededDigital * item2.pricePerCuts + testingPaperNeedDigitalCost + getNum(item2.pricePerCuts * getNum(testPaperForFinishingDigital))).toFixed(2)) + getNum(Math.ceil(getNum(paperNeededDigital + testingPaperNeedDigital)/item2.perReamPackage) * item2.price)) +"</td>"
                                                                + "</tr>");

                                                            if ($('#forceuseoffset').find(":selected").text() === 'No') {
                                                                    if (ToNumber(totalpricedigital) != 0 && ToNumber(totalpricedigital)!= 0.00) {
                                                                        minPrices.push(totalpricedigital.toFixed(2));
                                                                    }
                                                                    printResults.push(
                            									    {
                            								            'Max_Ups_Per_Paper': getNum(maxUpsPerPaperDigital),
                            								            'Horizontal_ups':  digitalHorizontalUps,
                            								            'Vertical_ups': digitalVerticalUps,
                            								            'Plates_needed': 0,
                            								            'Testing_paper_needed': getNum(testingPaperNeedDigital),
                            								            'Cut_amount': 0,
                            								            'Testing_paper_finishing': getNum(testPaperForFinishingDigital),

                            										    'PaperUsed': item2.type,
                            										    'PrintType': 'Digital Print',
                            										    'ActualUp': (maxUpsPerPaperDigital / 4),
                            										    'Quantity': quantityPerDesign_quantity_arr[q],
                            										    'Color': colorname,
                            										    'Size': $('#sizeSelect').find(":selected").text(),
                            										    'PaperNeed': paperNeededDigital,
                            										    'upsaftercut': (maxUpsPerPaperDigital / 4),
                            										    'Cost': totalpricedigital.toFixed(2),
                            										    'LengthAfterCut': item2.lengthAfterCut,
                            										    'InchesSquareAfterCut': item2.inchesSquareAfterCut,
                            										    'CuttingCost': getNum(cuttingCostDigital),
                            										    'RoundedPrice': getNum(totalpricedigital.toFixed(2) - getNum((paperNeededDigital * item2.pricePerCuts + testingPaperNeedDigitalCost + getNum(item2.pricePerCuts * getNum(testPaperForFinishingDigital))).toFixed(2)) + getNum(Math.ceil(getNum(paperNeededDigital + testingPaperNeedDigital)/item2.perReamPackage) * item2.price))
                            									    }
                            								    );
                                                            }

                            								// append rows
                            								$("#digitalprintpaper" + table_quantity_index).after(newRowDigital);
                            							}
                            							// caculating
                            							}
                            						});
                            					    // add rows to table

                            					// suggestion tables
                            					var minimum = getMin(minPrices);
                                                for (let i = 0; i < printResults.length; i++) {
                                                	if (printResults[i].Cost == minimum) {
                                                        $('#lowestCostFound' + table_quantity_index).html(printResults[i].Cost);
                                                        $('#suggestionQuantity' + table_quantity_index).html(printResults[i].Quantity);
                                                        $('#suggestionPaperUsed' + table_quantity_index).html(printResults[i].PaperUsed);
                                                        $('#suggestionColor' + table_quantity_index).html(printResults[i].Color);
                                                        $('#printTechnique' + table_quantity_index).html(printResults[i].PrintType);
                                                        $('#suggestionSize' + table_quantity_index).html(printResults[i].Size);
                                                        $('#suggestionActualUp' + table_quantity_index).html(printResults[i].ActualUp);
                                                        $('#paperneededlowest' + table_quantity_index).val(printResults[i].PaperNeed);
                                                        $('#upsaftercutLowest' + table_quantity_index).val(printResults[i].upsaftercut);
                                                        $('#lengthaftercuthidden' + table_quantity_index).val(printResults[i].LengthAfterCut);
                                                        $('#InchesSquareAfterCuthidden' + table_quantity_index).val(printResults[i].InchesSquareAfterCut);
                                                        $('#suggestionCutPrice' + table_quantity_index).html(printResults[i].CuttingCost);
                                                        $('#suggestionRoundedPrice' + table_quantity_index).html(printResults[i].RoundedPrice);

                                                        // fill the hidden fields for draft
                                                        $('#hidden_max_ups_per_paper' + table_quantity_index).val(printResults[i].Max_Ups_Per_Paper);
                                                        $('#hidden_ups_after_cut' + table_quantity_index).val(printResults[i].upsaftercut);
                                                        $('#hidden_horizontal_ups' + table_quantity_index).val(printResults[i].Horizontal_ups);
                                                        $('#hidden_vertical_ups' + table_quantity_index).val(printResults[i].Vertical_ups);
                                                        $('#hidden_plates_needed' + table_quantity_index).val(printResults[i].Plates_needed);
                                                        $('#hidden_paper_needed' + table_quantity_index).val(printResults[i].PaperNeed);
                                                        $('#hidden_testing_paper_needed' + table_quantity_index).val(printResults[i].Testing_paper_needed);
                                                        $('#hidden_cut_amount' + table_quantity_index).val(printResults[i].Cut_amount);
                                                        $('#hidden_testing_paper_finishing' + table_quantity_index).val(printResults[i].Testing_paper_finishing);
                                                        $('#hidden_actual_ups_paper' + table_quantity_index).val(printResults[i].ActualUp);
                                                    }
                                                }
                        }
					}
				});
				});
			});
		});
	});
});