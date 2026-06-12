export interface SharePointRuntimeContext {
  pageContext?: {
    web?: {
      absoluteUrl?: string;
      serverRelativeUrl?: string;
    };
  };
}
