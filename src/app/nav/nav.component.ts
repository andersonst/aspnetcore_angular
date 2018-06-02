import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { AlertifyService } from '../_services/alertify.service';


@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
  
})
export class NavComponent implements OnInit {
  model: any = {};
  constructor(public authService: AuthService, private alertify: AlertifyService) { }

  ngOnInit() {

  }

  login(){
    this.authService.login(this.model).subscribe(response =>{
        this.alertify.success("logado com sucesso");
    }, error =>{
      this.alertify.error("falha ao logar");
    });
    //console.log(this.model);
  }

  logout(){
    this.authService.userToken = null;
    localStorage.removeItem('token');
    this.alertify.message('logout !!')
  }

  loggedin(){
    const token = localStorage.getItem('token');
    const valida = this.authService.loggedIn(token);
    //console.log(valida);
    //return !!token;
    return !valida;
  }

}
