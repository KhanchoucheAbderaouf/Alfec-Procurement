import { BrowserModule } from '@angular/platform-browser';
import { LOCALE_ID, NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './auth/login/login.component';
import { IndexComponent } from './procurement/products/index/index.component';
import { CreateComponent } from './procurement/products/create/create.component';
import { ProcurementComponent } from './admin/services/procurement/procurement.component';
import { FooterComponent } from './utilities/footer/footer.component';
import { EstimationComponent } from './admin/services/estimation/estimation.component';
import { JwtModule } from '@auth0/angular-jwt';
import { HttpClientModule } from '@angular/common/http';
import { MatSliderModule } from '@angular/material/slider';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { BrowserAnimationsModule,NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule, MAT_RADIO_DEFAULT_OPTIONS } from '@angular/material/radio';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTreeModule } from '@angular/material/tree';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { NavComponent } from './utilities/nav/nav.component';
import { DashboardComponent } from './utilities/dashboard/dashboard.component';
import { FormComponent } from './utilities/form/form.component';
import { TableComponent } from './utilities/table/table.component';
import { TreeComponent } from './utilities/tree/tree.component';
import { DragdropComponent } from './utilities/dragdrop/dragdrop.component';
import { HeaderComponent } from './utilities/header/header.component';
import {MatDialogModule} from '@angular/material/dialog';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { ConfirmationdialogComponent } from './utilities/confirmationdialog/confirmationdialog.component';
import {MatChipsModule} from '@angular/material/chips';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import {MatStepperModule} from '@angular/material/stepper';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { SearchComponent } from './procurement/products/search/search.component';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { SpinnerComponent } from './utilities/spinner/spinner.component';
import {MatExpansionModule} from '@angular/material/expansion';
import { FournisseurCreateComponent } from './procurement/fournisseur/fournisseur-create/fournisseur-create.component';
import { FournisseurIndexComponent } from './procurement/fournisseur/fournisseur-index/fournisseur-index.component';
import { FournisseuralldialogComponent } from './procurement/fournisseur/fournisseuralldialog/fournisseuralldialog.component';
import { FournisseurdetailsdialogComponent } from './procurement/fournisseur/fournisseurdetailsdialog/fournisseurdetailsdialog.component';
import { DialogueComponent } from './procurement/products/geg/dialogue/dialogue.component';
import { GegComponent } from './procurement/products/geg/geg.component';
import { GegindexComponent } from './procurement/products/geg/gegindex/gegindex.component';
import { SearchgegComponent } from './procurement/products/geg/searchgeg/searchgeg.component';
import { AdminsidenavComponent } from './admin/adminsidenav/adminsidenav.component';
import { AdmindashboardComponent } from './admin/services/admindashboard/admindashboard.component';
import { AdminnavComponent } from './admin/adminnav/adminnav.component';
import { FournisseursComponent } from './admin/services/procurement/fournisseurs/fournisseurs.component';
import { ZoneComponent } from './admin/services/procurement/zone/zone.component';
import { DialogPricesComponent } from './admin/services/procurement/dialog-prices/dialog-prices.component';
import { UtilisateursComponent } from './admin/utilisateurs/utilisateurs.component';
import { AdminParametresComponent } from './admin/admin-parametres/admin-parametres.component';
import { DialogtauxchangeComponent } from './admin/dialogtauxchange/dialogtauxchange.component';
import { CreateUserComponent } from './admin/utilisateurs/create-user/create-user.component';
import { DialogconfirmsuppuserComponent } from './admin/dialogconfirmsuppuser/dialogconfirmsuppuser.component';
import { ModifyUserComponent } from './admin/utilisateurs/modify-user/modify-user.component';
import {MatTabsModule} from '@angular/material/tabs';
import { DialogpriceshistoryComponent } from './admin/services/procurement/dialogpriceshistory/dialogpriceshistory.component';
import { CtaindexComponent } from './procurement/products/cta/ctaindex/ctaindex.component';
import { CtacreateComponent } from './procurement/products/cta/ctacreate/ctacreate.component';
import { CtasearchComponent } from './procurement/products/cta/ctasearch/ctasearch.component';
import { CtadialogComponent } from './procurement/products/cta/ctadialog/ctadialog.component';
import { VccreateComponent } from './procurement/products/vc/vccreate/vccreate.component';
import { VcindexComponent } from './procurement/products/vc/vcindex/vcindex.component';
import { VcdialogComponent } from './procurement/products/vc/vcdialog/vcdialog.component';
import { VcsearchComponent } from './procurement/products/vc/vcsearch/vcsearch.component';
import { ApcreateComponent } from './procurement/products/armoireprecision/apcreate/apcreate.component';
import { ApindexComponent } from './procurement/products/armoireprecision/apindex/apindex.component';
import { ApsearchComponent } from './procurement/products/armoireprecision/apsearch/apsearch.component';
import { ApdialogComponent } from './procurement/products/armoireprecision/apdialog/apdialog.component';
import { ApsearchresultsComponent } from './procurement/products/armoireprecision/apsearchresults/apsearchresults.component';
import { VcsearchresultsComponent } from './procurement/products/vc/vcsearchresults/vcsearchresults.component';
import { GegsearchresultsComponent } from './procurement/products/geg/gegsearchresults/gegsearchresults.component';
import { CtasearchresultsComponent } from './procurement/products/cta/ctasearchresults/ctasearchresults.component';
import { GfcreateComponent } from './procurement/products/groupefrigo/gfcreate/gfcreate.component';
import { GfindexComponent } from './procurement/products/groupefrigo/gfindex/gfindex.component';
import { GfdialogComponent } from './procurement/products/groupefrigo/gfdialog/gfdialog.component';
import { GfsearchComponent } from './procurement/products/groupefrigo/gfsearch/gfsearch.component';
import { GfsearchresultsComponent } from './procurement/products/groupefrigo/gfsearchresults/gfsearchresults.component';
import { ChdsearchresultsComponent } from './procurement/products/chaudiere/chdsearchresults/chdsearchresults.component';
import { ChdsearchComponent } from './procurement/products/chaudiere/chdsearch/chdsearch.component';
import { ChddialogComponent } from './procurement/products/chaudiere/chddialog/chddialog.component';
import { ChdindexComponent } from './procurement/products/chaudiere/chdindex/chdindex.component';
import { ChdcreateComponent } from './procurement/products/chaudiere/chdcreate/chdcreate.component';
import { RtcreateComponent } from './procurement/products/rooftop/rtcreate/rtcreate.component';
import { RtindexComponent } from './procurement/products/rooftop/rtindex/rtindex.component';
import { RtdialogComponent } from './procurement/products/rooftop/rtdialog/rtdialog.component';
import { RtsearchComponent } from './procurement/products/rooftop/rtsearch/rtsearch.component';
import { RtsearchresultsComponent } from './procurement/products/rooftop/rtsearchresults/rtsearchresults.component';
import { PompesearchresultsComponent } from './procurement/products/pompe/pompesearchresults/pompesearchresults.component';
import { PompesearchComponent } from './procurement/products/pompe/pompesearch/pompesearch.component';
import { PompeindexComponent } from './procurement/products/pompe/pompeindex/pompeindex.component';
import { PompedialogComponent } from './procurement/products/pompe/pompedialog/pompedialog.component';
import { PompecreateComponent } from './procurement/products/pompe/pompecreate/pompecreate.component';
import { EvapcreateComponent } from './procurement/products/evaporateur/evapcreate/evapcreate.component';
import { EvapindexComponent } from './procurement/products/evaporateur/evapindex/evapindex.component';
import { EvapdialogComponent } from './procurement/products/evaporateur/evapdialog/evapdialog.component';
import { EvapsearchComponent } from './procurement/products/evaporateur/evapsearch/evapsearch.component';
import { EvapsearchresultsComponent } from './procurement/products/evaporateur/evapsearchresults/evapsearchresults.component';
import {MatTooltipModule} from '@angular/material/tooltip';
import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
import { PhonePipe } from './utilities/pipes/phone.pipe';
import {Ng2TelInputModule} from 'ng2-tel-input';
import { ProductTrashComponent } from './procurement/trash/product-trash/product-trash.component';
import { FournisseurTrashComponent } from './procurement/trash/fournisseur-trash/fournisseur-trash.component';
import { EstimationNavComponent } from './estimation/estimation-nav/estimation-nav.component';
import { EstimationPricesComponent } from './estimation/prices/estimation-prices/estimation-prices.component';

registerLocaleData(localeFr, 'fr');
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    IndexComponent,
    CreateComponent,
    DashboardComponent,
    ProcurementComponent,
    FooterComponent,
    EstimationComponent,
    FormComponent,
    TableComponent,
    TreeComponent,
    DragdropComponent,
    NavComponent,
    HeaderComponent,
    GegComponent,
    DialogueComponent,
    GegindexComponent,
    ConfirmationdialogComponent,
    FournisseurCreateComponent,
    FournisseurIndexComponent,
    FournisseurdetailsdialogComponent,
    FournisseuralldialogComponent,
    SearchComponent,
    SpinnerComponent,
    SearchgegComponent,
    AdminsidenavComponent,
    AdmindashboardComponent,
    AdminnavComponent,
    FournisseursComponent,
    ZoneComponent,
    DialogPricesComponent,
    UtilisateursComponent,
    AdminParametresComponent,
    DialogtauxchangeComponent,
    CreateUserComponent,
    DialogconfirmsuppuserComponent,
    ModifyUserComponent,
    DialogpriceshistoryComponent,
    CtaindexComponent,
    CtacreateComponent,
    CtasearchComponent,
    CtadialogComponent,
    VccreateComponent,
    VcindexComponent,
    VcdialogComponent,
    VcsearchComponent,
    ApcreateComponent,
    ApindexComponent,
    ApsearchComponent,
    ApdialogComponent,
    ApsearchresultsComponent,
    VcsearchresultsComponent,
    GegsearchresultsComponent,
    CtasearchresultsComponent,
    GfcreateComponent,
    GfindexComponent,
    GfdialogComponent,
    GfsearchComponent,
    GfsearchresultsComponent,
    ChdsearchresultsComponent,
    ChdsearchComponent,
    ChddialogComponent,
    ChdindexComponent,
    ChdcreateComponent,
    RtcreateComponent,
    RtindexComponent,
    RtdialogComponent,
    RtsearchComponent,
    RtsearchresultsComponent,
    PompesearchresultsComponent,
    PompesearchComponent,
    PompeindexComponent,
    PompedialogComponent,
    PompecreateComponent,
    EvapcreateComponent,
    EvapindexComponent,
    EvapdialogComponent,
    EvapsearchComponent,
    EvapsearchresultsComponent,
    PhonePipe,
    ProductTrashComponent,
    FournisseurTrashComponent,
    EstimationNavComponent,
    EstimationPricesComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: function  tokenGetter() {
            return     localStorage.getItem('access_token');
          },
            allowedDomains: ['http://localhost:4200','http://localhost:8082'],
            disallowedRoutes: []
      }
    }),
    MatSliderModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    NoopAnimationsModule,
    BrowserAnimationsModule,
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
    MatInputModule,
    MatSelectModule,
    MatRadioModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatTreeModule,
    DragDropModule,
    MatDialogModule,
    MatSnackBarModule,
    MatChipsModule,
    MatAutocompleteModule,
    NgxMatSelectSearchModule,
    MatStepperModule,
    MatProgressSpinnerModule,
    MatExpansionModule,
    MatTabsModule,
    MatTooltipModule,
    Ng2TelInputModule
  ],
  providers: [
    {
    provide: MAT_RADIO_DEFAULT_OPTIONS, useValue: { color: 'primary' },
    },
    { 
      provide: STEPPER_GLOBAL_OPTIONS, useValue: {showError: true},
    },
    {
      provide: LOCALE_ID, useValue: 'fr'
    }
],
  bootstrap: [AppComponent]
})
export class AppModule { }
