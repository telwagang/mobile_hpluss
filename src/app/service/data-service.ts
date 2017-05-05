import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';


@Injectable()
export class DataService {

    
    private site: string = 'localhost';
    private IpAddress: string = 'http://'+this.site+':1337';
    constructor(private http: Http) { }

    
    set(value:any): void{
        this.site = value;
        console.log(this.IpAddress);
    }
    get(path: any, options?: any): Observable<any> {
        return this.http.get(this.IpAddress + path + options, this.jwt())
            .map(this.extractData)
            .catch(this.handleError);
    }

    post(path: any, data: any): Observable<any> {
        return this.http.post(this.IpAddress + path,data, this.jwt())
            .map(this.extractData)
            .catch(this.handleError);

    }
    update(path: string, data: any) {
        return this.http.put(this.IpAddress + path, data, this.jwt()).map(this.extractData)
            .catch(this.handleError);
    }

    delete(path: string) {
        return this.http.delete(path, this.jwt()).map(this.extractData)
            .catch(this.handleError);
    }

    private extractData(res: Response) {
        let body = res.json();
        console.log(res);
        return body.data || {};
    }
    private handleError(error: Response | any) {
        // In a real world app, you might use a remote logging infrastructure
        let errMsg: string;
        if (error instanceof Response) {
            const body = error.json() || '';
            const err = body.error || JSON.stringify(body);
            errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
        } else {
            errMsg = error.message ? error.message : error.toString();
        }
        console.error(errMsg);
        return Observable.throw(errMsg);
    }
     private jwt() {
        // create authorization header with jwt token
        let currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (currentUser && currentUser.token) {
            let headers = new Headers({ 'Authorization': 'Bearer ' + currentUser.token });
            return new RequestOptions({ headers: headers });
        }
    }
    

}
