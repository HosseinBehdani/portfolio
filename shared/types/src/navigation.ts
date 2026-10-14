export interface NavigationItem {
    key: string;
    href: string;
    order: number;
}

export interface Navigation {
    items: NavigationItem[];
}