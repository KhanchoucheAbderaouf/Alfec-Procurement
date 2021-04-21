import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { GlobalsService } from 'src/app/utilities/globalvars/globals.service';

@Component({
  selector: 'app-pompecreate',
  templateUrl: './pompecreate.component.html',
  styleUrls: ['./pompecreate.component.css']
})
export class PompecreateComponent implements OnInit {
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
     

      nomp: new FormControl("POMPE"),
      codep: new FormControl("", [Validators.required]),
      type: new FormControl("", [Validators.required]),
      marque: new FormControl("", [Validators.required]),
      fournisseur: new FormGroup({
        id: new FormControl("", [Validators.required]),
      }),


      parametres: new FormGroup({

        //Infos Essentielles
        caracteristiquepompe: new FormControl("", [Validators.required]),
        typepompe : new FormControl("", [Validators.required]),
        debiteau: new FormControl("", [Validators.required,Validators.min(0)]),
        hauteurtotale: new FormControl("", [Validators.required]),
        rendementhydraulique  : new FormControl("",[Validators.required]),
        tmin: new FormControl("", [Validators.required]),
        tmax: new FormControl("", [Validators.required]),
      
        
        //electrique
        tensionnominalevoltage: new FormControl("", [Validators.required,Validators.min(0)]),
        tensionnominalephases: new FormControl("", [Validators.required,Validators.min(0)]),
        tensionnominalehertz: new FormControl("", [Validators.required,Validators.min(0)]),
        puissanceelectriqueabsorbee: new FormControl("", [Validators.required,Validators.min(0)]),
        courantnominal: new FormControl("", [Validators.required,Validators.min(0)]),
        puissanceacoustique: new FormControl("", [Validators.required,Validators.min(0)]),

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
