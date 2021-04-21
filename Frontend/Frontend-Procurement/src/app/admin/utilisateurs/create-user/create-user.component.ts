import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { GlobalsService } from 'src/app/utilities/globalvars/globals.service';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent implements OnInit {
  roles : any ;
  token =  'Bearer ' + JSON.parse(localStorage.getItem("currentUser") || "{}").token;
  formGroup: FormGroup;
  initialValues : any;
  pass: string ="";
  confirmpass:string="";
  constructor(private vars: GlobalsService, private http: HttpClient) { }

  ngOnInit(): void {
    this.allRoles()
    this.initForm()
    this.initialValues = this.formGroup.value;
  }

  allRoles(){
    const headers = new HttpHeaders().set("Authorization", this.token);
      this.http.get(this.vars.urlAddress + ":8082/admin/roles/index", { headers, responseType: 'json' as 'json' }).subscribe(result => {
        this.roles = result;
      }, (error) => {
        console.log(error.error.message)
      }
      )
  }

  create(){
    const headers = new HttpHeaders().set("Authorization", this.token);
    if(this.formGroup.valid){
      if(this.formGroup.value.password === this.formGroup.value.confirmpassword){
        this.http.post(this.vars.urlAddress + ":8082/admin/users/create/" + this.formGroup.value.idrole,{
          "nom" : this.formGroup.value.nom,
          "prenom": this.formGroup.value.prenom,
          "email": this.formGroup.value.email,
          "telephone": this.formGroup.value.telephone,
          "poste": this.formGroup.value.poste,
          "username": this.formGroup.value.username,
          "password": this.formGroup.value.password,
        }, { headers, responseType: 'json' as 'json' }).subscribe(result => {
          window.location.reload();
        }, (error) => {
          console.log(error.error.message)
        }
        ) 
      } else {
      }

      }
     
    
  }

   changepass(){
     this.pass = this.formGroup.value.password
   }
   changeconfirmpass(){
    this.confirmpass = this.formGroup.value.confirmpassword
     
  }

  initForm() {
    this.formGroup = new FormGroup({
      nom: new FormControl("",[Validators.required]),
      prenom: new FormControl("", [Validators.required]),
      email: new FormControl("", [Validators.required]),
      telephone: new FormControl("", [Validators.required]),
      poste: new FormControl("", [Validators.required]),
      idrole : new FormControl("", [Validators.required]),
      username: new FormControl("", [Validators.required]),
      password: new FormControl("", [Validators.required]),
      confirmpassword : new FormControl("",[Validators.required])
    })
     
  }

  reset(){
    this.formGroup.reset(this.initialValues);
  }
  
}
