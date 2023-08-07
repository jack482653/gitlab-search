import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const instance = axios.create({
  baseURL: process.env.GITLAB_URL,
  timeout: 10000,
  headers: {
    "PRIVATE-TOKEN": process.env.GITLAB_PRIVATE_TOKEN,
  },
  maxRate: [
    100 * 1024, // 100KB/s upload limit,
    100 * 1024, // 100KB/s download limit
  ],
});

const gitlabRequest = async (method, url, params, data) => {
  const makeRequest = async (method, url, params, data) => {
    const response = await instance({
      method,
      url,
      params,
      data,
    });

    const nextPage = parseInt(response.headers["x-next-page"]);
    const hasNextPage = isNaN(nextPage) === false;
    if (hasNextPage) {
      const nextResponse = await makeRequest(
        method,
        url,
        {
          ...params,
          page: nextPage,
        },
        data
      );
      return [...response.data, ...nextResponse];
    } else {
      return response.data;
    }
  };

  return await makeRequest(method, url, params, data);
};

export const getProjects = (params) =>
  gitlabRequest("get", "/api/v4/projects", params);

export const searchProject = (id, params) =>
  gitlabRequest("get", `/api/v4/projects/${id}/search`, params);
