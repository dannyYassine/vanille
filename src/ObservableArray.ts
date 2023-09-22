import { Observable, observable } from './Observable';

export const observableArray = (array: unknown[]): Observable<Array<unknown>> => {
  const newArray = observable(array);
  newArray.push = ((f) =>
    function push() {
      var ret = f.apply(this, arguments);
      this.$$listeners['push'].forEach((cb) => {
        cb(arguments, this, this);
      });
      return ret;
        })(newArray.push);

  return newArray;
};
