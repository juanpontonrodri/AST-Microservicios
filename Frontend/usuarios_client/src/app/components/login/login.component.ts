import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario.service';
import Usuario from 'src/app/models/usuario';
interface UsuarioResponse {
  result: string;
}
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
  
})

export class LoginComponent implements OnInit{
  form: FormGroup;
  showcreateflag = false;
  showeliminateflag = false;
  showconsultaflag = false;
  showconsultaresultflag =false;
  searchText: any;
  usuariorol!: string;

  usuarios : Usuario[] = [];
  constructor(private fb: FormBuilder, private _snackBar: MatSnackBar, private router:Router ,private UsuarioService:UsuarioService){
    this.form = this.fb.group({
      
      usuario: ['',Validators.required],
      rol: ['',Validators.required],
    })

  }

  ngOnInit(): void {
    }
    @Output() rstatus = new EventEmitter<boolean>();

    rollist(id: string , rol: string){
      this.UsuarioService.getUsuarioByID(id).subscribe(data => {
        this.usuariorol = data.toString();
        console.log(this.usuariorol);
        if (this.usuariorol === 'Administrador') {
          this.bien3();
          this.UsuarioService.findbyrol(rol).subscribe((usuarios: any) => this.usuarios = usuarios);
          this.showconsultaresultflag=true;
          this.showcreateflag = false;
          this.showeliminateflag = false;
          this.showconsultaflag = false;
        } else {
          this.error();
        }
      });
     
    }

    obtenerUsuarios() {
      this.UsuarioService.getUsuario().subscribe((usuarios: any) => this.usuarios = usuarios);
      this.showconsultaresultflag=true;
      this.showcreateflag = false;
      this.showeliminateflag = false;
      this.showconsultaflag = false;
      }

    ingresar(){
      const usuario = this.form.value.usuario;
      const rol = this.form.value.rol;
     
      console.log(usuario);
      console.log(rol);

   
      this.UsuarioService.createUsuario(usuario,rol)
        .subscribe(response => {
          if (response.status == 200) {

            const usuarioID = (response.body as UsuarioResponse).result;
            this.rstatus.emit(true);
            this.bien(usuarioID);
          } else {
            console.log("added true")
            this.rstatus.emit(false);
          }
          this.showcreateflag=false;
        });
       
    }
     


    bien(usuarioID: string){
        this._snackBar.open("Usuario creado correctamente "+ usuarioID,'',{
          duration:7000,
          horizontalPosition:'center',
        })
    }


      eliminar(id: string){
        
          this.UsuarioService.deleteUsuario(id)
          .subscribe(response => {
            if (response.status == 200) {
              console.log("dadded true")
              this.rstatus.emit(true);
              this.bien2();
            } else {
              console.log("added true")
              this.rstatus.emit(false);
            }
            this.showeliminateflag=false
          });
          
      }
       
        
      
  


      bien2(){
        this._snackBar.open("Usuario eliminado correctamente",'',{
          duration:5000,
          horizontalPosition:'center',
          verticalPosition:'top'
        })

        }

        permitir(id: string) {
          console.log(id);
          this.UsuarioService.getUsuarioByID(id).subscribe(data => {
            this.usuariorol = data.toString();
            console.log(this.usuariorol);
            if (this.usuariorol === 'Administrador') {
              this.bien3();
              this.obtenerUsuarios();
            } else {
              this.error();
            }
          });
        }
       
      
        error(){
          this._snackBar.open("No eres Administrador",'',{
            duration:5000,
            horizontalPosition:'center',
          })
      
          }
      
          bien3(){
            console.log("BIEN")
          }

        showcreate(){
          if(this.showcreateflag==false){
          this.showcreateflag=true;
          }
          else{
            this.showcreateflag=false
          }
        }
        showconsulta(){
          if(this.showconsultaflag==false){
          this.showconsultaflag=true;
          }
          else{
            this.showconsultaflag=false
          }
        }
        showeliminate(){
          if(this.showeliminateflag==false){
          this.showeliminateflag=true;
          }
          else{
            this.showeliminateflag=false
          }
        }
       cancellist(){
        this.showconsultaresultflag=false;
       }
    }
  