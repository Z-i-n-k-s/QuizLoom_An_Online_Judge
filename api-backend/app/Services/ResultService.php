<?php

namespace App\Services;

use App\Models\Result;
use Illuminate\Database\Eloquent\ModelNotFoundException;

class ResultService {

    public function getAllResults() {
        return Result::with('student', 'exam')->get();
    }

    public function getResultById($id) {
        return Result::with('student', 'exam')->findOrFail($id);
    }

    public function createResult($data) {
        return Result::create($data);
    }

    public function updateResult($id, $data) {
        $result = Result::findOrFail($id);
        $result->update($data);
        return $result;
    }

    public function deleteResult($id) {
        $result = Result::findOrFail($id);
        return $result->delete();
    }
}
