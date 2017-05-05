import { Component, OnInit } from '@angular/core';

import { NavController } from 'ionic-angular';
import { DataService } from '../../app/service/data-service';

@Component({
    selector: 'account',
    templateUrl: 'account.html',

})



export class Account implements OnInit {


    constructor(public navCtrl: NavController,private ds: DataService) {

    }
    ngOnInit(): void {
        
    }

    onInput(value:any):void{
        this.ds.set(value)
    }
}