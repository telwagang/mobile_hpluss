import { Component, OnInit } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation';
import { NavController, NavParams } from 'ionic-angular';
import { Comform } from '../comform/comform';
import { BookService } from '../../app/service/book-service';
@Component({
  selector: 'schedule',
  templateUrl: 'schedule.html',
  providers:[BookService]
})
export class Schedule implements OnInit {

  spinner: boolean = true;
  day:any;
  selectedItem: any;
  icons: string[];
  search: { specialty: string, day: string, time: string, latitude: number, longitude: number };
  items: Array<{ title: string, distance: string, place: string, note: string, icon: string }>;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private geolocation: Geolocation,
    private ds: BookService) {
    // If we navigated to this page, we will have an item available as a nav param
    this.search = navParams.get('book');
    //this.items = navParams.get('list');
    console.log(this.search);
    this.time();
    // Let's populate this page with some filler content for funzies

  }
  ngOnInit(): void {
    this.location();
    this.loadlist();
  }


  itemTapped(event, item) {
    // That's right, we're pushing to ourselves!
    this.navCtrl.push(Comform, {
      item: item,date: this.search.day
    });
  }

  loadlist(): void {
    this.search.latitude = 35.9201617849457;
       this.search.longitude = 14.47730059159085;
    this.ds.findslot(this.search).subscribe(data => {
      if (data) {
        this.items = data;
        this.spinner = false;
      }
    })
  }

  location(): void {
    this.geolocation.getCurrentPosition().then((resp) => {
      this.search.latitude = resp.coords.latitude,
        this.search.longitude = resp.coords.longitude
        this.loadlist();
    }).catch((error) => {
      console.log('Error getting location', error);
    });
  };
  time():void{
     var d = new Date(this.search.day);
    var weekday = new Array(7);
    weekday[0] = "Sunday";
    weekday[1] = "Monday";
    weekday[2] = "Tuesday";
    weekday[3] = "Wednesday";
    weekday[4] = "Thursday";
    weekday[5] = "Friday";
    weekday[6] = "Saturday";

    this.day = weekday[d.getDay()];

  }
}
