<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <title>Document</title>
</head>
<body>
    
    <a href="{{ route('project.create')}}">Create a new project</a>
    <a href="{{ route('project.ProjectListView')}}">My Projects</a>
</body>
</html>