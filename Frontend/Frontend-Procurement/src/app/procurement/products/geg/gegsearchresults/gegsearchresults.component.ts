import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { GlobalsService } from 'src/app/utilities/globalvars/globals.service';
import { DialogueComponent } from '../dialogue/dialogue.component';

@Component({
  selector: 'app-gegsearchresults',
  templateUrl: './gegsearchresults.component.html',
  styleUrls: ['./gegsearchresults.component.css']
})
export class GegsearchresultsComponent implements OnInit { 
  Modif : string;
  Supp : string;
  EstimationUser : any = JSON.parse(localStorage.getItem("currentUser") || "{}").role;
  constructor(public dialog: MatDialog,private vars : GlobalsService) { }

  ngOnInit(): void {
   
  }
  displayedColumns = this.EstimationUser === "estimation" ?
  ['CodeGEG', 'FournisseurGEG', 'MarqueGEG','TypeGEG', 'PuissanceFGEG','PuissanceCGEG','PrixGEG','DetailsGEG','Add'] :
  ['CodeGEG', 'FournisseurGEG', 'MarqueGEG','TypeGEG', 'PuissanceFGEG','PuissanceCGEG','PrixGEG','DetailsGEG'] 
 
  datasource = this.vars.searchResults;

  openDialog(data:any) {
  
    const dialogRef = this.dialog.open(DialogueComponent,{
      width: '70%',
      height: 'auto',
      data: {
        result : data
      }
    });

    //gonna need this to do a bihaviour for the after showing details like sending the product to cart for the commande thing
    dialogRef.afterClosed().subscribe(result => {
      if(result == "Modifier") {
        
      this.Modif = "Modifier avec success"
      setTimeout(() => {
      this.Modif = ""
       }, 5000)
      } 
      else if(result == "Supprimer") {
        this.Supp = "Le Produit a été supprimer avec success"
        setTimeout(() => {
        this.Supp = ""
         }, 5000)
        }      
    });
  }

  
  Message : any = ""
  AddToProducts(row : any){
    if(!this.vars.EstimationProducts.includes(row.codep)){
      this.vars.EstimationProducts.push(row.codep)
    }else{
      this.Message = "Le produit est déja ajouter"
      setTimeout(() => {
        this.Message = ""
         }, 5000)
      }  
  }
}
