import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { GlobalsService } from 'src/app/utilities/globalvars/globals.service';

@Component({
  selector: 'app-apsearch',
  templateUrl: './apsearch.component.html',
  styleUrls: ['./apsearch.component.css']
})
export class ApsearchComponent implements OnInit {
  submitted = false;
  formGroup: FormGroup;
  token =  'Bearer ' + JSON.parse(localStorage.getItem("currentUser") || "{}").token;
  errorMessage: string;
  loading: boolean;
  categor: string;
  fournisseurs : any;
  marques : any;
  response : any[] = []
  constructor(private url: GlobalsService, private http: HttpClient) { }

  ngOnInit(): void {
    this.allfournisseurs();
    this.initForm();
    this.allproducts();
  }

  public allproducts() {
    const headers = new HttpHeaders().set("Authorization" , this.token);
    return this.http.get(this.url.urlAddress + ":8082/products/index/AP",{headers,responseType:'json' as 'json'})
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
     

      
      type: new FormControl(""), 

      parametres: new FormGroup({

        //Infos Essentielles
        typeap : new FormControl(""),
        soufflage: new FormControl(""),
        typesoufflage: new FormControl(""),
        reprise: new FormControl(""),
        typereprise : new FormControl(""),
        prefiltration: new FormControl(""),
        nombreprefiltration: new FormControl(""),
        filtration : new FormControl(""),
        nombrefiltration : new FormControl(""),
        pertecharge : new FormControl(""),
        dimension : new FormControl(""),

        //Circuit Frigorifique
        typecompresseur: new FormControl(""),
        nombrecompresseur: new FormControl(""),
        fluidefrigorifique: new FormControl(""),
        puissancefrigorifique: new FormControl(""),
        temperatureentreeair: new FormControl(""),
        temperaturesortieair: new FormControl(""),
        temperaturecondensation: new FormControl(""),

        //ventilateur
        nombreventilateur: new FormControl(""),
        debitair: new FormControl(""),    
        pressiondisponible: new FormControl(""),
        vitesserotation: new FormControl(""),
        niveausonore: new FormControl(""),
        distanceniveausonore: new FormControl(""),
        niveaupuissancesonore: new FormControl(""),

        //humidificateur
        nombrehumidificateur: new FormControl(""),
        puissanceabsorbeehumidificateur: new FormControl(""),
        productionmaxvapeur: new FormControl(""),

        //electrique
        tensionnominalevoltage: new FormControl(""),
        tensionnominalephases: new FormControl(""),
        tensionnominalehertz: new FormControl(""),
        puissanceelectriqueabsorbee: new FormControl(""),
        courantnominal: new FormControl(""),
        dialoguegtc: new FormControl(""),
        puissanceacoustique: new FormControl(""),

        //Autres
        puissanceabsorbeebatterie: new FormControl(""),
        temperatureexterieure: new FormControl(""),
        raccordementfrigoentree: new FormControl(""),
        raccordementfrigosortie: new FormControl(""),
        classenergitique: new FormControl(""),
        plotantivibration: new FormControl(""),
        certification: new FormControl(""),

      }),

    })

  }


  informationsessentielles: boolean = false;
  InformationsEssentielles() {
    this.informationsessentielles = !this.informationsessentielles;
  }
  circuitfrigo: boolean = false;
  CircuitFrigo() {
    this.circuitfrigo = !this.circuitfrigo;
  }
  autressection: boolean = false;
  AutresSection() {
    this.autressection = !this.autressection;
  }
  ventilateur : boolean = false;
  Ventilateur(){
    this.ventilateur = !this.ventilateur
  }
  humidifiacteur : boolean = false;
  Humidifiacteur(){
    this.humidifiacteur = !this.humidifiacteur
  }
  electrique : boolean = false;
  Electrique(){
    this.electrique = !this.electrique
  }
  certifautreradio : boolean = false;
  radiocertifautre(){
    this.certifautreradio = true;
  }
  radiocertifiso(){
    this.certifautreradio = false;
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
