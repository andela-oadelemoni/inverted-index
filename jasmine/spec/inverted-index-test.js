describe("Inverted index test suite", function() {
	describe("Read book data", function() {
		it("should check if json array is empty", function() {
			expect(BookData.readFile()).toBeTruthy();
		});
	});

	describe("Populate index", function() {
		it("should verify that index is created", function() {
			spyOn(BookData, "readFile");
			BookData.createIndex();
			expect(BookData.readFile).toHaveBeenCalled();
			expect(BookData.createIndex()).toBeTruthy();
		});

		it("should verify that index string key is correctly mapped to JSON object", function() {
			expect(BookData.verifyMapping("Alice")).toEqual(["book1"]);
			expect(BookData.verifyMapping("elf")).toEqual(["book2"]);
			expect(BookData.verifyMapping("and")).toEqual(["book1", "book2"]);
		});
	});

	describe("Search index", function() {
		it("should return the correct index of the correct object using the search query", function() {
			spyOn(BookData, "createIndex");
			BookData.searchIndex("string");
			expect(BookData.createIndex).toHaveBeenCalled();
			expect(BookData.searchIndex("wizard and hobbit")).toEqual({wizard:["book2"], and:["book1", "book2"], hobbit:["book2"]});
			expect(BookData.searchIndex("Alice sticker")).toEqual({alice:["book1"], sticker:"no match found"});
			expect(BookData.searchIndex("seek again")).toEqual({seek:["book2"], again:"no match found"});
		});
	});
});