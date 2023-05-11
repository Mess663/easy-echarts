/**
 * 是否在本地开发环境
 */
export const isDev = () => import.meta.env.MODE === "development";