import { test, expect, afterEach } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
import { ToolCallBadge, getToolLabel } from "../ToolCallBadge";

afterEach(() => {
  cleanup();
});

// --- getToolLabel unit tests ---

test("str_replace_editor create", () => {
  expect(getToolLabel("str_replace_editor", { command: "create", path: "/App.jsx" })).toBe("Creating /App.jsx");
});

test("str_replace_editor str_replace", () => {
  expect(getToolLabel("str_replace_editor", { command: "str_replace", path: "/components/Card.jsx" })).toBe("Editing /components/Card.jsx");
});

test("str_replace_editor insert", () => {
  expect(getToolLabel("str_replace_editor", { command: "insert", path: "/App.jsx" })).toBe("Editing /App.jsx");
});

test("str_replace_editor view", () => {
  expect(getToolLabel("str_replace_editor", { command: "view", path: "/App.jsx" })).toBe("Viewing /App.jsx");
});

test("str_replace_editor undo_edit", () => {
  expect(getToolLabel("str_replace_editor", { command: "undo_edit", path: "/App.jsx" })).toBe("Undoing edit in /App.jsx");
});

test("file_manager rename", () => {
  expect(getToolLabel("file_manager", { command: "rename", path: "/old.jsx" })).toBe("Renaming /old.jsx");
});

test("file_manager delete", () => {
  expect(getToolLabel("file_manager", { command: "delete", path: "/old.jsx" })).toBe("Deleting /old.jsx");
});

test("unknown tool falls back to tool name", () => {
  expect(getToolLabel("some_other_tool", {})).toBe("some_other_tool");
});

// --- ToolCallBadge rendering tests ---

test("shows label when in progress", () => {
  render(
    <ToolCallBadge
      toolName="str_replace_editor"
      args={{ command: "create", path: "/App.jsx" }}
      state="call"
    />
  );
  expect(screen.getByText("Creating /App.jsx")).toBeDefined();
});

test("shows spinner when in progress", () => {
  const { container } = render(
    <ToolCallBadge
      toolName="str_replace_editor"
      args={{ command: "create", path: "/App.jsx" }}
      state="call"
    />
  );
  expect(container.querySelector(".animate-spin")).toBeDefined();
  expect(container.querySelector(".bg-emerald-500")).toBeNull();
});

test("shows green dot when completed", () => {
  const { container } = render(
    <ToolCallBadge
      toolName="str_replace_editor"
      args={{ command: "create", path: "/App.jsx" }}
      state="result"
      result="File created"
    />
  );
  expect(container.querySelector(".bg-emerald-500")).toBeDefined();
  expect(container.querySelector(".animate-spin")).toBeNull();
});

test("shows spinner when result is null", () => {
  const { container } = render(
    <ToolCallBadge
      toolName="str_replace_editor"
      args={{ command: "create", path: "/App.jsx" }}
      state="result"
      result={null}
    />
  );
  expect(container.querySelector(".animate-spin")).toBeDefined();
  expect(container.querySelector(".bg-emerald-500")).toBeNull();
});
