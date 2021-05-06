import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { GlobalsService } from 'src/app/utilities/globalvars/globals.service';

@Component({
  selector: 'app-vcsearch',
  templateUrl: './vcsearch.component.html',
  styleUrls: ['./vcsearch.component.css']
})
export class VcsearchComponent implements OnInit {
  formGroup: FormGroup;
  token =  'Bearer ' + JSON.parse(localStorage.getItem("currentUser") || "{}").token;
  errorMessage: string;
  loading: boolean;
  categor: string;
  fournisseurs : any;
  marques : any;
  response : any[] = [];
  
  constructor(private url: GlobalsService, private http: HttpClient) { }

  ngOnInit(): void {
    this.allfournisseurs();

    this.initForm();
    this.allproducts()
  }

  public allproducts(){
    const headers = new HttpHeaders().set("Authorization" , this.token);
    return this.http.get(this.url.urlAddress + ":8082/products/index/VC",{headers,responseType:'json' as 'json'})
    .subscribe((data : any)=>{
      for(let result of data){
            this.response.push(result);
      }
    })
    }

  public allfournisseurs(){
    const headers = new HttpHeaders().set("Authorization", this.token);
    this.http.get(this.url.urlAddress + ":8082/fournisseurs/index", { headers, responseType: 'json' as 'json' }).subscribe(result => {
        this.fournisseurs = result;
      }, (error) => {
        console.log(error.error.message)
        this.errorMessage = error.error.message;
        this.loading = false;
      }
      )
    
  }

  marquechoisis() {

  }

  fournisseurchoisis() {
      const headers = new HttpHeaders().set("Authorization", this.token);
      this.http.get(this.url.urlAddress + ":8082/fournisseurs/marques/" + this.formGroup.value.fournisseur.id, { headers, responseType: 'json' as 'json' }).subscribe(result => {
        this.marques = result;
      }, (error) => {
        console.log(error.error.message)
        this.errorMessage = error.error.message;
        this.loading = false;
      }
      )
  }

  @Output() annulerEvent = new EventEmitter<string>();
  @Output() sendtheSearch = new EventEmitter<any>();
 
  annulerCatego() {
    this.categor = "";
    this.annulerEvent.emit(this.categor)
  }

  initForm() {
    this.formGroup = new FormGroup({
     

      nomp: new FormControl("VC"),
      type: new FormControl(""),
      


      parametres: new FormGroup({

        //Infos Essentielles
        typevc : new FormControl(""),
        pfvc: new FormControl(""),
        pcvc: new FormControl(""),
        caracteristiquevc: new FormControl(""),
        regimeeauglaceeentree : new FormControl(""),
        regimeeauglaceesortie: new FormControl(""),
        regimeeauchaudeentree: new FormControl(""),
        regimeeauchaudesortie : new FormControl(""),
        treprisehiver : new FormControl(""),
        trepriseete: new FormControl(""),
        tsoufflagehiver: new FormControl(""),
        tsoufflageete: new FormControl(""),
        vitesseselection: new FormControl(""),
        couleurcarrosserie: new FormControl(""),
        niveausonore: new FormControl(""),
        pressiondisponible: new FormControl(""),

        //Accessoires
        vanne: new FormControl(""),
        servomoteurs: new FormControl(""),    
        commande: new FormControl(""),
        pomperelavage: new FormControl(""),
        regulation: new FormControl(""),

        //Autres
        classenergitique: new FormControl(""),
        
      }),

    })

  }


  informationsessentielles: boolean = false;
  InformationsEssentielles() {
    this.informationsessentielles = !this.informationsessentielles;
  }
  accessoires: boolean = false;
  Accessoires() {
    this.accessoires = !this.accessoires;
  }
  autressection: boolean = false;
  AutresSection() {
    this.autressection = !this.autressection;
  }
 

  specialZinou : any = {} ;
  parametres : any = {}
  AdvancedSearch( ){
    Object.keys(this.formGroup.controls).forEach(key => {
      if(this.formGroup.controls[key].value !== "" && this.formGroup.controls[key].value !== undefined && key !== "parametres" ){
        this.specialZinou[key] = this.formGroup.controls[key].value
      }
      //parametres
      else if(key === "parametres" ){
        Object.keys(this.formGroup.controls.parametres.value).forEach(cle => {
          if(this.formGroup.controls.parametres.value[cle] !== undefined && this.formGroup.controls.parametres.value[cle] !== ""){
            this.parametres[cle]= this.formGroup.controls.parametres.value[cle]

          }
        })
      } 
    })

    var a = this.response.filter(data => {
      return Object.keys(this.specialZinou).every(propertyName =>  {
        if(typeof data[propertyName] === "number"){
          return data[propertyName] <= this.specialZinou[propertyName] + ( this.specialZinou[propertyName] * 10 / 100) 
          && data[propertyName] >= this.specialZinou[propertyName] - ( this.specialZinou[propertyName] * 10 / 100)
        }else {
          return data[propertyName] === this.specialZinou[propertyName]
        }
      }
        );
    }); 
    this.url.searchResults = a;
    var b : any[]=[];
    var z1 : any;
    if(this.parametres){
      b = a.filter(data => {
       return Object.keys(this.parametres).every(propertyName => {
         if(typeof data.parametres[propertyName] === "number"){
           return data.parametres[propertyName] <= this.parametres[propertyName] + ( this.parametres[propertyName] * 10 / 100) 
           && data.parametres[propertyName] >= this.parametres[propertyName] - ( this.parametres[propertyName] * 10 / 100)
         }else {
          return data.parametres[propertyName] === this.parametres[propertyName]
         }
       }
         );
     });
     z1 =  a.filter((value: any) =>   b.includes(value));
     this.url.searchResults = z1;
   }

   this.sendtheSearch.emit(this.url.searchResults)

  }


}
