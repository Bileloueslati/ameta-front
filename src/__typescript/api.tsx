import { Date, ID } from "./common";

export type User = {
  id: ID;
  createdAt: Date;
  firstName: string;
  lastName: string;
  fullName: string;
  email: string;
  isActive: boolean;
  roles: UserRoles;
  compagny: Pick<Compagny, "name" | "id">;
};

export type UserRole = "ROLE_SUPERADMIN" | "ROLE_ADMIN" | "ROLE_USER";

export type UserRoles = UserRole[];

export type Compagny = {
  id: ID;
  name: string;
  updatedAt: Date;
  createdAt: Date;
  userCount: number;
  country: string;
  isEnabled: boolean;
  logo: string | null;
};

export type Pagination<T> = {
  items: T[];
  itemCount: number;
  offset: number;
  page: number;
  pageSize: number;
  totalItems: number;
  totalPages: number;
  nextUrl: string | null;
  prevUrl: string | null;
};
