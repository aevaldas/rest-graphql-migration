import axios from "axios";

export default axios.create({
  baseURL: "http://localhost:3001/api",
  contentType: "application/json",
  type: "json",
});
