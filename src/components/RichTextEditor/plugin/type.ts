import { CSSProperties } from "react";
import { Editor } from "slate";

export interface PluginProps {
    marks: CSSProperties | null;
    editor: Editor
}