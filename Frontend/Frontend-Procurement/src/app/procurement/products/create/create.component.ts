import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSelect } from '@angular/material/select';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { ReplaySubject, Subject } from 'rxjs';
import { takeUntil, take } from 'rxjs/operators';
import { GlobalsService } from 'src/app/utilities/globalvars/globals.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  formProduit: FormGroup;
  categories : string[] = [ "GEG", "CTA","Ventilo Convecteur","Armoire de précision","Groupe frigorifique","Chaudière","Roof Top","Pompe","Evaporateur"];
  categor : string = "";

  constructor(private vars : GlobalsService,private route:Router,private http:HttpClient,private titleService : Title) { }

  ngOnInit(): void {
    this.initForm();
    this.vars.spanValue = "Ajouter Produit"
    this.titleService.setTitle("Ajouter Produit");

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

 /* ngAfterViewInit() {
   // this.setInitialValue();
  }

  ngOnDestroy() {
    this._onDestroy.next();
    this._onDestroy.complete();
  }

  /**
   * Sets the initial value after the CategoriesFiltrer are loaded initially
   */
  /*protected setInitialValue() {
    this.CategoriesFiltrer
      .pipe(take(1), takeUntil(this._onDestroy))
      .subscribe(() => {
        // setting the compareWith property to a comparison function
        // triggers initializing the selection according to the initial value of
        // the form control 
        // this needs to be done after the FiltreCategorie are loaded initially
        // and after the mat-option elements are available
        this.singleSelect.compareWith = (a: string, b: string) =>  a === b;
      });
  }*/

  

}
