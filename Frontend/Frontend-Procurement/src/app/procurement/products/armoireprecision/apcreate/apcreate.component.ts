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
       
    this.http.post(this.url.urlAddress + ":8082/products/create", this.formGroup.value, { headers, responseType: 'json' as 'json' }).
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
 
  annulerCatego() {
    this.categor = "";
    this.annulerEvent.emit(this.categor)
  }

  initForm() {
    this.formGroup = new FormGroup({
     

      nomp: new FormControl("AP"),
      codep: new FormControl("", [Validators.required]),
      type: new FormControl(""),
      marque: new FormControl("", [Validators.required]),
      fournisseur: new FormGroup({
        id: new FormControl("", [Validators.required]),
      }),


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

}
