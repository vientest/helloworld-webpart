# SharePoint Resources Schema

`context/sharepoint-resources.json` must contain an array of `PlanningResource` objects.

```ts
type SharePointResourcesFile = PlanningResource[];

interface PlanningResource {
  resourceKey: string;
  existingResourceId?: string;
  type: "List" | "Library";
  title: string;
  internalName?: string;
  source: "selected-existing" | "ai-suggested";
  description?: string;
  status: "exists" | "missing" | "needs-update";
  suggestedAction: "reuse" | "create" | "update";
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
  source: "selected-existing" | "ai-suggested";
  status: "exists" | "missing" | "needs-update";
  suggestedAction: "reuse" | "create" | "update";
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
  type: "Lookup" | "Reference";
  sourceResourceKey: string;
  sourceColumnInternalName?: string;
  targetResourceKey: string;
  targetColumnInternalName?: string;
}
```
