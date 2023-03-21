import { CSSProperties } from "react";
import { HistoryEditor } from "slate-history";
import { ReactEditor } from "slate-react";

export type CustomElement = { type: "paragraph"; children: CustomText[] }
export interface CustomText extends CSSProperties { text: string; }
interface BaseEditor {
  addMark: <T extends keyof CSSProperties>(key: T, value: CSSProperties[T]) => void
}

declare module "slate" {
  interface CustomTypes {
    Element: CustomElement
    Text: CustomText
    Editor: Omit<BaseEditor, "addMark" | "removeMark"> & ReactEditor & HistoryEditor & {
      addMark: <T extends keyof CSSProperties>(key: T, value: CSSProperties[T]) => void
      removeMark: <T extends keyof CSSProperties>(key: T | T[]) => void
    }
  }
}