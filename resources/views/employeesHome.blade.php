
         
        @extends('layouts.app')
        @section('content')
        <head>
          <title>{{ $employee->first_name }} {{ $employee->last_name }}</title>
        </head>
        <div>
          @if(session()->has('message'))
               <div class="alert alert-success">
                    {{ session()->get('message') }}
               </div>
           @endif
             <div Empemail="{{$employee->email}}" first_name="{{ $employee->first_name }}" last_name="{{ $employee->last_name }}" Emptitle="{{ $employee->title }}" employeeID="{{ Auth::id() }}" score="{{ $employee->score }}" id="employeeProfile"></div>
        </div>
        @endsection

