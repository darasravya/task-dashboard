import axios from "axios";

const API_BASE_URL = "http://ec2-3-250-168-19.eu-west-1.compute.amazonaws.com:5000";

export const getTasks = async (index=0) => {
  const response = await fetch(`${API_BASE_URL}/tasks?index=${index}`);
  const data = await response.json();
  return data;
};


export const createTask = async (task) => {
  const response = await axios.post(`${API_BASE_URL}/tasks`, task);
  return response.data;
};

export const updateTask = async (id, updates) => {
  const response = await axios.patch(`${API_BASE_URL}/tasks/${id}`, updates);
  return response.data;
};

export const deleteTask = async (id) => {
  const response = await axios.delete(`${API_BASE_URL}/tasks/${id}`);
  return response.data;
};
