import { axiosInstance } from "../axios";

async function getLogout() {
  try {
    const response = await axiosInstance.get("/api/users/logout");
    if (response.status !== 200) {
      throw new Error(response.statusText);
    }
    return;
  } catch (error) {
    console.log(error);
  }
}

export default getLogout();
