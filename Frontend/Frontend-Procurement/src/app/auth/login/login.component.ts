import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { AuthService } from './../../security/auth.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { Title } from '@angular/platform-browser';
import { GlobalsService } from 'src/app/utilities/globalvars/globals.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  formGroup : FormGroup;
  public loginInvalid: boolean;
  constructor(private service: AuthService,private route:Router,private titleService : Title,private vars : GlobalsService) {

  }


  ngOnInit(): void {
    if(this.service.currentUser) {
      if(JSON.parse(localStorage.getItem("currentUser") || "{}").role === "admin") {
        this.route.navigate(['/admin/procurement/produits']);
      } else if (JSON.parse(localStorage.getItem("currentUser") || "{}").role === "procurement"){
        this.route.navigate(['/procurement/produits/index']);
      } else if(JSON.parse(localStorage.getItem("currentUser") || "{}").role === "estimation"){
      this.route.navigate(['/estimation/prix/index']);
      }
    }
    this.initForm();
    this.titleService.setTitle("Connexion");
  }

  initForm(){
    this.formGroup = new FormGroup({
      username : new FormControl("",[Validators.required]),
      password : new FormControl("",[Validators.required])
    })
  }

  
  private formSubmitAttempt: boolean;
  private returnUrl: string;

  async onSubmit() {
    this.loginInvalid = false;
    this.formSubmitAttempt = false;
    if (this.formGroup.valid) { 
        this.service.login(this.formGroup.value.username,this.formGroup.value.password).subscribe(result => {
          if(result.role == "admin"){
            this.route.navigate(['/admin/procurement/produits']);
          }else if(result.role == "procurement"){
            this.route.navigate(['/procurement/produits/index']);
          } else if (result.role == "estimation"){
            this.route.navigate(['/estimation/prix/index']);
          }
        }, (error) => {                 
          this.loginInvalid = true;
          return error      
      })
    }
    else {
      this.formSubmitAttempt = true;
    }
  }

 
}
