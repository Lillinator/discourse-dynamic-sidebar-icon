import { apiInitializer } from "discourse/lib/api";
import { inject as service } from "@ember/service";

export default apiInitializer("1.8.0", (api) => {
  // 1. Ensure the 'xmark' icon is included in Discourse's SVG sprite bundle.
  // Without this, the icon might be missing if it isn't used anywhere else on the page.
  api.registerIcon("xmark");

  // 2. Modify the sidebar-toggle component to inject the state service and override the icon
  api.modifyClass("component:sidebar-toggle", {
    pluginId: "dynamic-sidebar-icon",
    sidebarState: service(),

    get icon() {
      // The `sidebarState` service handles the state logic.
      // We check multiple properties defensively to cover both desktop and mobile drawer states
      // across different recent versions of Discourse.
      const isOpen = 
        this.sidebarState.isSidebarExpanded || 
        this.sidebarState.isSidebarOpen ||
        this.sidebarState.sidebarActive;

      return isOpen ? "xmark" : "bars";
    },
  });
});
