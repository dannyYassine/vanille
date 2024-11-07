import { View } from '@vanille/core';

export class DashboardHeaderWidget extends View {
  constructor() {
    super();

    this.classList.add('col-xl-3');
    this.classList.add('col-sm-6');
    this.classList.add('mb-xl-0');
    this.classList.add('mb-4');
  }

  render() {
    return (
      <div class="card mt-4 m-3" style="width: 200px; height: 100px; max-width: 200px;">
        <div class="card-header p-3 pt-2">
          <div
            class={`icon icon-lg icon-shape shadow-dark text-center border-radius-xl mt-n4 position-absolute ${this.props.widget.color}`}
          >
            <i class="material-icons opacity-10">{this.props.widget.icon}</i>
          </div>
          <div class="text-end pt-1">
            <p class="text-sm mb-0 text-capitalize">{this.props.widget.title}</p>
            <h4 class="mb-0">{this.props.widget.subTitle}</h4>
          </div>
        </div>
        <hr class="dark horizontal my-0" />
        <div class="card-footer p-3">
          <p class="mb-0">{this.props.widget.footer}</p>
        </div>
      </div>
    );
  }

}
