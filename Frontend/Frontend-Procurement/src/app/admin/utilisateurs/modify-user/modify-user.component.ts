import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { GlobalsService } from 'src/app/utilities/globalvars/globals.service';

@Component({
  selector: 'app-modify-user',
  templateUrl: './modify-user.component.html',
  styleUrls: ['./modify-user.component.css']
})
export class ModifyUserComponent implements OnInit {
  roles : any ;
  token =  'Bearer ' + JSON.parse(localStorage.getItem("currentUser") || "{}").token;
  formGroup: FormGroup;
  formAccount: FormGroup;
  initialValues : any;
  initialAccount : any;
  personalInfo : string  = this.data.typeupdate;
  accountInfo : boolean = false;
  sendPersonal : String = "personal"
  sendAccount : String =  "account"
  constructor(public dialogRef: MatDialogRef<ModifyUserComponent>, public dialog: MatDialog,@Inject(MAT_DIALOG_DATA) public data: any,private vars: GlobalsService, private http: HttpClient) { }

  ngOnInit(): void {
    this.allRoles()
    this.initForm()
    this.initialValues = this.formGroup.value;
    this.initialAccount = this.formAccount.value;
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

  update(){
    const headers = new HttpHeaders().set("Authorization", this.token);
    if(this.formGroup.valid){
        this.http.put(this.vars.urlAddress + ":8082/admin/users/update/"+ this.data.result.iduser + "/" +  this.formGroup.value.idrole,{
          "nom" : this.formGroup.value.nom,
          "prenom": this.formGroup.value.prenom,
          "email": this.formGroup.value.email,
          "telephone": this.formGroup.value.telephone,
          "poste": this.formGroup.value.poste,
        }, { headers, responseType: 'json' as 'json' }).subscribe(result => {
          this.dialogRef.close(this.sendPersonal);
        }, (error) => {
          console.log(error.error.message)
        }
        ) 
      }
  }

  updateAccount(){
    const headers = new HttpHeaders().set("Authorization", this.token);
    if(this.formAccount.valid){
      if(this.formAccount.value.password === this.formAccount.value.confirmpassword){

        this.http.put(this.vars.urlAddress + ":8082/admin/users/update/userpass/" + this.data.result.iduser,{
          "username": this.formAccount.value.username,
          "password": this.formAccount.value.password,
        }, { headers, responseType: 'json' as 'json' }).subscribe(result => {
          this.dialogRef.close(this.sendAccount);
        }, (error) => {
          console.log(error.error.message)
        }
        ) 
      } else {
      }

      }
  }
  create(){
    const headers = new HttpHeaders().set("Authorization", this.token);
     
     
    
  }

  

  initForm() {
    this.formGroup = new FormGroup({
      nom: new FormControl(this.data.result.nom),
      prenom: new FormControl(this.data.result.prenom),
      email: new FormControl(this.data.result.email),
      telephone: new FormControl(this.data.result.telephone),
      poste: new FormControl(this.data.result.poste),
      idrole : new FormControl(this.data.result.role.idrole),
    })
    this.formAccount = new FormGroup({
      username: new FormControl("", [Validators.required]),
      password: new FormControl("", [Validators.required]),
      confirmpassword : new FormControl("",[Validators.required])
    }) 
  }

  reset(){
    this.formGroup.reset(this.initialValues);
    this.formAccount.reset(this.initialAccount);
  }
 
   
}
