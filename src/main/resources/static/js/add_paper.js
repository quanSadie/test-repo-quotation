$(document).ready(function () {
    $("#addpapercat").click(function(e) {
    		e.preventDefault();
    		var formData = $('#papercatadding').serialize();
    		$.ajax({
    			type: 'POST',
    			url: '/newpapercategory',
    			data: formData,
    			success: function(data) {
    				// do something on success, like alert the user\
                     $("#ppcatsselect").empty();
                                for (var i = 0; i < data.length; i++) {
                                    $("#ppcatsselect").append("<option value='" + data[i].id + "'>" + data[i].category + "</option>");
                                }
                                // show success message
                                Swal.fire({
                                    title: 'Paper category added successfully!',
                                    text: 'The page will now refresh.',
                                    icon: 'success',
                                    confirmButtonText: 'Okay'
                                }).then(function() {
                                    // refresh the page
                                    location.reload();
                                });
    			},
    			error: function(data) {
    				// do something on error, like alert the user
    				Swal.fire({
    					title: 'Error!',
    					text: 'Click to continue',
    					icon: 'error',
    					confirmButtonText: 'Okay'
    				})
    			}
    		});
    	});
});

$("#ppcatsselect").change(function() {
		var ppcatselect = $('#ppcatsselect').find(":selected").val();
                $('#pcid').val(ppcatselect);
	});

$("#ppgrammgeselect").change(function() {
		var ppgramselect = $('#ppgrammgeselect').find(":selected").val();
                $('#pgid').val(ppgramselect);
	});


    // ----------------------------------------------------------
    /*
    *
    *
    */

     $("#addpapergrammage").click(function(e) {
        		e.preventDefault();
        		var formData = $('#papergrammgeadding').serialize();
        		$.ajax({
        			type: 'POST',
        			url: '/newpapergrammage',
        			data: formData,
        			success: function(data) {
        				$("#ppgrammgeselect").empty();
                                                        for (var i = 0; i < data.length; i++) {
                                                            $("#ppgrammgeselect").append("<option value='" + data[i].id + "'>" + data[i].grammage + "</option>");
                                                        }
                                                        // show success message
                                                        Swal.fire({
                                                            title: 'Paper Grammage added successfully!',
                                                            text: 'The page will now refresh.',
                                                            icon: 'success',
                                                            confirmButtonText: 'Okay'
                                                        }).then(function() {
                                                            // refresh the page
                                                            location.reload();
                                                        });
        			},
        			error: function(data) {
        				// do something on error, like alert the user
        				Swal.fire({
        					title: 'Error!',
        					text: 'Click to continue',
        					icon: 'error',
        					confirmButtonText: 'Okay'
        				})
        			}
        		});
        	});


        	 $("#addpapertype").click(function(e) {
                    		e.preventDefault();
                    		var formData = $('#papertypeadding').serialize();
                    		$.ajax({
                    			type: 'POST',
                    			url: '/newpapertype',
                    			data: formData,
                    			success: function(data) {
                                    Swal.fire({
                                        title: 'Paper Type added successfully!',
                                        text: 'The page will now refresh.',
                                        icon: 'success',
                                        confirmButtonText: 'Okay'
                                        })
                    			},
                    			error: function(data) {
                    				// do something on error, like alert the user
                    				Swal.fire({
                    					title: 'Error!',
                    					text: 'Click to continue',
                    					icon: 'error',
                    					confirmButtonText: 'Okay'
                    				})
                    			}
                    		});
                    	});