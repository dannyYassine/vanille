import { computed, state } from "@vanille/core";

export function Counter() {
  const count = state(0);
  const classes = () => (count.get() > 5 ? "red" : "");
  const styles = computed(() => (count.get() > 5 ? "color: red;" : ""));

  return (
    <div>
      <button
        value={count}
        class={classes}
        onclick={() => count.set((c) => (c += 1))}
      >
        +
      </button>
      <div style={styles}>{() => `Count is ${count.get()}`}</div>
      <button class={classes} onclick={() => count.set((c) => (c -= 1))}>
        -
      </button>
    </div>
  );
}
