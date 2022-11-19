import { describe, it, expect, beforeEach } from "vitest";

import { mount } from "@vue/test-utils";
import TodoHeader from "../TodoHeader.vue";

describe("TodoHeader", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(TodoHeader);
  });
  it("new todo", async () => {
    const input = wrapper.find('input[data-testid="new-todo"]');
    const text = "task001";
    await input.setValue(text);
    await input.trigger("keyup.enter");
    expect(wrapper.emitted()["new-todo"]).toBeTruthy();
    expect(wrapper.emitted()["new-todo"][0][0]).toBe(text);
    expect(input.element.value).toBe("");
  });
});
