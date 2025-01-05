# Project Overview
### Project Title:-
QuizLoom_An_Online_Judge

### Objective:-
QuizLoom is an interactive online judge platform designed to create, manage, and participate in quizzes. It features real-time scoring, detailed analytics, and a user-friendly interface to enhance learning and engagement.

### Target Audience:-
QuizLoom_An_Online_Judge includes educators, students, organizations, developers, and event organizers who need an engaging platform for quizzes, assessments, and competitions.

# Tech Stack
### Backend
- **Framework**: Laravel
  
### Frontend
- **Framework/Library**: React

### Rendering Method
- **Client-Side Rendering (CSR)**

# UI Design
- **Tool**: Figma
- **Design Link**: 
```
https://www.figma.com/design/9ySHdnuHzTA9WOxIztRgEv/QuizLoom?node-id=1-3&p=f&t=934UVhSijTQxcwWO-0&fuid=1311654737207943524
```
# Project Features:
1. **Admin Panel:**
   - Add teachers to specific courses. 
   - Invite teachers to join the website or enroll in specific courses.

2. **Student Panel**
   - Enroll in available courses. 
   - Access course lessons sequentially.
   - Take quizzes at designated points in the course.
   - View quiz results, including marks and correct answers.

3. **Teacher Panel**
   - Create and manage text-based lectures or quizzes for their courses. 
   - View student results and performance based on specific courses.
   - Create, update, or remove courses.
   - Manage students, including removing students from a course. 

4. **User Authentication:**
   - Secure registration and login functionality.

6. **CRUD Operations:**
   - Manage Courses, Exam schedules, Student records, and user profiles..

7. **API Endpoints:**
   ## Admin pannel:
   ```
   POST /api/admin/add-teacher
   POST /api/admin/invite-teacher
   ```
   ## Student Panel:
   ```
   POST /api/student/enroll
   GET /api/student/courses/:courseId/lessons
   POST /api/student/quizzes/submit
   GET /api/student/quizzes/:quizId/results
   ```
   ## Teacher Panel:
   ```
   POST /api/teacher/courses/:courseId/lectures
   POST /api/teacher/courses/:courseId/quizzes
   GET /api/teacher/courses/:courseId/results
   POST /api/teacher/courses
   PUT /api/teacher/courses/:courseId
   DELETE /api/teacher/courses/:courseId
   DELETE /api/teacher/courses/:courseId/students/:studentId
   ```

## Milestones

### Milestone 1: Foundation and Core Features (1st Checkpoint)
- Set up the project environment and initialize the repository.
- Implement user authentication:
  - Secure registration and login functionality.
- Develop the quiz creation module:
  - Allow admins/educators to create quizzes with multiple-choice questions.
  - Enable support for different question types (e.g., single and multiple answers).
- Set up the backend with Laravel and database schema design for quizzes, users, and results.
- Design a basic frontend with React for creating and managing quizzes.

---

### Milestone 2: Quiz Participation and Scoring System (2nd Checkpoint)
- Implement the quiz-taking functionality:
  - Allow users to participate in quizzes.
  - Add a real-time timer for time-bound quizzes.
  - Automatically calculate and display scores after quiz completion.
- Create a detailed scoreboard:
  - Show individual user performance and correct/incorrect answers.
  - Store and retrieve scores from the database.
- Integrate API endpoints for user participation and quiz submissions.
- Improve UI/UX for quiz-taking with better designs and responsiveness.

---

### Milestone 3: Advanced Features and Deployment (Final Checkpoint)
- Add advanced analytics:
  - Provide insights into user performance, quiz difficulty levels, and participation trends.
- Implement course management:
  - Allow users to filter quizzes by course/topic.
- Enable gamification:
  - Add leaderboards to display top scorers.
  - Include badges or achievements for user milestones.
- Finalize UI/UX designs and optimize for performance.
- Conduct testing, fix bugs, and prepare the project for deployment.
- Write complete project documentation and deploy the platform.

## Team Members

| ID          | Name                   | Email                              | Role              |
|-------------|------------------------|------------------------------------|-------------------|
| 20200204050 | Umme Ayesha Rahman        | ummeayesha168@gmail.com | Frontend |
| 20220104101 | Zishan Rezwan     | zishancodes1@gmail.com | Lead              |
| 20220104015 | Takwa Jahin Feeza  | takwafeeza84@gmail.com | Frontend          |
| 20220104100 | Sombit Mazumder          | sombitmajumder123@gmail.com           | Backend           |

