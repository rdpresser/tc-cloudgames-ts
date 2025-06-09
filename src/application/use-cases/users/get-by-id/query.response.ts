export class GetUserResponse {
  constructor(
    public id: string,
    public firstName: string,
    public lastName: string,
    public email: string,
    public role: string,
  ) {}
}
