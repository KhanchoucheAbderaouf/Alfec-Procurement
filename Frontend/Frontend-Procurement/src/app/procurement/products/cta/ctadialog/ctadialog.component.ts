import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FournisseurdetailsdialogComponent } from 'src/app/procurement/fournisseur/fournisseurdetailsdialog/fournisseurdetailsdialog.component';
import { ConfirmationdialogComponent } from 'src/app/utilities/confirmationdialog/confirmationdialog.component';
import { GlobalsService } from 'src/app/utilities/globalvars/globals.service';

@Component({
  selector: 'app-ctadialog',
  templateUrl: './ctadialog.component.html',
  styleUrls: ['./ctadialog.component.css']
})
export class CtadialogComponent implements OnInit {
  modifier : boolean = false;
  supprime : boolean = false;
  formGroup : FormGroup;
  fournisseurs : any;
  marques : any;
  initialValues : any;
  certifautreradio : boolean = false;
  token =  'Bearer ' + JSON.parse(localStorage.getItem("currentUser") || "{}").token;
  sendmodifier : string = "Modifier";
  sendsupprimer : string = "Supprimer";
  AdminUser : any = JSON.parse(localStorage.getItem("currentUser") || "{}").role;
  constructor(public dialogRef: MatDialogRef<CtadialogComponent>, public dialog: MatDialog,@Inject(MAT_DIALOG_DATA) public data: any,private url: GlobalsService, private http: HttpClient) { }

  ngOnInit(): void {
    this.initForm();
    this.initialValues = this.formGroup.value
  }

  modifiertrue(){
    this.modifier = true;
    this.allfournisseurs();
    this.marquefournisseur();
  }

  @Output() annulerEvent = new EventEmitter<string>();

  
  supprimer(){
    const headers = new HttpHeaders().set("Authorization", this.token);
    
    this.http.delete(this.url.urlAddress + ":8082/products/delete/" + this.data.result.idp, { headers, responseType: 'json' as 'json' }).subscribe(result => {
    
      this.dialogRef.close(this.sendsupprimer);
      
    }, (error) => {
      console.log(error.error.message)
    }
    )
  
  }
  
  valider(){
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
    this.http.put(this.url.urlAddress + ":8082/products/update/" + this.data.result.idp, this.formGroup.value, { headers, responseType: 'json' as 'json' }).subscribe(result => {
    }, (error) => {
      console.log(error.error.message)
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
 
      }
      )
    
  }

  marquechoisis() {

  }

  marquefournisseur(){
    const headers = new HttpHeaders().set("Authorization", this.token);
    this.http.get(this.url.urlAddress + ":8082/fournisseurs/marques/"+this.formGroup.value.fournisseur.id, { headers, responseType: 'json' as 'json' }).subscribe(result => {
      this.marques = result;
    }, (error) => {
      console.log(error.error.message)
    }
    )
  }

  fournisseurchoisis() {
    const headers = new HttpHeaders().set("Authorization", this.token);
    this.http.get(this.url.urlAddress + ":8082/fournisseurs/marques/" + this.formGroup.value.fournisseur.id, { headers, responseType: 'json' as 'json' }).subscribe(result => {
      this.marques = result;
    }, (error) => {
      console.log(error.error.message)
    }
    )
  }

 
  radiocertifautre(){
    this.certifautreradio = true;
  }
  radiocertifiso(){
    this.certifautreradio = false;
  }
  initForm() {
    this.formGroup = new FormGroup({


       nomp: new FormControl("CTA"),
      codep: new FormControl(this.data.result.codep),
      type: new FormControl(this.data.result.type),
      marque: new FormControl(this.data.result.marque),
      fournisseur: new FormGroup({
        id: new FormControl(this.data.result.fournisseur.id),
      }),


      parametres: new FormGroup({

        montage : new FormControl(this.data.result.parametres.montage),

        //section ventilation
        ventilation: new FormControl(this.data.result.parametres.ventilation),
        nombreventilateur : new FormControl(this.data.result.parametres.nombreventilateur),
        debitair: new FormControl(this.data.result.parametres.debitair),
        pressiondisponiblegaine: new FormControl(this.data.result.parametres.pressiondisponiblegaine),
        rendementventilateur : new FormControl(this.data.result.parametres.rendementventilateur),
        puissanceelectriqueabsorbe : new FormControl(this.data.result.parametres.puissanceelectriqueabsorbe),
        intensitenominale: new FormControl(this.data.result.parametres.intensitenominale),
        intensitedemarrage: new FormControl(this.data.result.parametres.intensitedemarrage),
        tensionnominalevoltage: new FormControl(this.data.result.parametres.tensionnominalevoltage),
        tensionnominalephases: new FormControl(this.data.result.parametres.tensionnominalephases),
        tensionnominalehertz: new FormControl(this.data.result.parametres.tensionnominalehertz),
        protectionthermique: new FormControl(this.data.result.parametres.protectionthermique),
        sensairventilation: new FormControl(this.data.result.parametres.sensairventilation),

        //section filtration
        prefiltration: new FormControl(this.data.result.parametres.prefiltration),
        nombreprefiltration: new FormControl(this.data.result.parametres.nombreprefiltration),
        filtration: new FormControl(this.data.result.parametres.filtration),
        nombrefiltration: new FormControl(this.data.result.parametres.nombrefiltration),    
        pertechargefiltration: new FormControl(this.data.result.parametres.pertechargefiltration),
        prisepression: new FormControl(this.data.result.parametres.prisepression),
        sensairfiltration: new FormControl(this.data.result.parametres.sensairfiltration),
        pasdesaillettes: new FormControl(this.data.result.parametres.pasdesaillettes),
         
        //section batterie
        batterie: new FormControl(this.data.result.parametres.batterie),
        typebatterie: new FormControl(this.data.result.parametres.typebatterie),
        batterieelectriquechaude: new FormControl(this.data.result.parametres.batterieelectriquechaude),
        puissancefrigorifiquebatterie: new FormControl(this.data.result.parametres.puissancefrigorifiquebatterie),
        puissancecalorifiquebatterie: new FormControl(this.data.result.parametres.puissancecalorifiquebatterie),
        regimeeautempentree: new FormControl(this.data.result.parametres.regimeeautempentree),
        regimeeautempsortie: new FormControl(this.data.result.parametres.regimeeautempsortie),
        temperatureentreeair: new FormControl(this.data.result.parametres.temperatureentreeair),
        humiditeentreeair: new FormControl(this.data.result.parametres.humiditeentreeair),
        temperaturesortieair: new FormControl(this.data.result.parametres.temperaturesortieair),
        humiditesortieair: new FormControl(this.data.result.parametres.humiditesortieair),
        debitfluide: new FormControl(this.data.result.parametres.debitfluide),
        pertechargebatterie: new FormControl(this.data.result.parametres.pertechargebatterie),
        
        //section melange
        typeregistremelange: new FormControl(this.data.result.parametres.typeregistremelange),
        typemelange: new FormControl(this.data.result.parametres.typemelange),
        airregistremelange: new FormControl(this.data.result.parametres.airregistremelange),
        temperaturemelange: new FormControl(this.data.result.parametres.temperaturemelange),
        carrosseriemelange: new FormControl(this.data.result.parametres.carrosseriemelange),
        epaisseurcarrosseriemelange: new FormControl(this.data.result.parametres.epaisseurcarrosseriemelange),
        peintemelange: new FormControl(this.data.result.parametres.peintemelange),
        
        //autres
        regulation: new FormControl(this.data.result.parametres.regulation),
        montageexterieur: new FormControl(this.data.result.parametres.montageexterieur),
        classenergitique: new FormControl(this.data.result.parametres.classenergitique),
        certification: new FormControl(this.data.result.parametres.certification),
        date_creation: new FormControl(this.data.result.date_creation)

    })
  })
  }

  annulermodification(){
    this.formGroup.reset(this.initialValues);
    this.modifier = false;
  }

    

  openDialog() {
    const dialogRef = this.dialog.open(ConfirmationdialogComponent,{
      width: 'auto',
      height: 'auto',
      data: {
        result : this.data.result
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) this.supprimer();
    });
  }

  openDialog2() {
    const dialogRef = this.dialog.open(FournisseurdetailsdialogComponent,{
      width: '50%',
      height: 'auto',
      data: {
        id : this.data.result.fournisseur.id,
        nomf : this.data.result.fournisseur.nomf
      }
    });

    dialogRef.afterClosed().subscribe(result => {
       
    });
  }

  prix : boolean = false;
  ThePrice(){
    this.prix = !this.prix
  }
}
