import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { GlobalsService } from 'src/app/utilities/globalvars/globals.service';

@Component({
  selector: 'app-vccreate',
  templateUrl: './vccreate.component.html',
  styleUrls: ['./vccreate.component.css']
})
export class VccreateComponent implements OnInit {
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
     

      nomp: new FormControl("VC"),
      codep: new FormControl("", [Validators.required]),
      type: new FormControl("", [Validators.required]),
      marque: new FormControl("", [Validators.required]),
      fournisseur: new FormGroup({
        id: new FormControl("", [Validators.required]),
      }),


      parametres: new FormGroup({

        //Infos Essentielles
        typevc : new FormControl("", [Validators.required]),
        pfvc: new FormControl("", [Validators.required,Validators.min(0)]),
        pcvc: new FormControl("", [Validators.required,Validators.min(0)]),
        caracteristiquevc: new FormControl("", [Validators.required]),
        regimeeauglaceeentree : new FormControl("",[Validators.required]),
        regimeeauglaceesortie: new FormControl("", [Validators.required]),
        regimeeauchaudeentree: new FormControl("",[Validators.required]),
        regimeeauchaudesortie : new FormControl("",[Validators.required]),
        treprisehiver : new FormControl(""),
        trepriseete: new FormControl(""),
        tsoufflagehiver: new FormControl(""),
        tsoufflageete: new FormControl(""),
        vitesseselection: new FormControl(""),
        couleurcarrosserie: new FormControl(""),
        niveausonore: new FormControl(""),
        pressiondisponible: new FormControl(""),

        //Accessoires
        vanne: new FormControl("", [Validators.required]),
        servomoteurs: new FormControl("", [Validators.required]),    
        commande: new FormControl("", [Validators.required]),
        pomperelavage: new FormControl("", [Validators.required]),
        regulation: new FormControl("", [Validators.required]),

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
 




}
