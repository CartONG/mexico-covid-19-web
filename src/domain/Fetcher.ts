export interface Fetcher {
  fetch(file: string): Promise<any>;
}
