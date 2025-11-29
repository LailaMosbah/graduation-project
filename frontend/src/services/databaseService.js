import axios from "axios";

export const uploadFileRequest = (formData) =>
  axios.post("http://localhost:5000/upload", formData);

export const fetchDatabasesRequest = () =>
  axios.get("http://localhost:5000/files");
