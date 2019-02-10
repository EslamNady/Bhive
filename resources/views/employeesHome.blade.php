
        @extends('layouts.app')

        @section('content')
        <div>
             <div name="{{ $employee->name }}" Emptitle="{{ $employee->title }}" employeeID="{{ Auth::id() }}" score="{{ $employee->score }}" id="employeeProfile"></div>
        </div>
        @endsection

