import { HOME_PATH, SERVICE_AREA_PATH_PREFIX } from "@/consts/paths";

const isRootHomePath = (pathname: string) => pathname === HOME_PATH;

export const isServiceAreaPath = (path: string) =>
  path.startsWith(SERVICE_AREA_PATH_PREFIX);

export const shouldOpenQuoteInNewTab = (currentPath: string) =>
  isRootHomePath(currentPath);

export const shouldOpenRouteInNewTab = (
  currentPath: string,
  destinationPath: string
) => isRootHomePath(currentPath) && isServiceAreaPath(destinationPath);

export const getNewTabLinkProps = (shouldOpenInNewTab: boolean) =>
  shouldOpenInNewTab
    ? ({ target: "_blank", rel: "noopener noreferrer" } as const)
    : {};

export const openPathInNewTab = (path: string) =>
  window.open(path, "_blank", "noopener,noreferrer");
