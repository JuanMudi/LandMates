import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { SignUpComponent } from './components/signup/signup.component';
import { inject } from '@angular/core';
import { AuthGuard } from './services/authGuard/guard.service';
import { NewPropertyComponent } from './components/lessor/new-property/new-property.component';
import { HomepageComponent } from './components/utilities/homepage/homepage.component';
import { ListPropertiesComponent } from './components/tenant/properties/list-properties/list-properties.component';
import { FindPropertyComponent } from './components/tenant/properties/find-property/find-property.component';
import { SeePropertyComponent } from './components/tenant/properties/see-property/see-property.component';
import { RentComponent } from './components/tenant/properties/rent/rent.component';
import { MyRequestComponent } from './components/request/my-request/my-request.component';
import { CheckoutComponent } from './components/checkout/checkout/checkout.component';
import { RankingComponent } from './components/rank/ranking/ranking.component';
import { VerifyComponent } from './components/signup/verify/verify/verify.component';
import { PropertyDetailsComponent } from './components/property-details/property-details.component';
import { EditPropertyComponent } from './components/edit-property/edit-property.component';
import { TeamComponent } from './components/team/team.component';

export const routes: Routes = [
    {path: '', redirectTo: '/homepage', pathMatch: 'full'},
    {path: 'login', component: LoginComponent},
    {path: 'sign-up', component: SignUpComponent},
    {path: 'newProperty', component: NewPropertyComponent, canActivate: [() => inject(AuthGuard).canActivate()]},
    {path: 'homepage' , component: HomepageComponent},
    {path: 'properties', component: ListPropertiesComponent, canActivate: [() => inject(AuthGuard).canActivate()]},
    {path: 'property-finder', component: FindPropertyComponent, canActivate: [() => inject(AuthGuard).canActivate()]},
    {path: 'see-property', component: SeePropertyComponent, canActivate: [() => inject(AuthGuard).canActivate()]},
    {path: 'rent', component: RentComponent, canActivate: [() => inject(AuthGuard).canActivate()]},
    {path: 'bookings', component: MyRequestComponent, canActivate: [() => inject(AuthGuard).canActivate()]},
    {path: 'checkout', component: CheckoutComponent, canActivate: [() => inject(AuthGuard).canActivate()]},
    {path: 'ranking', component: RankingComponent, canActivate: [() => inject(AuthGuard).canActivate()]},
    {path: 'verify', component: VerifyComponent},
    {path: 'property-details', component: PropertyDetailsComponent, canActivate: [() => inject(AuthGuard).canActivate()]},
    {path: 'edit-property', component: EditPropertyComponent, canActivate: [() => inject(AuthGuard).canActivate()]},
    {path: 'team', component: TeamComponent}

    

];
