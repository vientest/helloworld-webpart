# Runtime Generation Requirements

Generate source code inside this runtime template.

## User Request

Show hello world text

## Approved Plan

{
  "id": "21",
  "title": "HelloWorld Webpart",
  "description": "Show hello world text",
  "summary": "Render a simple static webpart that displays hello world text.",
  "runtimeBehavior": {
    "summary": "Render a lightweight static UI with a single text element reading \"Hello world\". No SharePoint data access or runtime parameters are required.",
    "features": [
      "Display static hello world text in the webpart canvas"
    ],
    "uiStructure": [
      {
        "id": "hello-world-text",
        "type": "Text",
        "title": "Hello World Text",
        "description": "A single visible text element that displays \"Hello world\".",
        "layout": {
          "region": "main",
          "direction": "vertical",
          "density": "comfortable",
          "width": "full"
        },
        "dataBinding": null,
        "interactions": [],
        "states": [
          {
            "name": "default",
            "description": "The text is visible when the webpart loads."
          }
        ],
        "children": []
      }
    ],
    "dataOperations": []
  },
  "resources": [],
  "proposedScreens": {
    "version": 1,
    "generatedAt": "2026-06-12T10:57:25.408Z",
    "webpartId": "21",
    "screens": [
      {
        "id": "hello-world-default",
        "order": 1,
        "title": "Hello World",
        "description": "Default screen showing the static hello world text.",
        "thumbnailPath": "design/previews/hello-world-default.png"
      }
    ]
  },
  "runtimeParameters": {}
}

## Provided SharePoint Metadata

- No SharePoint resources were provided.

## Runtime Parameters

These values are supplied to the runtime through the `parameters` argument passed to `render`.
They are the same values the Wrapper Webpart receives from its `parametersJson` property.
Runtime parameters are mandatory runtime inputs, not generation-time constants.
Use `parseRuntimeConfig` and typed accessors from `src/services/RuntimeConfig.ts` for all runtime parameter reads.
Do not read configurable values directly from the approved plan after generation.

{}

Approved runtime parameter keys:
- No runtime parameters were defined. Keep using the RuntimeConfig helper for future-safe defaults.

## SharePoint Access

No SharePoint resources were supplied. Do not add SharePoint calls unless the generated implementation truly needs them.
Never create SharePoint lists, libraries, columns, or upload files from generated runtime code.
Use only the SharePoint list/library titles and column internal names listed in Provided SharePoint Metadata.

## Hard Requirements

- Do not change output contract.
- Do not remove the render export.
- Build must produce dist/runtime.js.
- Use React 17.0.1 and ReactDOM 17.0.1 from this template.
- Use @fluentui/react for runtime UI components, layout, messages, commands, and form-like controls. This is mandatory.
- Runtime UI must follow SharePoint and Fluent UI visual conventions.
- Treat the parameters argument as the source of all user-configurable runtime values.
- Read configurable values from parameters, which comes from the Wrapper Webpart parametersJson property.
- Use src/services/RuntimeConfig.ts helpers for runtime configuration instead of hardcoded generated constants.
- Do not hardcode values that are represented in approvedPlan.runtimeParameters.
- Use src/services/SharePointClient.ts and @pnp/sp for SharePoint list/library access when SharePoint resources are used.
- Use defensive type checks and sensible defaults when a parameter is missing or invalid.
- Use only provided SharePoint columns by internalName.
- Do not invent SharePoint columns.
- Do not add upload logic.
- Do not add storage logic.
- Do not add runtime hosting logic.
- Do not implement wrapper webpart logic.
- Do not implement preview, approval, or admin workflows.
- Keep changes inside the source workspace.
- Preserve webpack single-file output constraints.