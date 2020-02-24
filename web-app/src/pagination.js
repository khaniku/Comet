var sort;

window.onload = function() {
	sort = function(p) {
        var rows = th, s = ((numberOfRowsPerPage * p) - numberOfRowsPerPage);

        for (i = s; i < (s + numberOfRowsPerPage) && i < tr.length; i++) {
            rows += tr[i];
        }

        table.innerHTML = rows;
        document.getElementById("buttons").innerHTML = pageButtons(pageCount, p);
        document.getElementById("id" + p).setAttribute("class", "active");
    }

    var table = document.getElementById("templates-table"), numberOfRowsPerPage = 25,
        rowCount = table.rows.length,
        firstRow = table.rows[0].firstElementChild.tagName,
        hasHead = (firstRow === "TH"),
        tr = [],
        i, ii, j = (hasHead) ? 1 : 0,
        th = (hasHead ? table.rows[(0)].outerHTML : '');

    var pageCount = Math.ceil(rowCount / numberOfRowsPerPage);

    if (pageCount > 1) {
        for (i = j, ii = 0; i < rowCount; i++, ii++) {
            tr[ii] = table.rows[i].outerHTML;
        }

        table.insertAdjacentHTML("afterend", "<div id='buttons'></div>");
        sort(1);
    }

    function pageButtons(pCount, cur) {
        var prevDis = (cur === 1) ? 'disabled' : '',
            nextDis = (cur === pCount) ? 'disabled' : '',
            buttons = "<input type='button' value='&lt;&lt; Prev' onclick='sort(" + (cur - 1) + ")' " + prevDis + ">";

        for (i = 1; i <= pCount; i++) {
            buttons += "<input type='button' id='id" + i + "'value='" + i + "' onclick='sort(" + i + ")'>";
        }

        buttons += "<input type='button' value='Next &gt;&gt;' onclick='sort(" + (cur + 1) + ")' " + nextDis + ">";

        return buttons;
    }
}