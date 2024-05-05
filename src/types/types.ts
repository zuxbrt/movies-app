export interface SearchResult {
    id: number;
    name: string;
    key: string;
    vote_average: number;
    vote_count: number;
    poster_path: string;
    title: string;
    popularity: number;
}


export interface Genre {
    id: number,
    name: string,
}

export interface DetailsResponse {
    backdrop_path: string,
    name?: string,
    title?: string,
    tagline?: string,
    overview: string,
    video?: boolean,
    poster_path?: string,
    genres: Array<Genre>
}

export interface ListItem {
    id: number;
    name: string;
    key: string;
    poster_path: string;
    title: string;
}

export interface ItemsList extends Array<ListItem> { }