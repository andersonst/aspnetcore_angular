import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { AlertifyService } from '../_services/alertify.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  model: any = {};
  @Input() valuesFromHome : any;
  @Output() cancelregister = new EventEmitter();

  constructor(private authService: AuthService, private alertify: AlertifyService) { }

  ngOnInit() {
  }

  register(){
    this.authService.register(this.model).subscribe(()=>{
      this.alertify.success("registrado com sucesso")
    }, error =>{
      this.alertify.error(error)
    });
  }
  cancel(){
    this.cancelregister.emit(false);
    this.alertify.message('cancelled');
  }

  

}
