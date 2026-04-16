import { apiInitializer } from "discourse/lib/api";

export default apiInitializer("1.8.0", (api) => {
  let toggleSvgUseEl;

  const updateIcon = () => {
    if (!toggleSvgUseEl) return;
    
    // Check the body classes to see if the sidebar is open
    const isOpen = 
      document.body.classList.contains("has-sidebar-page") || 
      document.body.classList.contains("sidebar-open");
                   
    // Grab the values right from your settings.yml
    const openIcon = settings.icon_to_open_the_sidebar;
    const closeIcon = settings.icon_to_close_the_sidebar;

    // Apply the chosen setting (prepended with the '#' that the SVG href requires)
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
