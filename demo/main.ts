import "./root.css";
import { Application } from "./Application";

mount(Application);

function mount(Application) {
  customElements.define("v-app", Application);
}
