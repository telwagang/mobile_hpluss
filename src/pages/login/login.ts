import { Component } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { NavController } from 'ionic-angular';
import { JwtHelper } from 'angular2-jwt';
import { StatusBar } from '@ionic-native/status-bar';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from '../../app/service/auth';
import { Storage } from '@ionic/storage';
import {  MyApp } from '../../app/app.component';
import 'rxjs/add/operator/map'
import { GlobalEventsManager } from '../../providers/globlehandler';


@Component({
    selector: 'login',
    templateUrl: 'login.html'
})
export class Login {
    LOGIN_URL: string = "http://localhost:1337/user/login";
    SIGNUP_URL: string = "http://localhost:1337/user/register";

    private signup: FormGroup;
    private loginform: FormGroup;

    auth: AuthService;
    spinner: boolean = false;
    // When the page loads, we want the Login segment to be selected
    authType: string = "L O G I N";
    // We need to set the content type for the server
    contentHeader: Headers = new Headers({ "Content-Type": "application/json" });
    error: any;
    jwtHelper: JwtHelper = new JwtHelper();
    //  storage: Storage;
    user: string;

    constructor(public navCtrl: NavController,
    private http: Http,
        private globle: GlobalEventsManager,
        private formBuilder: FormBuilder,
        private Storage: Storage,
        public statusBar: StatusBar) {
            this.statusBar.styleDefault();
        this.auth = AuthService;

        this.loginform = this.formBuilder.group({
            email: [null, Validators.compose([Validators.required])],
            password: [null, Validators.required]
        });

        this.signup = this.formBuilder.group({
            email: ['', Validators.required],
            password: ['', Validators.required],
            firstName: ['', Validators.required],
            lastName: [''],
            phone: [''],
            idcard: [''],
            gender: ['', Validators.required]
        });
    }

    login() {
        this.spinner = true;
        this.error = '';

        this.http.post(this.LOGIN_URL, this.loginform.value, { headers: this.contentHeader })
            .map(res => res.json())
            .subscribe(
            data => {
                this.authSuccess(data)
                this.spinner = false;
            },
            err => {
                if (err.status == 0) {
                    this.error = { _body: 'Network error, try again' }

                } else {
                    this.error = err;
                }
                this.spinner = false;
            });

    }

    signupmd(credentials) {
        this.http.post(this.SIGNUP_URL, JSON.stringify(credentials), { headers: this.contentHeader })
            .map(res => res.json())
            .subscribe(
            data => this.authSuccess(data.data),
            err => this.error = err
            );
    }

    logout() {
        // this.storage.remove('id_token');
        this.user = null;
    }

    authSuccess(token) {
        this.error = null;
        console.log(token);
        if(token.message){
            this.error = token.message;
        }else{
            this.Storage.set('token', token)
            .then(
            (some) => {console.log('Stored item!');
            this.navCtrl.setRoot(MyApp);
        },
            error => console.error('Error storing item', error)
            );

        this.user = token.user.name;
        }
        
    }

}