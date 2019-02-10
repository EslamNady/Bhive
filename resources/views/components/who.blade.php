@if(Auth::guard('web')->check())
    <p class="text-success">You are Logged In as a <strong>User</strong></p>
@endif
@if(Auth::guard('employees')->check())
    <p class="text-success">You are Logged In as an <strong>Employee</strong></p>
@endif