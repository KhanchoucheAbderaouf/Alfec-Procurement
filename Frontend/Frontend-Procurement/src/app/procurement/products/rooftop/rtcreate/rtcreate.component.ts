import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { GlobalsService } from 'src/app/utilities/globalvars/globals.service';

@Component({
  selector: 'app-rtcreate',
  templateUrl: './rtcreate.component.html',
  styleUrls: ['./rtcreate.component.css']
})
export class RtcreateComponent implements OnInit {
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
      if(this.formGroup.value.parametres.typert === 'Froid Seul'){
        this.formGroup.patchValue({
          parametres : {
            puissancec : ""
          }
        })
      }  
       
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
     

      nomp: new FormControl("RT"),
      codep: new FormControl("", [Validators.required]),
      type: new FormControl("", [Validators.required]),
      marque: new FormControl("", [Validators.required]),
      fournisseur: new FormGroup({
        id: new FormControl("", [Validators.required]),
      }),


      parametres: new FormGroup({

        //Infos Essentielles
        typert : new FormControl("", [Validators.required]),
        puissancef: new FormControl("", [Validators.required,Validators.min(0)]),
        puissancec: new FormControl(""),
        rendement: new FormControl(""),
        texterieure: new FormControl("",[Validators.required]),
      
        //Compresseur
        nombrecircuitfrigo: new FormControl(""),
        nombrecompresseur: new FormControl("", [Validators.required,Validators.min(0)]),
        refregerant: new FormControl("", [Validators.required]),
        temperatureentreeair: new FormControl(""),
        humiditeentreeair: new FormControl(""),
        temperaturesortieair: new FormControl(""),
        humiditesortieair: new FormControl(""),

        //ventilateur
        debitair: new FormControl("", [Validators.required,Validators.min(0)]),    
        pressionstatique: new FormControl("", [Validators.required]),
        vitesserotation: new FormControl(""),
        pressionmaximale: new FormControl(""),
        pressionminimale: new FormControl(""),
        pressiongaine: new FormControl("", [Validators.required]),

        //filtration 
        prefiltration: new FormControl("", [Validators.required]),
        nombreprefiltration: new FormControl("", [Validators.required,Validators.min(0)]),
        filtration: new FormControl("", [Validators.required]),
        nombrefiltration: new FormControl("", [Validators.required,Validators.min(0)]),

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
  filtration : boolean = false;
  Filtration(){
    this.filtration = !this.filtration
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
