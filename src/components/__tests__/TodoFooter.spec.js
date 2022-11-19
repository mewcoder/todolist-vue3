import { describe, it, expect, beforeEach } from "vitest";
import { nextTick } from "vue";
import { mount } from "@vue/test-utils";
import TodoFooter from "../TodoFooter.vue";
import router from "@/router";

describe("TodoFooter", () => {
  /** @type {import('@vue/test-utils').Wrapper} */
  let wrapper = null;

  beforeEach(() => {
    const todos = [
      { id: 1, text: "task1", done: true },
      { id: 2, text: "task2", done: true },
      { id: 3, text: "task3", done: false },
    ];
    wrapper = mount(TodoFooter, {
      props: {
        todos,
      },
      global: {
        plugins: [router],
      },
    });
  });

  it("done todos count", async () => {
    const count = wrapper.vm.todos.filter((t) => !t.done).length;
    const countEl = wrapper.find('[data-testid="done-todos-count"]');
    expect(Number.parseInt(countEl.text())).toBe(count);
  });

  it("clear completed show", async () => {
    const button = wrapper.find('[data-testid="clear-completed"]');
    expect(button.exists()).toBeTruthy();
    wrapper = mount(TodoFooter, {
      props: {
        todos: [
          { id: 1, text: "task1", done: false },
          { id: 2, text: "task2", done: false },
          { id: 3, text: "task3", done: false },
        ],
      },
    });
    expect(
      wrapper.find('[data-testid="clear-completed"]').exists()
    ).toBeFalsy();
  });

  // it("Router Link ActiveClass", async () => {
  //   const links = wrapper.findAllComponents({ name: "RouterLink" });
  //   router.push("/active");
  //   await nextTick();
  //   for (let i = 0; i < links.length; i++) {
  //     const link = links.at(i);
  //     if (link.vm.to === "/active") {
  //       expect(link.classes()).toContain("selected");
  //     } else {
  //       expect(link.classes("selected")).toBeFalsy();
  //     }
  //   }

  //   router.push("/completed");
  //   await nextTick();
  //   for (let i = 0; i < links.length; i++) {
  //     const link = links.at(i);
  //     if (link.vm.to === "/completed") {
  //       expect(link.classes()).toContain("selected");
  //     } else {
  //       expect(link.classes("selected")).toBeFalsy();
  //     }
  //   }

  //   router.push("/");
  //   await nextTick();
  //   for (let i = 0; i < links.length; i++) {
  //     const link = links.at(i);
  //     if (link.vm.to === "/") {
  //       expect(link.classes()).toContain("selected");
  //     } else {
  //       expect(link.classes("selected")).toBeFalsy();
  //     }
  //   }
  // });
});
