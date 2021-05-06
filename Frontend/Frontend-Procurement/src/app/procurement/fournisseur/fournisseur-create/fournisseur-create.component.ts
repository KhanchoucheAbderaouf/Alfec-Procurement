import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatChipInputEvent } from '@angular/material/chips';
import { Title } from '@angular/platform-browser';
import { GlobalsService } from 'src/app/utilities/globalvars/globals.service';
import { MatStepper } from '@angular/material/stepper';

@Component({
  selector: 'app-fournisseur-create',
  templateUrl: './fournisseur-create.component.html',
  styleUrls: ['./fournisseur-create.component.css']
})
export class FournisseurCreateComponent implements OnInit {

  constructor(private http:HttpClient ,private vars: GlobalsService,private titleService : Title) { }
  token =  'Bearer ' + JSON.parse(localStorage.getItem("currentUser") || "{}").token;
  formFournisseur : FormGroup;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;
  fourthFormGroup: FormGroup;
  fifthFormGroup: FormGroup;
  sixthFormGroup: FormGroup;
  specialFormGroup : FormGroup;
  countrycodeNumTel : string ="(+213)" ;
  countrycodeNumFax : string = "(+213)";
  //countrycodeNumFix : string = "(+213)";
  countrycodeNumContact : string = "(+213)";
  paiements : string[] = ["Cheque","Virement","Lettre de Credit","Transfert Libre","Remise Documentaire","Espece"]
  garanties : string[] = ["6 mois","12 mois","18 mois","24 mois"]
  typedelais : string[] = ["jours","semaines","mois"]

  ngOnInit(): void {
    this.initForm();
    this.vars.spanValue = "Ajouter Fournisseur";
    this.titleService.setTitle("Ajouter Fournisseur");
  }

  initForm(){
    this.firstFormGroup = new FormGroup( {
      numfournisseur : new FormControl("",[Validators.required]),
      nomf : new FormControl("",[Validators.required]),
    });
    this.secondFormGroup = new FormGroup({
      numtel  : new FormControl("(+213)",[Validators.required]), 
      //numfix  : new FormControl("(+213)"),
      numfax  : new FormControl("(+213)"),
      email  : new FormControl("",[Validators.required,Validators.email]),
      adresse  : new FormControl("",[Validators.required]),
    });
    this.thirdFormGroup = new FormGroup( {
        nomcontact  : new FormControl("",[Validators.required]),
        numcontact : new FormControl("(+213)",[Validators.required]),
        emailcontact : new FormControl("",[Validators.required,Validators.email])
    });
    this.fourthFormGroup = new FormGroup( {
      codefam  : new FormControl("",[Validators.required]),
      activite  : new FormControl("",[Validators.required]),
    });
    this.fifthFormGroup = new FormGroup( {
      conditionreglement  : new FormControl(""),
      paiement  : new FormControl("",[Validators.required]),
      garantie  : new FormControl(""),
      delailivraison : new FormControl("")
    });
    this.sixthFormGroup = new FormGroup({
      marques  : new FormControl([],[Validators.required]),
    })
    this.specialFormGroup = new FormGroup({
      number : new FormControl(""),
      typedelai : new FormControl("")
    })
  }

  specialZinou : any;
  
  annulerCatego($event: string){
    this.formFournisseur.patchValue({'categorie' : ''});
  }

  onSubmit(){
    const headers = new HttpHeaders().set("Authorization", this.token);
   

    if(this.firstFormGroup.valid && this.secondFormGroup.valid && this.thirdFormGroup.valid 
      && this.fourthFormGroup.valid && this.fifthFormGroup.valid && this.specialFormGroup.valid
      && this.sixthFormGroup.value.marques.length !== 0){
   
        this.specialZinou = {
          "numfournisseur":  this.firstFormGroup.value.numfournisseur,
          "nomf":  this.firstFormGroup.value.nomf,
          "numtel": this.formattingPhoneNumber(this.countrycodeNumTel,this.secondFormGroup.value.numtel),
         // "numfix":  this.formattingPhoneNumber(this.countrycodeNumFix,this.secondFormGroup.value.numfix),
          "numfax":  this.formattingPhoneNumber(this.countrycodeNumFax,this.secondFormGroup.value.numfax),
          "email": this.secondFormGroup.value.email,
          "adresse": this.secondFormGroup.value.adresse,
          "contact": {
            "nomcontact": this.thirdFormGroup.value.nomcontact,
            "numcontact": this.formattingPhoneNumber(this.countrycodeNumContact,this.thirdFormGroup.value.numcontact),
            "emailcontact": this.thirdFormGroup.value.emailcontact,
          },
          "codefam": this.fourthFormGroup.value.codefam,
          "activite":  this.fourthFormGroup.value.activite,
          "conditionreglement":  this.fifthFormGroup.value.conditionreglement,
          "paiement": this.fifthFormGroup.value.paiement,
          "garantie":  this.fifthFormGroup.value.garantie,
          "delailivraison": this.specialFormGroup.value.number + " " + this.specialFormGroup.value.typedelai,
          "marques":  this.sixthFormGroup.value.marques,
      }
   /*   if(this.specialZinou.numfix === this.countrycodeNumFix) {
        this.specialZinou.numfix = ""
      }*/
      if(this.specialZinou.numfax === this.countrycodeNumFax){
        this.specialZinou.numfax = ""
      }
    this.http.post(this.vars.urlAddress + ":8082/fournisseurs/create", this.specialZinou, { headers, responseType: 'json' as 'json' }).subscribe(result => {
      window.location.reload();
    }, (error) => {
      console.log(error.error.message)
    }
    )
    }
  }
 
 // chips again


  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes: number[] = [13, 188];
  marques: string[] = [];
  marqueLower : string[] = [];

 

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;
    if (value.trim() && !this.marqueLower.includes(event.value.toLowerCase().trim()) ) {
      this.marques.push(value.trim());
      this.marqueLower.push(value.toLowerCase().trim());
   //   this.formFournisseur.value.marques.push(value);
      this.sixthFormGroup.value.marques.push(value);

    }

    // Reset the input value
    if (input) {
      input.value = '';
    }
  }
  reset(stepper: MatStepper){
    stepper.reset();
    this.specialFormGroup.reset()
    this.secondFormGroup.patchValue({
      numtel  : "(+213)", 
      //numfix  : "(+213)", 
      numfax  : "(+213)",
    })
    this.thirdFormGroup.patchValue({
      numcontact : "(+213)",
    })
    this.knowGarantie = true
    this.knowPaiement = true

  }

  remove(marque: string): void {
    const index = this.marques.indexOf(marque);

    if (index >= 0) {
      this.marques.splice(index, 1);
      this.marqueLower.splice(index, 1);
      this.formFournisseur.value.marques.splice(index,1);
    }
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
  /*onCountryChangenumFix(event : any){
    const currentnumtel = this.secondFormGroup.value.numfix.substring(this.secondFormGroup.value.numfix.indexOf(')') + 1);
    this.secondFormGroup.patchValue({
      numfix :  "(+" + event.dialCode + ")" + currentnumtel
    })
    this.countrycodeNumFix = event.dialCode
  }*/
  onCountryChangenumContact(event : any){
    const currentnumtel = this.thirdFormGroup.value.numcontact.substring(this.thirdFormGroup.value.numcontact.indexOf(')') + 1);
    this.thirdFormGroup.patchValue({
        numcontact :   "(+" + event.dialCode + ")" + currentnumtel
    })
    this.countrycodeNumContact = event.dialCode
  }
  formattingPhoneNumber(type : string,phone : string){
     if(phone.includes(")")){
       
        return phone
       
     } else {
     
        return type + phone
      
      }
  }
  knowGarantie : boolean = true;
  activateNewGarantie(){
    if(this.fifthFormGroup.value.garantie === "Autre"){
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
    if(this.fifthFormGroup.value.paiement === "Autre"){
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
