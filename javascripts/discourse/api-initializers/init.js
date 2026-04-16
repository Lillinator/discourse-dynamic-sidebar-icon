import { apiInitializer } from "discourse/lib/api";
import { service } from "@ember/service";

export default apiInitializer("1.8.0", (api) => {
  // Intercept Discourse's universal button component
  api.modifyClass("component:d-button", {
    pluginId: "dynamic-sidebar-icon",
    sidebarState: service(),

    get icon() {
      // Get the original icon passed to the button
      const originalIcon = this.args?.icon;

      // Only run our logic if it's trying to render the "bars" icon
      if (originalIcon === "bars") {
        
        // Grab the CSS classes passed to the button
        const btnClass = this.args?.class || "";
        
        // Ensure this is specifically the sidebar toggle button
        if (
          typeof btnClass === "string" && 
          (btnClass.includes("sidebar-toggle") || btnClass.includes("hamburger"))
        ) {
          
          // Check if the sidebar is currently open
          const isOpen = 
            this.sidebarState?.isSidebarExpanded || 
            this.sidebarState?.sidebarActive;

          // Swap the icon reactively
          return isOpen ? "xmark" : "bars";
        }
      }

      // For all other buttons (or if closed), render normally
      return originalIcon;
    }
  });
});
