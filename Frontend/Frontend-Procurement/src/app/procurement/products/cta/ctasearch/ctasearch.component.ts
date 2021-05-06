import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { GlobalsService } from 'src/app/utilities/globalvars/globals.service';

@Component({
  selector: 'app-ctasearch',
  templateUrl: './ctasearch.component.html',
  styleUrls: ['./ctasearch.component.css']
})
export class CtasearchComponent implements OnInit {
  submitted = false;
  formGroup: FormGroup;
  token =  'Bearer ' + JSON.parse(localStorage.getItem("currentUser") || "{}").token;
  errorMessage: string;
  loading: boolean;
  categor: string;
  fournisseurs : any;
  response : any[] = [];
  marques : any;
  certifautreradio : boolean = false;
  constructor(private url: GlobalsService, private http: HttpClient) { }

  ngOnInit(): void {
    this.allfournisseurs();

    this.initForm();
    this.allproducts()
  }


  public allproducts(){
    const headers = new HttpHeaders().set("Authorization" , this.token);
    return this.http.get(this.url.urlAddress + ":8082/products/index/CTA",{headers,responseType:'json' as 'json'})
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


  radiocertifautre(){
    this.certifautreradio = true;
  }
  radiocertifiso(){
    this.certifautreradio = false;
  }

  annulerCatego() {
    this.categor = "";
    this.annulerEvent.emit(this.categor)
  }

  initForm() {
    this.formGroup = new FormGroup({
     

      nomp: new FormControl("CTA"),
      type: new FormControl(""),

      parametres: new FormGroup({

        montage : new FormControl(""),

        //section ventilation
        ventilation: new FormControl(""),
        nombreventilateur : new FormControl(""),
        debitair: new FormControl(""),
        pressiondisponiblegaine: new FormControl(""),
        rendementventilateur : new FormControl(""),
        puissanceelectriqueabsorbe : new FormControl(""),
        intensitenominale: new FormControl(""),
        intensitedemarrage: new FormControl(""),
        tensionnominalevoltage: new FormControl(""),
        tensionnominalephases: new FormControl(""),
        tensionnominalehertz: new FormControl(""),
        protectionthermique: new FormControl(""),
        sensairventilation: new FormControl(""),

        //section filtration
        prefiltration: new FormControl(""),
        nombreprefiltration: new FormControl(""),
        filtration: new FormControl(""),
        nombrefiltration: new FormControl(""),    
        pertechargefiltration: new FormControl(""),
        prisepression: new FormControl(""),
        sensairfiltration: new FormControl(""),
        pasdesaillettes: new FormControl(""),
         
        //section batterie
        batterie: new FormControl(""),
        typebatterie: new FormControl(""),
        batterieelectriquechaude: new FormControl(""),
        puissancefrigorifiquebatterie: new FormControl(""),
        puissancecalorifiquebatterie: new FormControl(""),
        regimeeautempentree: new FormControl(""),
        regimeeautempsortie: new FormControl(""),
        temperatureentreeair: new FormControl(""),
        humiditeentreeair: new FormControl(""),
        temperaturesortieair: new FormControl(""),
        humiditesortieair: new FormControl(""),
        debitfluide: new FormControl(""),
        pertechargebatterie: new FormControl(""),
        
        //section melange
        typeregistremelange: new FormControl(""),
        airregistremelange: new FormControl(""),
        temperaturemelange: new FormControl(""),
        carrosseriemelange: new FormControl(""),
        epaisseurcarrosseriemelange: new FormControl(""),
        peintemelange: new FormControl(""),
        
        //autres
        regulation: new FormControl(""),
        montageexterieur: new FormControl(""),
        classenergitique: new FormControl(""),
        certification: new FormControl(""),

      }),

      // douane : new FormControl("",[Validators.required,Validators.max(100),Validators.min(0)]),
      //fraisdivers : new FormControl("",[Validators.required]),
    })

  }

  ventilationsection: boolean = false;
  VentilationSection() {
    this.ventilationsection = !this.ventilationsection;
  }
  filtrationsection: boolean = false;
  FiltrationSection() {
    this.filtrationsection = !this.filtrationsection;
  }
  batteriesection: boolean = false;
  BatterieSection() {
    this.batteriesection = !this.batteriesection;
  }
  melangesection: boolean = false;
  MelangeSection() {
    this.melangesection = !this.melangesection;
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
