export type StoryStep = { title: string; text: string };

export type DiagramBlock =
  | { type: "node"; title: string; detail?: string; step?: number }
  | { type: "flow"; items: DiagramBlock[]; labels?: string[] }
  | { type: "stack" | "split"; items: DiagramBlock[] }
  | { type: "group"; title: string; items: DiagramBlock[] }
  | { type: "label" | "note"; text: string };

export type StoryView = {
  title: string;
  blocks: DiagramBlock[];
  steps?: StoryStep[];
};

export type ImplementationStory = {
  id: string;
  label: string;
  title: string;
  context: string;
  outcome: string;
  defaultView: number;
  steps: StoryStep[];
  views: StoryView[];
};

export type ProjectStory = {
  title: string;
  description: string;
  responsibility: string;
  technologies: string[];
  image: string;
  imagePosition?: string;
  repository?: string;
  reference?: { label: string; url: string };
  contributions: { title: string; text: string }[];
  cases: ImplementationStory[];
};
