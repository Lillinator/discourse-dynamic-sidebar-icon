import { apiInitializer } from "discourse/lib/api";

export default apiInitializer("1.8.0", (api) => {
  // 1. Look up the Discourse site service
  const site = api.container.lookup("service:site");
  
  // 2. If it's a mobile viewport, exit immediately and do nothing!
  // (Note: Discourse considers most tablets as "desktop", which matches your goal)
  if (site.mobileView) {
    return;
  }

  let toggleSvgUseEl;

  const updateIcon = () => {
    if (!toggleSvgUseEl) return;
    
    // We can safely remove the "sidebar-open" check now, 
    // because that class is specifically used for the mobile drawer!
    const isOpen = document.body.classList.contains("has-sidebar-page");
                   
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
