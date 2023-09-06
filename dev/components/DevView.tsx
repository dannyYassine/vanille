import { BaseView, define } from '../../src/index';

export abstract class DevView extends BaseView {
  globalStylesheet() {
    return `@import url("${window.location.origin}/assets/css/material-dashboard.css?v=3.1.0");`;
  }
}