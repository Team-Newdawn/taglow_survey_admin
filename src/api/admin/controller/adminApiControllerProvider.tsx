import { createContext, useContext, type ReactNode } from "react";
import type { AdminApiController } from "./adminApiController";

const AdminApiControllerContext = createContext<AdminApiController | null>(null);

export function AdminApiControllerProvider(props: {
  controller: AdminApiController;
  children: ReactNode;
}) {
  return (
    <AdminApiControllerContext.Provider value={props.controller}>
      {props.children}
    </AdminApiControllerContext.Provider>
  );
}

export function useAdminApiController(): AdminApiController {
  const controller = useContext(AdminApiControllerContext);
  if (!controller) {
    throw new Error("AdminApiControllerProvider is missing.");
  }
  return controller;
}
