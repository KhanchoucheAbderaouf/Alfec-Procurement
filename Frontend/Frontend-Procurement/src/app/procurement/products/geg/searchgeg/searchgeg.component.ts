import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { GlobalsService } from 'src/app/utilities/globalvars/globals.service';

@Component({
  selector: 'app-searchgeg',
  templateUrl: './searchgeg.component.html',
  styleUrls: ['./searchgeg.component.css']
})
export class SearchgegComponent implements OnInit {
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
  constructor(private vars: GlobalsService, private http: HttpClient) { }

  ngOnInit(): void {
    this.allproducts();
    this.initForm();
  }
 

  @Output() annulerEvent = new EventEmitter<string>();
  @Output() sendtheSearch = new EventEmitter<any>();

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
      type : new FormControl(""),
  
      parametres: new FormGroup({
        pf: new FormControl(""),
        tempexterieure: new FormControl(""),
        eer: new FormControl(""),
        cop: new FormControl(""),
        pc : new FormControl(""),
        typegeg: new FormControl("" ),
        classenergitique: new FormControl(""),
        plotantivibration: new FormControl(""),
        certification: new FormControl(""),
        condensation: new FormControl("" ),

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
              hertz: new FormControl(""),
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
          pressionacoustique: new FormControl("")


      }),

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


  specialZinou : any = {}
  parametres : any = {}
   
  hydrauparam : any = {}
  pompeparam : any = {}
  tampparam : any = {}
  expansionparam : any = {}
 
  tensionparam : any = {}

  ok() {
       
    Object.keys(this.formGroup.controls).forEach(key => {
       
        if(this.formGroup.controls[key].value !== "" && this.formGroup.controls[key].value !== undefined && key !== "parametres" ){
         this.specialZinou[key] = this.formGroup.controls[key].value
        }
        //parametres
        else if(key === "parametres" ){
          Object.keys(this.formGroup.controls.parametres.value).forEach(cle => {
            if(this.formGroup.controls.parametres.value[cle] !== undefined && this.formGroup.controls.parametres.value[cle] !== ""
              && cle !== "tensionnominale" && cle !== "modulehydraulique"){
              this.parametres[cle]= this.formGroup.controls.parametres.value[cle]
              
            } 
 
            // electricité
              else if(cle === "tensionnominale"){

                      Object.keys(this.formGroup.controls.parametres.value.tensionnominale).forEach(cleelectens => {
                        if(this.formGroup.controls.parametres.value.tensionnominale[cleelectens]!== undefined && 
                          this.formGroup.controls.parametres.value.tensionnominale[cleelectens] !== ""){
                            this.tensionparam[cleelectens] = this.formGroup.controls.parametres.value.tensionnominale[cleelectens]
                          }
                      })
                }
            

            

            
            //module hydraulique
            else if(cle === "modulehydraulique"){
              Object.keys(this.formGroup.controls.parametres.value.modulehydraulique).forEach(clehydrau => {
                if(clehydrau === "pompe"){
                  Object.keys(this.formGroup.controls.parametres.value.modulehydraulique.pompe).forEach(clepompe => {
                    if(  this.formGroup.controls.parametres.value.modulehydraulique.pompe[clepompe] !== undefined
                      && this.formGroup.controls.parametres.value.modulehydraulique.pompe[clepompe] !== ""){
                        this.pompeparam[clepompe] = this.formGroup.controls.parametres.value.modulehydraulique.pompe[clepompe]
                      }
                  })
                }else if (clehydrau === "ballontampon"){
                  Object.keys(this.formGroup.controls.parametres.value.modulehydraulique.ballontampon).forEach(cleballon => {
                    if(  this.formGroup.controls.parametres.value.modulehydraulique.ballontampon[cleballon] !== undefined
                      && this.formGroup.controls.parametres.value.modulehydraulique.ballontampon[cleballon] !== ""){
                        this.tampparam[clehydrau] = this.formGroup.controls.parametres.value.modulehydraulique.ballontampon[cleballon]
                      }
                  })

                }else if(clehydrau === "vaseexpansion"){
                  Object.keys(this.formGroup.controls.parametres.value.modulehydraulique.vaseexpansion).forEach(clevase => {
                    if(  this.formGroup.controls.parametres.value.modulehydraulique.vaseexpansion[clevase] !== undefined
                      && this.formGroup.controls.parametres.value.modulehydraulique.vaseexpansion[clevase] !== ""){
                        this.expansionparam[clevase] = this.formGroup.controls.parametres.value.modulehydraulique.vaseexpansion[clevase]
                      }
                  })

                }else if(this.formGroup.controls.parametres.value.modulehydraulique[clehydrau] !== undefined && 
                  this.formGroup.controls.parametres.value.modulehydraulique[clehydrau] !== "" 
                  && clehydrau !== "pompe" && clehydrau!=="ballontampon" && clehydrau !=="vaseexpansion" ) {
                  this.hydrauparam[clehydrau] = this.formGroup.controls.parametres.value.modulehydraulique[clehydrau]
                
                   
                }
              })
            } 
          }) 
         }   
       });



       if(Object.keys(this.parametres).length !== 0){
        this.specialZinou.parametres = this.parametres;
       } else {
         this.specialZinou.parametres = {}
       }
       
       if(Object.keys(this.hydrauparam).length !== 0){

        this.specialZinou.parametres.modulehydraulique = this.hydrauparam;
        if(this.hydrauparam.avecmodulehydraulique === "non") {
          this.pompeparam = {}
          this.tampparam = {}
          this.expansionparam = {}
          this.formGroup.patchValue({
            "parametres" : {
              "modulehydraulique" : {
                "pompe" : {
                  "avecpompe": "",
                  "formepompe": "",
                  "typepompe": "",
                  "debitpompe": "",
                  "hmtpompe": ""
                },"ballontampon" : {
                  "avecballontampon": "",
                  "capaciteballontampon": ""
                },"vaseexpansion" : {
                  "avecvaseexpansion": "",
                  "capacitevaseexpansion": ""
                }
              },
               
              }
          })
        }
        
       }

       if(Object.keys(this.pompeparam).length !== 0  && Object.keys(this.hydrauparam).length !== 0){
        this.specialZinou.parametres.modulehydraulique.pompe = this.pompeparam;
         
       } else if (Object.keys(this.hydrauparam).length === 0 && Object.keys(this.pompeparam).length !== 0   ) {
        this.specialZinou.parametres.modulehydraulique = {};
        this.specialZinou.parametres.modulehydraulique.pompe = this.pompeparam;
       }

       if(Object.keys(this.tampparam).length !== 0 && Object.keys(this.hydrauparam).length !== 0){
        this.specialZinou.parametres.modulehydraulique.ballontampon = this.tampparam;
       } else if (Object.keys(this.hydrauparam).length === 0 && Object.keys(this.tampparam).length !== 0)  {
        this.specialZinou.parametres.modulehydraulique = {};
        this.specialZinou.parametres.modulehydraulique.ballontampon = this.tampparam;

       }

       if(Object.keys(this.expansionparam).length !== 0 && Object.keys(this.hydrauparam).length !== 0){
        this.specialZinou.parametres.modulehydraulique.vaseexpansion = this.expansionparam;
       } else if ( Object.keys(this.expansionparam).length !== 0 && Object.keys(this.hydrauparam).length === 0) {
        this.specialZinou.parametres.modulehydraulique = {};
        this.specialZinou.parametres.modulehydraulique.vaseexpansion = this.expansionparam;
       }

       if(Object.keys(this.tensionparam).length !== 0){
        this.specialZinou.parametres.tensionnominale = this.tensionparam;
       } 
      
  }
 
  tab1 : any = {}
  params : any = {}; 
  condensere : any = {};
  module : any = {};
  pompa : any = {}
  ballon : any = {}
  vase : any = {}
  electric : any = {}
  tension : any = {}
  SearchResults : any

  AdvancedSearch( ){
    this.ok()
    const thekeys = Object.keys(this.specialZinou);
    let theparams : string[] = [] 
    let modulehydraulique : string[] = []
    let pompe : string[] = []
    let ballontampon : string[] = []
    let vaseexpansion : string[] = []
    let tensionnominale : string[] = []
    
    
    if( thekeys.includes("parametres")){
       theparams = Object.keys(this.specialZinou.parametres);
       
      if( theparams.includes("modulehydraulique")){
        modulehydraulique = Object.keys(this.specialZinou.parametres.modulehydraulique) 
        if(modulehydraulique.includes("pompe")){
          pompe = Object.keys(this.specialZinou.parametres.modulehydraulique.pompe) 
        }
        if( modulehydraulique.includes("ballontampon")){
          ballontampon = Object.keys(this.specialZinou.parametres.modulehydraulique.ballontampon) 
        }
        if( modulehydraulique.includes("vaseexpansion")){
          vaseexpansion = Object.keys(this.specialZinou.parametres.modulehydraulique.vaseexpansion) 
        }
      }
      if( theparams.includes("tensionnominale")){
        tensionnominale = Object.keys(this.specialZinou.parametres.tensionnominale) 
      }
    }
    
    for(let elem of thekeys){
      if(elem !="parametres"){
        this.tab1[elem] = this.specialZinou[elem]
      } else{
        for(let elem of theparams){
            
           if ( elem == "modulehydraulique"){
            for(let elem of modulehydraulique){
              if ( elem == "pompe"){
                for(let elem of pompe){
                  this.pompa[elem] = this.specialZinou.parametres.modulehydraulique.pompe[elem]
                }
              } else if (elem == "ballontampon"){
                for(let elem of ballontampon){
                  this.ballon[elem] = this.specialZinou.parametres.modulehydraulique.ballontampon[elem]
                }
              } else if (elem == "vaseexpansion"){
                for(let elem of vaseexpansion){
                  this.vase[elem] = this.specialZinou.parametres.modulehydraulique.vaseexpansion[elem]
                }
              } else{
                this.module[elem] = this.specialZinou.parametres.modulehydraulique[elem]
              }
            }
          } else if (elem == "tensionnominale"){
                for(let elem of tensionnominale){
                  this.tension[elem] = this.specialZinou.parametres.tensionnominale[elem]
                }
              } 
            else {
            this.params[elem] = this.specialZinou.parametres[elem]
          }
        }
      }
    }

    var b : any[]=[];
    var c : any[]=[];
    var d : any[]=[];
    var e : any[]=[];
    var f : any[]=[];
    var g : any[]=[];
    var z1 : any;
    var z2 : any;
    var z3 : any;
    var z4 : any;
    var z5 : any;
    var z6 : any;
    

    var a = this.response.filter(data => {
      return Object.keys(this.tab1).every(propertyName =>  {
        if(typeof data[propertyName] === "number"){
          return data[propertyName] <= this.tab1[propertyName] + ( this.tab1[propertyName] * 10 / 100) 
          && data[propertyName] >= this.tab1[propertyName] - ( this.tab1[propertyName] * 10 / 100)
        }else {
          return data[propertyName] === this.tab1[propertyName]
        }
      }
        );
    }); 
   
    if(this.params){
       b = a.filter(data => {
        return Object.keys(this.params).every(propertyName => {
          if(typeof data.parametres[propertyName] === "number"){
            return data.parametres[propertyName] <= this.params[propertyName] + ( this.params[propertyName] * 10 / 100) 
            && data.parametres[propertyName] >= this.params[propertyName] - ( this.params[propertyName] * 10 / 100)
          }else {
           return data.parametres[propertyName] === this.params[propertyName]
          }
        }
          );
      });
      z1 =  a.filter((value: any) =>   b.includes(value));
      
    }
     
    if( this.module ){
      var c = b.filter(data => {
        return Object.keys(this.module).every(propertyName => 
              data.parametres.modulehydraulique[propertyName] === this.module[propertyName]
          );
      });
      z2 =  z1.filter((value: any) =>  c.includes(value));
    }

    if( this.pompa ){
      var d = c.filter(data => {
        return Object.keys(this.pompa).every(propertyName => {
          if(typeof data.parametres.modulehydraulique.pompe[propertyName] === "number"){
            return data.parametres.modulehydraulique.pompe[propertyName] <= this.pompa[propertyName] + ( this.pompa[propertyName] * 10 / 100) 
            && data.parametres.modulehydraulique.pompe[propertyName] >= this.pompa[propertyName] - ( this.pompa[propertyName] * 10 / 100)
          }else {
            return data.parametres.modulehydraulique.pompe[propertyName] === this.pompa[propertyName]
          }
        }
          );
      });
      z3 =  z2.filter((value: any) =>  d.includes(value));
    }
    if( this.ballon ){
      var e = d.filter(data => {
        return Object.keys(this.ballon).every(propertyName => {
          if(typeof data.parametres.modulehydraulique.ballontampon[propertyName] === "number"){
            return data.parametres.modulehydraulique.ballontampon[propertyName] <= this.ballon[propertyName] + ( this.ballon[propertyName] * 10 / 100) 
            && data.parametres.modulehydraulique.ballontampon[propertyName] >= this.ballon[propertyName] - ( this.ballon[propertyName] * 10 / 100)
          }else {
            return data.parametres.modulehydraulique.ballontampon[propertyName] === this.ballon[propertyName]
          }
        }
             
          );
      });
      z4 =  z3.filter((value: any) =>  e.includes(value));
    }
    if(this.vase){
      var f = e.filter(data => {
        return Object.keys(this.vase).every((propertyName) =>{

                if(typeof data.parametres.modulehydraulique.vaseexpansion[propertyName] === "number"){
                  return data.parametres.modulehydraulique.vaseexpansion[propertyName] <= this.vase[propertyName] + ( this.vase[propertyName] * 10 / 100) 
                  && data.parametres.modulehydraulique.vaseexpansion[propertyName] >= this.vase[propertyName] - ( this.vase[propertyName] * 10 / 100)
                }else {
                  return data.parametres.modulehydraulique.vaseexpansion[propertyName] === this.vase[propertyName]
                }
               
                }); 
      });
      
      z5 =  z4.filter((value: any) =>  f.includes(value));
    }
    
    if( this.tension ){
      var g = f.filter(data => {
        return Object.keys(this.tension).every(propertyName => {
          if(typeof data.parametres.tensionnominale[propertyName] === "number"){
            return data.parametres.tensionnominale[propertyName] <= this.tension[propertyName] + ( this.tension[propertyName] * 10 / 100) 
            && data.parametres.tensionnominale[propertyName] >= this.tension[propertyName] - ( this.tension[propertyName] * 10 / 100)
          }else {
            return data.parametres.tensionnominale[propertyName] === this.tension[propertyName]
          }
        }
          );
      }); 
      z6 =  z5.filter((value: any) =>  g.includes(value));
    }
    
    if(z6){
      this.vars.searchResults = z6
    }else if(z5){
      this.vars.searchResults = z5
    }else if(z4 ){
      this.vars.searchResults = z4
    }else if(z3 ){
      this.vars.searchResults = z3
    }else if(z2){
      this.vars.searchResults = z2
    }else if(z1 ){
      this.vars.searchResults = z1
    }

    this.sendtheSearch.emit(this.vars.searchResults)
  }

  response : any[] = [];

  public allproducts(){
    const headers = new HttpHeaders().set("Authorization" , this.token);
    return this.http.get(this.vars.urlAddress + ":8082/products/index/GEG",{headers,responseType:'json' as 'json'})
    .subscribe((data : any)=>{
      for(let result of data){
            this.response.push(result);
      }
    })
    }



}