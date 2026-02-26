export enum RoleType {
  ADMIN = 'ADMIN',
  USER = 'USER',
}

export class Role {
  public readonly id: string;
  public readonly name: RoleType;
  constructor(id: string, name: string) {
    this.id = id;
    this.name = name as RoleType;
  }
}
