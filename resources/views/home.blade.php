@extends('layouts.app')

@section('content')
<head>
    <link href="{{ asset('css/app.css') }}" rel="stylesheet"> 
</head>
<div >
    <div>
        <div name={{ $manager->name }} managerID={{ Auth::id() }} id="ManagerProfile"></div>
        <div id="ProjectListView"></div>

        <!-- <div>
            <a href="{{ route('project.create')}}">Create a new project</a>
        </div> -->

    </div>
</div>
@endsection
