import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminParametresComponent } from './admin/admin-parametres/admin-parametres.component';
import { AdmindashboardComponent } from './admin/services/admindashboard/admindashboard.component';
import { EstimationComponent } from './admin/services/estimation/estimation.component';
import { FournisseursComponent } from './admin/services/procurement/fournisseurs/fournisseurs.component';
import { ProcurementComponent } from './admin/services/procurement/procurement.component';
import { ZoneComponent } from './admin/services/procurement/zone/zone.component';
import { UsersTrashComponent } from './admin/trash/users-trash/users-trash.component';
import { CreateUserComponent } from './admin/utilisateurs/create-user/create-user.component';
import { UtilisateursComponent } from './admin/utilisateurs/utilisateurs.component';
import { LoginComponent } from './auth/login/login.component';
import { EstimationPricesComponent } from './estimation/prices/estimation-prices/estimation-prices.component';
import { EstimationsearchComponent } from './estimation/search/estimationsearch/estimationsearch.component';
import { FournisseurCreateComponent } from './procurement/fournisseur/fournisseur-create/fournisseur-create.component';
import { FournisseurIndexComponent } from './procurement/fournisseur/fournisseur-index/fournisseur-index.component';
 
import { CreateComponent } from './procurement/products/create/create.component';
import { IndexComponent } from './procurement/products/index/index.component';
import { SearchComponent } from './procurement/products/search/search.component';
import { FournisseurTrashComponent } from './procurement/trash/fournisseur-trash/fournisseur-trash.component';
import { ProductTrashComponent } from './procurement/trash/product-trash/product-trash.component';
import { AuthGuardService } from './security/guard/auth-guard.service';
 
import { DashboardComponent } from './utilities/dashboard/dashboard.component';
import { SpinnerComponent } from './utilities/spinner/spinner.component';
 

const routes: Routes = [ 
  {
    path: '',
    component: SpinnerComponent,
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'admin/dashboard',
    component: AdmindashboardComponent,
    canActivate: [AuthGuardService],
    data: { roles: ["admin"] }
  },
  {
    path: 'admin/procurement/produits',
    component: ProcurementComponent,
    canActivate: [AuthGuardService],
    data: { roles: ["admin"] }
  },
  {
    path: 'admin/users/trash',
    component: UsersTrashComponent,
    canActivate: [AuthGuardService],
    data: { roles: ["admin"] }
  },
  /*{
    path: 'admin/procurement/zones',
    component: ZoneComponent,
    canActivate: [AuthGuardService],
    data: { roles: ["admin"] }
  },*/
  {
    path: 'admin/users/index',
    component: UtilisateursComponent,
    canActivate: [AuthGuardService],
    data: { roles: ["admin"] }
  },
  {
    path: 'admin/users/create',
    component: CreateUserComponent,
    canActivate: [AuthGuardService],
    data: { roles: ["admin"] }
  },
  {
    path: 'admin/settings',
    component: AdminParametresComponent,
    canActivate: [AuthGuardService],
    data: { roles: ["admin"] }
  },
  {
    path: 'admin/estimation/zones',
    component: ZoneComponent,
    canActivate: [AuthGuardService],
    data: { roles: ["admin"] }
  },
  {
    path: 'admin/procurement/fournisseurs',
    component: FournisseursComponent,
    canActivate: [AuthGuardService],
    data: { roles: ["admin"] }
  },
  {
    path: 'procurement/produits/index',
    component: IndexComponent,
    canActivate: [AuthGuardService],
    data: { roles: ["procurement"] }
  },
  {
    path: 'procurement/produits/create',
    component: CreateComponent,
    canActivate: [AuthGuardService],
    data: { roles: ["procurement"] }
  },
  {
    path: 'procurement/produits/search',
    component: SearchComponent,
    canActivate: [AuthGuardService],
    data: { roles: ["procurement"] }
  },
  {
    path: 'procurement/fournisseurs/index',
    component: FournisseurIndexComponent,
    canActivate: [AuthGuardService],
    data: { roles: ["procurement"] }
  },
  {
    path: 'procurement/fournisseurs/create',
    component: FournisseurCreateComponent,
    canActivate: [AuthGuardService],
    data: { roles: ["procurement"] }
  },  
  {
    path: 'procurement/fournisseurs/create',
    component: FournisseurCreateComponent,
    canActivate: [AuthGuardService],
    data: { roles: ["procurement"] }
  },
  {
    path: 'procurement/produits/trash',
    component: ProductTrashComponent,
    canActivate: [AuthGuardService],
    data: { roles: ["procurement"] }
  },
  {
    path: 'procurement/fournisseurs/trash',
    component: FournisseurTrashComponent,
    canActivate: [AuthGuardService],
    data: { roles: ["procurement"] }
  },
  {
    path: 'estimation/prix/index',
    component: EstimationPricesComponent,
    canActivate: [AuthGuardService],
    data: { roles: ["estimation"] }
  },
  {
    path: 'estimation/search',
    component: EstimationsearchComponent,
    canActivate: [AuthGuardService],
    data: { roles: ["estimation"] }
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
