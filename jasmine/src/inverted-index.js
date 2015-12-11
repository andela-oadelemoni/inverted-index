var BookData = {

	read: function() {
		loadJSON(function(response) {
			var loadedJSON = JSON.parse(response);
		});
	}
};

function loadJSON(callback) {
	var xobj = new XMLHttpRequest();

	xobj.overrideMimeType("application/json");
	xobj.open('GET', 'books.json', true);
	xobj.onreadystatechange = function() {
		if (xobj.readyState == 4 && xobj.status == "200") {
			callback(xobj.responseText);
		}
	};
	xobj.send(null);
}

