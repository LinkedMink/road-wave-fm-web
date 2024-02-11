import { LoaderFunction } from "react-router";
import { FormatsListCard } from "../components/dashboard/FormatsListCard";
import { MapDashboard } from "../components/dashboard/MapDashboard";
import { StationsListCard } from "../components/dashboard/StationsListCard";
import type { LazyRouteObject } from "../types/reactUtilityTypes";

const fetchStationsLoader =
  (baseUrl: string): LoaderFunction =>
  async ({ params, request }) => {
    if (!params.lat || !params.lng) {
      return null;
    }

    const formData = await request.formData();
    const formDataObj = Object.fromEntries(formData.entries());

    const response = await fetch(new URL("stations", baseUrl), {
      method: request.method,
      body: JSON.stringify(formDataObj),
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });

    return response;
  };

export const dashboardRouteObject: Record<"root" | "formats" | "stations", LazyRouteObject> = {
  root: {
    Component: MapDashboard,
  },
  formats: {
    Component: FormatsListCard,
  },
  stations: {
    Component: StationsListCard,
    loaderConstructor: fetchStationsLoader,
  },
};
