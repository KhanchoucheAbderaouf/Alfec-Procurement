import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatChipInputEvent } from '@angular/material/chips';
import { Title } from '@angular/platform-browser';
import { GlobalsService } from 'src/app/utilities/globalvars/globals.service';

@Component({
  selector: 'app-estimation-prices',
  templateUrl: './estimation-prices.component.html',
  styleUrls: ['./estimation-prices.component.css']
})
export class EstimationPricesComponent implements OnInit {

  constructor(private vars : GlobalsService,private titleService : Title,private http:HttpClient) { }
  token =  'Bearer ' + JSON.parse(localStorage.getItem("currentUser") || "{}").token;
  marches : any [] 
  zones : any []
  formGroup: FormGroup;
  initialValues : any;
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes: number[] = [13, 188];
  produits : any = this.vars.EstimationProducts
  produitsLower : string[] = [];
  showResult : boolean = false
  productprices : any[] = [] 
  displayedColumns: string[] = ['produit', 'zone','marche','prix','remise','prixremise'];
  datasource  : any[]= []

  ngOnInit(): void {
    this.vars.spanValue = "Prix"
    this.titleService.setTitle("Prix")
    this.AllZones();
    this.AllMarches()
    this.initForm()
    this.initialValues = this.formGroup.value;
  }

  showagain(){
    this.showResult = false;
    this.datasource = []
  }

  initForm() {
    this.formGroup = new FormGroup({
      zone: new FormControl("",[Validators.required]),
      marche: new FormControl("", [Validators.required]),
      listproduits : new FormControl("")
    })
  }

  confirmer(){
    this.formGroup.patchValue({
      listproduits : this.produits
    }) 
    console.log(this.formGroup.value)
    const headers = new HttpHeaders().set("Authorization" , this.token);
    return this.http.post(this.vars.urlAddress + ":8082/zmproduct/show",this.formGroup.value,{headers,responseType:'json' as 'json'})
    .subscribe((data : any)=>{
    //  console.log(data)
      for(let value of data){
        this.datasource.push(value)
      }
      console.log(this.datasource)
      this.showResult = true
    })
  }

  reset(){
    this.formGroup.reset(this.initialValues);
    this.produits = []
    this.produitsLower = []
    this.vars.EstimationProducts = []
  }
  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add our fruit
    if ((value || '').trim() && !this.produitsLower.includes(event.value.toLowerCase().trim())) {
      this.produits.push(value.trim());
      this.produitsLower.push(value.toLowerCase().trim());
    }
    // Reset the input value
    if (input) {
      input.value = '';
    }
  }

  remove(produit: any): void {
    const index = this.produits.indexOf(produit);
    if (index >= 0) {
      this.produits.splice(index, 1);
      this.produitsLower.splice(index, 1);
    }
  }

  AllMarches(){
    const headers = new HttpHeaders().set("Authorization" , this.token);
    return this.http.get(this.vars.urlAddress + ":8082/marche/index",{headers,responseType:'json' as 'json'})
    .subscribe((data : any)=>{
      this.marches = data
    })
  }
  AllZones(){
    const headers = new HttpHeaders().set("Authorization" , this.token);
    return this.http.get(this.vars.urlAddress + ":8082/zone/index",{headers,responseType:'json' as 'json'})
    .subscribe((data : any)=>{
      this.zones = data
    })
  }


  getTotalPrix() {
    return this.datasource.map(t => t.prix).reduce((acc, value) => acc + value, 0);
  }
  getTotalPrixRemise() {
    return this.datasource.map(t => t.prixRemise).reduce((acc, value) => acc + value, 0);
  }
   
}
