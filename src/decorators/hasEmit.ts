export function hasEmit(): (target: Function) => void {
  return (target: Function) => {
    target.prototype.emit = function (name: string, data?: unknown) {
      setTimeout(() => {
        let options: { bubbles: boolean; detail?: unknown } = { bubbles: true };
        if (data) {
          options = { ...options, detail: { ...data } };
        }
        this.dispatchEvent(new CustomEvent(name, options));
      }, 0);
    };
  };
}
