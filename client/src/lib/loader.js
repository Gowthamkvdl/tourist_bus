import { defer } from "react-router-dom";
import apiRequest from "./apiRequest";

export const infoPageLoader = async ({ params }) => {
  const { id } = params;
  const response = await apiRequest.get("/post/" + id);
  return response.data;
};

export const editPageLoader = async ({ params }) => {
  const { id } = params;
  const response = await apiRequest.get("/post/" + id);
  return response.data;
};


export const homePageLoader = async () => {
  const response =  apiRequest.get("/post/posts");
  // return response.data;
  return defer({
    postResponse: response,
  });
}

export const favPageLoader = async () => {
  const response = apiRequest.get("/post/fav");
  return defer({
    postResponse: response,
  });
};

export const profilePageLoader = async () => {
  const response = await apiRequest.get("/post/profile");
  return response.data;
}


export const listPageLoader = async ({ request }) => {
  const [others, limitStr] = request.url.split("?")[1].split("&limit=");
  const limit = parseInt(limitStr);
  const postPromise =  apiRequest.get(`/post/posts?${others}&limit=${limit}`);
  return defer({
    postResponse: postPromise,
  });
  // return postPromise.data;
};


