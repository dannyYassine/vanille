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

  newArray.pop = ((f) =>
    function pop() {
      var ret = f.apply(this, arguments);
      this.$$listeners['pop'].forEach((cb) => {
        cb(ret, this, this);
      });
      return ret;
    })(newArray.pop);

  newArray.shift = ((f) =>
    function shift() {
      var ret = f.apply(this, arguments);
      this.$$listeners['shift'].forEach((cb) => {
        cb(ret, this, this);
      });
      return ret;
    })(newArray.shift);

  newArray.unshift = ((f) =>
    function unshift() {
      var ret = f.apply(this, arguments);
      this.$$listeners['unshift'].forEach((cb) => {
        cb(arguments, this, this);
      });
      return ret;
    })(newArray.unshift);

  newArray.splice = ((f) =>
    function splice() {
      var ret = f.apply(this, arguments);
      this.$$listeners['splice'].forEach((cb) => {
        cb(ret, this, this);
      });
      return ret;
    })(newArray.splice);

  newArray.sort = ((f) =>
    function sort() {
      var ret = f.apply(this, arguments);
      this.$$listeners['sort'].forEach((cb) => {
        cb(ret, this, this);
      });
      return ret;
    })(newArray.sort);

  newArray.reverse = ((f) =>
    function reverse() {
      var ret = f.apply(this, arguments);
      this.$$listeners['reverse'].forEach((cb) => {
        cb(ret, this, this);
      });
      return ret;
    })(newArray.reverse);

  return newArray;
};
