import * as React from "react";
import {
  Stack,
  Text
} from "@fluentui/react";
import { RuntimeParameterDefinition } from "./models/RuntimeParameters";
import { parseRuntimeConfig } from "./services/RuntimeConfig";

export interface AppProps {
  context: unknown;
  parameters: Record<string, unknown>;
}

const runtimeParameterDefinitions: RuntimeParameterDefinition[] = [
];

export function App(props: AppProps): React.ReactElement {
  parseRuntimeConfig(props.parameters, runtimeParameterDefinitions);

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
      <Text variant="xLarge" as="p" block>
        Hello world
      </Text>
    </Stack>
  );
}
