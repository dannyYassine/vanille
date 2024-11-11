import { Engine } from "../../src/Engine";

export class TestEngine extends Engine {
    getElement(tag) {
        const element = new tag();
        element.render = () => '';
       return element;
    }
  }