import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { GlobalsService } from 'src/app/utilities/globalvars/globals.service';

@Component({
  selector: 'app-gfcreate',
  templateUrl: './gfcreate.component.html',
  styleUrls: ['./gfcreate.component.css']
})
export class GfcreateComponent implements OnInit {
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
     

      nomp: new FormControl("GF"),
      codep: new FormControl("", [Validators.required]),
      type: new FormControl("", [Validators.required]),
      marque: new FormControl("", [Validators.required]),
      fournisseur: new FormGroup({
        id: new FormControl("", [Validators.required]),
      }),


      parametres: new FormGroup({

        //Infos Essentielles
        typegf : new FormControl("", [Validators.required]),
        puissancef: new FormControl("", [Validators.required,Validators.min(0)]),
        temperatureevaporation: new FormControl("", [Validators.required]),
        temperatureexterieure: new FormControl("", [Validators.required]),
        utilisationchambre : new FormControl("",[Validators.required]),
        temperaturech: new FormControl("", [Validators.required]),
      
        //Compresseur
        typecompresseur: new FormControl("", [Validators.required]),
        nombrecompresseur: new FormControl("", [Validators.required,Validators.min(0)]),
        refregerant: new FormControl("", [Validators.required]),
        
        //ventilateur
        debitair: new FormControl(""),    
        intensitemaximale: new FormControl("", [Validators.required,Validators.min(0)]),
        niveausonore: new FormControl(""),
        diametreraccordementaspiration: new FormControl(""),
        diametreraccordementliquide: new FormControl(""),

        //electrique
        tensionnominalevoltage: new FormControl(""),
        tensionnominalephases: new FormControl(""),
        tensionnominalehertz: new FormControl(""),
        puissanceelectriqueabsorbee: new FormControl(""),
        courantnominal: new FormControl("", [Validators.required,Validators.min(0)]),
        dialoguegtc: new FormControl("", [Validators.required]),
        puissanceacoustique: new FormControl(""),

        //Autres
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
  compresseur: boolean = false;
  Compresseur() {
    this.compresseur = !this.compresseur;
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
