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

const highlights = [
  {
    eyebrow: "Configurable",
    title: "Runtime-ready content",
    description: "Title and description values flow directly from wrapper parameters."
  },
  {
    eyebrow: "SharePoint",
    title: "Connected foundation",
    description: "The web part initializes a SharePoint client for future data experiences."
  },
  {
    eyebrow: "Polished",
    title: "Modern visual system",
    description: "Layered gradients, cards, and spacing create an inviting first impression."
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
      styles={{
        root: {
          background: "linear-gradient(135deg, #f7fbff 0%, #eef4ff 48%, #fff7ed 100%)",
          border: "1px solid rgba(77, 108, 255, 0.14)",
          borderRadius: 28,
          boxShadow: "0 24px 60px rgba(32, 31, 30, 0.14)",
          color: "#201f1e",
          fontFamily: "Segoe UI, Arial, sans-serif",
          overflow: "hidden",
          position: "relative"
        }
      }}
    >
      <Stack
        tokens={{ childrenGap: 24 }}
        styles={{
          root: {
            background:
              "radial-gradient(circle at 14% 18%, rgba(98, 100, 255, 0.18), transparent 28%), radial-gradient(circle at 88% 10%, rgba(255, 184, 108, 0.32), transparent 24%)",
            padding: "40px 36px"
          }
        }}
      >
        <Stack horizontal horizontalAlign="space-between" verticalAlign="center" wrap tokens={{ childrenGap: 16 }}>
          <Stack tokens={{ childrenGap: 14 }} styles={{ root: { maxWidth: 680 } }}>
            <Text
              variant="smallPlus"
              styles={{
                root: {
                  color: "#3152c7",
                  fontWeight: 700,
                  letterSpacing: "1.5px",
                  textTransform: "uppercase"
                }
              }}
            >
              SharePoint runtime experience
            </Text>
            <Text
              variant="xxLargePlus"
              as="h2"
              block
              styles={{
                root: {
                  color: "#17204f",
                  fontWeight: 700,
                  lineHeight: 1.1,
                  margin: 0
                }
              }}
            >
              {title}
            </Text>
            <Text
              as="p"
              block
              styles={{
                root: {
                  color: "#4b5568",
                  fontSize: 18,
                  lineHeight: 1.6,
                  margin: 0
                }
              }}
            >
              {description}
            </Text>
          </Stack>
          <Stack
            horizontalAlign="center"
            verticalAlign="center"
            styles={{
              root: {
                background: "linear-gradient(160deg, #3152c7 0%, #7f5af0 55%, #ff9f43 100%)",
                borderRadius: 24,
                boxShadow: "0 18px 42px rgba(49, 82, 199, 0.32)",
                color: "#ffffff",
                minHeight: 150,
                minWidth: 170,
                padding: 24,
                textAlign: "center"
              }
            }}
          >
            <Text variant="mega" styles={{ root: { color: "#ffffff", fontWeight: 700, lineHeight: 1 } }}>
              ✦
            </Text>
            <Text variant="mediumPlus" styles={{ root: { color: "#ffffff", fontWeight: 600 } }}>
              Beautiful UI
            </Text>
          </Stack>
        </Stack>

        <Stack horizontal wrap tokens={{ childrenGap: 16 }}>
          {highlights.map((highlight) => (
            <Stack
              key={highlight.title}
              tokens={{ childrenGap: 8 }}
              styles={{
                root: {
                  background: "rgba(255, 255, 255, 0.84)",
                  border: "1px solid rgba(49, 82, 199, 0.12)",
                  borderRadius: 20,
                  boxShadow: "0 14px 30px rgba(23, 32, 79, 0.08)",
                  flex: "1 1 210px",
                  padding: 20
                }
              }}
            >
              <Text variant="small" styles={{ root: { color: "#7f5af0", fontWeight: 700, textTransform: "uppercase" } }}>
                {highlight.eyebrow}
              </Text>
              <Text variant="large" styles={{ root: { color: "#17204f", fontWeight: 700 } }}>
                {highlight.title}
              </Text>
              <Text styles={{ root: { color: "#5f6b85", lineHeight: 1.5 } }}>{highlight.description}</Text>
            </Stack>
          ))}
        </Stack>

        <MessageBar
          messageBarType={MessageBarType.info}
          styles={{
            root: {
              background: "rgba(49, 82, 199, 0.1)",
              borderRadius: 14,
              color: "#17204f"
            }
          }}
        >
          Runtime configuration values should be supplied through Wrapper parametersJson.
        </MessageBar>
      </Stack>
    </Stack>
  );
}
