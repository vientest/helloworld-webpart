# Proposed Screens Schema

`design/proposed-screens.json` must contain:

```ts
interface ProposedScreensFile {
  version: number;
  generatedAt: string;
  webpartId: string;
  screens: ProposedScreenItem[];
}

interface ProposedScreenItem {
  id: string;
  order: number;
  title: string;
  description: string;
  thumbnailPath: string;
}
```

Preview thumbnail paths should be workspace-relative paths under `design/previews/`.
