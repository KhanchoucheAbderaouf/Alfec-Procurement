import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatChipInputEvent } from '@angular/material/chips';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ConfirmationdialogComponent } from 'src/app/utilities/confirmationdialog/confirmationdialog.component';
import { GlobalsService } from 'src/app/utilities/globalvars/globals.service';
import { DialogueComponent } from '../../products/geg/dialogue/dialogue.component';
 

@Component({
  selector: 'app-fournisseuralldialog',
  templateUrl: './fournisseuralldialog.component.html',
  styleUrls: ['./fournisseuralldialog.component.css']
})
export class FournisseuralldialogComponent implements OnInit {
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;
  fourthFormGroup: FormGroup;
  fifthFormGroup: FormGroup;
  sixthFormGroup: FormGroup;
  specialFormGroup: FormGroup;
  modifier : boolean = false;
  supprime : boolean = false;
  fournisseurs : any;
  countrycodeNumTel : string = this.data.result.numtel.substring(0,this.data.result.numtel.indexOf(')')+1);
  countrycodeNumFix : string = this.data.result.numfix.substring(0,this.data.result.numfix.indexOf(')')+1);
  countrycodeNumFax : string = this.data.result.numfax.substring(0,this.data.result.numfax.indexOf(')')+1)
  countrycodeNumContact : string = this.data.result.contact.numcontact.substring(0,this.data.result.contact.numcontact.indexOf(')')+1)
  //marques : any;
  certifautreradio : boolean = false;
  compresseurautreradio : boolean = false;
  typefluidautreradio : boolean = false;
  circuitelectautreradio : boolean = false;
  token =  'Bearer ' + JSON.parse(localStorage.getItem("currentUser") || "{}").token;
  sendmodifier : string = "Modifier";
  sendsupprimer : string = "Supprimer";
  AdminUser : any = JSON.parse(localStorage.getItem("currentUser") || "{}").role;
  paiements : string[] = ["Cheque","Virement","Lettre de Credit","Transfert Libre","Remise Documentaire","Espece"]
  garanties : string[] = ["6 mois","12 mois","18 mois","24 mois"]
  typedelais : string[] = ["jours","semaines","mois"]

  
  constructor(public dialogRef: MatDialogRef<DialogueComponent>, public dialog: MatDialog,@Inject(MAT_DIALOG_DATA) public data: any,private url: GlobalsService, private http: HttpClient) { }

  ngOnInit(): void {
    this.initForm();
    this.startermarques();
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

  initForm(){
    this.firstFormGroup = new FormGroup( {
      numfournisseur : new FormControl(this.data.result.numfournisseur,[Validators.required]),
      nomf : new FormControl(this.data.result.nomf,[Validators.required]),
    });
    this.secondFormGroup = new FormGroup({
      numtel  : new FormControl(this.data.result.numtel,[Validators.required]), 
      numfix  : new FormControl(this.data.result.numfix,[Validators.required]),
      numfax  : new FormControl(this.data.result.numfax,[Validators.required]),
      email  : new FormControl(this.data.result.email,[Validators.required]),
      adresse  : new FormControl(this.data.result.adresse,[Validators.required]),

    });
    this.thirdFormGroup = new FormGroup( {
        nomcontact  : new FormControl(this.data.result.contact.nomcontact,[Validators.required]),
        numcontact : new FormControl(this.data.result.contact.numcontact,[Validators.required]),
        emailcontact : new FormControl(this.data.result.contact.emailcontact,[Validators.required])
    });
    this.fourthFormGroup = new FormGroup( {
      codefam  : new FormControl(this.data.result.codefam,[Validators.required]),
      activite  : new FormControl(this.data.result.activite,[Validators.required]),
    });
    this.fifthFormGroup = new FormGroup( {
      conditionreglement  : new FormControl(this.data.result.conditionreglement,[Validators.required]),
      paiement  : new FormControl(this.data.result.paiement,[Validators.required]),
      garantie  : new FormControl(this.data.result.garantie,[Validators.required]),
      delailivraison : new FormControl(this.data.result.delailivraison,[Validators.required])
    });
    this.sixthFormGroup = new FormGroup({
      marques  : new FormControl(this.data.result.marques,[Validators.required]),
    })
    this.specialFormGroup = new FormGroup({
      number : new FormControl(this.data.result.delailivraison.substr(0, this.data.result.delailivraison.indexOf(' '))),
      typedelai : new FormControl(this.data.result.delailivraison.substring(this.data.result.delailivraison.indexOf(' ')+1))
    })
   
  }

  specialZinou : any;

  supprimer(){
    const headers = new HttpHeaders().set("Authorization", this.token);
    this.dialogRef.close(this.sendsupprimer);
    
    this.http.delete(this.url.urlAddress + ":8082/procurement/fournisseurs/delete/" + this.data.result.id, { headers, responseType: 'json' as 'json' }).subscribe(result => {
    
      this.dialogRef.close(this.sendsupprimer);
      
    }, (error) => {
      console.log(error.error.message)
    }
    )
  
  }

  annulerCatego($event: string){
    this.specialZinou.patchValue({'categorie' : ''});
  }

  onSubmit(){
    this.specialZinou = {
      "id" : this.data.result.id,
      "numfournisseur":  this.firstFormGroup.value.numfournisseur,
      "nomf":  this.firstFormGroup.value.nomf,
      "numtel":  this.formattingPhoneNumber(this.countrycodeNumTel,this.secondFormGroup.value.numtel),
      "numfix":  this.formattingPhoneNumber(this.countrycodeNumFix,this.secondFormGroup.value.numfix),
      "numfax":  this.formattingPhoneNumber(this.countrycodeNumFax,this.secondFormGroup.value.numfax),
      "email": this.secondFormGroup.value.email,
      "adresse": this.secondFormGroup.value.adresse,
      "contact": {
        "nomcontact": this.thirdFormGroup.value.nomcontact,
        "numcontact": this.formattingPhoneNumber(this.countrycodeNumTel,this.thirdFormGroup.value.numcontact),
        "emailcontact": this.thirdFormGroup.value.emailcontact,
      },
      "codefam": this.fourthFormGroup.value.codefam,
      "activite":  this.fourthFormGroup.value.activite,
      "conditionreglement":  this.fifthFormGroup.value.conditionreglement,
      "paiement": this.fifthFormGroup.value.paiement,
      "garantie":  this.fifthFormGroup.value.garantie,
      "delailivraison": this.specialFormGroup.value.number + " " + this.specialFormGroup.value.typedelai,
      "marques": this.marques,
    }
  }
  
  modifiertrue(){
    this.modifier = true;
    if(!this.paiements.includes(this.fifthFormGroup.value.paiement)){
      this.knowPaiement = false      
      this.fifthFormGroup.patchValue({
        paiement : this.data.result.paiement 
      })
    }
    if(!this.garanties.includes(this.fifthFormGroup.value.garantie)){
      this.knowGarantie = false      
      this.fifthFormGroup.patchValue({
        garantie : this.data.result.garantie
      })
    }
  }

  annulermodification(){
    this.reset();
    this.modifier = false;
    this.knowGarantie=true
    this.knowPaiement=true
    this.startermarques();
  }
  // chips again


  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes: number[] = [13, 188];
  marques: string[] = [];
  marqueLower : string[] = [];


  startermarques(){
    this.marques = []
    this.marqueLower =  []
    for (let  mark of this.data.result.marques) { 
      this.marques.push(mark.trim());
      this.marqueLower.push(mark.toLowerCase().trim())
    }
  
  }

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;
    if (value.trim() && !this.marqueLower.includes(event.value.toLowerCase().trim())) {
      this.marques.push(value.trim());
      this.marqueLower.push(value.toLowerCase().trim());
    }
    if (input) {
      input.value = '';
    }
  }

  remove(marque: string): void {
    const index = this.marques.indexOf(marque);
    if (index >= 0) {
      this.marques.splice(index, 1);
      this.marqueLower.splice(index, 1);

    //  this.data.result.marques.splice(index,1);
    }
  }



    
  valider(){
    const headers = new HttpHeaders().set("Authorization", this.token);

    if(this.firstFormGroup.valid && this.secondFormGroup.valid && this.thirdFormGroup.valid 
      && this.fourthFormGroup.valid && this.fifthFormGroup.valid && this.sixthFormGroup.value.marques.length !== 0){
    this.onSubmit();
    this.http.put(this.url.urlAddress + ":8082/procurement/fournisseurs/update/"+this.data.result.id, this.specialZinou, { headers, responseType: 'json' as 'json' }).subscribe(result => {
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

    public reset(){
      this.specialZinou = {
        "id" : this.data.result.id,
        "numfournisseur":  this.firstFormGroup.value.numfournisseur,
        "nomf":  this.firstFormGroup.value.nomf,
        "numtel":  this.secondFormGroup.value.numtel,
        "numfix":  this.secondFormGroup.value.numfix,
        "numfax":  this.secondFormGroup.value.numfax,
        "email": this.secondFormGroup.value.email,
        "adresse": this.secondFormGroup.value.adresse,
        "contact": {
          "nomcontact": this.thirdFormGroup.value.nomcontact,
          "numcontact": this.thirdFormGroup.value.numcontact,
          "emailcontact": this.thirdFormGroup.value.emailcontact,
        },
        "codefam": this.fourthFormGroup.value.codefam,
        "activite":  this.fourthFormGroup.value.activite,
        "conditionreglement":  this.fifthFormGroup.value.conditionreglement,
        "paiement": this.fifthFormGroup.value.paiement,
        "garantie":  this.fifthFormGroup.value.garantie,
        "delailivraison": this.fifthFormGroup.value.delailivraison,
        "marques":  this.sixthFormGroup.value.marques,
      }
      this.firstFormGroup.setValue( {
        numfournisseur : this.data.result.numfournisseur ,
        nomf : this.data.result.nomf ,
      });
      this.secondFormGroup.setValue({
        numtel  :  this.data.result.numtel , 
        numfix  :  this.data.result.numfix ,
        numfax  :  this.data.result.numfax ,
        email  :  this.data.result.email ,
        adresse  :  this.data.result.adresse ,
      });
      this.thirdFormGroup.setValue( {
          nomcontact  :  this.data.result.contact.nomcontact ,
          numcontact : this.data.result.contact.numcontact ,
          emailcontact : this.data.result.contact.emailcontact 
      });
      this.fourthFormGroup.setValue( {
        codefam  :  this.data.result.codefam ,
        activite  :  this.data.result.activite ,
      });
      this.fifthFormGroup.setValue( {
        conditionreglement  : this.data.result.conditionreglement ,
        paiement  : this.data.result.paiement ,
        garantie  : this.data.result.garantie ,
        delailivraison : this.data.result.delailivraison 
      });
      this.sixthFormGroup.setValue({
        marques  : this.data.result.marques ,
      })
      this.specialFormGroup.setValue({
        number : this.data.result.delailivraison.substr(0, this.data.result.delailivraison.indexOf(' ')) ,
        typedelai : this.data.result.delailivraison.substring(this.data.result.delailivraison.indexOf(' ')+1)
      }) 
    }

    activecontact: boolean = false;
    contact() {
      this.activecontact = !this.activecontact;
    }

    onCountryChange(event : any){
      const currentnumtel = this.secondFormGroup.value.numtel.substring(this.secondFormGroup.value.numtel.indexOf(')') + 1);
      this.secondFormGroup.patchValue({
        numtel :  "(+" + event.dialCode + ")" + currentnumtel
      })
    }

    formattingThePhoneNumbers(phone: string){
      return phone.substring(0,phone.indexOf(')')+1) + " " + phone.substring(phone.indexOf(')')+1).replace(/(\d{3})/g, '$1 ').replace(/(^\s+|\s+$)/,'')
    }
    onCountryChangenumTel(event : any){
      const currentnumtel = this.secondFormGroup.value.numtel.substring(this.secondFormGroup.value.numtel.indexOf(')') + 1);
      this.secondFormGroup.patchValue({
        numtel :  "(+" + event.dialCode + ")" + currentnumtel
      })
      this.countrycodeNumTel = event.dialCode
    }
    onCountryChangenumFax(event : any){
      const currentnumtel = this.secondFormGroup.value.numfax.substring(this.secondFormGroup.value.numfax.indexOf(')') + 1);
      this.secondFormGroup.patchValue({
        numfax :  "(+" + event.dialCode + ")" + currentnumtel
      })
      this.countrycodeNumFax = event.dialCode
    }
    onCountryChangenumFix(event : any){
      const currentnumtel = this.secondFormGroup.value.numfix.substring(this.secondFormGroup.value.numfix.indexOf(')') + 1);
      this.secondFormGroup.patchValue({
        numfix :  "(+" + event.dialCode + ")" + currentnumtel
      })
      this.countrycodeNumFix = event.dialCode
    }
    onCountryChangenumContact(event : any){
      const currentnumtel = this.thirdFormGroup.value.numcontact.substring(this.thirdFormGroup.value.numcontact.indexOf(')') + 1);
      this.thirdFormGroup.patchValue({
          numcontact :   "(+" + event.dialCode + ")" + currentnumtel
      })
      this.countrycodeNumContact = event.dialCode
    }
    formattingPhoneNumber(type : string,phone : string){
      if(phone.includes(")")){
         if(phone.charAt(phone.indexOf(')')  + 1) !== "0") {
         return phone
         }else {
          return type + phone.substring(phone.indexOf(')')  + 2);
         }
      } else {
       if(phone.charAt(0)  !== "0") {
         return type + phone.substring(phone.indexOf(')') + 1)
         }else {
          return type + phone.substring(1)
         }
       }
   }

   knowGarantie : boolean = true;
   activateNewGarantie(){
     if(!this.garanties.includes(this.fifthFormGroup.value.garantie)){
       this.knowGarantie = false      
       this.fifthFormGroup.patchValue({
         garantie : "" 
       })
     }
   }
   annulenewgarantie(){
     this.knowGarantie=true
   }
 
   knowPaiement : boolean = true
   activateNewPaiement(){
     if(!this.paiements.includes(this.fifthFormGroup.value.paiement)){
       this.knowPaiement = false      
       this.fifthFormGroup.patchValue({
         paiement : "" 
       })
     }
   }
 
   annulenewpaiement(){
     this.knowPaiement=true
   }
}
export interface Marque {
  name: string;
}