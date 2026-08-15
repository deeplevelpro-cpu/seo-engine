export type ToolInput = {
  text: string;
  keyword?: string;
};

export type ToolResult = {
  title: string;
  content: string;
};

export type ToolHandler = (
  input: ToolInput
) => ToolResult | Promise<ToolResult>;
