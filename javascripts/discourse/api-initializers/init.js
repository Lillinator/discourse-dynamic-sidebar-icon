import { apiInitializer } from "discourse/lib/api";

export default apiInitializer("1.8.0", (api) => {
  
// ** Look up the Discourse site service and exit if viewport is mobile size ** //
  
  const site = api.container.lookup("service:site");
  
  if (site.mobileView) {
    return;
  }

  let toggleSvgUseEl;

  const updateIcon = () => {
    if (!toggleSvgUseEl) return;
    
    const isOpen = document.body.classList.contains("has-sidebar-page");

// ** Use the replacement icon settings ** //
                   
    const openIcon = settings.icon_to_open_the_sidebar;
    const closeIcon = settings.icon_to_close_the_sidebar;

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
