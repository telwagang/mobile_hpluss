import { NgModule, ErrorHandler } from '@angular/core';
import {  CommonModule} from "@angular/common";
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { Page1 } from '../pages/page1/page1';
import { Booking } from '../pages/booking/booking';
import { Schedule } from '../pages/schedule/schedule';
import { Comform } from '../pages/comform/comform';
import { Account } from "../pages/account/account";
import { Login } from '../pages/login/login';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { LocalNotifications } from '@ionic-native/local-notifications';
import { HttpModule } from '@angular/http';
import { DataService } from './service/data-service';
import { AuthModule } from './service/auth.module';
import { GlobalEventsManager } from '../providers/globlehandler';
import { Geolocation } from '@ionic-native/geolocation';
import { Calendar } from '@ionic-native/calendar';
import { IonicStorageModule } from '@ionic/storage';


@NgModule({
  declarations: [
    MyApp,
    Page1,
    Booking,
    Schedule,
    Comform,
    Account,
    Login
  ],
  imports: [
    IonicModule.forRoot(MyApp),
    CommonModule,
    HttpModule,
    AuthModule,
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    Page1,
    Booking,
    Schedule,
    Comform,
    Account,
    Login
  ],
  providers: [
    StatusBar,
    SplashScreen,
    LocalNotifications,

    {provide: ErrorHandler, useClass: IonicErrorHandler},
    DataService,GlobalEventsManager,Geolocation,Calendar
  ]
  
})
export class AppModule {}
