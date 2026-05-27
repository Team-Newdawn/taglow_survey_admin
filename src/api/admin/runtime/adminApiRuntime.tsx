import { useMemo, type ReactNode } from "react";
import { readEnvConfig, type EnvConfig } from "../../../utils/envConfig";
import { AdminApiControllerProvider } from "../controller/adminApiControllerProvider";
import { createAdminApiRuntime } from "./createAdminApiRuntime";

export function AdminApiRuntimeProvider(props: {
  children: ReactNode;
  env?: EnvConfig;
}) {
  const controller = useMemo(
    () => createAdminApiRuntime(props.env ?? readEnvConfig()),
    [props.env],
  );

  return (
    <AdminApiControllerProvider controller={controller}>
      {props.children}
    </AdminApiControllerProvider>
  );
}
