//  Tests for logic, the function that will create the options list
// Note : current tests are for 5 options
const logic = require("./logic");
/***        expected results        **** */
const optionsForI = [
  "Iceland",
  "India",
  "Indonesia",
  "Iran (Islamic Republic of)",
  "Iraq"
];

const optionsForGreen = [
  "Greenland",
  "Greensborough",
  "Greenville",
  "Greenacres City",
  "Greenfield"
];

const optionsForHome = ["Homewood", "Homestead", "Homer Glen", "Homewood"];

describe("is jest working", function() {
  it("should be working ", function() {
    expect(1 + 1).toBe(2);
  });
});

describe("Create options lists", function() {
  describe("Can it get 5 options all countries?", function() {
    it("should return the first 5 countries that starts with I", function() {
      const result = logic("i");
      expect(result).toEqual(optionsForI);
    });
  });

  describe("Can it get 1 option for specific country?", function() {
    it("should return Israel that starts with israe ", function() {
      const result = logic("israe");
      expect(result).toEqual(["Israel"]);
    });
  });
  describe("Can it get mixed options with countries and cities?", function() {
    it("should return Greenland only from countries and first 4 cities that start with Green", function() {
      const result = logic("Green");
      expect(result).toEqual(optionsForGreen);
    });
  });

  describe("Can it return 0 countries and cities?", function() {
    it('should return no countries,and 4 other cities that start with "home"', function() {
      const result = logic("home");
      expect(result).toEqual(optionsForHome);
    });
  });
  /* *********************       Special cases  ****************************/

  describe("Can it return nothing for empty/random strings?", function() {
    it("should return no options for empty string", function() {
      const result = logic("");
      expect(result).toEqual([]);
    });

    it("should return no options for random string", function() {
      const result = logic("sadasdsd31d1dwadasdads");
      expect(result).toEqual([]);
    });
  });
});
