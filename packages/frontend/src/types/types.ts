export interface IPosterCard {
    id: string;
    author: string;
    title: string;
    description: string;
    image: string;
    tags: string[];
}

export interface IPostersList {
    title?: string;
    posters: IPosterCard[];
    numberElements?: number;
    actionButton?: "navigate" | "extend";
}

export interface ITagsList {
    title?: string;
    titlePosition?: "left" | "center";
    tags: string[];
}