// tinh final total product
document.addEventListener('DOMContentLoaded', () => {
$(document).ready(function() {
	$('#quantityPerDesign').keyup(function() {
		updateTotal();
	});

	$("#paperColor").change(function() {
		updateTotal();
	});

	$('#totalDesigns').keyup(function() {
		updateTotal();
	});

	var updateTotal = function() {
		var colorname = $('#paperColor').find(":selected").text();
		var input1 = parseInt($('#quantityPerDesign').val());
		var input2 = parseInt($('#totalDesigns').val());
		if (isNaN(input1) || isNaN(input2)) {
			$('#totalQuantity').text('Inputs must be numbers');
		} else {
			if (colorname == '4C+1C' || colorname == '1C+1C' || colorname == '4C+4C') {
				var tt = Math.round(input1 * input2 / 2);
				$('#totalQuantity').text(tt);
			} else {
				$('#totalQuantity').text(input1 * input2);
			}
		}
		var output_total = $('#totalQuantity');



		if (colorname == '4C+1C' || colorname == '1C+1C' || colorname == '4C+4C') {
			var tt = Math.round(input1 * input2 / 2);
			var total = tt;
			output_total.val(total);

		} else {
			var total = input1 * input2;
			output_total.val(total);
		}
	};
});

// tinh width va length
$(document).ready(function() {

	$('#sizeSelect').on('change', function() {
		updateTotal();
	});

	$('#widthDisplay').keyup(function() {
		updateTotal();
	});

	$('#lengthDisplay').keyup(function() {
		updateTotal();
	});

	$('#bleedWidthDisplay').keyup(function() {
		updateTotal();
	});

	$('#bleedLengthDisplay').keyup(function() {
		updateTotal();
	});

	$('#finalWidthDisplay').keyup(function() {
		updateTotal();
	});

	$('#finalLengthDisplay').keyup(function() {
		updateTotal();
	});

	var updateTotal = function() {
		var input1 = parseInt($('#widthDisplay').val());
		var input2 = parseInt($('#lengthDisplay').val());
		var input3 = parseInt($('#bleedWidthDisplay').val());
		var input4 = parseInt($('#bleedLengthDisplay').val());
		if (isNaN(input1) || isNaN(input2) || isNaN(input3) || isNaN(input4)) {
			$('#finalWidthDisplay').text('Inputs must be numbers');
			$('#finalLengthDisplay').text('Inputs must be numbers');
		} else {
			$('#finalWidthDisplay').text(input1 + input3);
			$('#finalWidthDisplay').val(input1 + input3);
			$('#finalLengthDisplay').text(input2 + input4);
			$('#finalLengthDisplay').val(input2 + input4);
		}
		var output_total1 = $('#finalWidthDisplay');
		var output_total2 = $('#finalLengthDisplay');

		var total1 = input1 + input3;
		var total2 = input2 + input4;
		output_total1.val(total1);
		output_total2.val(total2);

		input5 = parseInt($('#finalWidthDisplay').val());
		input6 = parseInt($('#finalLengthDisplay').val());
		if (isNaN(input5) || isNaN(input6)) {
			$('#areaInMM').text('Inputs must be numbers');
			$('#areaInInches').text('Inputs must be numbers');
		} else {
			$('#areaInMM').text(input5 * input6);
			$('#areaInInches').text(input5 * input6 * 0.00155);
		}

		var output3 = $('#areaInMM');
		var output4 = $('#areaInInches');

		var total3 = $('#finalWidthDisplay').val() * $('#finalLengthDisplay').val();
		var total4 = total3 * 0.00155;
		output3.val(total3);
		output4.val(total4);
	};
});

// disable input of finishing table based on option
$(document).ready(function() {
	// gloss lamination
	$("#glosslaminationf").change(function() {
		var opt = $('#glosslaminationf').find(":selected").text();
		if (opt == 'No') {
			$("#glAmountf").val("");
			$("#glAmountf").prop("readonly", true);
			$("#glosslaminationfrontwarning").val("");
		} else {
			$("#glAmountf").prop("readonly", false);
			$("#glAmountf").val($("#quantityPerDesign").val());
		}
	});

	$("#glosslaminationb").change(function() {
		var opt = $('#glosslaminationb').find(":selected").text();
		if (opt == 'No') {
			$("#glAmountb").val("");
			$("#glAmountb").prop("readonly", true);
			$("#glosslaminationbackwarning").val("");
		} else {
			$("#glAmountb").prop("readonly", false);
			$("#glAmountb").val($("#quantityPerDesign").val());
		}
	});

	 $('#glAmountf').keyup(function() {
		var glamountf = $("#glAmountf").val();
		var quantity = $("#totalQuantity").val();
		if (glamountf > quantity) {
			$("#glosslaminationfrontwarning").val("Front lamination amount more than total quantity amount");
		} else {
			if (glamountf < quantity) {
				$("#glosslaminationfrontwarning").val("Front lamination amount less than total quantity amount");
			} else {
				$("#glosslaminationfrontwarning").val("");
			}
		}
	});

    $('#glAmountb').keyup(function() {
		var glamountb = $("#glAmountb").val();
		var quantity = $("#totalQuantity").val();
		if (glamountb > quantity) {
			$("#glosslaminationbackwarning").val("Back lamination amount more than total quantity amount");
		} else {
			if (glamountb < quantity) {
				$("#glosslaminationbackwarning").val("Back lamination amount less than total quantity amount");
			} else {
				$("#glosslaminationbackwarning").val("");
			}
		}
	});

 // matt lamination
	$("#mattLaminationf").change(function() {
		var opt = $('#mattLaminationf').find(":selected").text();
		if (opt == 'No') {
			$("#mlAmountf").val("");
			$("#mlAmountf").prop("readonly", true);
			$("#mattlaminationfrontwarning").val("");
		} else {
			$("#mlAmountf").prop("readonly", false);
            $("#mlAmountf").val($("#quantityPerDesign").val());
		}
	});


	$("#mattLaminationb").change(function() {
		var opt = $('#mattLaminationb').find(":selected").text();
		if (opt == 'No') {
			$("#mlAmountb").val("");
			$("#mlAmountb").prop("readonly", true);
			$("#mattlaminationbackwarning").val("");
		} else {
			$("#mlAmountb").prop("readonly", false);
			$("#mlAmountb").val($("#quantityPerDesign").val());
		}
	});

	$('#mlAmountf').keyup(function() {
		var mlAmountf = $("#mlAmountf").val();
		var quantity = $("#totalQuantity").val();
		if (mlAmountf > quantity) {
			$("#mattlaminationfrontwarning").val("Front lamination amount more than total quantity amount");
		} else {
			if (mlAmountf < quantity) {
				$("#mattlaminationfrontwarning").val("Front lamination amount less than total quantity amount");
			} else {
				$("#mattlaminationfrontwarning").val("");
			}
		}
	});

	$('#mlAmountb').keyup(function() {
		var mlAmountb = $("#mlAmountb").val();
		var quantity = $("#totalQuantity").val();
		if (mlAmountb > quantity) {
			$("#mattlaminationbackwarning").val("Back lamination amount more than total quantity amount");
		} else {
			if (mlAmountb < quantity) {
				$("#mattlaminationbackwarning").val("Back lamination amount less than total quantity amount");
			} else {
				$("#mattlaminationbackwarning").val("");
			}
		}
	});
	// ---------------------------------------------------------------------------
	// water based
	$("#waterbasedf").change(function() {
		var opt = $('#waterbasedf').find(":selected").text();
		if (opt == 'No') {
			$("#wbAmountf").val("");
			$("#wbAmountf").prop("readonly", true);
			$("#waterbasedfrontwarning").val("-");
		} else {
			$("#wbAmountf").prop("readonly", false);
            $("#wbAmountf").val($("#quantityPerDesign").val());
		}
	});

	$("#waterbasedb").change(function() {
		var opt = $('#waterbasedb').find(":selected").text();
		if (opt == 'No') {
			$("#wbAmountb").val("");
			$("#wbAmountb").prop("readonly", true);
			$("#waterbasedbackwarning").val("-");
		} else {
			$("#wbAmountb").prop("readonly", false);
			$("#wbAmountb").val($("#quantityPerDesign").val());
		}
	});

	$('#wbAmountf').keyup(function() {
		var wbAmountf = $("#wbAmountf").val();
		var quantity = $("#totalQuantity").val();
		if (wbAmountf > quantity) {
			$("#waterbasedfrontwarning").val("Front finishing amount more than total quantity amount");
		} else {
			if (wbAmountf < quantity) {
				$("#waterbasedfrontwarning").val("Front finishing amount less than total quantity amount");
			} else {
				$("#waterbasedfrontwarning").val("-");
			}
		}
	});

	$('#wbAmountb').keyup(function() {
		var wbAmountb = $("#wbAmountb").val();
		var quantity = $("#totalQuantity").val();
		if (wbAmountb > quantity) {
			$("#waterbasedbackwarning").val("Back finishing amount more than total quantity amount");
		} else {
			if (wbAmountb < quantity) {
				$("#waterbasedbackwarning").val("Back finishing amount less than total quantity amount");
			} else {
				$("#waterbasedbackwarning").val("-");
			}
		}
	});

	// ---------------------------------------------------------------------------
	// uv
	$("#uvfront").change(function() {
		var paperCategory = $('#paperCategory').find(":selected").text();
		if (paperCategory.includes('Simili')) {
			$("#uvfrontwarning").val("Simili cannot do UV");
			$('#uvAmountf').val('');
			$("#uvAmountf").prop("readonly", true);
		}
		var opt = $('#uvfront').find(":selected").text();
		if (opt == 'No') {
			$("#uvAmountf").val("");
			$("#uvAmountf").prop("readonly", true);
			$("#uvfrontwarning").val("-");
		} else if (opt != 'No' && !paperCategory.includes('Simili')) {
			$("#uvAmountf").prop("readonly", false);
            $("#uvAmountf").val($("#quantityPerDesign").val());
		}
	});

	$("#uvback").change(function() {
		var paperCategory = $('#paperCategory').find(":selected").text();
		if (paperCategory.includes('Simili')) {
			$("#uvbackwarning").val("Simili cannot do UV");
			$('#uvAmountb').val('');
			$("#uvAmountb").prop("readonly", true);
		}
		var opt = $('#uvback').find(":selected").text();
		if (opt == 'No') {
			$("#uvAmountb").val("");
			$("#uvAmountb").prop("readonly", true);
			$("#uvbackwarning").val("-");
		} else if (opt != 'No' && !paperCategory.includes('Simili')) {
			$("#uvAmountb").prop("readonly", false);
			$("#uvAmountb").val($("#quantityPerDesign").val());
		}
	});

	$('#uvAmountf').keyup(function() {
		var uvAmountf = $("#uvAmountf").val();
		var quantity = $("#totalQuantity").val();
		if (uvAmountf > quantity) {
			$("#uvfrontwarning").val("Front UV amount more than total quantity amount");
		} else {
			if (uvAmountf < quantity) {
				$("#uvfrontwarning").val("Front UV amount less than total quantity amount");
			} else {
				$("#uvfrontwarning").val("-");
			}
		}
	});

	$('#uvAmountb').keyup(function() {
		var uvAmountb = $("#uvAmountb").val();
		var quantity = $("#totalQuantity").val();
		if (uvAmountb > quantity) {
			$("#uvbackwarning").val("Back UV amount more than total quantity amount");
		} else {
			if (uvAmountb < quantity) {
				$("#uvbackwarning").val("Back UV amount less than total quantity amount");
			} else {
				$("#uvbackwarning").val("-");
			}
		}
	});

	// ---------------------------------------------------------------------------
	// varnish
	$("#varnishfront").change(function() {
		var opt = $('#varnishfront').find(":selected").text();
		if (opt == 'No') {
			$("#vnAmountf").val("");
			$("#vnAmountf").prop("readonly", true);
			$("#varnishfrontwarning").val("-");
		} else {
			$("#vnAmountf").prop("readonly", false);
            $("#vnAmountf").val($("#quantityPerDesign").val());
		}
	});

	$("#varnishback").change(function() {
		var opt = $('#varnishback').find(":selected").text();
		if (opt == 'No') {
			$("#vnAmountb").val("");
			$("#vnAmountb").prop("readonly", true);
			$("#varnishbackwarning").val("-");
		} else {
			$("#vnAmountb").prop("readonly", false);
			$("#vnAmountb").val($("#quantityPerDesign").val());
		}
	});

	$('#vnAmountf').keyup(function() {
		var vnAmountf = $("#vnAmountf").val();
		var quantity = $("#totalQuantity").val();
		if (vnAmountf > quantity) {
			$("#varnishfrontwarning").val("Front varnish amount more than total quantity amount");
		} else {
			if (vnAmountf < quantity) {
				$("#varnishfrontwarning").val("Front varnish amount less than total quantity amount");
			} else {
				$("#varnishfrontwarning").val("-");
			}
		}
	});

	$('#vnAmountb').keyup(function() {
		var vnAmountb = $("#vnAmountb").val();
		var quantity = $("#totalQuantity").val();
		if (vnAmountb > quantity) {
			$("#varnishbackwarning").val("Back varnish amount more than total quantity amount");
		} else {
			if (vnAmountb < quantity) {
				$("#varnishbackwarning").val("Back varnish amount less than total quantity amount");
			} else {
				$("#varnishbackwarning").val("-");
			}
		}
	});
	// ---------------------------------------------------------------------------

	// ---------------------------------------------------------------------------
	// SPOT UV
		$("#spotuvfront").change(function() {
    		var opt = $('#spotuvfront').find(":selected").text();
    		if (opt == 'No') {
    			$("#spotuvfrontamount").val("");
    			$("#spotuvfrontamount").prop("readonly", true);
    			$("#spotuvfrontwarning").val("-");
    		} else {
    			$("#spotuvfrontamount").prop("readonly", false);
    			$("#spotuvfrontamount").val($("#quantityPerDesign").val());
    		}
    	});

    	$("#spotuvback").change(function() {
    		var opt = $('#spotuvback').find(":selected").text();
    		if (opt == 'No') {
    			$("#spotuvbacktamount").val("");
    			$("#spotuvbacktamount").prop("readonly", true);
    			$("#spotuvhbackwarning").val("-");
    		} else {
    			$("#spotuvbackamount").prop("readonly", false);
    			$("#spotuvbackamount").val($("#quantityPerDesign").val());
    		}
    	});
	$('#spotuvfrontamount').keyup(function() {
		var vnAmountf = $("#spotuvfrontamount").val();
		var quantity = $("#totalQuantity").val();
		if (vnAmountf > quantity) {
			$("#spotuvfrontwarning").val("Front Spot UV amount more than total quantity amount");
		} else {
			if (vnAmountf < quantity) {
				$("#spotuvfrontwarning").val("Front Spot UV amount less than total quantity amount");
			} else {
				$("#spotuvfrontwarning").val("-");
			}
		}
	});

	$('#spotuvbackamount').keyup(function() {
		var vnAmountb = $("#spotuvbackamount").val();
		var quantity = $("#totalQuantity").val();
		if (vnAmountb > quantity) {
			$("#spotuvhbackwarning").val("Back Spot UV amount more than total quantity amount");
		} else {
			if (vnAmountb < quantity) {
				$("#spotuvhbackwarning").val("Back Spot UV amount less than total quantity amount");
			} else {
				$("#spotuvhbackwarning").val("-");
			}
		}
	});

	// ---------------------------------------------------------------------------
    	// Soft touch
    		$("#softtouchfront").change(function() {
        		var opt = $('#softtouchfront').find(":selected").text();
        		if (opt == 'No') {
        			$("#softtouchfrontamount").val("");
        			$("#softtouchfrontamount").prop("readonly", true);
        			$("#softtouchfrontwarning").val("-");
        		} else {
        			$("#softtouchfrontamount").prop("readonly", false);
        			$("#softtouchfrontamount").val($("#quantityPerDesign").val());
        		}
        	});

        	$("#softtouchback").change(function() {
        		var opt = $('#softtouchback').find(":selected").text();
        		if (opt == 'No') {
        			$("#softtouchbackamount").val("");
        			$("#softtouchbackamount").prop("readonly", true);
        			$("#softtouchbackwarning").val("-");
        		} else {
        			$("#softtouchbackamount").prop("readonly", false);
        			$("#softtouchbackamount").val($("#quantityPerDesign").val());
        		}
        	});
    	$('#softtouchfrontamount').keyup(function() {
    		var vnAmountf = $("#softtouchfrontamount").val();
    		var quantity = $("#totalQuantity").val();
    		if (vnAmountf > quantity) {
    			$("#softtouchfrontwarning").val("Front Soft Touch Lamination amount more than total quantity amount");
    		} else {
    			if (vnAmountf < quantity) {
    				$("#softtouchfrontwarning").val("Front Soft Touch Lamination amount less than total quantity amount");
    			} else {
    				$("#softtouchfrontwarning").val("-");
    			}
    		}
    	});

    	$('#softtouchbackamount').keyup(function() {
    		var vnAmountb = $("#softtouchbackamount").val();
    		var quantity = $("#totalQuantity").val();
    		if (vnAmountb > quantity) {
    			$("#softtouchbackwarning").val("Back Soft Touch Lamination amount more than total quantity amount");
    		} else {
    			if (vnAmountb < quantity) {
    				$("#softtouchbackwarning").val("Back Soft Touch Lamination amount less than total quantity amount");
    			} else {
    				$("#softtouchbackwarning").val("-");
    			}
    		}
    	});



	// ---------------------------------------------------------------------------
	// ---------------------------------------------------------------------------
	// Emboss
	$("#emboss").change(function() {
		var opt = $('#emboss').find(":selected").text();
		if (opt == 'No') {
		    $('#emboss_table_body').hide();
			$(".inputemboss").val("");
			$(".inputemboss").prop("readonly", true);
		} else {
		    $('#emboss_table_body').show();
			$(".inputemboss").val("");
			$(".inputemboss").prop("readonly", false);
			$("#embossamount1").val($("#quantityPerDesign").val());
			$("#embossamount2").val($("#quantityPerDesign").val());
			$("#embossamount3").val($("#quantityPerDesign").val());
			$("#embossamount4").val($("#quantityPerDesign").val());
			$("#embossamount5").val($("#quantityPerDesign").val());
		}
	});

	$("#deboss").change(function() {
		var opt = $('#deboss').find(":selected").text();
		if (opt == 'No') {
		    $('#deboss_table_body').hide();
			$(".inputdeboss").val("");
			$(".inputdeboss").prop("readonly", true);

		} else {
		    $('#deboss_table_body').show();
			$(".inputdeboss").val("");
			$(".inputdeboss").prop("readonly", false);
			$("#debossamount1").val($("#quantityPerDesign").val());
            $("#debossamount2").val($("#quantityPerDesign").val());
            $("#debossamount3").val($("#quantityPerDesign").val());
            $("#debossamount4").val($("#quantityPerDesign").val());
            $("#debossamount5").val($("#quantityPerDesign").val());
		}
	});

	// ---------------------------------------------------------------------------
	// ---------------------------------------------------------------------------
	// hot stamping
	$("#hotstampingfront").change(function() {
		var opt = $('#hotstampingfront').find(":selected").text();
		if (opt == 'No') {
		    $('#hsf_table_body').hide();
			$(".inputhsfront").val("");
			$(".inputhsfront").prop("readonly", true);

		} else {
	    	$('#hsf_table_body').show();
			$(".inputhsfront").val("");
			$(".inputhsfront").prop("readonly", false);
			$("#hsamountfront").val($("#quantityPerDesign").val());
		}
	});

	$("#hotstampingback").change(function() {
		var opt = $('#hotstampingback').find(":selected").text();
		if (opt == 'No') {
		    $('#hsb_table_body').hide();
			$(".inputhsback").val("");
			$(".inputhsback").prop("readonly", true);
		} else {
		    $('#hsb_table_body').show();
			$(".inputhsback").val("");
			$(".inputhsback").prop("readonly", false);
			$("#hsamountback").val($("#quantityPerDesign").val());
		}
	});

	// ---------------------------------------------------------------------------
	// ---------------------------------------------------------------------------
	// diecut
	$("#diecut").change(function() {
		var opt = $('#diecut').find(":selected").text();
		if (opt == 'No') {
		    $('#diecut_table_body').hide();
			$(".inputdiecut").val("");
			$(".inputdiecut").prop("readonly", true);

		} else {
		    $('#diecut_table_body').show();
			$(".inputdiecut").val("");
			$(".inputdiecut").prop("readonly", false);
			$("#diecutamount1").val($("#quantityPerDesign").val());
			$("#diecutamount2").val($("#quantityPerDesign").val());
			$("#diecutamount3").val($("#quantityPerDesign").val());
			$("#diecutamount4").val($("#quantityPerDesign").val());
			$("#diecutamount5").val($("#quantityPerDesign").val());
		}
	});
	// ---------------------------------------------------------------------------
    // Perfect bind
	$("#perfectbindoption").change(function() {
    		var opt = $('#perfectbindoption').find(":selected").text();
    		if (opt == 'No') {
    			$("#perfectbindquantity").val("");
    			$("#perfectbindquantity").prop("readonly", true);

    		} else {
    			$("#perfectbindquantity").val("");
    			$("#perfectbindquantity").prop("readonly", false);
    			$("#perfectbindquantity").val($("#quantityPerDesign").val());
    		}
    });
	$("#staplebindoption").change(function() {
    		var opt = $('#staplebindoption').find(":selected").text();
    		if (opt == 'No') {
    			$("#staplebindquantity").val("");
    			$("#staplebindquantity").prop("readonly", true);

    		} else {
    			$("#staplebindquantity").val("");
    			$("#staplebindquantity").prop("readonly", false);
    			$("#staplebindquantity").val($("#quantityPerDesign").val());
    		}
    });
	$("#hardcoveroption").change(function() {
    		var opt = $('#hardcoveroption').find(":selected").text();
    		if (opt == 'No') {
    			$("#hardcoverquantity").val("");
    			$("#hardcoverquantity").prop("readonly", true);

    		} else {
    			$("#hardcoverquantity").val("");
    			$("#hardcoverquantity").prop("readonly", false);
    			$("#hardcoverquantity").val($("#quantityPerDesign").val());
    		}
    });
	
	// ---------------------------------------------------------------------------
	// creasing line
	$("#creasingline").change(function() {
		var opt = $('#creasingline').find(":selected").text();
		if (opt == 'No') {
			$(".inputcreasingline").val("");
			$(".inputcreasingline").prop("readonly", true);

		} else {
			$(".inputcreasingline").val("");
			$(".inputcreasingline").prop("readonly", false);
			$("#creasinglinequantity").val($("#quantityPerDesign").val());
		}
	});
	// ---------------------------------------------------------------------------
	// Folding
    	$("#foldoption").change(function() {
    		var opt = $('#foldoption').find(":selected").text();
    		if (opt == 'No') {
    			$(".inputfold").val("");
    			$(".inputfold").prop("readonly", true);

    		} else {
    			$(".inputfold").val("");
    			$(".inputfold").prop("readonly", false);
    			$("#foldquantity").val($("#quantityPerDesign").val());
    		}
    	});
	// ---------------------------------------------------------------------------
	// simili
        	$("#paperCategory").change(function() {
        		var opt = $('#paperCategory').find(":selected").text();
        		if (opt == 'Simili') {
        		    $("#uvprice").val("");
        			$("#uvAmountf").val("");
        			$("#uvAmountf").prop("readonly", true);
        			$("#uvAmountb").val("");
                    $("#uvAmountb").prop("readonly", true);
                    $("#uvfrontwarning").val("");
                    $("#uvbackwarning").val("");
        		} else {
        		    var uvfopt = $('#uvfront').find(":selected").text();
        		    var uvbopt = $('#uvback').find(":selected").text();
        		    if (uvfopt == 'Yes' || uvbopt == 'Yes') {
        		        $("#uvAmountf").val("");
                        $("#uvAmountf").prop("readonly", false);
                        $("#uvAmountb").val("");
                        $("#uvAmountb").prop("readonly", false);
        		    }
        		    if (uvfopt == 'Yes' || uvbopt == 'Yes') {
                            		        $("#uvAmountf").val("");
                                            $("#uvAmountf").prop("readonly", false);
                                            $("#uvAmountb").val("");
                                            $("#uvAmountb").prop("readonly", false);
                            		    }

        		}
        	});
    	// ---------------------------------------------------------------------------
});
});
