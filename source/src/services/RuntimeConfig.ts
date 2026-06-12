import {
  RuntimeConfigDiagnostic,
  RuntimeConfigResult,
  RuntimeParameterDefinition,
  RuntimeParameters,
  RuntimeParameterValue
} from "../models/RuntimeParameters";

export function parseRuntimeConfig(
  parameters: Record<string, unknown> | undefined,
  definitions: RuntimeParameterDefinition[] = []
): RuntimeConfigResult {
  const source = isPlainObject(parameters) ? parameters : {};
  const values: RuntimeParameters = { ...source };
  const diagnostics: RuntimeConfigDiagnostic[] = [];

  for (const definition of definitions) {
    const currentValue = values[definition.key];
    if (currentValue === undefined || currentValue === null || currentValue === "") {
      if (definition.defaultValue !== undefined) {
        values[definition.key] = definition.defaultValue;
        continue;
      }

      if (definition.required) {
        diagnostics.push({
          key: definition.key,
          message: `Parameter "${definition.key}" is required.`
        });
      }
    }
  }

  return {
    values,
    diagnostics
  };
}

export function getStringParameter(
  config: RuntimeConfigResult,
  key: string,
  fallback: string
): string {
  const value = config.values[key];
  return typeof value === "string" && value.trim().length > 0 ? value : fallback;
}

export function getNumberParameter(
  config: RuntimeConfigResult,
  key: string,
  fallback: number
): number {
  const value = config.values[key];
  return typeof value === "number" && Number.isFinite(value) ? value : fallback;
}

export function getBooleanParameter(
  config: RuntimeConfigResult,
  key: string,
  fallback: boolean
): boolean {
  const value = config.values[key];
  return typeof value === "boolean" ? value : fallback;
}

export function getStringArrayParameter(
  config: RuntimeConfigResult,
  key: string,
  fallback: string[] = []
): string[] {
  const value = config.values[key];
  return Array.isArray(value) && value.every((item) => typeof item === "string") ? value : fallback;
}

function isPlainObject(value: unknown): value is Record<string, RuntimeParameterValue> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}
