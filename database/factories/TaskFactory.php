<?php

use Faker\Generator as Faker;

$factory->define(App\TemplateTask::class, function (Faker $faker) {
    return [
        'name' => $faker->name,
        'duration' => $faker->randomNumber($digit=3),
        'startDate'=>$faker->dateTimeBetween('now','+ 1 month'),
        'endDate'=>$faker->dateTimeBetween('now +1 month','+ 2 month'),
    ];
});
