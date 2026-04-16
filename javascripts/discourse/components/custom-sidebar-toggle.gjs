import Component from "@glimmer/component";
import { service } from "@ember/service";
import { action } from "@ember/object";
import DButton from "discourse/components/d-button";

export default class CustomSidebarToggle extends Component {
  @service sidebarState;
  @service appEvents;

  get isOpen() {
    // Check both states to cover desktop pinned mode and mobile drawer mode
    return this.sidebarState.isSidebarExpanded || this.sidebarState.sidebarActive;
  }

  get icon() {
    return this.isOpen ? "xmark" : "bars";
  }

  @action
  toggle() {
    // Safely trigger the toggle. Discourse listens for this app event universally.
    this.appEvents.trigger("sidebar:toggle");
  }

  <template>
    <DButton
      class="btn-flat header-sidebar-toggle custom-sidebar-toggle"
      @icon={{this.icon}}
      @action={{this.toggle}}
      aria-label="Toggle Sidebar"
      aria-expanded={{if this.isOpen "true" "false"}}
    />
  </template>
}
