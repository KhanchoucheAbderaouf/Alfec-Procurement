import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EventEmitter, Output } from '@angular/core';
import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {MatDialog, MatDialogActions, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { FournisseurdetailsdialogComponent } from 'src/app/procurement/fournisseur/fournisseurdetailsdialog/fournisseurdetailsdialog.component';
import { ConfirmationdialogComponent } from 'src/app/utilities/confirmationdialog/confirmationdialog.component';
import { GlobalsService } from 'src/app/utilities/globalvars/globals.service';
 

@Component({
  selector: 'app-dialogue',
  templateUrl: './dialogue.component.html',
  styleUrls: ['./dialogue.component.css']
})
export class DialogueComponent implements OnInit {
  modifier : boolean = false;
  supprime : boolean = false;
  formGroup : FormGroup;
  initialValues : any;
  fournisseurs : any;
  marques : any;
  certifautreradio : boolean = false;
  compresseurautreradio : boolean = false;
  typefluidautreradio : boolean = false;
  circuitelectautreradio : boolean = false;
  token =  'Bearer ' + JSON.parse(localStorage.getItem("currentUser") || "{}").token;
  sendmodifier : string = "Modifier";
  sendsupprimer : string = "Supprimer";
  AdminUser : any = JSON.parse(localStorage.getItem("currentUser") || "{}").role;
  constructor(public dialogRef: MatDialogRef<DialogueComponent>, public dialog: MatDialog,@Inject(MAT_DIALOG_DATA) public data: any,private url: GlobalsService, private http: HttpClient) { }

  ngOnInit(): void {
    this.initForm();
    this.initialValues= this.formGroup.value
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
      if(this.formGroup.value.parametres.typegeg == 'froid seul'){
        this.formGroup.patchValue({parametres : {
          pc : "",
          cop: "",
          tempexterieurpc : ""
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
  initForm() {
    this.formGroup = new FormGroup({
      nomp: new FormControl("GEG"),
      codep: new FormControl(this.data.result.codep),
      type: new FormControl(this.data.result.type),
      marque: new FormControl(this.data.result.marque),
      fournisseur: new FormGroup({
        id: new FormControl(this.data.result.fournisseur.id),
      }),


      parametres: new FormGroup({
        pf: new FormControl(this.data.result.parametres.pf),
        tempexterieurpf: new FormControl(this.data.result.parametres.tempexterieurpf),
        eer: new FormControl(this.data.result.parametres.eer),
        cop: new FormControl(this.data.result.parametres.cop),
        pc : new FormControl(this.data.result.parametres.pc),
        tempexterieurpc : new FormControl(this.data.result.parametres.tempexterieurpc),
        typegeg: new FormControl(this.data.result.parametres.typegeg),
        classenergitique: new FormControl(this.data.result.parametres.classenergitique),
        plotantivibration: new FormControl(this.data.result.parametres.plotantivibration),
        certification: new FormControl(this.data.result.parametres.certification),
        condensation: new FormControl(this.data.result.parametres.condensation),

        typecompresseur: new FormControl(this.data.result.parametres.typecompresseur),
        nbrecircuitfrigo: new FormControl(this.data.result.parametres.nbrecircuitfrigo),
        nbrecompresseur: new FormControl(this.data.result.parametres.nbrecompresseur),
        refregerant: new FormControl(this.data.result.parametres.refregerant),

 
          ventilateur: new FormControl(this.data.result.parametres.ventilateur),
          debitcondenseur: new FormControl(this.data.result.parametres.debitcondenseur),
          pressioncondenseur: new FormControl(this.data.result.parametres.pressioncondenseur),
          epoxycondenseur: new FormControl(this.data.result.parametres.epoxycondenseur),
        

        echangeurfrigo: new FormControl(this.data.result.parametres.echangeurfrigo),
        typefluide: new FormControl(this.data.result.parametres.typefluide),
        pertecharge: new FormControl(this.data.result.parametres.pertecharge),
        debitfluide: new FormControl(this.data.result.parametres.debitfluide),
        tempfluidesortie: new FormControl(this.data.result.parametres.tempfluidesortie),
        tempfluideentree: new FormControl(this.data.result.parametres.tempfluideentree),
        glycol: new FormControl(this.data.result.parametres.glycol),
        temperatureevaporateur: new FormControl(this.data.result.parametres.temperatureevaporateur),

        pressostatHPBP: new FormControl(this.data.result.parametres.pressostatHPBP),
        manoHPBP: new FormControl(this.data.result.parametres.manoHPBP),
        insonorisationcompresseur: new FormControl(this.data.result.parametres.insonorisationcompresseur),
        tropicalisationequipement: new FormControl(this.data.result.parametres.tropicalisationequipement),

        modulehydraulique: new FormGroup({
          avecmodulehydraulique: new FormControl(this.data.result.parametres.modulehydraulique.avecmodulehydraulique),
          pompe: new FormGroup({
            avecpompe: new FormControl(this.data.result.parametres.modulehydraulique.pompe.avecpompe),
            formepompe: new FormControl(this.data.result.parametres.modulehydraulique.pompe.formepompe),
            typepompe: new FormControl(this.data.result.parametres.modulehydraulique.pompe.typepompe),
            debitpompe: new FormControl(this.data.result.parametres.modulehydraulique.pompe.debitpompe),
            hmtpompe: new FormControl(this.data.result.parametres.modulehydraulique.pompe.hmtpompe)
          }),
          ballontampon: new FormGroup({
            avecballontampon: new FormControl(this.data.result.parametres.modulehydraulique.ballontampon.avecballontampon),
            capaciteballontampon: new FormControl(this.data.result.parametres.modulehydraulique.ballontampon.capaciteballontampon)
          }),
          vaseexpansion: new FormGroup({
            avecvaseexpansion : new FormControl(this.data.result.parametres.modulehydraulique.vaseexpansion.avecvaseexpansion),
            capacitevaseexpansion : new FormControl(this.data.result.parametres.modulehydraulique.vaseexpansion.capacitevaseexpansion)
          }),
        }),

        
          tensionnominale: new FormGroup({
            voltage: new FormControl(this.data.result.parametres.tensionnominale.voltage),
            phases: new FormControl(this.data.result.parametres.tensionnominale.phases),
            hertz: new FormControl(this.data.result.parametres.tensionnominale.hertz)
          }),
          puissanceabsorbee: new FormControl(this.data.result.parametres.puissanceabsorbee),
          facteurpuissance: new FormControl(this.data.result.parametres.facteurpuissance),
          circuitelectrique: new FormControl(this.data.result.parametres.circuitelectrique),
          intensitenominale: new FormControl(this.data.result.parametres.intensitenominale),
          intensitemaximale: new FormControl(this.data.result.parametres.intensitemaximale),
          intensitedemmarage: new FormControl(this.data.result.parametres.intensitedemmarage),
          armoireelectrique: new FormControl(this.data.result.parametres.armoireelectrique),
          sondefonctionnement: new FormControl(this.data.result.parametres.sondefonctionnement),
          dialoguegtc: new FormControl(this.data.result.parametres.dialoguegtc),
          puissanceacoustique: new FormControl(this.data.result.parametres.puissanceacoustique),
          pressionacoustique: new FormControl(this.data.result.parametres.pressionacoustique),
          date_creation: new FormControl(this.data.result.date_creation),
    


      }),

      // douane : new FormControl("",[Validators.required,Validators.max(100),Validators.min(0)]),
      //fraisdivers : new FormControl("",[Validators.required]),
    })
  }

  annulermodification(){
    this.formGroup.reset(this.initialValues)
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
