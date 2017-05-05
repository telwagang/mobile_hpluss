import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { StatusBar } from '@ionic-native/status-bar';
import { Schedule } from '../schedule/schedule';
import { BookService } from '../../app/service/book-service';
import { Calendar } from '@ionic-native/calendar';

import 'rxjs/add/operator/filter';


@Component({
    selector: 'booking',
    templateUrl: 'booking.html',
    providers: [BookService]
})



export class Booking implements OnInit {

    //holds form data
    private book: FormGroup;

    //variable to hold list of type 
    //specialties 
    selectedspec: boolean;
    mydate: String = new Date().toISOString();
    specialt: any;
    spinner: boolean = false;
    count: any;
    startDate = new Date(Date.now()); // beware: month 0 = january, 11 = december
    endDate = new Date();

    constructor(public navCtrl: NavController,
        private formBuilder: FormBuilder,
        private bs: BookService,
        private status: StatusBar,
        private calendar: Calendar
    ) {
        this.status.overlaysWebView(true);
        this.status.backgroundColorByHexString('#fff');
        //this handles the validation of form 
        //using formBuilder api 
        this.book = this.formBuilder.group({
            specialty: [''],
            day: ['',],
            time: [''],
            events: ['']
        });

        this.book.valueChanges.subscribe(data => {
            if (data.day) {
                if (!data.events)
                    this.readcalendar(data.day);
            }
            this.spinner = true;
            //geoloaction 
            this.bs.quickie(data)
                .subscribe((data) => {
                    this.count = data;
                    // this.list = data;
                    this.spinner = false;
                });
        });


    }
    ngOnInit(): void {
        this.laodSpecialty();
        this.calar();
        this.readcalendar();
    }
    //loads specialties form the book service 
    laodSpecialty(): void {
        this.bs.getSpecialy().subscribe(data => this.specialt = data);
        //console.log('this ' + this.specialt)
    }
    readcalendar(value?: any): void {
        if (value) { this.startDate = new Date(value); }

        let y = this.startDate.getFullYear();
        let m = this.startDate.getMonth();
        let d = this.startDate.getDay();
        let h = 0;
        this.startDate = new Date(y, m, d, h, 0, 0, 0);
        this.endDate = new Date(y, m, d + 1, h, 0, 0, 0);

        this.calendar.findEvent("", "", "", this.startDate, this.endDate)
            .then((value) => {
                this.book.patchValue({ events: value }, true);
            }).catch((error) => {
                console.log(error);
            })
    }

    calar(): void {
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
    senddata(): void {
        this.navCtrl.push(Schedule, {
            book: this.book.value
        });
    }
    makedates(): void {
        let start = Date.now();
        this.startDate = new Date(Date.now()); // beware: month 0 = january, 11 = december
        this.endDate = new Date(Date.now());
    }


}
