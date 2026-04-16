# Discourse Dynamic Sidebar Icon

### 👩‍💻 Summary
A lightweight Discourse theme component that dynamically changes the header's sidebar toggle icon based on whether the sidebar is open or closed. 

By default, the component displays the standard hamburger menu icon  (`bars`) when the sidebar is closed, and transitions to a close X icon (`xmark`) when the sidebar is open.  Admins can specify custom icons instead if they wish, and also choose to enable for mobile view (while the dynamic aspect of the component only applies to non-mobile viewport sizes, admins that change the open icon may want consistency with their mobile UX).

### ⭐ Features
* Gives users clear visual feedback on how to interact with the sidebar.
* Admins can easily replace the default icons with any FontAwesome icon via the theme settings.
* Allows enabling a replaced sidebar icon for mobile viewport UX consistency.

### 🔧 Settings

Customize the icons used for opening and closing the sidebar by editing the component's settings:

|setting | description|
|--- | ---|
|`Icon_to_open_the_sidebar` | the icon displayed when the sidebar is collapsed<br /> (default: `bars`)|
|`Icon_to_close_the_sidebar` | the icon displayed when the sidebar is expanded<br /> (default: `xmark`)|
|`Apply_open_icon_on_mobile` | apply the custom 'open' icon on mobile viewport <br />(default: `false`)|

### :warning: Important Notes

* If using custom icons that aren't already included in core Discourse, they will appear blank; to fix this, you must add the custom icons (e.g., `rocket`, `cat`) to the **`SVG icon subset`** site setting in your Discourse admin settings (see `All Site Settings` -> `SVG icon subset`). 
* This component does not work with header drop down mode.

---
**Discourse Meta Topic**: 

**Support**: For issues or feature requests, please post in the [Meta topic](https://meta.discourse.org/t/discourse-dynamic-sidebar-icon/400765) or start a PR on this repo.  

**To hire me or buy me coffee**: visit me here: [Lilly@Discourse Meta](https://meta.discourse.org/u/Lilly/summary).
