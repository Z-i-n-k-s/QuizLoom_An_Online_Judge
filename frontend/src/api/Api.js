import axios from "axios";

class ApiClient {
  constructor(baseURL) {
    this.client = axios.create({
      baseURL,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

 

  async register(userData) {
    try {
      const response = await this.client.post('api/register', userData);
      return response.data;
    } catch (error) {
      return error.response?.data || error.message;
    }
  }

  async login(credentials) {
    try {
      const response = await this.client.post('api/login', credentials);
      
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  }

  async logout() {
    try {
      const accessToken = localStorage.getItem("access_token");
      if (!accessToken) throw new Error("No access token found.");
  
      const response = await this.client.get("api/logout", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
  
      // Clear local storage on successful logout
      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");
      localStorage.removeItem("user_id");
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  }
  async getUserById(id) {
    console.log("Fetching user data for id:", id);
    try {

      const uid = localStorage.getItem("user_id");
      

      const response = await this.client.get(`api/users/profile/${uid}`, {
       
      });

      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  }
  async addCourse(courseData) {

    try {
      const response = await this.client.post("/api/courses", courseData, {
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  }
}



  


// Exporting an instance of the client
const apiClient = new ApiClient("http://127.0.0.1:8000");
export default apiClient;
