import axios from "axios";

class ApiClient {
  constructor(baseURL) {
    this.baseURL = baseURL;
    this.client = axios.create({
      baseURL,
      withCredentials: true, // if you need to send cookies along with requests
      headers: {
        "Content-Type": "application/json",
      },
    });

    // Request interceptor: attach tokens to each request.
    this.client.interceptors.request.use(
      (config) => {
        // Get tokens from local storage.
        const accessToken = localStorage.getItem("access_token");
        const refreshToken = localStorage.getItem("refresh_token");

        // Attach the access token (if available) in the Authorization header.
        if (accessToken) {
          config.headers["Authorization"] = `Bearer ${accessToken}`;
        }

        // Always attach the refresh token (if available) in the Refresh-Token header.
        if (refreshToken) {
          config.headers["Refresh-Token"] = refreshToken;
        }

        return config;
      },
      (error) => Promise.reject(error)
    );

    // (Optional) Response interceptor: you can handle response errors here if needed.
    this.client.interceptors.response.use(
      (response) => response,
      (error) => {
        return Promise.reject(error);
      }
    );
  }

  // Registers a new user.
  async register(userData) {
    try {
      const response = await this.client.post("api/register", userData);
      return response.data;
    } catch (error) {
      return error.response?.data || error.message;
    }
  }

  async login(credentials) {
    try {
      const response = await this.client.post("api/login", credentials);

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
      // localStorage.removeItem("access_token");
      // localStorage.removeItem("refresh_token");
      // localStorage.removeItem("user_id");
      localStorage.clear();
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  }
  async getUserById() {
    //   console.log("Fetching user data for id:", id);
    try {
      // const uid = localStorage.getItem("user_id");

      const response = await this.client.get(`api/users/profile`);
      console.log("res from get id", response.data);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  }
  async addCourse(courseData) {
    try {
      const response = await this.client.post("/api/courses", courseData, {});
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  }
  async getCourses(id) {
    console.log("Fetching courses data for id:", id);
    try {
      const response = await this.client.get(`/api/teachers/${id}/courses`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  }

  async enrollByCourseCode(studentId, courseCode) {
    try {
      const response = await this.client.post(
        `api/students/${studentId}/enroll`,
        courseCode
      );
      return response.data;
    } catch (error) {
      return error.response?.data || error.message;
    }
  }

  async getEnrolledCourses(studentId) {
    try {
      const response = await this.client.get(
        `api/students/${studentId}/courses`
      );
      return response.data;
    } catch (error) {
      return error.response?.data || error.message;
    }
  }
  async addExam(courseData) {
    try {
      const response = await this.client.post("/api/exams", courseData, {});
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  }
 

  async addQuestionToExam(examId, questionData) {
    try {
      const response = await this.client.post(`api/exams/${examId}/questions`, questionData);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  }
  async giveExam(examId) {
    try {
      const response = await this.client.post(`api/exams/${examId}/questions`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  }

}

// Exporting an instance of the client
const apiClient = new ApiClient("http://127.0.0.1:8000");
export default apiClient;
