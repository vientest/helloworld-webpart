# Runtime Contract

Every generated runtime JavaScript file must export:

```ts
export function render(
  rootElement: HTMLElement,
  context: WebPartContext,
  parameters: Record<string, any>
): void;

export function dispose?(): void;
```

The wrapper calls `render(rootElement, context, parameters)`. The generated runtime owns UI and business behavior inside `rootElement`.
