export class User {
  constructor(
    public name: string,
    public email: string,
    private readonly password: string,
    public readonly id?: number,
  ) {}

  toPersistence() {
    return {
      name: this.name,
      email: this.email,
      password: this.password,
    };
  }
}
