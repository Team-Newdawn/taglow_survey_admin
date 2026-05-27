import type { AdminMember } from "./adminMember";

export type AdminSessionState = Readonly<{
  isAuthenticated: boolean;
  email?: string;
  isHandongEmail: boolean;
  admin?: AdminMember;
}>;
