import * as React from "react";
import {
  MessageBar,
  MessageBarType,
  Stack,
  Text
} from "@fluentui/react";
import { RuntimeParameterDefinition } from "./models/RuntimeParameters";
import { getStringParameter, parseRuntimeConfig } from "./services/RuntimeConfig";
import { createSharePointClient } from "./services/SharePointClient";

export interface AppProps {
  context: unknown;
  parameters: Record<string, unknown>;
}

const runtimeParameterDefinitions: RuntimeParameterDefinition[] = [
  {
    key: "title",
    label: "Title",
    type: "string",
    defaultValue: "Generated Runtime"
  },
  {
    key: "description",
    label: "Description",
    type: "string",
    defaultValue: "This runtime template is ready for Codex-generated implementation."
  }
];

export function App(props: AppProps): React.ReactElement {
  const runtimeConfig = parseRuntimeConfig(props.parameters, runtimeParameterDefinitions);
  const title = getStringParameter(runtimeConfig, "title", "Generated Runtime");
  const description = getStringParameter(
    runtimeConfig,
    "description",
    "This runtime template is ready for Codex-generated implementation."
  );

  createSharePointClient(props.context as never);

  return (
    <Stack
      as="section"
      tokens={{ childrenGap: 12 }}
      styles={{
        root: {
          color: "#201f1e",
          fontFamily: "Segoe UI, Arial, sans-serif",
          padding: 16
        }
      }}
    >
      <Text variant="xLarge" as="h2" block>
        {title}
      </Text>
      <Text as="p" block>
        {description}
      </Text>
      <MessageBar messageBarType={MessageBarType.info}>
        Runtime configuration values should be supplied through Wrapper parametersJson.
      </MessageBar>
    </Stack>
  );
}
