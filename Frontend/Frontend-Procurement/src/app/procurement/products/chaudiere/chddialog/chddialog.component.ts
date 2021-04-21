import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FournisseurdetailsdialogComponent } from 'src/app/procurement/fournisseur/fournisseurdetailsdialog/fournisseurdetailsdialog.component';
import { ConfirmationdialogComponent } from 'src/app/utilities/confirmationdialog/confirmationdialog.component';
import { GlobalsService } from 'src/app/utilities/globalvars/globals.service';

@Component({
  selector: 'app-chddialog',
  templateUrl: './chddialog.component.html',
  styleUrls: ['./chddialog.component.css']
})
export class ChddialogComponent implements OnInit {
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
  constructor(public dialogRef: MatDialogRef<ChddialogComponent>, public dialog: MatDialog,@Inject(MAT_DIALOG_DATA) public data: any,private url: GlobalsService, private http: HttpClient) { }

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
    
    this.http.delete(this.url.urlAddress + ":8082/procurement/products/delete/" + this.data.result.idp, { headers, responseType: 'json' as 'json' }).subscribe(result => {
    
      this.dialogRef.close(this.sendsupprimer);
      
    }, (error) => {
      console.log(error.error.message)
    }
    )
  
  }
  
  valider(){
    const headers = new HttpHeaders().set("Authorization", this.token);
    if (this.formGroup.valid) {
      
    this.http.put(this.url.urlAddress + ":8082/procurement/products/update/" + this.data.result.idp, this.formGroup.value, { headers, responseType: 'json' as 'json' }).subscribe(result => {
    }, (error) => {
      console.log(error.error.message)
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
 
      }
      )
    
  }

  marquechoisis() {

  }

  marquefournisseur(){
    const headers = new HttpHeaders().set("Authorization", this.token);
    this.http.get(this.url.urlAddress + ":8082/procurement/fournisseurs/marques/"+this.formGroup.value.fournisseur.id, { headers, responseType: 'json' as 'json' }).subscribe(result => {
      this.marques = result;
    }, (error) => {
      console.log(error.error.message)
    }
    )
  }

  fournisseurchoisis() {
    const headers = new HttpHeaders().set("Authorization", this.token);
    this.http.get(this.url.urlAddress + ":8082/procurement/fournisseurs/marques/" + this.formGroup.value.fournisseur.id, { headers, responseType: 'json' as 'json' }).subscribe(result => {
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


      nomp: new FormControl("CHD"),
      codep: new FormControl(this.data.result.codep),
      type: new FormControl(this.data.result.type),
      marque: new FormControl(this.data.result.marque),
      fournisseur: new FormGroup({
        id: new FormControl(this.data.result.fournisseur.id),
      }),


      parametres: new FormGroup({

        //Infos Essentielles
        typechd : new FormControl(this.data.result.parametres.typechd),
        fonctionnementchd: new FormControl(this.data.result.parametres.fonctionnementchd),
        puissancecalorifiquechd: new FormControl(this.data.result.parametres.puissancecalorifiquechd),
        temperature: new FormControl(this.data.result.parametres.temperature),
        pressionfonctionnementchd: new FormControl(this.data.result.parametres.pressionfonctionnementchd),
        regimefonctionement: new FormControl(this.data.result.parametres.regimefonctionement),
        pressionmax: new FormControl(this.data.result.parametres.pressionmax),
        volumeeau: new FormControl(this.data.result.parametres.volumeeau),

        //Bruleur 
        puissancecalorifiquebruleur: new FormControl(this.data.result.parametres.puissancecalorifiquebruleur),
        pressionfonctionnementbruleur: new FormControl(this.data.result.parametres.pressionfonctionnementbruleur),

        //electrique
        tensionnominalevoltage: new FormControl(this.data.result.parametres.tensionnominalevoltage),
        tensionnominalephases: new FormControl(this.data.result.parametres.tensionnominalephases),
        tensionnominalehertz: new FormControl(this.data.result.parametres.tensionnominalehertz),
        puissanceelectriqueabsorbee: new FormControl(this.data.result.parametres.puissanceelectriqueabsorbee),
        courantnominal: new FormControl(this.data.result.parametres.courantnominal),
        dialoguegtc: new FormControl(this.data.result.parametres.dialoguegtc),
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