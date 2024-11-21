import { defer } from "react-router-dom";
import apiRequest from "./apiRequest";

export const singlePageLoader = async ({ params }) => {
  const { id } = params;
  const response = await apiRequest.get("/partner/post/" + id);
  return response.data;
};

export const listPageLoader = async ({ request }) => {
  const [location, limitStr] = request.url.split("?")[1].split("&limit=");
  const limit = parseInt(limitStr);
  const postPromise = apiRequest.get(`/post/?${location}&limit=${limit}`);
  return defer({
    postResponse: postPromise,
  });
};


