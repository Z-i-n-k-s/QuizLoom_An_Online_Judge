<?php

namespace App\Http\Controllers;

use App\Services\UserService;
use Illuminate\Http\Request;

class UserController extends Controller
{
    protected $userService;

    public function __construct(UserService $userService)
    {
        $this->userService = $userService;
        // Ensure the user is authenticated, e.g.:
        // $this->middleware('auth:api');
    }

    /**
     * Get the details of the currently authenticated user.
     * This endpoint returns full information (including role-specific data)
     * for every user, including admins.
     *
     * Route Example: GET /users/profile
     */
    public function profile(Request $request)
    {
        $user = $request->user(); // Assumes the user is authenticated
        return response()->json($this->userService->getUserById($user->id));
    }

    /**
     * For admins only: list all users with limited details (name, email, role).
     *
     * Route Example: GET /users
     */
    public function index(Request $request)
    {
        $user = $request->user();
        // Only admins are allowed to list all users
        if ($user->role !== 'admin') {
            return response()->json(['error' => 'Unauthorized'], 403);
        }
        return response()->json($this->userService->getAllUsers());
    }

    /**
     * Show a specific user by id (if needed). This might be restricted to admins.
     */
    public function show($id)
    {
        return response()->json($this->userService->getUserById($id));
    }

    /**
     * Create a new user along with role-specific additional data.
     */
    public function store(Request $request)
    {
        // Base validation for users table
        $data = $request->validate([
            'email'    => 'required|email|unique:users,email',
            'password' => 'required|string|min:6',
            'role'     => 'required|in:student,teacher,admin',
        ]);

        // Validate additional info based on role
        if ($data['role'] === 'student') {
            $extra = $request->validate([
                'name'              => 'required|string',
                'contact_number'    => 'required|string',
                'gender'            => 'required|string',
                'blood_group'       => 'required|string',
                'enrollment_status' => 'required|in:active,inactive',
            ]);
        } elseif ($data['role'] === 'teacher') {
            $extra = $request->validate([
                'name'         => 'required|string',
                'contact_info' => 'required|string',
                'status'       => 'required|in:pending,approved,rejected',
            ]);
        } elseif ($data['role'] === 'admin') {
            $extra = $request->validate([
                'name' => 'required|string',
            ]);
        } else {
            $extra = [];
        }

        // Merge extra info into the data array
        $data['extra'] = $extra;

        return response()->json($this->userService->createUser($data), 201);
    }

    /**
     * Update a user and optionally the corresponding additional info.
     */
    public function update(Request $request, $id)
    {
        // Validate common fields (for update, they are optional)
        $data = $request->validate([
            'email'    => 'sometimes|email|unique:users,email,'.$id,
            'password' => 'sometimes|string|min:6',
            'role'     => 'sometimes|in:student,teacher,admin',
        ]);

        // Optionally, validate role-specific fields if provided.
        $extra = $request->input('extra', []); // expected under a nested key "extra"

        return response()->json($this->userService->updateUser($id, $data, $extra));
    }

    /**
     * Delete a user.
     */
    public function destroy($id)
    {
        return response()->json(['deleted' => $this->userService->deleteUser($id)]);
    }
}
