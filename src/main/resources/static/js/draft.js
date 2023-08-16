$(document).ready(function() {
	$("#draftFormSubmit").click(function(e) {
		e.preventDefault();
		var formData = $('form').serialize();
		$.ajax({
			type: 'POST',
			url: '/newdraft',
			data: formData,
			success: function(data) {
				// do something on success, like alert the user
				if (data === 'Error') {
                    Swal.fire({
					    title: 'Missing data',
					    html: '<span style="font-weight: bold; font-size: 1.5rem;">Please Key In All The Fields With <span style="color:red;">*</span></span>',
					    icon: 'info',
					    confirmButtonText: 'Okay'
				    })
				} else {
				    Swal.fire({
					    title: 'Draft saved!',
					    text: 'Click to continue',
					    icon: 'success',
					    confirmButtonText: 'Okay'
				    })
				}

			},
			error: function(data) {
				// do something on error, like alert the user
				Swal.fire({
					title: 'Error saving draft!',
					text: 'Click to continue',
					icon: 'error',
					confirmButtonText: 'Okay'
				})
			}
		});
	});
});