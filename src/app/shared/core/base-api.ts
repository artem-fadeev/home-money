export class BaseApi {
  private static baseUrl = 'http://localhost:3000/';
  constructor() {}

  public static getUrl(url: string = ''): string {
    return this.baseUrl + url;
  }
}
