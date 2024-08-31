import type { LazyRouteObject } from "../../types/reactUtilityTypes";
import { AboutPage } from "./AboutPage";
import { DocumentsPage } from "./DocumentsPage";
import { LicenseDocument } from "./LicenseDocument";
import { PrivacyPolicyDocument } from "./PrivacyPolicyDocument";

export const infoRouteObjects: Record<
  "about" | "documents" | "license" | "privacyPolicy",
  LazyRouteObject
> = {
  about: {
    Component: AboutPage,
  },
  documents: {
    Component: DocumentsPage,
  },
  license: {
    Component: LicenseDocument,
  },
  privacyPolicy: {
    Component: PrivacyPolicyDocument,
  },
};
