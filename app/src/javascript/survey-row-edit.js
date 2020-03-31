var rowNumber = 0;

$(document).on("click", "#edit-button", function() {
	var tableRow = $(this);
	var tds = tableRow.closest('tr').find('td').filter(function() {
		return $(this).find('#edit-button').length === 0;
	});

	if (tableRow.val() === 'edit') {
		tableRow.val('save');

		if (tableRow.id !== '#edit-button' && tableRow.id !== '#delete-button') {
			tds.prop('contenteditable', true);

			var table = document.getElementById('surveys');
			rowNumber = tableRow.closest('tr').index();

			if (rowNumber > 0)
				document.getElementsByTagName('tr')[rowNumber].cells[1].contentEditable = false;

			for (var i = 1; i < table.rows.length; i++) {
				table.rows[i].onmousedown = function() {
					rowNumber = $(this).parent().index();
					document.getElementsByTagName('tr')[rowNumber].cells[1].contentEditable = false;
				}
			}
		}
	} else {
		var elements = tds;
		var dict     = {};

		if (tds.find('td').length > 0)
			elements = tds.find('td');

		elements.each(function(element) {
			var column 	= $(this).attr('id');
			var value 	= (element.tagName === 'TR') ? $(this).val() : $(this).text();

			switch (column) {
				case 'surveyID':
					dict.surveyID = value;
					break;
				case 'surveyLocation':
					dict.surveyLocation = value;
					break;
				case 'clientName':
					dict.clientName = value;
					break;
				case 'status':
					dict.status = value;
					break;
			}
		});

		tableRow.val('edit');
		tds.prop('contenteditable', false);

		$.ajax({
			url: "http://159.203.100.198:5000/api/auth/",
			method: "POST",
			data: dict,

			success: function(response) {
				if (response === 'success')
					alert('Row updated.');
				else
					alert('Error occurred while updating row.');
			},

			error: function(jqXHR, textStatus, errorThrown) {
				alert(`Row failed to update. ${textStatus}-${jqXHR}-${errorThrown}.`);
			}
		});
	}
});