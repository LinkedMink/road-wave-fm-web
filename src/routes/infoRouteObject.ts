import { AboutPage } from "../components/pages/AboutPage";
import { DocumentsPage } from "../components/pages/DocumentsPage";
import type { LazyRouteObject } from "../types/reactUtilityTypes";

export const infoRouteObjects: Record<"about" | "documents", LazyRouteObject> = {
  about: {
    Component: AboutPage,
  },
  documents: {
    Component: DocumentsPage,
  },
};
