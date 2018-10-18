import { expect } from "chai";
import utils from "../../src/utils.js";

describe("utils.js", function() {
  describe("isApiCall()", function() {
    it("should return false if null or empty", function() {
      let isApi = utils.isApiCall();
      expect(isApi).to.be.false;

      isApi = utils.isApiCall("");
      expect(isApi).to.be.false;

      isApi = utils.isApiCall(null);
      expect(isApi).to.be.false;
    });

    it("should return true if it starts with /bs", function() {
      let isApi = utils.isApiCall("/bs");

      expect(isApi).to.be.true;
    });
  });
});
