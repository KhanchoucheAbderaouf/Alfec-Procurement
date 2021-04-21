import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { GlobalsService } from 'src/app/utilities/globalvars/globals.service';

@Component({
  selector: 'app-fournisseurdetailsdialog',
  templateUrl: './fournisseurdetailsdialog.component.html',
  styleUrls: ['./fournisseurdetailsdialog.component.css']
})
export class FournisseurdetailsdialogComponent implements OnInit {
  token =  'Bearer ' + JSON.parse(localStorage.getItem("currentUser") || "{}").token;
  fournisseur : any;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any,private url: GlobalsService, private http: HttpClient) { }

    
  ngOnInit(): void {
    this.FournisseurFunction();
    
  }

  ngBeforeViewInit(): void {

  }

  public FournisseurFunction(){
    const headers = new HttpHeaders().set("Authorization", this.token);
    this.http.get(this.url.urlAddress + ":8082/procurement/fournisseurs/show/" + this.data.id, { headers, responseType: 'json' as 'json' }).subscribe(result => {
        this.fournisseur = result;
      }, (error) => {
        console.log(error.error.message)
      }
      )
    
  }

  activecontact: boolean = false;
  contact() {
    this.activecontact = !this.activecontact;
  }

  formattingThePhoneNumbers(phone: string){
    return phone.substring(0,phone.indexOf(')')+1) + " " + phone.substring(phone.indexOf(')')+1).replace(/(\d{3})/g, '$1 ').replace(/(^\s+|\s+$)/,'')
  }
}
