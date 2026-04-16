import { apiInitializer } from "discourse/lib/api";

export default apiInitializer("1.8.0", (api) => {
  const openIcon = settings.icon_to_open_the_sidebar;
  const closeIcon = settings.icon_to_close_the_sidebar;
  const applyOnMobile = settings.apply_open_icon_on_mobile;

  const desktopQuery = window.matchMedia("(min-width: 768px)");

  const updateIcon = () => {
    const toggleEls = document.querySelectorAll(
      ".header-sidebar-toggle svg use, .hamburger-dropdown svg use"
    );
    
    if (toggleEls.length === 0) return;

    const isDesktop = desktopQuery.matches;

    if (!isDesktop && !applyOnMobile) {
      toggleEls.forEach((el) => {
        el.setAttribute("href", "#bars");
      });
      return; 
    }
    
    const isOpen = 
      document.body.classList.contains("has-sidebar-page") || 
      document.body.classList.contains("sidebar-open") ||
      document.body.classList.contains("drawer-open");

    toggleEls.forEach((el) => {
      el.setAttribute("href", isOpen ? `#${closeIcon}` : `#${openIcon}`);
    });
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
      updateIcon();
    });
  });

  desktopQuery.addEventListener("change", () => {
    updateIcon();
  });
});
