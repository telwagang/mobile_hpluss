import { Component, OnInit } from '@angular/core';

import { NavController, NavParams } from 'ionic-angular';
import { Calendar } from '@ionic-native/calendar';
import { BookService } from '../../app/service/book-service';


import { Storage } from "@ionic/storage";
@Component({
    selector: 'comform',
    templateUrl: 'comform.html',
    providers: [BookService]
})


export class Comform implements OnInit {
    Item: any;
    time: any;
    spinner: boolean = true;
    done: boolean = false;
    date: string;
    day: number;
    constructor(public navCtrl: NavController,
        public navParams: NavParams,
        private bs: BookService,
        private calendar: Calendar,
        private storage: Storage) {

        this.Item = navParams.get('item');
        this.date = navParams.get('date');

        this.calendar.hasReadWritePermission()
            .then((value) => {
                if (!value) {
                    this.calendar.requestReadWritePermission()
                        .then((value) => {
                            console.log(value);
                        })
                }
            });

    }

    ngOnInit(): void {
        this.time = "12:30"
        this.gettime();
        this.setBox();
    }
    
    gettime():void{
        let d;
        if (!this.date)
        { d = new Date(Date.now()); } else { d = new Date(this.date); }

        this.storage.get('token').then((token)=>{

            let formdata = {
            day: this.Item.day,
            time: this.Item.time,
            place: this.Item.place,
            specialty: this.Item.specialty,
            id: this.Item.id,
            patient: token.user.id,
            date: d
        }

        this.bs.gettime(formdata)
            .subscribe(item => {
                if (item) {
                    this.time = item;
                    this.spinner = false;
                }
            })
        })

        
    }
    setBox(): void {
        let d;
        if (!this.date)
        { d = new Date(Date.now()); } else { d = new Date(this.date); }

        let m = d.getMonth();
        let mont = new Array(11);
        mont[0] = "January";
        mont[1] = "February";
        mont[2] = "March";
        mont[3] = "April";
        mont[4] = "May";
        mont[5] = "June";
        mont[6] = "July";
        mont[7] = "August";
        mont[8] = "September";
        mont[9] = "October";
        mont[10] = "November";
        mont[11] = "December";

        this.date = mont[m] + ", " + d.getFullYear();
        this.day = d.getDate();

    }
    add(): void {
        let startDate;
        if (!this.date)
        { startDate = new Date(Date.now()); } else { startDate = new Date(this.date); }


        let y = startDate.getFullYear();
        let m = startDate.getMonth();
        let d = startDate.getDay();
        let h = 0;
        let t = this.time.slice(':');
        let sh = t[0];
        let sm = t[1];
        startDate = new Date(y, m, d, sh, sm, 0, 0);
        let endDate = new Date(y, m, d, h, sh + 1, sm, 0);

        this.calendar.createEvent("Hpluss Booking", this.Item.destination + " " + this.Item.place,
            "Doctor: " + this.Item.name + " , time: " + this.time + " " + this.Item.time + " " + this.Item.day,
            startDate, endDate)
            .then((res) => {
                this.done = true;
            }).catch(error => {
                console.log(error);
                this.done = true;
            });

    }
}