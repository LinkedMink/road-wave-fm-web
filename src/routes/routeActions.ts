import { ActionFunction } from "react-router";

export const fetchLoginAction =
  (baseUrl: string): ActionFunction =>
  async ({ request }) => {
    const formData = await request.formData();
    const formDataObj = Object.fromEntries(formData.entries());

    const response = await fetch(`${baseUrl}/authenticate`, {
      method: request.method,
      body: JSON.stringify(formDataObj),
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });

    return response;
  };
