<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/','indexController@showIndex');

Route::get('/test',function(){
    $pre=App\TemplateTask::find(1);
    return $pre->predecessor;

});
Route::get('templates','TemplateController@getAllTemplates');
Route::get('template/tasks{id}','TemplateController@sendTemplateTasks');
Route::post('project/submit','ProjectController@createNewProject');
Route::post('template/addNew','TemplateController@addNewTemplate');
Route::get('project/list','ProjectController@list')->name('project.list');
Route::get('project/ProjectListView','ProjectController@ProjectListView')->name('project.ProjectListView');
Route::get('project/tasks{id}','ProjectController@sendprojectTasks');
Route::get('project/view{id}','ProjectController@ProjectView');
Route::get('project/submittedtasks{id}','ProjectController@getSubmittedTasks');

Route::resource('project','ProjectController');


Auth::routes();

Route::get('/home', 'HomeController@index')->name('home');
Route::get('/logout','Auth\LoginController@userLogout')->name('user.logout');

//Employees Login Routes
Route::prefix('employees')->group(function(){
    Route::get('/login','Auth\EmployeesLoginController@showLoginForm')->name("employees.login");
    Route::post('/login','Auth\EmployeesLoginController@login')->name("employees.login.submit");
    Route::get('/','EmployeesController@index')->name("employees.dashboard");
    Route::get('/register','Auth\EmployeesLoginController@showRegisterForm')->name("employees.register");
    Route::post('/register','Auth\EmployeesLoginController@register')->name("employees.register.submit");

});
Route::prefix('employees')->group(function(){
    //employees upcoming tasks
    Route::get('/upcomingtasks{employeeID}','EmployeesController@getUpcomingTasks');
    //employees previous tasks
    Route::get('/previoustasks{employeeID}','EmployeesController@getPrevTasks');
    //employees outgoing tasks
    Route::get('/outgoingtasks{employeeID}','EmployeesController@getOngoingTasks');
    //task submission view
    Route::get('/submit/view{taskID}','EmployeesController@taskSubmitView');
    Route::post('/submit','EmployeesController@taskSubmit');
    
});

//task feedback
Route::post('/task/submit/feedback','TaskController@giveFeedback');

//get assigned task employee
Route::get('/tasks/employee{taskID}','ProjectController@getEmployee');

//get employee skills
Route::get('/employee/skills{employeeID}','EmployeesController@getSkills');

//modify and save employees skills
Route::post('/skills/submit','EmployeesController@saveSkills');

//Skills Routes
Route::prefix('skills')->group(function(){
    Route::get('/','SkillsController@index');
    Route::delete('/delete{id}','SkillsController@destroy');
    Route::post('/add','SkillsController@store');


});


