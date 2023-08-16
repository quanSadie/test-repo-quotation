document.addEventListener('DOMContentLoaded', () => {
$(document).ready(function () {
	$.each(papers, function(index, item) {
		
		if ($('#paperCategory option[value="' + item.category + '"]').length > 0 == false) {
			$('#paperCategory').append($('<option>').text(item.category).val(item.category));
		}
    	
		$("#paperCategory").change(function () {
        	var val = $(this).val();
        	
        	// if 
        	if (val == item.category) {
				$('#paperGrammage').empty();
					
				$.each(item.pgList, function(index1, item1) {
					if ($('#paperGrammage option[value=""]').length > 0 == false) {
						$('#paperGrammage').append($('<option>').text("--Select--").val(""));
					}
					
					if ($('#paperGrammage option[value="' + item1.grammage + '"]').length > 0 == false) {
						$('#paperGrammage').append($('<option>').text(item1.grammage).val(item1.grammage));
					}
					
						$.each(item1.ptList, function(index2, item2) {
						if (item2.iscard == false) {
							$('#isCard').val('No');
							$('#isCard').text('No');
						} else {
							$('#isCard').val('Yes');
							$('#isCard').text('Yes');
						}
						});
					});
					
					
        	} 
        	// end if
    	});
		
	});
	
/*    $("#paperCategory").change(function () {
        var val = $(this).val();
        if (val == "Simili") {
            $("#paperGrammage").html("<option value='test'>140gsm Simili Paper</option><option value='test'>120gsm Simili Paper</option><option value='test'>100gsm Simili Paper</option><option value='test'>80gsm Simili Paper</option><option value='test'>70gsm Simili Paper</option><option value='test'>60gsm Simili Paper</option><option value='test'>50gsm Simili Paper</option>");
        } else if (val == "ArtPaper") {
            $("#paperGrammage").html("<option value='test'>157gsm Art Paper</option><option value='test'>128gsm Art Paper</option><option value='test'>105gsm Art Paper</option><option value='test'>157gsm Matt Art Paper</option>");
        } else if (val == "OneSideArtCard") {
            $("#paperGrammage").html("<option value='test'>350gsm 1 Side Art Card</option><option value='test'>300gsm 1 Side Art Card</option><option value='test'>270gsm 1 Side Art Card</option><option value='test'>250gsm 1 Side Art Card</option>");
        } else if (val == "TwoSideArtCard") {
            $("#paperGrammage").html("<option value='test'>360gsm 2 Side Art Card</option><option value='test'>310gsm 2 Side Art Card</option><option value='test'>300gsm 2 Side Art Card</option><option value='test'>260gsm 2 Side Art Card</option><option value='test'>230gsm 2 Side Art Card</option><option value='test'>210gsm 2 Side Art Card</option><option value='test'>190gsm 2 Side Art Card</option>");
        } else if (val == "FancyPaper") {
            $("#paperGrammage").html("<option value=''>220gsm Star Purple</option>");
        }
    });*/
    
});
});
