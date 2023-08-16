function setPreset() {
  Swal.fire({
    title: 'Set Bleed Preset',
    html:
      '<input type="number" id="bleedWidth" class="swal2-input" placeholder="Bleed Width">' +
      '<input type="number" id="bleedLength" class="swal2-input" placeholder="Bleed Length">',
    showCancelButton: true,
    confirmButtonText: 'Confirm',
    preConfirm: () => {
      const bleedWidth = Swal.getPopup().querySelector('#bleedWidth').value;
      const bleedLength = Swal.getPopup().querySelector('#bleedLength').value;

      // Send the AJAX request using jQuery
      $.ajax({
        url: '/bleedpreset',
        type: 'GET',
        data: {
          bleedWidth: bleedWidth,
          bleedLength: bleedLength
        },
        success: function(response) {
          // Handle the response data if needed
           $('#bleedWidthDisplay').val(response.bleedWidth);
           $('#bleedLengthDisplay').val(response.bleedLength);

                var input1 = parseInt($('#widthDisplay').val());
           		var input2 = parseInt($('#lengthDisplay').val());
           		var input3 = parseInt($('#bleedWidthDisplay').val());
           		var input4 = parseInt($('#bleedLengthDisplay').val());

           		if (isNaN(input1) || isNaN(input2) || isNaN(input3) || isNaN(input4)) {
                	$('#finalWidthDisplay').text('Inputs must be numbers');
                	$('#finalLengthDisplay').text('Inputs must be numbers');
                } else {
                	$('#finalWidthDisplay').val(input1 + input3);
                	$('#finalLengthDisplay').val(input2 + input4);

                	$('#current_bleed_preset_width').html('Width: ' + response.bleedWidth);
                    $('#current_bleed_preset_length').html('Length: ' + response.bleedLength);
                }
        },
        error: function(xhr, status, error) {
          // Handle the error if needed
          console.error('Request failed with status:', xhr.status);
        }
      });
    },
  });
}
