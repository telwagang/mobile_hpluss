import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { LocalNotifications } from '@ionic-native/local-notifications';
import { Storage } from '@ionic/storage';

import { Login } from '../pages/login/login';
import { Page1 } from '../pages/page1/page1';
import { Schedule } from '../pages/schedule/schedule';
import { Booking } from '../pages/booking/booking';
import { Account } from "../pages/account/account";

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any;

  pages: Array<{ title: string, component: any }>;

  constructor(public platform: Platform,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen,
    private localNotifications: LocalNotifications,
    private storage: Storage) {
      this.checkif();
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Home', component: Page1 },
      { title: 'Appointments', component: Schedule },
      { title: 'Booking', component: Booking },
      { title: 'Account', component: Account }


    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.


      this.statusBar.styleLightContent();
      this.splashScreen.hide();
    });
    this.localNotifications.schedule([{
      id: 2,
      title: 'Local ILocalNotification Example',
      text: 'Multi ILocalNotification 2',
      icon: 'http://example.com/icon.png'
    }]);
  }

  checkif() {
    this.storage.get('token').then(
      (token) => {

        if (token) { this.rootPage = Page1; }
        else {
          this.rootPage = Login;
        }
      });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }

  // Schedule multiple notifications


} 
