import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  model: any = {};
  @Input() valuesFromHome : any;
  @Output() cancelregister = new EventEmitter();

  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

  register(){
    this.authService.register(this.model).subscribe(()=>{
      console.log("registrado com sucesso")
    }, error =>{
      console.log(error)
    });
  }
  cancel(){
    this.cancelregister.emit(false);
    console.log('cancelled');
  }

}