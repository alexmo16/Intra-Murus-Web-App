import { expect } from "chai";
import { shallowMount } from "@vue/test-utils";
import FilterSports from "@/components/FilterSports.vue";
import "mock-local-storage";

describe("FilterSports.vue", function() {
  let wrapper;
  let component;

  describe("created()", function() {
    it("filters props default value should be ['years', 'seasons', 'leagues', 'sports']", function() {
      wrapper = shallowMount(FilterSports);
      component = wrapper.vm;

      debugger;
      let expectFilters = ["years", "seasons", "leagues", "sports"];
      expect(component.filters).to.deep.equals(expectFilters);
    });

    it("should take default values if localStorage is empty.", function() {
      wrapper = shallowMount(FilterSports);
      component = wrapper.vm;

      window.localStorage.clear();

      expect(component.selectedSport).to.be.empty;
      expect(component.selectedYear).equals(new Date().getFullYear());
      expect(component.selectedLeague).to.be.empty;
      expect(component.selectedSeason).equals("AUTOMNE");
    });

    it("should take localStorage's values if localStorage is not Empty.", function() {
      window.localStorage.setItem("selectedSport", "SOCCER");
      window.localStorage.setItem("selectedSeason", "ETE");
      window.localStorage.setItem("selectedLeague", "AA");

      wrapper = shallowMount(FilterSports);
      component = wrapper.vm;

      expect(component.selectedSport).equals("SOCCER");
      expect(component.selectedYear).equals(new Date().getFullYear());
      expect(component.selectedLeague).equals("AA");
      expect(component.selectedSeason).equals("ETE");
    });
  });
});
