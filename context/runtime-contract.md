# Runtime Contract

Every generated runtime must export:

```ts
export function render(
  rootElement: HTMLElement,
  context: WebPartContext,
  parameters: Record<string, any>
): void;

export function dispose?(): void;
```