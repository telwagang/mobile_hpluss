import { Injectable } from '@angular/core';
import { DataService } from './data-service';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class BookService {
    private specialty: string = '/helper/getspecialty';
    private slots: string = '/schedule/search';
    private quick: string = '/schedule/quick';
    private findtime: string = '/schedule/findtime'
    constructor(private ds: DataService) {

    }
    getSpecialy():Observable<any> {
         return this.ds.get(this.specialty, '');
    }
    quickie(value) : Observable<any>{
       return this.ds.post(this.quick, value);
    }
    findslot(formdata): Observable<any> {
      return this.ds.post(this.slots, formdata);
    }
    gettime(formdata): Observable<any> {
      return this.ds.post(this.findtime,formdata);
    }
}