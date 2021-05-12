import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { GlobalsService } from 'src/app/utilities/globalvars/globals.service';

@Component({
  selector: 'app-geg',
  templateUrl: './geg.component.html',
  styleUrls: ['./geg.component.css']
})
export class GegComponent implements OnInit {
  submitted = false;
  formGroup: FormGroup;
  token =  'Bearer ' + JSON.parse(localStorage.getItem("currentUser") || "{}").token;
  errorMessage: string;
  loading: boolean;
  details = ["GEG", "CTA", "Autre"];
  categor: string;
  fournisseurs : any;
  marques : any;
  certifautreradio : boolean = false;
  compresseurautreradio : boolean = false;
  typefluidautreradio : boolean = false;
  circuitelectautreradio : boolean = false;
  constructor(private url: GlobalsService, private http: HttpClient) { }

  ngOnInit(): void {
    this.allfournisseurs();

    this.initForm();
  }

  public create() {
    this.submitted = true;
    const headers = new HttpHeaders().set("Authorization", this.token);
    if (this.formGroup.valid) {
      if(this.formGroup.value.parametres.typegeg == 'froid seul'){
        this.formGroup.patchValue({parametres : {
          pc : "",
          cop: "",
        }}) 
      }

      if(this.formGroup.value.parametres.modulehydraulique.avecmodulehydraulique == "non"){
        this.formGroup.patchValue({parametres : {
          modulehydraulique :  {
            pompe: {
              avecpompe: "",
              formepompe: "",
              typepompe: "",
              debitpompe:"",
              hmtpompe: ""
            },
            ballontampon:  {
              avecballontampon: "",
              capaciteballontampon: ""
            },
            vaseexpansion:  {
              avecvaseexpansion : "",
              capacitevaseexpansion : ""
            },
          }
        }})  
      }

      if(this.formGroup.value.parametres.modulehydraulique.pompe.avecpompe == "non"){
        this.formGroup.patchValue({parametres : {
          modulehydraulique :  {
            ballontampon:  {
              avecballontampon: "non",
              capaciteballontampon: ""
            },
          }
        }})  
      }

      if(this.formGroup.value.parametres.modulehydraulique.pompe.avecvaseexpansion == "non"){
        this.formGroup.patchValue({parametres : {
          modulehydraulique :  {
            vaseexpansion:  {
              avecvaseexpansion : "non",
              capacitevaseexpansion : ""
            },
          }
        }})  
      }

      if(this.formGroup.value.parametres.modulehydraulique.pompe.avecballontampon == "non"){
        this.formGroup.patchValue({parametres : {
          modulehydraulique :  {
            pompe: {
              avecpompe: "non",
              formepompe: "",
              typepompe: "",
              debitpompe:"",
              hmtpompe: ""
            },
          }
        }})  
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

  radiocircuitelectautre(){
    this.circuitelectautreradio = true;
  }
  radiocircuitelectalimenter1(){
    this.circuitelectautreradio = false;
  }
  radiotypefluideeaudouce(){
    this.typefluidautreradio = false;
  }
  radiotypefluideautre(){
    this.typefluidautreradio = true;
  }
  radiocompresseurautre(){
    this.compresseurautreradio = true;
  }
  radiocompresseurscrool(){
    this.compresseurautreradio = false;

  }
  radiocompresseurvis(){
    this.compresseurautreradio = false;
  }

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
     

      nomp: new FormControl("GEG"),
      codep: new FormControl("", [Validators.required]),
      type: new FormControl(""),
      marque: new FormControl("", [Validators.required]),
      fournisseur: new FormGroup({
        id: new FormControl("", [Validators.required]),
      }),


      parametres: new FormGroup({
        pf: new FormControl(""),
        eer: new FormControl(""),
        cop: new FormControl(""),
        pc : new FormControl(""),
        tempexterieure : new FormControl(""),
        typegeg: new FormControl(""),
        classenergitique: new FormControl(""),
        plotantivibration: new FormControl(""),
        certification: new FormControl(""),
        condensation: new FormControl(""),

        typecompresseur: new FormControl(""),
        nbrecircuitfrigo: new FormControl(""),
        nbrecompresseur: new FormControl(""),
        refregerant: new FormControl(""),


       
        ventilateur: new FormControl(""),
        debitcondenseur: new FormControl(""),
        pressioncondenseur: new FormControl(""),
        epoxycondenseur: new FormControl(""),
         

        echangeurfrigo: new FormControl(""),
        typefluide: new FormControl(""),
        pertecharge: new FormControl(""),
        debitfluide: new FormControl(""),
        tempfluidesortie: new FormControl(""),
        tempfluideentree: new FormControl(""),
        glycol: new FormControl(""),
        //temperatureevaporateur: new FormControl(""),

        pressostatHPBP: new FormControl(""),
        manoHPBP: new FormControl(""),
        insonorisationcompresseur: new FormControl(""),
        tropicalisationequipement: new FormControl(""),

        modulehydraulique: new FormGroup({
          avecmodulehydraulique: new FormControl(""),
          pompe: new FormGroup({
            avecpompe: new FormControl(""),
            formepompe: new FormControl(""),
            typepompe: new FormControl(""),
            debitpompe: new FormControl(""),
            hmtpompe: new FormControl("")
          }),
          ballontampon: new FormGroup({
            avecballontampon: new FormControl(""),
            capaciteballontampon: new FormControl("")
          }),
          vaseexpansion: new FormGroup({
            avecvaseexpansion : new FormControl(""),
            capacitevaseexpansion : new FormControl("")
          }),
        }),

          tensionnominale: new FormGroup({
            voltage: new FormControl(""),
            phases: new FormControl(""),
            hertz: new FormControl("")
          }),
          puissanceabsorbee: new FormControl(""),
          facteurpuissance: new FormControl(""),
          circuitelectrique: new FormControl(""),
          intensitenominale: new FormControl(""),
          intensitemaximale: new FormControl(""),
          intensitedemmarage: new FormControl(""),
          armoireelectrique: new FormControl(""),
          sondefonctionnement: new FormControl(""),
          dialoguegtc: new FormControl(""),
          puissanceacoustique: new FormControl(""),
          pressionacoustique: new FormControl(""),


      }),

      // douane : new FormControl(""),
      //fraisdivers : new FormControl(""),
    })

  }

 

  es: boolean = false;
  elementsuplementaires() {
    this.es = !this.es;
  }
  ig: boolean = false;
  informationsgenerales() {
    this.ig = !this.ig;
  }
  cr: boolean = false;
  compresseurrefregerant() {
    this.cr = !this.cr;
  }
  condenser: boolean = false;
  condenseurmethod() {
    this.condenser = !this.condenser;
  }
  evaporer: boolean = false;
  evaporateurmethod() {
    this.evaporer = !this.evaporer;
  }
  diverse: boolean = false;
  diversmethod() {
    this.diverse = !this.diverse;
  }
  hydrau: boolean = false;
  hydraumethod() {
    this.hydrau = !this.hydrau;
  }
  electrical: boolean = false;
  electricalmethod() {
    this.electrical = !this.electrical;
  }
  tn: boolean = false;
  tensionominalemethod() {
    this.tn = !this.tn;
  }




}
