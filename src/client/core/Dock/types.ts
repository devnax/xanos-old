import { ReactElement } from 'react'

export type DockProps = {
    viewMode?: "mobile" | "pc";
    dockPosition?: "top" | "left" | "right" | "bottom";
    centerMode?: boolean;
    dockBgcolor?: string;
    logo?: ReactElement
}