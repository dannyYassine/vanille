import { View } from '@vanille/core';



export function Counter({ name }) {
  const count = state(0);
  const combined = computed(() => `${name.get()} and ${count.get()}`);

  return (
    <div>
      <div>{count}</div>
      <button onclick={() => count.set((c) => c + 1)}>
        Increment
      </button>
      <div>Together: {combined}</div>
    </div>
  );
}

export function DashboardHeaderWidget(this: typeof View, { widget }) {
  this.connected = () => {
    this.classList.add('col-xl-3');
    this.classList.add('col-sm-6');
    this.classList.add('mb-xl-0');
    this.classList.add('mb-4');
  }

    return (
      <div class="card mt-4 m-3" style="width: 200px; height: 100px; max-width: 200px;">
        <div class="card-header p-3 pt-2">
          <div
            class={`icon icon-lg icon-shape shadow-dark text-center border-radius-xl mt-n4 position-absolute ${widget.get().color}`}
          >
            <i class="material-icons opacity-10">{widget.get().icon}</i>
          </div>
          <div class="text-end pt-1">
            <p class="text-sm mb-0 text-capitalize">{widget.get().title}</p>
            <h4 class="mb-0">{widget.get().subTitle}</h4>
          </div>
        </div>
        <hr class="dark horizontal my-0" />
        <div class="card-footer p-3">
          <p class="mb-0">{widget.get().footer}</p>
        </div>
      </div>
    );
}