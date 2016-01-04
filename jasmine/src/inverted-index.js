var BookData = {

	fileName: "books.json",
	bookObj: null,
	invertedIndex: {},

	readFile: function() {
		loadJSON(this.fileName, function(response) {
			bookObj = JSON.parse(response);
		});
		return Object.keys(bookObj) !== 0;
	},

	createIndex: function() {
		this.readFile();
		if(bookObj !== null) {
			for(var i = 0; i < bookObj.length; i++) {
				var wordsArray = [];
				var currentBook = "book" + (i + 1);
				titleStrings = bookObj[i].title.replace(/[^A-Za-z0-9 ]/g, "").split(" ");
				textStrings = bookObj[i].text.replace(/[^A-Za-z0-9 ]/g, "").split(" ");

				wordsArray.push.apply(wordsArray, titleStrings);
				wordsArray.push.apply(wordsArray, textStrings);

				for (var word in wordsArray) {
					var text = wordsArray[word];
					if (this.invertedIndex.hasOwnProperty(text) && this.invertedIndex[text].indexOf(currentBook) === -1) {
						this.invertedIndex[text].push(currentBook);
					}
					else {
						this.invertedIndex[text] = [currentBook];
					}
				}
			}
			return !isEmpty(this.invertedIndex);
		}
	},

	verifyMapping: function(key) {
		return this.invertedIndex[key];
	}
};

/* helper methods */

function loadJSON(fileName, callback) {
	var xobj = new XMLHttpRequest();

	xobj.overrideMimeType("application/json");
	xobj.open('GET', fileName, false);
	xobj.onreadystatechange = function() {
		if (xobj.readyState == 4) {
			callback(xobj.responseText);
		}
	};
	xobj.send(null);
}

function isEmpty(obj) {
	for (var prop in obj) {
		if (obj.hasOwnProperty(prop))
			return false;
	}
	return true;
}

