import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { GlobalsService } from 'src/app/utilities/globalvars/globals.service';

@Component({
  selector: 'app-apcreate',
  templateUrl: './apcreate.component.html',
  styleUrls: ['./apcreate.component.css']
})
export class ApcreateComponent implements OnInit {
  submitted = false;
  formGroup: FormGroup;
  token =  'Bearer ' + JSON.parse(localStorage.getItem("currentUser") || "{}").token;
  errorMessage: string;
  loading: boolean;
  categor: string;
  fournisseurs : any;
  marques : any;
  constructor(private url: GlobalsService, private http: HttpClient) { }

  ngOnInit(): void {
    this.allfournisseurs();

    this.initForm();
  }

  public create() {
    this.submitted = true;
    const headers = new HttpHeaders().set("Authorization", this.token);
    if (this.formGroup.valid) {
       
    this.http.post(this.url.urlAddress + ":8082/procurement/products/create", this.formGroup.value, { headers, responseType: 'json' as 'json' }).
      subscribe(result => {
        window.location.reload();
      }, (error) => {
        console.log(error.error.message)
        this.errorMessage = error.error.message;
        this.loading = false;
      }
      )
    }
  }

  public allfournisseurs(){
    const headers = new HttpHeaders().set("Authorization", this.token);
    this.http.get(this.url.urlAddress + ":8082/procurement/fournisseurs/index", { headers, responseType: 'json' as 'json' }).subscribe(result => {
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
      this.http.get(this.url.urlAddress + ":8082/procurement/fournisseurs/marques/" + this.formGroup.value.fournisseur.id, { headers, responseType: 'json' as 'json' }).subscribe(result => {
        this.marques = result;
      }, (error) => {
        console.log(error.error.message)
        this.errorMessage = error.error.message;
        this.loading = false;
      }
      )
  }

  @Output() annulerEvent = new EventEmitter<string>();
 
  annulerCatego() {
    this.categor = "";
    this.annulerEvent.emit(this.categor)
  }

  initForm() {
    this.formGroup = new FormGroup({
     

      nomp: new FormControl("AP"),
      codep: new FormControl("", [Validators.required]),
      type: new FormControl("", [Validators.required]),
      marque: new FormControl("", [Validators.required]),
      fournisseur: new FormGroup({
        id: new FormControl("", [Validators.required]),
      }),


      parametres: new FormGroup({

        //Infos Essentielles
        typeap : new FormControl("", [Validators.required]),
        soufflage: new FormControl("", [Validators.required]),
        typesoufflage: new FormControl("", [Validators.required]),
        reprise: new FormControl("", [Validators.required]),
        typereprise : new FormControl("",[Validators.required]),
        prefiltration: new FormControl("", [Validators.required]),
        nombreprefiltration: new FormControl("",[Validators.required,Validators.min(0)]),
        filtration : new FormControl("",[Validators.required]),
        nombrefiltration : new FormControl("",[Validators.required,Validators.min(0)]),
        pertecharge : new FormControl("", [Validators.required]),
        dimension : new FormControl(""),

        //Circuit Frigorifique
        typecompresseur: new FormControl("", [Validators.required]),
        nombrecompresseur: new FormControl("", [Validators.required,Validators.min(0)]),
        fluidefrigorifique: new FormControl("", [Validators.required]),
        puissancefrigorifique: new FormControl("", [Validators.required,Validators.min(0)]),
        temperatureentreeair: new FormControl(""),
        temperaturesortieair: new FormControl("", [Validators.required]),
        temperaturecondensation: new FormControl("", [Validators.required]),

        //ventilateur
        nombreventilateur: new FormControl("", [Validators.required,Validators.min(0)]),
        debitair: new FormControl("", [Validators.required,Validators.min(0)]),    
        pressiondisponible: new FormControl("", [Validators.required,Validators.min(0)]),
        vitesserotation: new FormControl("", [Validators.required]),
        niveausonore: new FormControl("", [Validators.required]),
        distanceniveausonore: new FormControl("", [Validators.required]),
        niveaupuissancesonore: new FormControl(""),

        //humidificateur
        nombrehumidificateur: new FormControl("",Validators.min(0)),
        puissanceabsorbeehumidificateur: new FormControl("",Validators.min(0)),
        productionmaxvapeur: new FormControl(""),

        //electrique
        tensionnominalevoltage: new FormControl("", [Validators.required,Validators.min(0)]),
        tensionnominalephases: new FormControl("", [Validators.required,Validators.min(0)]),
        tensionnominalehertz: new FormControl("", [Validators.required,Validators.min(0)]),
        puissanceelectriqueabsorbee: new FormControl("", [Validators.required,Validators.min(0)]),
        courantnominal: new FormControl("",Validators.min(0)),
        dialoguegtc: new FormControl("", [Validators.required]),
        puissanceacoustique: new FormControl("", [Validators.required]),

        //Autres
        puissanceabsorbeebatterie: new FormControl("", [Validators.required,Validators.min(0)]),
        temperatureexterieure: new FormControl("", [Validators.required]),
        raccordementfrigoentree: new FormControl("", [Validators.required]),
        raccordementfrigosortie: new FormControl("", [Validators.required]),
        classenergitique: new FormControl(""),
        plotantivibration: new FormControl("", [Validators.required]),
        certification: new FormControl("", [Validators.required]),

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

}
