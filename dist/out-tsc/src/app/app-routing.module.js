import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { ForgotPasswordComponent } from './auth/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './auth/reset-password/reset-password.component';
import { RegisterComponent } from './auth/register/register.component';
import { LogoutComponent } from './auth/logout/logout.component';
import { ValidateEmailComponent } from './auth/validate-email/validate-email.component';
import { ConfirmEmailComponent } from './auth/confirm-email/confirm-email.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { DeliveriesComponent } from './pages/deliveries/deliveries.component';
import { DashboardAdminComponent } from './pages/dashboard-admin/dashboard-admin.component';
// Admin
import { LockersComponent } from './pages/lockers/lockers.component';
import { PackageComponent } from './pages/package/package.component';
import { CamerasComponent } from './pages/cameras/cameras.component';
import { CameraComponent } from './pages/camera/camera.component';
import { DashboardLocatarioComponent } from './pages/dashboard-locatario/dashboard-locatario.component';
import { PaymentsComponent } from './pages/payments/payments.component';
import { LockerDetailComponent } from './pages/locker-detail/locker-detail.component';
// Clients
import { OrderClientComponent } from './pages/clients/order-client/order-client.component';
import { DashboardClientComponent } from './pages/clients/dashboard-client/dashboard-client.component';
import { LockerClientDetailComponent } from './pages/clients/locker-client-detail/locker-client-detail.component';
import { ClientUserComponent } from './pages/clients/client-user/client-user.component';
import { CreateUserComponent } from './pages/clients/create-user/create-user.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { UserComponent } from './pages/user/user.component';
import { LockerCreateComponent } from './pages/locker-create/locker-create.component';
import { CompaniesComponent } from './pages/companies/companies.component';
import { CompaniesCreateComponent } from './pages/companies-create/companies-create.component';
import { NotificationsComponent } from './pages/notifications/notifications.component';
import { ConsumerPayComponent } from './pages/consumer-pay/consumer-pay.component';
import { PayBalanceComponent } from './pages/pay-balance/pay-balance.component';
import { VendingComponent } from './pages/clients/vending/vending.component';
import { ClientProfileComponent } from './pages/clients/client-profile/client-profile.component';
const routes = [
    { path: '', pathMatch: 'full', redirectTo: '/login' },
    { path: 'login', component: LoginComponent },
    { path: 'login/confirmEmail/:code', component: ConfirmEmailComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'forgot-password', component: ForgotPasswordComponent },
    { path: 'reset-password', component: ResetPasswordComponent },
    { path: 'dashboard', component: DashboardComponent },
    { path: 'notifications', component: NotificationsComponent },
    { path: 'dashboard/deliveries', component: DeliveriesComponent },
    { path: 'pay', component: ConsumerPayComponent },
    { path: 'pay-balance', component: PayBalanceComponent },
    { path: 'l-ad/profile', component: ProfileComponent },
    { path: 'perfil/sign-off', component: LogoutComponent },
    { path: 'dashboard/profile', component: ProfileComponent },
    { path: 'validate-email', component: ValidateEmailComponent },
    { path: 'd-ad/payments', component: PaymentsComponent },
    { path: 'l-retail/locker', component: DashboardClientComponent },
    { path: 'l-retail/locker/:id', component: LockerClientDetailComponent },
    { path: 'l-retail/order', component: OrderClientComponent },
    { path: 'l-retail/vending', component: VendingComponent },
    { path: 'l-retail/user', component: ClientUserComponent },
    { path: 'l-retail/perfil/profile', component: ClientProfileComponent },
    { path: 'l-retail/user/create', component: CreateUserComponent },
    { path: 'l-retail/user/:id/edit', component: CreateUserComponent },
    { path: 'l-retail/perfil/sign-off', component: LogoutComponent },
    { path: 'l-ad', component: DashboardLocatarioComponent },
    { path: 'l-ad/locker', component: LockersComponent },
    { path: 'l-ad/locker/:id', component: LockerDetailComponent },
    { path: 'l-ad/locker/:id/cameras', component: CamerasComponent },
    { path: 'l-ad/locker/:id/cameras/:camera', component: CameraComponent },
    { path: 'l-ad/package', component: PackageComponent },
    { path: 'l-ad/package/:id', component: LockerDetailComponent },
    { path: 'l-ad/payments', component: PaymentsComponent },
    { path: 'd-ad', component: DashboardAdminComponent },
    { path: 'd-ad/user', component: UserComponent },
    { path: 'd-ad/locker', component: LockersComponent },
    { path: 'd-ad/locker/create', component: LockerCreateComponent },
    { path: 'd-ad/locker/:id', component: LockerDetailComponent },
    { path: 'd-ad/package', component: PackageComponent },
    { path: 'd-ad/companies', component: CompaniesComponent },
    { path: 'd-ad/companies/create', component: CompaniesCreateComponent },
    { path: '**', pathMatch: 'full', redirectTo: '/login' }
];
let AppRoutingModule = class AppRoutingModule {
};
AppRoutingModule = __decorate([
    NgModule({
        imports: [RouterModule.forRoot(routes)],
        exports: [RouterModule],
        declarations: [],
    })
], AppRoutingModule);
export { AppRoutingModule };
//# sourceMappingURL=app-routing.module.js.map