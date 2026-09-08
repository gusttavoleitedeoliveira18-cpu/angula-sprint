import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Auth } from '../../service/auth';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {
  
   usuario = {
    nome: '',
    senha:''
   }
Input: any;

 constructor(private auth:Auth, private router:Router){}

 login(){

  this.auth.login(this.usuario).subscribe({
    next:(response) =>{
      this.router.navigate(['/home']);

    },
    error:(err) => {
      console.error("falha no login", err)

    } 
  })
 }
}