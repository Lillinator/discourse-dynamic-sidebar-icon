import { apiInitializer } from "discourse/lib/api";

export default apiInitializer("1.8.0", (api) => {
  const openIcon = settings.icon_to_open_the_sidebar;
  const closeIcon = settings.icon_to_close_the_sidebar;
  const applyOnMobile = settings.apply_open_icon_on_mobile;

  let toggleSvgUseEl;

  const updateIcon = () => {
    if (!toggleSvgUseEl) return;
    
    // Check both classes:
    // 'has-sidebar-page' is the desktop/tablet sidebar
    // 'sidebar-open' or 'drawer-open' are used for the mobile drawer 
    // (Depending on the exact Discourse version, 'has-sidebar-page' might even be present on mobile!)
    const isOpen = 
      document.body.classList.contains("has-sidebar-page") || 
      document.body.classList.contains("sidebar-open") ||
      document.body.classList.contains("drawer-open"); // Added for safety across versions

    // Look up the site service dynamically inside the function to avoid the boot-time deprecation
    const site = api.container.lookup("service:site");

    // If we are on mobile AND the admin set the setting to false, 
    // we force the default "bars" icon regardless of state.
    if (site.mobileView && !applyOnMobile) {
      toggleSvgUseEl.setAttribute("href", "#bars");
      return;
    }

    // Otherwise, apply the dynamic logic!
    toggleSvgUseEl.setAttribute("href", isOpen ? `#${closeIcon}` : `#${openIcon}`);
  };

  // Run universally on all devices
  const observer = new MutationObserver((mutations) => {
    for (let m of mutations) {
      if (m.attributeName === "class") {
        updateIcon();
      }
    }
  });
  
  observer.observe(document.body, { attributes: true });

  api.onAppEvent("page:changed", () => {
    requestAnimationFrame(() => {
      toggleSvgUseEl = document.querySelector(".header-sidebar-toggle svg use");
      updateIcon();
    });
  });
});
