import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './login/login.component';
import { BlogEditorComponent } from './components/blog-editor/blog-editor.component';
import { BlogComponent } from './components/blog/blog.component';
import { AuthGuard } from './guards/auth.guard';
import { AdminAuthGuard } from './guards/admin-auth.guard';
import { SignupComponent } from './signup/signup.component';
import { UserDetailsComponent } from './user-details/user-details.component';
const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: 'page/:pagenum', component: HomeComponent },                                                                            // canActivate: [AuthGuard]
  { path: 'addpost', component: BlogEditorComponent },
  { path: 'editpost/:id', component: BlogEditorComponent  },                                                                     // canActivate: [AdminAuthGuard] 
  { path: 'blog/:id/:slug', component: BlogComponent },
  { path: 'login', component: LoginComponent },
  {path: 'signup', component:SignupComponent},
  { path: 'user-details', component: UserDetailsComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
