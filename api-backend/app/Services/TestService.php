<?php

namespace App\Services;

class TestService
{
    public function getTestHuman()
    {
        return "Test human returned from TestService";
    }
    public function getTestHumanWithId($id)
    {
        
        return "This is a test human response from TestController with id: $id";
    }
}
