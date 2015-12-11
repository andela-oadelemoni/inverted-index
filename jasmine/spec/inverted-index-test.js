describe("Inverted index test suite", function() {
	describe("Read book data", function() {
		it("should check if json array is empty", function() {
			expect(BookData.read()).not.toEqual({});
		});
	});

	/*describe("Populate index", function() {
		it("should verify that index is created", function() {
			// enter test case here
		});
		it("should verify that index is mapped", function() {
			// enter test case here
		});
	});*/
});