export interface Loader {
    load(id: string): any;
    unload(id: string): any;
}
