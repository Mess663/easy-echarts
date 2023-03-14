import React from "react";

export type CustomElement = { type: string; children: CustomText[] }
export type CustomText = { text: string; style?: React.CSSProperties }


declare module "slate" {
  interface CustomTypes {
    Element: CustomElement
    Text: CustomText
  }
}