<?php

namespace App\Services;

use App\Models\User;
use App\Models\Student;
use App\Models\Teacher;
use App\Models\Admin;
use Illuminate\Support\Facades\Hash;

class UserService
{
    /**
     * Get all users (for admin view) with only name, email, and role.
     */
    public function getAllUsers()
    {
        // Return only limited fields
        return User::select('id', 'email', 'role')
            ->with([
                'student:id,user_id,name',
                'teacher:id,user_id,name',
                'admin:id,user_id,name'
            ])
            ->get();
    }

    /**
     * Get a single user by id with role-specific additional info.
     */
    public function getUserById($id)
    {
        $user = User::findOrFail($id);

        // Eager load the role-specific relation based on the user's role.
        if ($user->role === 'student') {
            $user->load('student');
        } elseif ($user->role === 'teacher') {
            $user->load('teacher');
        } elseif ($user->role === 'admin') {
            $user->load('admin');
        }

        return $user;
    }

    /**
     * Create a new user and the corresponding role-specific record.
     */
    public function createUser(array $data)
    {
        $user = User::create([
            'email'    => $data['email'],
            'password' => Hash::make($data['password']),
            'role'     => $data['role'],
        ]);

        if ($data['role'] === 'student') {
            Student::create(array_merge($data['extra'], ['user_id' => $user->id]));
        } elseif ($data['role'] === 'teacher') {
            Teacher::create(array_merge($data['extra'], ['user_id' => $user->id]));
        } elseif ($data['role'] === 'admin') {
            Admin::create(array_merge($data['extra'], ['user_id' => $user->id]));
        }

        return $this->getUserById($user->id);
    }

    /**
     * Update an existing user and its role-specific info.
     */
    public function updateUser($id, array $data, array $extra = [])
    {
        $user = User::findOrFail($id);

        if (isset($data['password'])) {
            $data['password'] = Hash::make($data['password']);
        }
        $user->update($data);

        if (!empty($extra)) {
            if ($user->role === 'student' && $user->student) {
                $user->student->update($extra);
            } elseif ($user->role === 'teacher' && $user->teacher) {
                $user->teacher->update($extra);
            } elseif ($user->role === 'admin' && $user->admin) {
                $user->admin->update($extra);
            }
        }

        return $this->getUserById($id);
    }

    /**
     * Delete a user and the associated role-specific record.
     */
    public function deleteUser($id)
    {
        $user = User::findOrFail($id);

        if ($user->role === 'student' && $user->student) {
            $user->student->delete();
        } elseif ($user->role === 'teacher' && $user->teacher) {
            $user->teacher->delete();
        } elseif ($user->role === 'admin' && $user->admin) {
            $user->admin->delete();
        }

        return $user->delete();
    }
}
