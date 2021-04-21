import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { GlobalsService } from 'src/app/utilities/globalvars/globals.service';

@Component({
  selector: 'app-ctacreate',
  templateUrl: './ctacreate.component.html',
  styleUrls: ['./ctacreate.component.css']
})
export class CtacreateComponent implements OnInit {
  submitted = false;
  formGroup: FormGroup;
  token =  'Bearer ' + JSON.parse(localStorage.getItem("currentUser") || "{}").token;
  errorMessage: string;
  loading: boolean;
  categor: string;
  fournisseurs : any;
  marques : any;
  certifautreradio : boolean = false;
  constructor(private url: GlobalsService, private http: HttpClient) { }

  ngOnInit(): void {
    this.allfournisseurs();

    this.initForm();
  }

  public create() {
    this.submitted = true;
    const headers = new HttpHeaders().set("Authorization", this.token);
    if (this.formGroup.valid) {
      if(this.formGroup.value.parametres.typebatterie === "froide"){
        this.formGroup.patchValue({
          parametres : {
            puissancecalorifiquebatterie : 0
          }
        })
      }
      if(this.formGroup.value.parametres.typebatterie === "chaude"){
        this.formGroup.patchValue({
          parametres : {
            puissancefrigorifiquebatterie : 0
          }
        })
      }
      if(this.formGroup.value.parametres.batterie === "2 tubes"){
        this.formGroup.patchValue({
          parametres : {
            typebatterie : "mixte"
          }
        })
      }
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
      codep: new FormControl("", [Validators.required]),
      type: new FormControl("", [Validators.required]),
      marque: new FormControl("", [Validators.required]),
      fournisseur: new FormGroup({
        id: new FormControl("", [Validators.required]),
      }),


      parametres: new FormGroup({

        montage : new FormControl("", [Validators.required]),

        //section ventilation
        ventilation: new FormControl(""),
        nombreventilateur : new FormControl("",Validators.min(0)),
        debitair: new FormControl("", [Validators.required,Validators.min(0)]),
        debitsoufflage: new FormControl("", [Validators.required,Validators.min(0)]),
        debitextraction: new FormControl("", [Validators.required,Validators.min(0)]),
        debitreprise: new FormControl("", [Validators.required,Validators.min(0)]),
        pressiondisponiblegaine: new FormControl("",[Validators.required,Validators.min(0)]),
        rendementventilateur : new FormControl("",[Validators.min(0),Validators.max(100)]),
        puissanceelectriqueabsorbe : new FormControl("",Validators.min(0)),
        intensitenominale: new FormControl("",Validators.min(0)),
        intensitedemarrage: new FormControl("",Validators.min(0)),
        tensionnominalevoltage: new FormControl("", [Validators.required,Validators.min(0)]),
        tensionnominalephases: new FormControl("", [Validators.required,Validators.min(0)]),
        tensionnominalehertz: new FormControl("", [Validators.required,Validators.min(0)]),
        protectionthermique: new FormControl(""),
        sensairventilation: new FormControl("", [Validators.required]),

        //section filtration
        prefiltration: new FormControl("", [Validators.required]),
        nombreprefiltration: new FormControl("", [Validators.required,Validators.min(0)]),
        filtration: new FormControl("", [Validators.required]),
        nombrefiltration: new FormControl("", [Validators.required,Validators.min(0)]),    
        pertechargefiltration: new FormControl("", [Validators.required]),
        prisepression: new FormControl(""),
        sensairfiltration: new FormControl("", [Validators.required]),
        pasdesaillettes: new FormControl(""),
         
        //section batterie
        batterie: new FormControl("", [Validators.required]),
        typebatterie: new FormControl("", [Validators.required]),
        batterieelectriquechaude: new FormControl("", [Validators.required]),
        puissancefrigorifiquebatterie: new FormControl(0, [Validators.required,Validators.min(0)]),
        puissancecalorifiquebatterie: new FormControl(0, [Validators.required,Validators.min(0)]),
        regimeeautempentree: new FormControl(""),
        regimeeautempsortie: new FormControl(""),
        temperatureentreeair: new FormControl(""),
        humiditeentreeair: new FormControl("",[Validators.min(0),Validators.max(100)]),
        temperaturesortieair: new FormControl(""),
        humiditesortieair: new FormControl("",[Validators.min(0),Validators.max(100)]),
        debitfluide: new FormControl("",Validators.min(0)),
        pertechargebatterie: new FormControl(""),
        
        //section melange
        typeregistremelange: new FormControl("", [Validators.required]),
        typemelange: new FormControl("", [Validators.required]),
        airregistremelange: new FormControl("", [Validators.required]),
        temperaturemelange: new FormControl(""),
        carrosseriemelange: new FormControl("", [Validators.required]),
        epaisseurcarrosseriemelange: new FormControl("", [Validators.required]),
        peintemelange: new FormControl(""),
        
        //autres
        regulation: new FormControl("", [Validators.required]),
        montageexterieur: new FormControl(""),
        classenergitique: new FormControl(""),
        certification: new FormControl("", [Validators.required]),

      }),

      // douane : new FormControl("",[Validators.required,Validators.max(100),Validators.min(0)]),
      //fraisdivers : new FormControl("",[Validators.required]),
    })

  }

  infosessentielles: boolean = false;
  InfosEssentielles() {
    this.infosessentielles = !this.infosessentielles;
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





}
