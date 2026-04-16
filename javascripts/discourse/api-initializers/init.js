import { apiInitializer } from "discourse/lib/api";

export default apiInitializer("1.8.0", (api) => {
  const site = api.container.lookup("service:site");
  const openIcon = settings.icon_to_open_the_sidebar;
  const closeIcon = settings.icon_to_close_the_sidebar;

  // --- MOBILE LOGIC ---
  if (site.mobileView) {
    // If the admin wants the custom icon on mobile, apply it statically
    if (settings.apply_open_icon_on_mobile) {
      api.onAppEvent("page:changed", () => {
        requestAnimationFrame(() => {
          const useEl = document.querySelector(".header-sidebar-toggle svg use");
          if (useEl) {
            useEl.setAttribute("href", `#${openIcon}`);
          }
        });
      });
    }
    // Always exit here for mobile! We don't want the MutationObserver overhead.
    return;
  }

  // --- DESKTOP / TABLET LOGIC ---
  let toggleSvgUseEl;

  const updateIcon = () => {
    if (!toggleSvgUseEl) return;
    
    const isOpen = document.body.classList.contains("has-sidebar-page");
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
