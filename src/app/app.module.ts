import { environment } from "../environments/environment"
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { ForgotPasswordComponent } from './auth/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './auth/reset-password/reset-password.component';

import { HeaderComponent } from './components/header/header.component';
import { HeaderClientComponent } from './components/client/header-client/header-client.component';
import { FooterComponent } from './components/footer/footer.component';
import { NotificationComponent } from './components/notification/notification.component';

import {
  DashboardComponent,
  DialogContentAddAddress,
  DialogContentDeleteAddress
} from './pages/dashboard/dashboard.component';
import { DeliveriesComponent } from './pages/deliveries/deliveries.component';

import { DashboardAdminComponent } from './pages/dashboard-admin/dashboard-admin.component';
import { LockersComponent } from './pages/lockers/lockers.component';
import { PackageComponent } from './pages/package/package.component';

// Client
import { OrderClientComponent } from './pages/clients/order-client/order-client.component';
import { DashboardClientComponent } from './pages/clients/dashboard-client/dashboard-client.component';

import { RecaptchaModule } from 'ng-recaptcha';

// import ngx-translate and the http loader
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient, HttpClientModule } from '@angular/common/http';

import { ServerUserService } from './services/server-user.service';

import { HighchartsChartModule } from 'highcharts-angular';
import { MatTableExporterModule } from 'mat-table-exporter';

import { AgmCoreModule } from '@agm/core';
import { ChartPaquetesComponent } from './components/chart-paquetes/chart-paquetes.component';
import { ChartEntregasComponent } from './components/chart-entregas/chart-entregas.component';
import { GoogleMapsComponent } from './components/google-maps/google-maps.component';
import { CamerasComponent } from './pages/cameras/cameras.component';
import { CameraComponent } from './pages/camera/camera.component';
import { Page404Component } from './pages/page404/page404.component';

import { LockerDetailComponent } from './pages/locker-detail/locker-detail.component';
import { LockerClientDetailComponent } from './pages/clients/locker-client-detail/locker-client-detail.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { TableComponent, DialogContentSignature, DialogContentCode, DialogContentDelete, DialogContentCreate, DialogContentLogs } from './components/table/table.component';
import { LogoutComponent } from './auth/logout/logout.component';
import { ValidateEmailComponent } from './auth/validate-email/validate-email.component';
import { ConfirmEmailComponent } from './auth/confirm-email/confirm-email.component';
import { DashboardLocatarioComponent } from './pages/dashboard-locatario/dashboard-locatario.component';
import { LockersMapComponent } from './components/lockers-map/lockers-map.component';
import { UserComponent } from './pages/user/user.component';
import { LockerCreateComponent } from './pages/locker-create/locker-create.component';
import { LockersGridComponent } from './components/lockers-grid/lockers-grid.component';
import { CompaniesComponent } from './pages/companies/companies.component';
import { CompaniesCreateComponent } from './pages/companies-create/companies-create.component';
import { PaymentsComponent } from './pages/payments/payments.component';
import { DragDropDirective } from './pages/locker-create/drag-drop.directive';
import { NotificationsComponent } from './pages/notifications/notifications.component';
import { ConsumerPayComponent } from './pages/consumer-pay/consumer-pay.component';
import { ChartSplineComponent } from './components/chart-spline/chart-spline.component';
import { ChartClientComponent } from './components/client/chart-client/chart-client.component';
import { StripeModule } from "stripe-angular";
import { PayBalanceComponent } from './pages/pay-balance/pay-balance.component';
import { PaymentCardsComponent } from './components/payment-cards/payment-cards.component';
import { MsgComponent } from './components/msg/msg.component';
import { DashboardTableComponent } from './components/client/dashboard-table/dashboard-table.component';
import { OrdersTableComponent } from './components/client/orders-table/orders-table.component';
import { ClientFooterComponent } from './components/client/client-footer/client-footer.component';
import { LockersClientGridComponent } from './components/client/lockers-client-grid/lockers-client-grid.component';
import { VendingComponent } from './pages/clients/vending/vending.component';
import { DatePipe } from "@angular/common";
import { ClientSign } from "./components/client/dialogs/client-dialog";
import { ClientGrid } from "./components/client/dialogs/client-grid.component";
import { ClientTableComponent } from './components/client/client-table/client-table.component';
import { CreateUserComponent } from './pages/clients/create-user/create-user.component';
import { ClientUserComponent } from './pages/clients/client-user/client-user.component';
import { ClientProfileComponent } from './pages/clients/client-profile/client-profile.component';
import { ChartBarComponent } from './components/client/chart-bar/chart-bar.component';
import { RetailService } from "./services/retail.service";
import { ConfirmDelete } from "./components/client/dialogs/confirm-delete";
import { UpdateEmail } from "./components/client/dialogs/update-email";
import { PieChartComponent } from './components/client/pie-chart/pie-chart.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NotificationComponent,
    ForgotPasswordComponent,
    ResetPasswordComponent,
    RegisterComponent,
    HeaderComponent,
    HeaderClientComponent,
    DashboardComponent,
    DialogContentAddAddress,
    DialogContentDeleteAddress,
    FooterComponent,
    DeliveriesComponent,
    DashboardAdminComponent,
    LockersComponent,
    PackageComponent,
    OrderClientComponent,
    ChartPaquetesComponent,
    ChartEntregasComponent,
    GoogleMapsComponent,
    CamerasComponent,
    CameraComponent,
    Page404Component,
    LockerDetailComponent,
    LockerClientDetailComponent,
    ProfileComponent,
    TableComponent,
    DialogContentSignature,
    DialogContentCode,
    LogoutComponent,
    ValidateEmailComponent,
    ConfirmEmailComponent,
    DashboardLocatarioComponent,
    DashboardClientComponent,
    LockersMapComponent,
    UserComponent,
    DialogContentDelete,
    DialogContentCreate,
    DialogContentLogs,
    LockerCreateComponent,
    LockersGridComponent,
    CompaniesComponent,
    CompaniesCreateComponent,
    PaymentsComponent,
    DragDropDirective,
    NotificationsComponent,
    ConsumerPayComponent,
    ChartSplineComponent,
    ChartClientComponent,
    PayBalanceComponent,
    PaymentCardsComponent,
    MsgComponent,
    DashboardTableComponent,
    OrdersTableComponent,
    ClientFooterComponent,
    LockersClientGridComponent,
    VendingComponent,
    ClientSign,
    ClientGrid,
    ConfirmDelete,
    UpdateEmail,
    ClientTableComponent,
    CreateUserComponent,
    ClientUserComponent,
    ClientProfileComponent,
    ChartBarComponent,
    PieChartComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    MatTableExporterModule,
    // ngx-translate and the loader module
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    RecaptchaModule,
    HighchartsChartModule,
    AgmCoreModule.forRoot({
      apiKey: environment.key_google_maps
    }),
    StripeModule.forRoot("pk_test_51HZ0PhEA3xVmmptuzhWaTKGWo3UR5n1lYKdfYNHGtt6fZrgkJ31fwkLJz5TSHQgfkEtnvl9CbXHQTAMd69C4LrZu00hr7r40xl")
  ],
  entryComponents: [
    DashboardComponent, 
    DialogContentAddAddress, 
    DialogContentDeleteAddress, 
    DialogContentSignature, 
    DialogContentCode, 
    DialogContentDelete, 
    DialogContentCreate, 
    DialogContentLogs, 
    ClientSign, 
    ClientGrid,
    ConfirmDelete,
    UpdateEmail
  ],
  providers: [ServerUserService, DatePipe, RetailService, AppComponent],
  bootstrap: [AppComponent]
})
export class AppModule {}

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/languaje/', '.json');
}
