<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class TestQueryController extends Controller
{
    public function index()
    {
        $query = "
            SELECT name,id FROM students
        ";

        // Execute the query
        $results = DB::select($query);

        try {
            // Execute the raw SQL query
            $results = DB::select($query);

            // Convert the result to an associative array
            $resultsArray = json_decode(json_encode($results), true);

            // Return successful JSON response
            return response()->json([
                'success' => true,
                'data' => $resultsArray
            ]);

        } catch (\Exception $e) {
            // Handle query execution errors and return an error response
            return response()->json([
                'success' => false,
                'message' => 'An error occurred while fetching teacher reports.',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}