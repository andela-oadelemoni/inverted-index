var Index = {

	bookObj: null,
	index: {},

	readFile: function(filePath) {
		loadJSON(filePath, function(response) {
			bookObj = JSON.parse(response);
		});
		return Object.keys(bookObj) !== 0;
	},

	createIndex: function(filePath) {
		this.readFile(filePath);
		if(bookObj !== null) {
			for(var i = 0; i < bookObj.length; i++) {
				var wordsArray = [];
				var currentBook = "book" + (i + 1);
				titleStrings = getWords(bookObj[i].title);
				textStrings = getWords(bookObj[i].text);

				wordsArray.push.apply(wordsArray, titleStrings);
				wordsArray.push.apply(wordsArray, textStrings);

				for (var word in wordsArray) {
					var key = wordsArray[word].toLowerCase();
					if (this.index.hasOwnProperty(key) && this.index[key].indexOf(currentBook) === -1) {
						this.index[key].push(currentBook);
					}
					else {
						this.index[key] = [currentBook];
					}
				}
			}
			return !isEmpty(this.index);
		}
	},

	getIndex: function() {
		return this.index;
	},

	verifyIndex: function(key) {
		return this.index[key.toLowerCase()];
	},

	searchIndex: function(string) {
		this.createIndex();
		var result = {};
		var words = getWords(string);
		for(var word in words) {
			var key = words[word].toLowerCase();

			if (this.index.hasOwnProperty(key)) {
				result[key] = this.index[key];
			}
			else {
				result[key] = "no match found";
			}
		}
		return result;
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

function getWords(string) {
	var array = string.replace(/[^A-Za-z0-9 ]/g, "").split(" ");
	return array;
}

