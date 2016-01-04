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

	/*describe("Search index", function() {
	});*/
});