import { BaseView } from '@vanille/core';

export abstract class DevView extends BaseView {
  globalStylesheet() {
    return `@import url("${window.location.origin}/assets/css/material-dashboard.css?v=3.1.0");
    @import url("${window.location.origin}/assets/css/app.css");`;
  }
}
