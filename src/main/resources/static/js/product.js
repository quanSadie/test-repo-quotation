document.addEventListener('DOMContentLoaded', () => {

$(document).ready(function() {
	$.each(products, function(index, item) {
		if ($('#sizeSelect option[value="' + item.sizename + '"]').length > 0 == false) {
			$('#sizeSelect').append($('<option>').text(item.sizename).val(item.sizename));
		}

		$("#sizeSelect").change(function() {
			var val = $(this).val();
			if (val == item.sizename) {
				$("#widthDisplay").val(item.p_width);
				$("#lengthDisplay").val(item.p_length);
				$("#widthDisplay").prop("readonly", true);
				$("#lengthDisplay").prop("readonly", true);
			}
			
			if (val == "Custom") {
				$("#widthDisplay").val('');
				$("#lengthDisplay").val('');
				$("#widthDisplay").prop("readonly", false);
				$("#lengthDisplay").prop("readonly", false);
			}
		});
	});
	if ($('#sizeSelect option[value="Custom"]').length > 0 == false) {
		$('#sizeSelect').append($('<option>').text("Custom").val("Custom"));
	}
});
});
