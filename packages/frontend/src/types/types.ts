export interface IPosterCard {
    author?: string;
    title?: string;
    description?: string;
    image: string;
    tags?: string[];
}

export interface IPosterCardArray {
    posters: IPosterCard[];
}
