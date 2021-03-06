<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;

use Kreait\Firebase;
use Kreait\Firebase\Factory;
use Kreait\Firebase\ServiceAccount;
use Kreait\Firebase\Database;

use Carbon\Carbon;

class endWorkDay extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'endwd';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'this end a working day in the firebase for bhive';

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Execute the console command.
     *
     * @return mixed
     */
    public function handle()
    {
        $day=Carbon::now('eet')->format("D");
        $date=Carbon::now('eet')->format("y-m-d");
        $time=Carbon::now('eet')->format("H:i");
        $serviceAccount = ServiceAccount::fromJsonFile(storage_path().'/json/bhive-7020b-firebase-adminsdk-rrhlt-fc9dfba6b6.json');
        $firebase = (new Factory)
        ->withServiceAccount($serviceAccount)
        ->withDatabaseUri('https://bhive-7020b.firebaseio.com/')
        ->create();

        $database = $firebase->getDatabase();
        $employees=$database->getReference('Employees')->getValue();
        
        foreach($employees as $key=>$value){

            if( array_key_exists("attendance",$value)&&array_key_exists($date,$value['attendance']) ){
                if($value['attendance'][$date]['in']!='null'){
                    end($value['attendance'][$date]['in']);
                    $inKey=key($value['attendance'][$date]['in']);
                    if(!array_key_exists('out',$value['attendance'][$date]) || !array_key_exists($inKey,$value['attendance'][$date]['out'])){
                        $database->getReference('Employees/'.$key.'/attendance/'.$date.'/out')->getChild($inKey."/time")->set($value['attendance'][$date]['in'][$inKey]['time']);
                    }
            }

            }else{
                
                $database->getReference('Employees/'.$key.'/attendance/'.$date.'/day')->set(strtolower($day));
                $database->getReference('Employees/'.$key.'/attendance/'.$date.'/in')->set("null");
                $database->getReference('Employees/'.$key.'/attendance/'.$date.'/out')->set("null");
            }
        }
    }
}
