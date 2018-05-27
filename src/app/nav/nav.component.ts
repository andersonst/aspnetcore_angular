import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';


@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  model: any = {};
  constructor(private authService: AuthService) { }

  ngOnInit() {

  }

  login(){
    this.authService.login(this.model).subscribe(response =>{
        console.log("logado com sucesso");
    }, error =>{
      console.log("falha ao logar");
    });
    //console.log(this.model);
  }

  logout(){
    this.authService.userToken = null;
    localStorage.removeItem('token');
    console.log('logout !!')
  }

  loggedin(){
    const token = localStorage.getItem('token');
    return !!token;
  }

}
