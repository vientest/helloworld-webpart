# Workspace Summary

- Read `context/input.json` for the latest action and user message.
- Read `workspace.json` for webpart metadata.
- Read `context/sharepoint-resources.json` for provided SharePoint resources.
- Read `plan/details.json` for the current runtime plan.
- Read `design/proposed-screens.json` for proposed screens.
- Read schema files beside JSON files before changing those JSON files.
- Use only provided SharePoint metadata for existing lists, libraries, and columns.
- Describe missing resources as suggested resources instead of inventing confirmed SharePoint metadata.
- Do not build runtime output during planning.
- Do not upload files.
- Do not implement wrapper webpart logic.
