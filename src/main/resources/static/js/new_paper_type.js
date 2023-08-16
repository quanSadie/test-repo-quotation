$(document).ready(function() {
	$('#inputprice').keyup(function() {
		updatepricePerPiece();
	});

	$('#inputperream').keyup(function() {
		updatepricePerPiece();
	});

    $('#incheslengthinput').keyup(function() {
    		incheslengthaftercut();
    		inchessquareca();
    		inchessquareaftercutca();
    		a3squareinchesca();
    });
    $('#incheswidthinput').keyup(function() {
        		inchessquareca();
        		inchessquareaftercutca();
        		a3squareinchesca();
    });
	var updatepricePerPiece = function() {
		var input1 = parseFloat($('#inputprice').val());
		var input2 = parseFloat($('#inputperream').val());
		if (isNaN(input1) || isNaN(input2)) {
			$('#priceperpiececal').text('Inputs must be numbers');
		} else {
				$('#priceperpiececal').val(input1 / input2);
		}
	};


	$('#inputcut').keyup(function() {
    		updatelengthaftercut();
    		incheslengthaftercut();
    		inchessquareaftercutca();
    		a3squareinchesca();
    	});

    $('#inputlength').keyup(function() {
    		updatelengthaftercut();
    		updatedigitallength();
    });

    var updatelengthaftercut = function() {
    	var input1 = $('#inputlength').val();
    	var input2 = $('#inputcut').val();
    	if (isNaN(input1) || isNaN(input2)) {
    		$('#lengthaftercutcal').text('Inputs must be numbers');
    	} else {
    	    if (input2 == 1) {
    	        $('#lengthaftercutcal').val(input1 / 2);
    	    } else {
    	        $('#lengthaftercutcal').val(input1);
    	    }
    	}
    };


    var pr = props;
    var unprintablearea;
    var digitalunprintablearea;
    $.each(pr, function(index3, item3) {
        if (item3.property == 'Unprintable Area(mm)') {
        	unprintablearea = item3.number;
        }
        if (item3.property == 'Digital Unprintable Area (mm)') {
            digitalunprintablearea = item3.number;
        }
    });


        $('#inputwidth').keyup(function() {
    		updatedigitalwidth();
    	});


    	var updatedigitalwidth = function() {
    		var input1 = $('#inputwidth').val();
    		if (isNaN(input1)) {
    			$('#digitalwidthcal').val('Inputs must be numbers');
    		} else {
    		    var rs = Math.ceil(input1/2) + unprintablearea - digitalunprintablearea;
    		    $('#digitalwidthcal').val(rs);
    		}
    	};


    	var updatedigitallength = function() {
    		var input1 = parseFloat($('#inputlength').val());
    		if (isNaN(input1)) {
    			$('#digitallengthcal').text('Inputs must be numbers');
    		} else {
    		        var rs= Math.ceil(input1/2) + unprintablearea - digitalunprintablearea;
    		        $('#digitallengthcal').val(rs);
    		    }
    		}

        var incheslengthaftercut = function() {
            		var input1 = parseInt($('#inputcut').val());
            		var input2 = parseFloat($('#incheslengthinput').val());
            		if (isNaN(input1) || isNaN(input2)) {
            			$('#incheslengthaftercutcal').text('Inputs must be numbers');
            		} else {
            		        if (input1 == 1) {
            		            $('#incheslengthaftercutcal').val(input2/2);
            		        } else {
                                $('#incheslengthaftercutcal').val(input2);
            		        }
            		}
            };

 var inchessquareca = function() {
            		var input1 = parseFloat($('#incheswidthinput').val());
            		var input2 = parseFloat($('#incheslengthinput').val());
            		if (isNaN(input1) || isNaN(input2)) {
            			$('#inchessquarecal').text('Inputs must be numbers');
            		} else {
            		        $('#inchessquarecal').val(input1 * input2);
            		}
            	};



 var inchessquareaftercutca = function() {
            		var input1 = parseFloat($('#incheswidthinput').val());
            		var input2 = parseFloat($('#incheslengthaftercutcal').val());
            		if (isNaN(input1) || isNaN(input2)) {
            			$('#inchessquareaftercutcal').text('Inputs must be numbers');
            		} else {
            		        $('#inchessquareaftercutcal').val(input1 * input2);
            		}
            	};

  var a3squareinchesca = function() {
             		var input1 = parseInt($('#inputcut').val());
             		var input2 = parseFloat($('#incheswidthinput').val());
             		var input3 = parseFloat($('#incheslengthinput').val());
             		if (isNaN(input1) || isNaN(input2) || isNaN(input3)) {
             			$('#a3squareinchescal').text('Inputs must be numbers');
             		} else {
             		        if (input1 == 1) {
             		         $('#a3squareinchescal').val(0);
             		        }
             		        $('#a3squareinchescal').val(input2/2 * input3/2);
             		}
             	};
});