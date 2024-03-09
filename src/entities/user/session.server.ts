import { getServerSession } from "next-auth";
import { nextAuthConfig } from "./next-auth-config";
import { NeedAuthError } from "@/shared/lib/errors";

export const getAppSessionServer = () => getServerSession(nextAuthConfig);

export const getAppSessionServerStrict = async () => {
  const session = await getAppSessionServer();
  if (session === null) {
    throw new NeedAuthError();
  }
  return session;
};
