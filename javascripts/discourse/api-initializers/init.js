import { apiInitializer } from "discourse/lib/api";

export default apiInitializer("1.8.0", (api) => {
  let toggleSvgUseEl;

  const updateIcon = () => {
    if (!toggleSvgUseEl) return;
    
    // Check the body classes you noticed. 
    // 'has-sidebar-page' handles the desktop sidebar.
    // 'sidebar-open' handles the mobile drawer in newer versions.
    const isOpen = 
      document.body.classList.contains("has-sidebar-page") || 
      document.body.classList.contains("sidebar-open");
                   
    toggleSvgUseEl.setAttribute("href", isOpen ? "#xmark" : "#bars");
  };

  // 1. Observe the body for class changes. 
  // This triggers instantly the moment the user clicks the hamburger toggle.
  const observer = new MutationObserver((mutations) => {
    for (let m of mutations) {
      if (m.attributeName === "class") {
        updateIcon();
      }
    }
  });
  
  observer.observe(document.body, { attributes: true });

  // 2. Grab the SVG element when the app loads or transitions between routes.
  api.onAppEvent("page:changed", () => {
    // requestAnimationFrame ensures the DOM has settled before we query
    requestAnimationFrame(() => {
      toggleSvgUseEl = document.querySelector(".header-sidebar-toggle svg use");
      updateIcon();
    });
  });
});
