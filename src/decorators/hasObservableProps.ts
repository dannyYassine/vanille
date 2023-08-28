import { observable } from "../Observable";

export function hasObservableProps(): (target: Function) => void {
    return (target: Function) => {
      target.prototype.buildProps = function () {
        this.props = observable(this.props);
      }
    };
  }
  