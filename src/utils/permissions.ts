import { User } from "@/types";

export function hasPermission(
  permission: string,
  user: User
): boolean {
  return user.roles.some(r => r.permissions.some(p => p.name === permission));
}