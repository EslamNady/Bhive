<!doctype html>
<html lang="{{ app()->getLocale() }}">
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title>Bhive</title>
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.2.1/css/bootstrap.min.css" integrity="sha384-GJzZqFGwb1QTTN6wy59ffF1BuGJpLSa9DkKMp0DgiMDm4iYMj70gZWKYbI706tWS" crossorigin="anonymous">
        <!-- Fonts -->
        <link href="https://fonts.googleapis.com/css?family=Raleway:100,600" rel="stylesheet" type="text/css">

        <style>
        .cont {
        position: relative;
        width: 100%;
        height: 100vh;
        background-image: url(./images/backgrounds/background.png);
        background-size: cover; 
        background-position: center center;
        }

        

        .cont .btn {
        position: absolute;
        top: 40%;
        /* left: 50%; */
        transform: translateY(-50%);
        -ms-transform: translate(-50%, -50%);
        background-color: #666666;
        color: #f1f1f1;
        font-size: 16px;
        padding: 16px 30px;
        border: 2px solid #f1f1f1;
        cursor: pointer;
        border-radius: 5px;
        text-align: center;
        -webkit-transition-duration: 0.4s; /* Safari */
        transition-duration: 0.4s;
        cursor: pointer;

        }
        .btn:first-of-type{
            left:60%;
            transform: translateX(-60%);
        }
        .btn:nth-of-type(2n){
            left:40%;
            transform: translateX(-40%);
        }

        .cont .btn:hover {
            background-color: #ffc415; /* Green */
            color: white;
        }

        </style>
    </head>
    <body>
        {{-- <h2>Button on Image</h2> --}}

        <div class="cont">
            <a class="btn" href="{{ route('employees.login') }}">Sign In</a>
            <a class="btn" href="{{ route('employees.register') }}">Sign Up</a>
        </div>

    </body>
</html>
