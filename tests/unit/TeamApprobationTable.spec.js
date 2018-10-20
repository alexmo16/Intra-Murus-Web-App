import { expect } from "chai";
import { shallowMount } from "@vue/test-utils";
import sinon from "sinon";
import TeamApprobationTable from "@/components/TeamApprobationTable.vue";

describe("TeamApprovationTable.vue", function() {
  let wrapper;
  let component;

  before(function() {
    sinon.stub(TeamApprobationTable, "created").callsFake(function() {});

    wrapper = shallowMount(TeamApprobationTable);
    component = wrapper.vm;
  });

  describe("resetAttributes()", function() {
    it("should set attributes to their default values", function() {
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
