import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSelect } from '@angular/material/select';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { ReplaySubject, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { GlobalsService } from 'src/app/utilities/globalvars/globals.service';
import { ApdialogComponent } from '../armoireprecision/apdialog/apdialog.component';
import { CtadialogComponent } from '../cta/ctadialog/ctadialog.component';
import { DialogueComponent } from '../geg/dialogue/dialogue.component';
import { VcdialogComponent } from '../vc/vcdialog/vcdialog.component';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements  OnInit {

  formProduit: FormGroup;
  categories : string[] = [ "GEG", "CTA","Ventilo Convecteur","Armoire de précision","Groupe Frigorifique","Chaudière","Roof Top","Pompe","Evaporateur"];
  categor : string = "";
  showResults : boolean = false;
  constructor(public dialog: MatDialog,private vars : GlobalsService,private route:Router,private http:HttpClient,private titleService : Title) {
    

   }
   showagain(){
     this.showResults = false;
   }

  ngOnInit(): void {
    this.initForm();
    this.vars.spanValue = "Recherche Avancée"
    this.titleService.setTitle("Recherche Avancée");

    // set initial selection
    this.controleCategorie.setValue(this.categories);

    // load the initial category list
    this.CategoriesFiltrer.next(this.categories.slice());

    // listen for search field value changes
    this.FiltreCategorie.valueChanges
      .pipe(takeUntil(this._onDestroy))
      .subscribe(() => {
        this.filterCategories();
      });
   
    
  }
   
  initForm(){
    this.formProduit = new FormGroup({
      categorie :  new FormControl("",[Validators.required]),

    })
  }

  catego(){
    //this.categor = this.formProduit.value.categorie;
    this.categor = this.controleCategorie.value;

  }

  
  annulerCatego($event: string){
    this.formProduit.patchValue({'categorie' : ''});
    this.controleCategorie.setValue($event);
    this.categor = $event;
  }

  sendtheSearch($event: any){
    this.showResults = true;
  }
 

  /** control for the selected category */
  public controleCategorie: FormControl = new FormControl();

  /** control for the MatSelect filter keyword */
  public FiltreCategorie: FormControl = new FormControl();

  /** list of categories filtered by search keyword */
  public CategoriesFiltrer: ReplaySubject<string[]> = new ReplaySubject<string[]>(1);


  @ViewChild('singleSelect', { static: true }) singleSelect: MatSelect;
  
  protected filterCategories() {
    if (!this.categories) {
      return;
    }
    // get the search keyword
    let search = this.FiltreCategorie.value;
    if (!search) {
      this.CategoriesFiltrer.next(this.categories.slice());
      return;
    } else {
      search = search.toLowerCase();
    }
    // filter the categories
    this.CategoriesFiltrer.next(
      this.categories.filter(category => category.toLowerCase().indexOf(search) > -1)
    );
  }

  /** Subject that emits when the component has been destroyed. */
  protected _onDestroy = new Subject<void>();

}
