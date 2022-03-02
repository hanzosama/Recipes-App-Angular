export class User {
  constructor(
    public email: string,
    public id: string,
    private _accessToken: string,
    private _tokenExpDate: Date
  ) {}

  get token() {
    if (!this._tokenExpDate || new Date() > this._tokenExpDate) {
      return null;
    }
    return this._accessToken;
  }

}
