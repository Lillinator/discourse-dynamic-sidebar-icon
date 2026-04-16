import { apiInitializer } from "discourse/lib/api";
import CustomSidebarToggle from "../components/custom-sidebar-toggle";

export default apiInitializer("1.8.0", (api) => {
  // Inject exactly where the original toggle sits
  api.renderInOutlet("header-contents__before", CustomSidebarToggle);
});
