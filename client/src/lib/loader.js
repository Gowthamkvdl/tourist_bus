import { defer } from "react-router-dom";
import apiRequest from "./apiRequest";

export const infoPageLoader = async ({ params }) => {
  return { id: params.id }; // Only passing the ID
};

export const addImageLoader = async ({ params }) => {
  const { id } = params;
  const response = await apiRequest.get("/post/" + id);
  return response.data;
};

export const editPageLoader = async ({ params }) => {
  const { id } = params;
  const response = await apiRequest.get("/post/" + id);
  return response.data;
};

export const listPageLoader = ({ request }) => {
  const url = new URL(request.url);
  const searchParams = url.searchParams;

  const params = new URLSearchParams();

  // Carry over existing params except limit and page
  for (const [key, value] of searchParams.entries()) {
    if (key !== "limit" && key !== "page") {
      params.set(key, value);
    }
  }

  // ✅ Always force limit to 6, ignore whatever is in URL
  params.set("limit", 6);

  // ✅ Page can change freely
  params.set("page", searchParams.get("page") || 1);

  // ✅ Update the actual URL to remove stale limit=5
  window.history.replaceState(
    {},
    "",
    `${url.pathname}?${params.toString()}`
  );

  const postPromise = apiRequest.get(`/post/posts?${params.toString()}`);

  return defer({
    postResponse: postPromise,
  });
};