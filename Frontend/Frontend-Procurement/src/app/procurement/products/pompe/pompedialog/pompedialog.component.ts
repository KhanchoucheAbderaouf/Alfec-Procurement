import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FournisseurdetailsdialogComponent } from 'src/app/procurement/fournisseur/fournisseurdetailsdialog/fournisseurdetailsdialog.component';
import { ConfirmationdialogComponent } from 'src/app/utilities/confirmationdialog/confirmationdialog.component';
import { GlobalsService } from 'src/app/utilities/globalvars/globals.service';

@Component({
  selector: 'app-pompedialog',
  templateUrl: './pompedialog.component.html',
  styleUrls: ['./pompedialog.component.css']
})
export class PompedialogComponent implements OnInit {
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
  constructor(public dialogRef: MatDialogRef<PompedialogComponent>, public dialog: MatDialog,@Inject(MAT_DIALOG_DATA) public data: any,private url: GlobalsService, private http: HttpClient) { }

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


      nomp: new FormControl("POMPE"),
      codep: new FormControl(this.data.result.codep),
      type: new FormControl(this.data.result.type),
      marque: new FormControl(this.data.result.marque),
      fournisseur: new FormGroup({
        id: new FormControl(this.data.result.fournisseur.id),
      }),


      parametres: new FormGroup({

         //Infos Essentielles
         caracteristiquepompe: new FormControl(this.data.result.parametres.caracteristiquepompe),
         typepompe : new FormControl(this.data.result.parametres.typepompe),
         debiteau: new FormControl(this.data.result.parametres.debiteau),
         hauteurtotale: new FormControl(this.data.result.parametres.hauteurtotale),
         rendementhydraulique  : new FormControl(this.data.result.parametres.rendementhydraulique),
         tmin: new FormControl(this.data.result.parametres.tmin),
         tmax: new FormControl(this.data.result.parametres.tmax),
       
       
        //electrique
        tensionnominalevoltage: new FormControl(this.data.result.parametres.tensionnominalevoltage),
        tensionnominalephases: new FormControl(this.data.result.parametres.tensionnominalephases),
        tensionnominalehertz: new FormControl(this.data.result.parametres.tensionnominalehertz),
        puissanceelectriqueabsorbee: new FormControl(this.data.result.parametres.puissanceelectriqueabsorbee),
        courantnominal: new FormControl(this.data.result.parametres.courantnominal),
        puissanceacoustique: new FormControl(this.data.result.parametres.puissanceacoustique),

        //Autres
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