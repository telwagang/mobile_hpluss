import { Component, ViewChild } from '@angular/core';
import { Nav } from 'ionic-angular';
import { NavController } from 'ionic-angular';
import { Login } from '../../pages/login/login'
import { Storage } from '@ionic/storage';
import { Schedule } from '../../pages/schedule/schedule';
import { Booking } from '../../pages/booking/booking';
import { Account } from "../../pages/account/account";

@Component({
  selector: 'page-page1',
  templateUrl: 'page1.html'
})
export class Page1 {
  @ViewChild(Nav) nav: Nav;
  name: string;
  pages: Array<{ title: string, component: any }>;
  constructor(public navCtrl: NavController,
    private storage: Storage) {
    this.pages = [
      { title: 'Appointments', component: Schedule },
      { title: 'book', component: Booking },
      { title: 'Account', component: Account }
    ];
    this.setName();
  }

  move(value: string) {
    console.log(value);
    for (let i = 0; i < this.pages.length; i++) {
      if (this.pages[i].title === value) {
        this.navCtrl.push(this.pages[i].component);
        break;
      }
    }
  }

  setName(): void {
    this.storage.get('token').then(
      (token) => {
        if (token) {
          this.name = token.user.name;
        }
        else {
          this.navCtrl.setRoot(Login);

        }
      }
    )
  }
  logout(): void {
    this.storage.remove('token').then(() => {

      this.navCtrl.setRoot(Login);
    })
  }
}
