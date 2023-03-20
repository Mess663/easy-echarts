import { CSSProperties } from "react";
import { Editor } from "slate";
import { RichStyle } from "../../../types/biz/option_form";

export interface PluginProps {
    marks: CSSProperties | null;
    editor: Editor
}

/** 转换样式的通用函数签名 */
export type ToRichStyle = (css: CSSProperties) => RichStyle;
export type ToCssStyle = (rich: RichStyle) => CSSProperties;