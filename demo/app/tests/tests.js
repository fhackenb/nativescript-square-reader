var SquareReader = require("nativescript-square-reader").SquareReader;
var squareReader = new SquareReader();

describe("greet function", function() {
    it("exists", function() {
        expect(squareReader.greet).toBeDefined();
    });

    it("returns a string", function() {
        expect(squareReader.greet()).toEqual("Hello, NS");
    });
});