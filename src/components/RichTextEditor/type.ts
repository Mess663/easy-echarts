import React from "react";

export type CustomElement = { type: "paragraph"; children: CustomText[] }
export type CustomText = { text: string; style?: React.CSSProperties }


declare module "slate" {
  interface CustomTypes {
    Element: CustomElement
    Text: CustomText
  }
}