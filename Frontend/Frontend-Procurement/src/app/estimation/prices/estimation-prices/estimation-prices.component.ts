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

  ngOnInit(): void {
    this.vars.spanValue = "Prix"
    this.titleService.setTitle("Prix")
    this.AllZones();
    this.AllMarches()
    this.initForm()
    this.initialValues = this.formGroup.value;
    console.log(this.vars.EstimationProducts)

  }


  initForm() {
    this.formGroup = new FormGroup({
      zone: new FormControl("",[Validators.required]),
      marche: new FormControl("", [Validators.required]),
      produits : new FormControl("")
    })
  }

  create(){
    console.log(this.formGroup.value)
  }

  reset(){
    this.formGroup.reset(this.initialValues);
  }
  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add our fruit
    if ((value || '').trim()) {
      this.produits.push(value.trim());
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
}
