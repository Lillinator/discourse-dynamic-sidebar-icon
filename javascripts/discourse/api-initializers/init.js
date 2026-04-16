import { apiInitializer } from "discourse/lib/api";

export default apiInitializer("1.8.0", (api) => {
  const openIcon = settings.icon_to_open_the_sidebar;
  const closeIcon = settings.icon_to_close_the_sidebar;

  let toggleSvgUseEl;

  const updateIcon = () => {
    if (!toggleSvgUseEl) return;
    
    // Check all possible classes Discourse uses to indicate an open sidebar/drawer
    // across desktop, tablet, and mobile views.
    const isOpen = 
      document.body.classList.contains("has-sidebar-page") || 
      document.body.classList.contains("sidebar-open") ||
      document.body.classList.contains("drawer-open");

    // Apply the configured icons based purely on state!
    toggleSvgUseEl.setAttribute("href", isOpen ? `#${closeIcon}` : `#${openIcon}`);
  };

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
