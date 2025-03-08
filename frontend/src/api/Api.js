import axios from "axios";

class ApiClient {
  constructor(baseURL) {
    this.baseURL = baseURL;

    // Main axios client with interceptors
    this.client = axios.create({
      baseURL,
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    });

    // Separate axios instance for refreshing token (no interceptors)
    this.refreshClient = axios.create({
      baseURL,
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    });

    // Request interceptor: Attach tokens and attempt refresh if access token is missing
    this.client.interceptors.request.use(
      async (config) => {
        let accessToken = localStorage.getItem("access_token");
        const refreshToken = localStorage.getItem("refresh_token");

        // If no access token is available but a refresh token exists, try to refresh it.
        if (!accessToken && refreshToken) {
          try {
            accessToken = await this.refreshAccessToken();
          } catch (err) {
            // If refresh fails, reject the request with an error
            return Promise.reject(err);
          }
        }

        // Attach the access token if available.
        if (accessToken) {
          config.headers.Authorization = `Bearer ${accessToken}`;
        }

        // Always attach the refresh token if available.
        if (refreshToken) {
          config.headers["X-Refresh-Token"] = refreshToken;
        }

        return config;
      },
      (error) => Promise.reject(error)
    );

    // Response interceptor as a fallback: if a 401 is received, try refreshing once.
    this.client.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config;
        if (
          error.response &&
          error.response.status === 401 &&
          !originalRequest._retry
        ) {
          originalRequest._retry = true;
          try {
            const newAccessToken = await this.refreshAccessToken();
            originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
            return this.client(originalRequest);
          } catch (refreshError) {
            console.log(refreshError)
            // If refresh fails, clear tokens and propagate the error.
            localStorage.removeItem("access_token");
            localStorage.removeItem("refresh_token");
            return Promise.reject(refreshError);
          }
        }
        return Promise.reject(error);
      }
    );
  }

  // Call the dedicated refresh endpoint using the separate axios instance.
  async refreshAccessToken() {
    const refreshToken = localStorage.getItem("refresh_token");
    console.log(refreshToken)
    if (!refreshToken) {
      throw new Error("Refresh token not available");
    }
    try {
      const response = await this.refreshClient.get("api/token/refresh", {
        headers: { "X-Refresh-Token": refreshToken },
      });
      const newAccessToken = response.data.access_token;
      localStorage.setItem("access_token", newAccessToken);
      return newAccessToken;
    } catch (error) {
      throw error;
    }
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
      const response = await this.client.post("api/logout");
      console.log("response logout", response.data);
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

async getTeacherCourses(teacherId) {
  try {
    // Adjust the URL as needed if your API prefix differs.
    const response = await this.client.get(`/api/teachers/${teacherId}/courses`);
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
  async addAnnouncements(courseId, announcementsData) {
    try {
      console.log("backend send ",courseId,announcementsData)
      const response = await this.client.post(`/api/courses/${courseId}/announcements`, announcementsData);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  }
  async getTeacherAnnouncements(teacherId) {
    try {
      const response = await this.client.get(`/api/teachers/${teacherId}/announcements`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  }

  async updateAnnouncement(id, updateData) {
    try {
      const response = await this.client.put(`/api/announcements/${id}`, updateData);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  }
  
  async deleteAnnouncement(id) {
    try {
      const response = await this.client.delete(`/api/announcements/${id}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  }

  async getStudentAnnouncements(studentId) {
    try {
      const response = await this.client.get(`/api/students/${studentId}/announcements`);
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
  async giveExamBystudent(examId) {
    try {
      const response = await this.client.get(`api/exams/${examId}/questions`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  }
  async addLecture(courseId, lectureData) {
    try {
      const response = await this.client.post(`api/courses/${courseId}/lectures`, lectureData);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  }
  async getLectureId(courseId) {
    try {
      const response = await this.client.get(`api/courses/${courseId}/lectures`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  }
  
  async getexamId() {
    try {
      const response = await this.client.get(`api/exams`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  }
  async saveResult(data) {
    try {
      const response = await this.client.post(`api/results`,data);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  }
  async askQustions(data) {
    try {
      console.log(data)
      const response = await this.client.post(`api/lecture-questions`,data);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  }
  async ansQustions(data) {
    try {
      console.log(data)
      const response = await this.client.post(`api/lecture-questions/answer`,data);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  }
  async getAllQustions(id) {
    try {
      console.log('id',id)
      const response = await this.client.get(`api/lecture-questions/${id}/questions-answers`);
      console.log('all qustions ',response.data)
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  }
  async editQustions(id,data) {
    try {
      console.log(id,data)
      const response = await this.client.put(`api/lecture-questions/${id}`,data);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  }
  async deleteQustions(id) {
    try {
      const response = await this.client.delete(`api/lecture-questions/${id}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  }



}

// Exporting an instance of the client
const apiClient = new ApiClient("http://127.0.0.1:8000");
export default apiClient;
