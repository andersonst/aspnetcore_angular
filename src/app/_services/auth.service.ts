import { Injectable } from "@angular/core";
import { Headers, Http, RequestOptions, Response } from "@angular/http";
//import 'rxjs/add/operator/map';

//import { map, catchError } from "rxjs/operators";

//import {Observable} from 'rxjs';
//import { throw } from 'rxjs';

import { Observable } from 'rxjs';
import { map, catchError } from "rxjs/operators";
import { throwError } from "rxjs";


@Injectable({
  providedIn: "root"
})
export class AuthService {
  baseUrl = "http://localhost:5000/api/auth/";
  userToken: any;

  constructor(private http: Http) {}

  login(model: any){
    //const headers = new Headers({'Content-type':'application/json'});
    //const options = new RequestOptions({headers: headers});
    
    return this.http.post(this.baseUrl + 'login', model, this.requestOptions()).pipe(map((response: Response) => {
      
          const user = response.json();
          if(user){
            localStorage.setItem('token', user.tokenString);
            this.userToken = user.tokenString;
          }

      })).pipe(catchError(this.handleError));
  
  }

  register(model: any){
    return this.http.post(this.baseUrl + 'register', model, this.requestOptions()).pipe
    (catchError(this.handleError));
  }

  private requestOptions(){
    const headers = new Headers({'Content-type':'application/json'});
    return new RequestOptions({headers: headers});
  }

  private handleError(error: any){
    console.log("Error 1")
    const applicationError = error.headers.get('Application-Error');
    if(applicationError){
        return throwError(applicationError);
    }
    const serverError = error.json();
    let modelStateError = "";
    

    if(serverError){
      for(const key in serverError){
        if(serverError[key]){
          //console.log(serverError[key]);
          modelStateError += serverError[key] + "\n";
        }
      }
    }

    return throwError(modelStateError || 'Server Error');
  }
}
