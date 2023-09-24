import { define, List } from '@vanille/core';
import { DevView } from './DevView';
import { DashboardHeaderWidget } from './DashboardHeaderWidget';

@define()
export class ListExample extends DevView {
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

  data() {
    return {
      widgets: [
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
      ]
    };
  }

  get index() {
    return Math.floor(Math.random() * (this.choose.length - 1 - 0 + 1) + 0);
  }

  onAddClicked() {
    this.state.widgets.push(this.choose[this.index]);
  }

  onRemoveClicked() {
    this.state.widgets.pop();
  }

  onShiftClicked() {
    this.state.widgets.shift();
  }

  onUnshiftClicked() {
    this.state.widgets.unshift(this.choose[this.index]);
  }

  render() {
    return (
      <main class="main-content position-relative max-height-vh-100 h-100 border-radius-lg ">
        <div class="container-fluid py-4">
          <div class="row">
            <button onclick={() => this.onAddClicked()}>Add</button>{' '}
            <button onclick={() => this.onRemoveClicked()}>Remove</button>
            <button onclick={() => this.onShiftClicked()}>shift</button>
            <button onclick={() => this.onUnshiftClicked()}>unshift</button>
          </div>
          <div class="row">
            <List class="row" value={this.state.widgets} item={(widget) => <DashboardHeaderWidget widget={widget} />} />
          </div>
          <footer class="footer py-4  ">
            <div class="container-fluid">
              <div class="row align-items-center justify-content-lg-between">
                <div class="col-lg-6 mb-lg-0 mb-4">
                  <div class="copyright text-center text-sm text-muted text-lg-start">
                    © <script>document.write(new Date().getFullYear())</script>, made with <i class="fa fa-heart"></i>{' '}
                    by
                    <a href="https://www.creative-tim.com" class="font-weight-bold" target="_blank">
                      Creative Tim
                    </a>
                    for a better web.
                  </div>
                </div>
                <div class="col-lg-6">
                  <ul class="nav nav-footer justify-content-center justify-content-lg-end">
                    <li class="nav-item">
                      <a href="https://www.creative-tim.com" class="nav-link text-muted" target="_blank">
                        Creative Tim
                      </a>
                    </li>
                    <li class="nav-item">
                      <a href="https://www.creative-tim.com/presentation" class="nav-link text-muted" target="_blank">
                        About Us
                      </a>
                    </li>
                    <li class="nav-item">
                      <a href="https://www.creative-tim.com/blog" class="nav-link text-muted" target="_blank">
                        Blog
                      </a>
                    </li>
                    <li class="nav-item">
                      <a href="https://www.creative-tim.com/license" class="nav-link pe-0 text-muted" target="_blank">
                        License
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </footer>
        </div>
      </main>
    );
  }
}
