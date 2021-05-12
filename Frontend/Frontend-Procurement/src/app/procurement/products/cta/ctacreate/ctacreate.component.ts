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
      type: new FormControl(""),
      marque: new FormControl("", [Validators.required]),
      fournisseur: new FormGroup({
        id: new FormControl("", [Validators.required]),
      }),


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
        puissancefrigorifiquebatterie: new FormControl(0),
        puissancecalorifiquebatterie: new FormControl(0),
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
        typemelange: new FormControl(""),
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
