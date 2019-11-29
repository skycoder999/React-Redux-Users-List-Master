import axios from "axios";
export const ActionNames = {
    GET_USERS: "GET_USERS"
};
export const getUsers = () => {
  const request = axios.get("/api/users");
  return {
      type: ActionNames.GET_USERS,
      payload: request
  };
};

