export interface JsonFilesPersistence {
  // eslint-disable-next-line @typescript-eslint/ban-types
  getFileData<T extends Object>(): Promise<T>;

  save(data: any): Promise<void>;
}
