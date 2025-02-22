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
  const others = request.url.split("?")[1] ? request.url.split("?")[1] : "";
  const limitStr = request.url.split("&limit=")
    ? request.url.split("&limit=")
    : "";
  const limit = parseInt(limitStr);
  const postPromise = apiRequest.get(`/post/posts?${others}&limit=${limit}`);
  return defer({
    postResponse: postPromise,
  });
  // return postPromise.data;
};
