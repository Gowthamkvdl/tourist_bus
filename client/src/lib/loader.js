import { defer } from "react-router-dom";
import apiRequest from "./apiRequest";

export const infoPageLoader = async ({ params }) => {
  const { id } = params;
  const response = await apiRequest.get("/post/" + id);
  return response.data;
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

export const homePageLoader = () => {
  const response =  apiRequest.get("/post/posts");
  // return response.data;
  return defer({
    postResponse: response,
  });
}

export const favPageLoader = () => {
  const response = apiRequest.get("/post/fav");
  return defer({
    postResponse: response,
  });
};

export const profilePageLoader = () => {
  const response = apiRequest.get("/post/profile");
  return defer({
    postResponse: response,
  });
}


export const listPageLoader = ({ request }) => {
  const [others, limitStr] = request.url.split("?")[1].split("&limit=");
  const limit = parseInt(limitStr);
  const postPromise =  apiRequest.get(`/post/posts?${others}&limit=${limit}`);
  return defer({
    postResponse: postPromise,
  });
  // return postPromise.data;
};


