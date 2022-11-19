import { describe, it, expect, beforeEach } from "vitest";

import { shallowMount } from "@vue/test-utils";
import { nextTick } from "vue";
import TodoApp from "../TodoApp.vue";
import TodoItem from "../TodoItem.vue";
import router from "@/router";

describe("TodoApp.vue", () => {
  /** @type {import('@vue/test-utils').Wrapper} */
  let wrapper = null;
  beforeEach(async () => {
    wrapper = shallowMount(TodoApp, {
      global: {
        plugins: [router],
      },
    });
    const todos = [
      { id: 1, text: "eat", done: false },
      { id: 2, text: "play", done: true },
      { id: 3, text: "sleep", done: false },
    ];
    await wrapper.setData({
      todos,
    });
  });

  it("new todo", async () => {
    const text = "new111";
    wrapper.vm.handleNewTodo(text);
    const todo = wrapper.vm.todos.find((t) => t.text === text);
    expect(todo).toBeTruthy();
  });

  it("todo list", async () => {
    expect(wrapper.findAllComponents(TodoItem).length).toBe(
      wrapper.vm.todos.length
    );
  });

  it("delete todo", async () => {
    await wrapper.vm.handleDelteTodo(1);
    expect(wrapper.vm.todos.length).toBe(2);
    expect(wrapper.findAllComponents(TodoItem).length).toBe(2);
  });

  it("delete todo", async () => {
    await wrapper.vm.handleDelteTodo(123);
    expect(wrapper.vm.todos.length).toBe(3);
    expect(wrapper.findAllComponents(TodoItem).length).toBe(3);
  });

  it("edit todo", async () => {
    const todo = { id: 2, text: "abc" };
    await wrapper.vm.handleEditTodo(todo);
    expect(wrapper.vm.todos[1].text).toBe(todo.text);
    todo.text = "";
    await wrapper.vm.handleEditTodo(todo);
    expect(wrapper.vm.todos.find((t) => t.id === todo.id)).toBeFalsy();
  });

  it("toggle all", async () => {
    const toggleAll = wrapper.find('input[data-testid="toggle-all"]');
    await toggleAll.setChecked();
    // 断言所有的子任务都被选中了
    wrapper.vm.todos.forEach((todo) => {
      expect(todo.done).toBeTruthy();
    });

    // 取消完成状态
    await toggleAll.setChecked(false);
    wrapper.vm.todos.forEach((todo) => {
      expect(todo.done).toBeFalsy();
    });
  });

  it("Toggle All State", async () => {
    const toggleAll = wrapper.find('input[data-testid="toggle-all"]');
    // 让所有任务都变成完成状态
    wrapper.vm.todos.forEach((todo) => {
      todo.done = true;
    });
    await nextTick();
    // 断言 toggleAll 也选中了
    expect(toggleAll.element.checked).toBeTruthy();

    // 取消某个任务未完成，断言 toggleAll 未完成
    wrapper.vm.todos[0].done = false;
    await nextTick();
    expect(toggleAll.element.checked).toBeFalsy();
  });

  it("Clear All Completed", async () => {
    wrapper.vm.handleClearCompleted();
    await nextTick();
    expect(wrapper.vm.todos).toEqual([
      { id: 1, text: "eat", done: false },
      { id: 3, text: "sleep", done: false },
    ]);
  });

  // it("Filter Todos", async () => {
  //   // 将路由导航到 /，断言 filterTodos = 完成的任务列表
  //   wrapper.vm.$route.path = "/";
  //   await nextTick();
  //   expect(wrapper.vm.filterTodos).toEqual([
  //     { id: 1, text: "eat", done: false },
  //     { id: 2, text: "play", done: true },
  //     { id: 3, text: "sleep", done: false },
  //   ]);

  //   // 将路由导航到 /active
  //   // 断言 filterTodos = 所有未完成任务
  //   wrapper.vm.$route.path = "/active";
  //   await nextTick();
  //   expect(wrapper.vm.filterTodos).toEqual([
  //     { id: 1, text: "eat", done: false },
  //     { id: 3, text: "sleep", done: false },
  //   ]);

  //   // 将路由导航到 /completed
  //   // 断言 filterTodos = 所有已完成任务
  //   wrapper.vm.$route.path = "/completed";
  //   await nextTick();
  //   expect(wrapper.vm.filterTodos).toEqual([
  //     { id: 2, text: "play", done: true },
  //   ]);
  // });
});
