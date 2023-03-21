
export const keys = <T extends object>(o: T): (keyof T)[] => Object.keys(o) as (keyof T)[];