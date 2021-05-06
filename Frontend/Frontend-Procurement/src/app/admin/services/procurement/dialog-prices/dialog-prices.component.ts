import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { GlobalsService } from 'src/app/utilities/globalvars/globals.service';

@Component({
  selector: 'app-dialog-prices',
  templateUrl: './dialog-prices.component.html',
  styleUrls: ['./dialog-prices.component.css']
})
export class DialogPricesComponent implements OnInit {
  token =  'Bearer ' + JSON.parse(localStorage.getItem("currentUser") || "{}").token;
  produit : any;
  formGroup : FormGroup;
  sendmodifier : string = (this.data.result.totalprice !== 0 ) ? "Modifier" : "Ajouter";
  typeprices  = ["euro", "dollar"]
  constructor(@Inject(MAT_DIALOG_DATA) public data: any,private url: GlobalsService, private http: HttpClient) { }

    
  ngOnInit(): void {
    this.ProductFunction();
    this.initForm();
    this.euro = this.formGroup.value.typeproductprice === 'euro';
    this.dollar = this.formGroup.value.typeproductprice === 'dollar';
  }

  ngBeforeViewInit(): void {

  }

  public ProductFunction(){
    const headers = new HttpHeaders().set("Authorization", this.token);
    this.http.get(this.url.urlAddress + ":8082/products/show/" + this.data.result.idp, { headers, responseType: 'json' as 'json' }).subscribe(result => {
        this.produit = result;
      }, (error) => {
        console.log(error.error.message)
      }
      )
    
  }
 
  valider(){
    const headers = new HttpHeaders().set("Authorization", this.token);
    if (this.formGroup.valid) {
     
    this.http.put(this.url.urlAddress + ":8082/products/price/" + this.data.result.idp, this.formGroup.value, { headers, responseType: 'json' as 'json' }).subscribe(result => {
    }, (error) => {
      console.log(error.error.message)
    }
    )
  }
  }
  initForm() {
    this.formGroup = new FormGroup({
      typeproductprice : new FormControl(this.data.result.typeproductprice),
      dollarprice : new FormControl(this.data.result.dollarprice),
      europrice: new FormControl(this.data.result.europrice),
      douane: new FormControl(this.data.result.douane),
      fraisdivers: new FormControl(this.data.result.fraisdivers),
    })
    }
    annuler(){
      this.initForm()
    }
    euro : boolean ;
    dollar : boolean;
    TypePrixChoosed(){
      if(this.formGroup.value.typeproductprice === 'euro'){
        this.euro = true;
        this.dollar = false;
      }else if(this.formGroup.value.typeproductprice === 'dollar'){
        this.dollar = true;
        this.euro = false
      }
    }
}

