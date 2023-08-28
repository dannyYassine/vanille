import { observable } from "../Observable";

export function hasObservableState(): (target: Function) => void {
    return (target: Function) => {
      target.prototype.buildState = function () {
        if (this.data) {
          this.state = observable(this.data?.());
        }
      };
    };
  }