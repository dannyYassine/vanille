export function hasEmit(): (target: Function) => void {
  return (target: Function) => {
    target.prototype.emit = function (name: string, data = undefined) {
      setTimeout(() => {
        let options = { bubbles: true };
        if (data) {
          options = { ...options, detail: { ...data } };
        }
        this.dispatchEvent(new CustomEvent(name, options));
      }, 0);
    };
  };
}
