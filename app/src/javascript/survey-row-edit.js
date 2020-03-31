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

			var table = document.getElementById('POBox');
			rowNumber = tableRow.closest('tr').index();

			if (rowNumber > 0)
				document.getElementsByTagName('tr')[rowNumber].cells[4].contentEditable = false;

			for (var i = 1; i < table.rows.length; i++) {
				table.rows[i].onmousedown = function() {
					rowNumber = $(this).parent().index();
					document.getElementsByTagName('tr')[rowNumber].cells[4].contentEditable = false;
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
				case 'po_box_id_seq':
					dict.po_box_id_seq = value;
					break;
				case 'box_number':
					dict.box_number = value;
					break;
				case 'mail_name':
					dict.mail_name = value;
					break;
				case 'dept_code':
					dict.dept_code = value;
					break;
				case 'dept_name':
					dict.dept_name = value;
					break;
			}
		});

		tableRow.val('edit');
		tds.prop('contenteditable', false);

		$.ajax({
			url: "index.php?action=edit",
			method: "POST",
			data: dict,

			success: function(response) {
				if (response === 'success')
					alert('Row updated.');
				else
					alert('Error occurred while updating row. Contact IT@Sam Service Desk if issue persists.');
			},

			error: function(jqXHR, textStatus, errorThrown) {
				alert(`Row failed to update. ${textStatus}-${jqXHR}-${errorThrown}. Contact IT@Sam Service Desk if issue persists.`);
			}
		});
	}
});
