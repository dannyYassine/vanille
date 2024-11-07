import { View, For, state } from '@vanille/core';
import { DashboardHeaderWidget } from './DashboardHeaderWidget';

export class ListExample extends View {
  choose = [
    {
      color: 'bg-gradient-dark',
      title: "Today's Money",
      icon: 'weekend',
      subTitle: '$53k',
      footer: (
        <span>
          <span class="text-success text-sm font-weight-bolder">+55% </span>than last week
        </span>
      )
    },
    {
      color: 'bg-gradient-primary',
      title: "Today's Users",
      icon: 'person',
      subTitle: '2,300',
      footer: (
        <span>
          <span class="text-success text-sm font-weight-bolder">+3% </span>than last month
        </span>
      )
    },
    {
      color: 'bg-gradient-success',
      title: 'New clients',
      subTitle: '3,462',
      icon: 'person',
      footer: (
        <span>
          <span class="text-danger text-sm font-weight-bolder">-2%</span> than yesterday
        </span>
      )
    },
    {
      color: 'bg-gradient-info',
      title: 'Sales',
      icon: 'weekend',
      subTitle: '$103,430',
      footer: (
        <span>
          <span class="text-success text-sm font-weight-bolder">+5% </span>than yesterday
        </span>
      )
    }
  ];

  widgets = state([
    {
      color: 'bg-gradient-dark',
      title: "Today's Money",
      icon: 'weekend',
      subTitle: '$53k',
      footer: (
        <span>
          <span class="text-success text-sm font-weight-bolder">+55% </span>than last week
        </span>
      )
    },
    {
      color: 'bg-gradient-primary',
      title: "Today's Users",
      icon: 'person',
      subTitle: '2,300',
      footer: (
        <span>
          <span class="text-success text-sm font-weight-bolder">+3% </span>than last month
        </span>
      )
    },
    {
      color: 'bg-gradient-success',
      title: 'New clients',
      subTitle: '3,462',
      icon: 'person',
      footer: (
        <span>
          <span class="text-danger text-sm font-weight-bolder">-2%</span> than yesterday
        </span>
      )
    },
    {
      color: 'bg-gradient-info',
      title: 'Sales',
      icon: 'weekend',
      subTitle: '$103,430',
      footer: (
        <span>
          <span class="text-success text-sm font-weight-bolder">+5% </span>than yesterday
        </span>
      )
    }
  ]);

  get index() {
    return Math.floor(Math.random() * (this.choose.length - 1 - 0 + 1) + 0);
  }

  onAddClicked() {
    this.widgets.mutSet((v) => v.push(this.choose[this.index]));
  }

  onPopClicked() {
    this.widgets.mutSet((v) => v.pop());
  }

  onShiftClicked() {
    this.widgets.mutSet((v) => v.shift());
  }

  onUnshiftClicked() {
    this.widgets.mutSet((v) => v.unshift(this.choose[this.index]));
  }

  onResetClicked() {
    this.widgets.mutSet((v) => {
      v.length = 0;
      this.onAddClicked();
      this.onAddClicked();
      this.onAddClicked();
      this.onAddClicked();
    });
  }

  render() {
    return (
      <main class="main-content position-relative max-height-vh-100 h-100 border-radius-lg ">
        <div class="container-fluid py-4">
          <div class="row">
            <button onclick={() => this.onAddClicked()}>Add</button>{' '}
            <button onclick={() => this.onPopClicked()}>Remove</button>
            <button onclick={() => this.onShiftClicked()}>shift</button>
            <button onclick={() => this.onUnshiftClicked()}>unshift</button>
            <button onclick={() => this.onResetClicked()}>reset</button>
          </div>
          <div class="row" style="margin-top: 100px">
            <For
              ref="list"
              class="row"
              items={this.widgets}
              template={(widget) => <DashboardHeaderWidget widget={widget} />}
            />
          </div>
        </div>
      </main>
    );
  }
}
