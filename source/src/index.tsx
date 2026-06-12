import * as React from "react";
import * as ReactDOM from "react-dom";
import { App } from "./App";

export interface RuntimeRenderContext {
  rootElement: HTMLElement;
  context: unknown;
  parameters: Record<string, unknown>;
}

let currentRootElement: HTMLElement | undefined;

export function render(
  rootElement: HTMLElement,
  context: unknown,
  parameters: Record<string, unknown>
): void {
  currentRootElement = rootElement;
  ReactDOM.render(
    React.createElement(App, {
      context,
      parameters
    }),
    rootElement
  );
}

export function dispose(): void {
  if (currentRootElement) {
    ReactDOM.unmountComponentAtNode(currentRootElement);
    currentRootElement.innerHTML = "";
    currentRootElement = undefined;
  }
}
