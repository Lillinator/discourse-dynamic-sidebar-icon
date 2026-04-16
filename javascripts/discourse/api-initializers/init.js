import { apiInitializer } from "discourse/lib/api";
import { inject as service } from "@ember/service";

export default apiInitializer("1.8.0", (api) => {
  api.modifyClass("component:sidebar-toggle", {
    pluginId: "dynamic-sidebar-icon",
    sidebarState: service(),

    get icon() {
      // The `sidebarState` service is tracked, so Ember will automatically
      // re-render the icon when the user clicks the toggle.
      // We check multiple flags to safely handle both mobile and desktop states.
      const isOpen = 
        this.sidebarState.isSidebarExpanded || 
        this.sidebarState.sidebarActive;

      return isOpen ? "xmark" : "bars";
    },
  });
});
