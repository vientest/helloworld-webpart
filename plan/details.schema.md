# Runtime Plan Schema

`plan/details.json` must contain one `RuntimePlan` object.

This file is documentation for Codex and developers. The executable validation rules live in the WebAPI shared contracts and validators. Follow this shape when creating or updating `plan/details.json`.

```ts
interface RuntimePlan {
  id: string;
  title: string;
  description: string;
  summary: string;
  runtimeBehavior: RuntimeBehaviorPlan;
  resources?: PlanningResource[] | null;
  proposedScreens?: ProposedScreensFile;
  runtimeParameters: Record<string, unknown>;
}

interface RuntimeBehaviorPlan {
  summary: string;
  features?: string[] | null;
  uiStructure?: RuntimeUiComponent[] | null;
  dataOperations?: RuntimeDataOperation[] | null;
}

type RuntimeUiDirection = "vertical" | "horizontal" | "grid";
type RuntimeUiDensity = "compact" | "comfortable";

interface RuntimeUiComponent {
  id: string;
  type: string;
  title: string;
  description: string;
  layout?: {
    region?: string;
    direction?: RuntimeUiDirection;
    columns?: number;
    density?: RuntimeUiDensity;
    width?: string;
  } | null;
  dataBinding?: {
    resourceKey?: string;
    operationId?: string;
    fields?: string[] | null;
  } | null;
  interactions?: RuntimeUiInteraction[] | null;
  states?: RuntimeUiState[] | null;
  children?: RuntimeUiComponent[] | null;
}

interface RuntimeUiInteraction {
  id: string;
  trigger: string;
  action: string;
  targetComponentId?: string;
}

interface RuntimeUiState {
  name: string;
  description: string;
}

type RuntimeDataOperationType = "Read" | "Create" | "Update" | "Delete";

interface RuntimeDataOperation {
  id: string;
  type: RuntimeDataOperationType;
  resourceKey: string;
  description: string;
}

type SharePointResourceType = "List" | "Library";
type PlanningResourceSource = "selected-existing" | "ai-suggested";
type PlanningResourceStatus = "exists" | "missing" | "needs-update";
type PlanningSuggestedAction = "reuse" | "create" | "update";
type ResourceRelationshipType = "Lookup" | "Reference";

interface PlanningResource {
  resourceKey: string;
  existingResourceId?: string;
  type: SharePointResourceType;
  title: string;
  internalName?: string;
  source: PlanningResourceSource;
  description?: string;
  status: PlanningResourceStatus;
  suggestedAction: PlanningSuggestedAction;
  reusable: boolean;
  columns?: PlanningColumn[] | null;
  relationships?: ResourceRelationship[] | null;
}

interface PlanningColumn {
  columnKey: string;
  existingColumnId?: string;
  displayName: string;
  internalName: string;
  typeAsString: string;
  typeDisplayName?: string;
  required: boolean;
  source: PlanningResourceSource;
  status: PlanningResourceStatus;
  suggestedAction: PlanningSuggestedAction;
  choices?: string[] | null;
  lookup?: {
    targetResourceKey?: string;
    targetResourceTitle?: string;
    targetColumnInternalName?: string;
  } | null;
  defaultValue?: unknown;
}

interface ResourceRelationship {
  id: string;
  type: ResourceRelationshipType;
  sourceResourceKey: string;
  sourceColumnInternalName?: string;
  targetResourceKey: string;
  targetColumnInternalName?: string;
}

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

## Validator Rules

- `id`, `title`, `description`, and `summary` must be non-empty strings.
- Do not add `assumptions` or `risks`; they are not supported on `RuntimePlan`.
- `runtimeBehavior` is required.
- `runtimeBehavior.summary` must be a non-empty string.
- `runtimeBehavior.features`, `runtimeBehavior.uiStructure`, and `runtimeBehavior.dataOperations` should be arrays. Use `[]` when empty.
- Each `RuntimeUiComponent` requires `id`, `type`, `title`, and `description`.
- `RuntimeUiComponent.children`, when present, must be an array and must follow the same `RuntimeUiComponent` shape recursively.
- `resources` should be an array. Use `[]` when no SharePoint resources are required.
- Each `PlanningResource` requires `resourceKey`, `title`, and `description`.
- If `PlanningResource.source` is `selected-existing`, `existingResourceId` is required.
- `PlanningResource.columns`, when present, must be an array. Use `[]` when the resource has no columns relevant to the runtime.
- Each `PlanningColumn` requires `internalName`, `displayName`, `typeAsString`, `typeDisplayName`, and boolean `required`.
- `runtimeParameters` must be an object. Use `{}` when no runtime parameters are required.
- `proposedScreens`, when present, must follow `ProposedScreensFile`.
- Keep `proposedScreens` exactly consistent with `design/proposed-screens.json`.

## SharePoint Resource Rules

- Use only existing SharePoint resources and column metadata provided in `context/sharepoint-resources.json`.
- Do not invent confirmed existing lists, libraries, or columns.
- If a needed resource or column is not provided, include it as an `ai-suggested` resource or column with `status: "missing"` and `suggestedAction: "create"` or `suggestedAction: "update"`.
- For selected existing resources, preserve actual column `internalName` values.

## Minimal Valid Example

```json
{
  "id": "webpart-id",
  "title": "Example Webpart",
  "description": "Shows an example runtime experience.",
  "summary": "Render an example runtime experience.",
  "runtimeBehavior": {
    "summary": "Render static example UI.",
    "features": [],
    "uiStructure": [],
    "dataOperations": []
  },
  "resources": [],
  "proposedScreens": {
    "version": 1,
    "generatedAt": "2026-05-29T00:00:00.000Z",
    "webpartId": "webpart-id",
    "screens": []
  },
  "runtimeParameters": {}
}
```
