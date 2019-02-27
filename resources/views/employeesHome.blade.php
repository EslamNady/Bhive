
        @extends('layouts.app')

        @section('content')
        <div>
          @if(session()->has('message'))
               <div class="alert alert-success">
                    {{ session()->get('message') }}
               </div>
           @endif
             <div name="{{ $employee->name }}" Emptitle="{{ $employee->title }}" employeeID="{{ Auth::id() }}" score="{{ $employee->score }}" id="employeeProfile"></div>
        </div>
        @endsection

