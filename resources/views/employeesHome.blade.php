
        @extends('layouts.app')

        @section('content')
        <div>
          @if(session()->has('message'))
               <div class="alert alert-success">
                    {{ session()->get('message') }}
               </div>
           @endif
             <div first_name="{{ $employee->first_name }}" last_name="{{ $employee->last_name }}" Emptitle="{{ $employee->title }}" employeeID="{{ Auth::id() }}" score="{{ $employee->score }}" id="employeeProfile"></div>
        </div>
        @endsection

