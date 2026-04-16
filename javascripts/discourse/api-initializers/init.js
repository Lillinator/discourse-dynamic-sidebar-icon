import { apiInitializer } from "discourse/lib/api";

export default apiInitializer("1.8.0", (api) => {
  const openIcon = settings.icon_to_open_the_sidebar;
  const closeIcon = settings.icon_to_close_the_sidebar;
  const applyOnMobile = settings.apply_open_icon_on_mobile;

  let toggleSvgUseEl;
  let observer;

  // The function to swap icons on desktop
  const updateIcon = () => {
    if (!toggleSvgUseEl) return;
    const isOpen = document.body.classList.contains("has-sidebar-page");
    toggleSvgUseEl.setAttribute("href", isOpen ? `#${closeIcon}` : `#${openIcon}`);
  };

  // Turn ON the observer for desktop
  const setupObserver = () => {
    if (observer) return; // already running
    observer = new MutationObserver((mutations) => {
      for (let m of mutations) {
        if (m.attributeName === "class") updateIcon();
      }
    });
    observer.observe(document.body, { attributes: true });
  };

  // Turn OFF the observer for mobile (saves memory!)
  const teardownObserver = () => {
    if (observer) {
      observer.disconnect();
      observer = null;
    }
  };

  // The core logic that checks the viewport
  const handleViewportChange = (e) => {
    const isDesktop = e.matches; // true if screen is >= 768px

    requestAnimationFrame(() => {
      toggleSvgUseEl = document.querySelector(".header-sidebar-toggle svg use");
      if (!toggleSvgUseEl) return;

      if (isDesktop) {
        setupObserver();
        updateIcon();
      } else {
        teardownObserver();
        
        // Handle your new mobile setting!
        if (applyOnMobile) {
          toggleSvgUseEl.setAttribute("href", `#${openIcon}`);
        } else {
          toggleSvgUseEl.setAttribute("href", "#bars");
        }
      }
    });
  };

  // JS equivalent of Discourse's SCSS viewport breakpoints (md = 768px)
  const desktopQuery = window.matchMedia("(min-width: 768px)");

  // Listen for browser window resizes
  desktopQuery.addEventListener("change", handleViewportChange);

  // Run every time the page changes/loads
  api.onAppEvent("page:changed", () => {
    handleViewportChange(desktopQuery);
  });
});
