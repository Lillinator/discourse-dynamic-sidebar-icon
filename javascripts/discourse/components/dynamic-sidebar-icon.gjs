import Component from "@glimmer/component";
import { service } from "@ember/service";
import { schedule } from "@ember/runloop";

export default class DynamicSidebarIcon extends Component {
  @service sidebarState;

  get syncIcon() {
    // Read the tracked properties so Ember knows to re-evaluate this 
    // whenever the sidebar opens or closes.
    const isOpen = 
      this.sidebarState.isSidebarExpanded || 
      this.sidebarState.sidebarActive;
    
    // Schedule a DOM update immediately after Ember finishes rendering
    schedule("afterRender", () => {
      // Find the toggle button in the header
      const btn = document.querySelector(".header-sidebar-toggle button, .hamburger-panel, .btn-hamburger");
      if (!btn) return;

      const useEl = btn.querySelector("svg use");
      if (useEl) {
        // Directly swap the SVG href to match the state
        useEl.setAttribute("href", isOpen ? "#xmark" : "#bars");
      }
    });

    return null; 
  }

  // In a .gjs file, the template is defined directly inside the component
  // We simply call the getter to trigger the reactivity.
  <template>
    {{this.syncIcon}}
  </template>
}
