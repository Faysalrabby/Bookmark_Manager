
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {map} from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor(private router: Router , private http: HttpClient) { }
  saveData(data){
    return this.http.post<any>("http://localhost:4500/posts", data)
    .pipe(map(o=> {
      console.log(o);
      return o;
    }))
  }


  getData(){
    return this.http.get<any>("http://localhost:4500/posts")
    .pipe(map(o=> {
      return o;
    }))
  }
}
