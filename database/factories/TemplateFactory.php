<?php

use Faker\Generator as Faker;

$factory->define(App\TemplateProject::class, function (Faker $faker) {
    return [
        'name' => $faker->name,
        'description' => $faker->text,
        'startDate' => $faker->date,
        
    ];
});
