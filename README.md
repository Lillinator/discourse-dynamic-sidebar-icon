# Discourse Dynamic Sidebar Icon

### 👩‍💻 Summary
A lightweight Discourse theme component that dynamically changes the header's sidebar toggle icon based on whether the sidebar is open or closed. 

By default, the component displays the standard hamburger menu (`bars`) when the sidebar is closed, and transitions to a close icon (`xmark`) when the sidebar is open. 

### ⭐ Features
* Gives users clear visual feedback on how to interact with the sidebar.
* Admins can easily replace the default icons with any FontAwesome icon via the theme settings.
* This component is exclusively for desktop and tablet viewports; it has no effect on mobile.

### 🔧 Settings

You can customize the icons used by editing the component's settings:

* `icon_to_open_the_sidebar`: The icon displayed when the sidebar is collapsed (Default: `bars`).
* `icon_to_close_the_sidebar`: The icon displayed when the sidebar is expanded (Default: `xmark`).

### ⚠️ Important Note on Custom Icons

If you change the theme settings to use a custom icon that isn't already included in core Discourse, it will appear blank. To fix this, you must add your custom icon's name (e.g., `rocket`, `cat`) to the **`SVG icon subset`** site setting in your Discourse admin settings (see `All Site Settings` -> `SVG icon subset`)

---
**Discourse Meta Topic**: 

**Support**: For issues or feature requests, please post in the [Meta topic]() or start a PR on this repo.  

**To hire me or buy me coffee**: visit me here: [Lilly@Discourse Meta](https://meta.discourse.org/u/Lilly/summary).
