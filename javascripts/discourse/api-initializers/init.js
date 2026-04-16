import { apiInitializer } from "discourse/lib/api";
import DynamicSidebarIcon from "../components/dynamic-sidebar-icon";

export default apiInitializer("1.8.0", (api) => {
  api.renderInOutlet("header-contents__before", DynamicSidebarIcon);
});
