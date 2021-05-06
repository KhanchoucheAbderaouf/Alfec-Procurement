import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FournisseurdetailsdialogComponent } from 'src/app/procurement/fournisseur/fournisseurdetailsdialog/fournisseurdetailsdialog.component';
import { ConfirmationdialogComponent } from 'src/app/utilities/confirmationdialog/confirmationdialog.component';
import { GlobalsService } from 'src/app/utilities/globalvars/globals.service';

@Component({
  selector: 'app-apdialog',
  templateUrl: './apdialog.component.html',
  styleUrls: ['./apdialog.component.css']
})
export class ApdialogComponent implements OnInit {
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
  constructor(public dialogRef: MatDialogRef<ApdialogComponent>, public dialog: MatDialog,@Inject(MAT_DIALOG_DATA) public data: any,private url: GlobalsService, private http: HttpClient) { }

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


      nomp: new FormControl("AP"),
      codep: new FormControl(this.data.result.codep),
      type: new FormControl(this.data.result.type),
      marque: new FormControl(this.data.result.marque),
      fournisseur: new FormGroup({
        id: new FormControl(this.data.result.fournisseur.id),
      }),


      parametres: new FormGroup({

        //Infos Essentielles
        typeap : new FormControl(this.data.result.parametres.typeap),
        soufflage: new FormControl(this.data.result.parametres.soufflage),
        typesoufflage: new FormControl(this.data.result.parametres.typesoufflage),
        reprise: new FormControl(this.data.result.parametres.reprise),
        typereprise : new FormControl(this.data.result.parametres.typereprise),
        prefiltration: new FormControl(this.data.result.parametres.prefiltration),
        nombreprefiltration: new FormControl(this.data.result.parametres.nombreprefiltration),
        filtration : new FormControl(this.data.result.parametres.filtration),
        nombrefiltration : new FormControl(this.data.result.parametres.nombrefiltration),
        pertecharge : new FormControl(this.data.result.parametres.pertecharge),
        dimension : new FormControl(this.data.result.parametres.dimension),

        //Circuit Frigorifique
        typecompresseur: new FormControl(this.data.result.parametres.typecompresseur),
        nombrecompresseur: new FormControl(this.data.result.parametres.nombrecompresseur),
        fluidefrigorifique: new FormControl(this.data.result.parametres.fluidefrigorifique),
        puissancefrigorifique: new FormControl(this.data.result.parametres.puissancefrigorifique),
        temperatureentreeair: new FormControl(this.data.result.parametres.temperatureentreeair),
        temperaturesortieair: new FormControl(this.data.result.parametres.temperaturesortieair),
        temperaturecondensation: new FormControl(this.data.result.parametres.temperaturecondensation),

        //ventilateur
        nombreventilateur: new FormControl(this.data.result.parametres.nombreventilateur),
        debitair: new FormControl(this.data.result.parametres.debitair),    
        pressiondisponible: new FormControl(this.data.result.parametres.pressiondisponible),
        vitesserotation: new FormControl(this.data.result.parametres.vitesserotation),
        niveausonore: new FormControl(this.data.result.parametres.niveausonore),
        distanceniveausonore: new FormControl(this.data.result.parametres.distanceniveausonore),
        niveaupuissancesonore: new FormControl(this.data.result.parametres.niveaupuissancesonore),

        //humidificateur
        nombrehumidificateur: new FormControl(this.data.result.parametres.nombrehumidificateur),
        puissanceabsorbeehumidificateur: new FormControl(this.data.result.parametres.puissanceabsorbeehumidificateur),
        productionmaxvapeur: new FormControl(this.data.result.parametres.productionmaxvapeur),

        //electrique
        tensionnominalevoltage: new FormControl(this.data.result.parametres.tensionnominalevoltage),
        tensionnominalephases: new FormControl(this.data.result.parametres.tensionnominalephases),
        tensionnominalehertz: new FormControl(this.data.result.parametres.tensionnominalehertz),
        puissanceelectriqueabsorbee: new FormControl(this.data.result.parametres.puissanceelectriqueabsorbee),
        courantnominal: new FormControl(this.data.result.parametres.courantnominal),
        dialoguegtc: new FormControl(this.data.result.parametres.dialoguegtc),
        puissanceacoustique: new FormControl(this.data.result.parametres.puissanceacoustique),

        //Autres
        puissanceabsorbeebatterie: new FormControl(this.data.result.parametres.puissanceabsorbeebatterie),
        temperatureexterieure: new FormControl(this.data.result.parametres.temperatureexterieure),
        raccordementfrigoentree: new FormControl(this.data.result.parametres.raccordementfrigoentree),
        raccordementfrigosortie: new FormControl(this.data.result.parametres.raccordementfrigosortie),
        classenergitique: new FormControl(this.data.result.parametres.classenergitique),
        plotantivibration: new FormControl(this.data.result.parametres.plotantivibration),
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