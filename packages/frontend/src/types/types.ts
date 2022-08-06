export interface IPosterCard {
    author: string;
    title?: string;
    description?: string;
    image: string;
    tags?: string[];
}

export interface IPostersList {
    title?: string;
    posters: IPosterCard[];
    numberElements?: number;
    actionButton?: "navigate" | "extend";
}

export interface ITagsList {
    title?: string;
    tags: string[];
}