export class User {
  constructor(
    public name: string,
    public email: string,
    private readonly password: string,
    public readonly id?: number,
    public roleIds: number[] = [],
  ) {
    this.roleIds = roleIds;
  }

  toPersistence() {
    return {
      name: this.name,
      email: this.email,
      password: this.password,
      roleIds: this.roleIds,
    };
  }

  getPasswordHash() {
    return this.password;
  }

  updateRoles(roleIds: number[]) {
    if (!Array.isArray(roleIds)) {
      throw new Error('roleIds must be an array of numbers');
    }
    this.roleIds = roleIds;
  }
}
