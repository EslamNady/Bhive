<?php

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        factory(App\TemplateProject::class, 50)->create()->each(function ($u) {
        $u->templateTask()->save(factory(App\TemplateTask::class)->make());
    });
    }
}
