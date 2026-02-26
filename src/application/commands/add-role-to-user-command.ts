export class AddRoleToUserCommand {
  constructor(
    public readonly userId: string,
    public readonly roleIds: number[],
  ) {}
}
