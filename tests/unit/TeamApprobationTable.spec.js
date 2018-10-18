import { expect } from "chai";
import { shallowMount } from "@vue/test-utils";
import TeamApprovationTable from "@/components/TeamApprobationTable.vue";

describe("TeamApprovationTable.vue", function() {
  describe("resetAttributes()", function() {
    it("should set attributes to their default values", function() {
      const component = shallowMount(TeamApprovationTable).vm;
      debugger;
      component.isAcceptClicked = true;
      component.isRefuseClicked = true;
      component.selectedRow = {
        patate: "test",
        test: 42
      };

      component.resetAttributes();

      expect(component.isAcceptClicked).to.be.false;
      expect(component.isRefuseClicked).to.be.false;
      expect(component.selectedRow).to.be.empty;
    });
  });
});
