import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  registerMode = false;
  constructor(private http: Http) { }
  values:any;
  ngOnInit() {

    this.getValues();
  }

  registerToggle(){
    this.registerMode = !this.registerMode;
  }

  getValues(){
    this.http.get('http://localhost:5000/api/values').subscribe(response =>{
      this.values = response.json();
      //console.log(response);

    })
  }

  cancelRegisterMode(registerMode: boolean){
    this.registerMode = registerMode;
  }

}
