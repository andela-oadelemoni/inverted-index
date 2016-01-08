describe("Inverted index test suite", function() {
	describe("Read book data", function() {
		it("should check if json array is empty", function() {
			expect(Index.readFile("books.json")).toBeTruthy();
		});
	});

	describe("Populate index", function() {
		it("should verify that index is created", function() {
			spyOn(Index, "readFile");
			Index.createIndex("books.json");
			expect(Index.readFile).toHaveBeenCalled();
			expect(Index.createIndex("books.json")).toBeTruthy();
		});

		it("should verify that index string key is correctly mapped to JSON object", function() {
			expect(Index.verifyIndex("Alice")).toEqual(["book1"]);
			expect(Index.verifyIndex("elf")).toEqual(["book2"]);
			expect(Index.verifyIndex("and")).toEqual(["book1", "book2"]);
		});
	});

	describe("Search index", function() {
		it("should return the correct index of the correct object using the search query", function() {
			spyOn(Index, "createIndex");
			Index.searchIndex("string");
			expect(Index.createIndex).toHaveBeenCalled();
			expect(Index.searchIndex("wizard and hobbit")).toEqual({wizard:["book2"], and:["book1", "book2"], hobbit:["book2"]});
			expect(Index.searchIndex("Alice sticker")).toEqual({alice:["book1"], sticker:"no match found"});
			expect(Index.searchIndex("seek again")).toEqual({seek:["book2"], again:"no match found"});
		});
	});
});