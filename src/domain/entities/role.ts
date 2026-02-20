export enum RoleType {
  ADMIN = 'admin',
  USER = 'user',
}

export class Role {
  public readonly id: string;
  public readonly name: RoleType;
  constructor(id: string, name: string) {
    if (!Object.values(RoleType).includes(name as RoleType)) {
      throw new Error(`Invalid RoleType: ${name}`);
    }

    this.id = id;
    this.name = name as RoleType;
  }
}
