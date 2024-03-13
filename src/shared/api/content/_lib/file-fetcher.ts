export class FileFetcher {
  constructor(private authToken?: string) {}
  async fetchText(url: string) {
    console.log(url);
    return fetch(url, {
      headers: {
        ...(this.authToken
          ? { Authorization: `Bearer ${this.authToken}` }
          : {}),
      },
    }).then((res) => res.text());
  }
}
