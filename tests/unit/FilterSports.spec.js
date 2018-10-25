import { expect } from "chai";
import { shallowMount } from "@vue/test-utils";
import FilterSports from "@/components/FilterSports.vue";

describe("FilterSports.vue", function() {
  let wrapper;
  let component;

  describe("created()", function() {
    it("filters props default value should be ['years', 'seasons', 'leagues', 'sports']", function() {
      wrapper = shallowMount(FilterSports);
      component = wrapper.vm;

      let expectFilters = ["years", "seasons", "leagues", "sports"];
      expect(component.filters).to.deep.equals(expectFilters);
    });

    it("should take default values if localStorage is empty.", function() {
      wrapper = shallowMount(FilterSports);
      component = wrapper.vm;

      expect(component.selectedSport).to.be.empty;
      expect(component.selectedYear).equals(new Date().getFullYear());
      expect(component.selectedLeague).to.be.empty;
      expect(component.selectedSeason).equals("AUTOMNE");
    });
  });

  describe("watch()", function() {
    it("if all sports are selected it should do the same with leagues", function() {
      wrapper = shallowMount(FilterSports);
      component = wrapper.vm;

      component.selectedSport = "";
      component.$nextTick(() => {
        expect(component.selectedLeague).to.be.empty;
      });
    });
  });
});
