export type RuntimeParameterValue = string | number | boolean | string[] | null | undefined;

export type RuntimeParameters = Record<string, unknown>;

export interface RuntimeParameterDefinition {
  key: string;
  label?: string;
  type?: "string" | "number" | "boolean" | "stringArray" | "json";
  required?: boolean;
  defaultValue?: RuntimeParameterValue;
}

export interface RuntimeConfigDiagnostic {
  key: string;
  message: string;
}

export interface RuntimeConfigResult {
  values: RuntimeParameters;
  diagnostics: RuntimeConfigDiagnostic[];
}
