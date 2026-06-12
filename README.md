# Generated Runtime Webpart Workspace

This workspace represents one generated SPFx runtime webpart.

Codex and developers should read these folders before making changes:

- `context/`: latest action input and SharePoint resource context.
- `plan/`: current runtime plan.
- `design/`: proposed screen metadata and preview assets.
- `source/`: runtime source code that builds to `dist/runtime.js`.
- `integrations/`: optional external integration metadata.

During planning, update `plan/details.json`, `design/proposed-screens.json`, and optional preview files. Do not install dependencies, build runtime output, upload files, or implement wrapper webpart behavior during planning.

During runtime generation, update source files under `source/src/` according to the approved plan. Preserve the runtime contract described in `runtime-contract.md`.
