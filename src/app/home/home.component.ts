import { UserService } from './../user.service';
import { Component } from '@angular/core';
import { SideMenuComponent } from "../side-menu/side-menu.component";
import { TarefasComponent } from '../tarefas/tarefas.component';
import { NgStyle } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { TarefasService } from '../tarefas/tarefas.service';

@Component({
  selector: 'app-home',
  imports: [SideMenuComponent, TarefasComponent, NgStyle, FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
    tarefas: any = [];
    modalAddTarefa: boolean = false;
    titulo!: string;
    desc!: string;

    openModal () {
        this.modalAddTarefa = !this.modalAddTarefa
    }

    constructor(private router: Router, private userService: UserService, public tarefasService: TarefasService){}
    token: any;

    ngOnInit(): void {
        this.modalAddTarefa = false;
        this.token = localStorage.getItem('token') || '';

        this.userService.currentUser(this.token);

        this.tarefasService.listTarefas(this.token).subscribe(
            (response: any) => {
                this.tarefasService.tarefas = response;
                console.log('tarefas: ',this.tarefasService.tarefas)
            }, 
            (erro: any) => {
                console.log(erro)
            }
        )
    }

    erros = {
        tituloErr: false,
        descErr: false
    }
    adicionarTarefa () {
        let corpo = {
            titulo: this.titulo, 
            descricao: this.desc
        }
        
        let validationCheck = this.validarCorpo(corpo);

        if(!validationCheck) return;

        this.tarefasService.addTarefa(corpo, this.token).subscribe (
            (response: any) => {
                this.tarefasService.tarefas.push(corpo)

                this.titulo = '';
                this.desc = '';
                this.openModal();
            }, 
            (erro: any) => {
                console.log(erro)
            }
        )
    }

    validarCorpo(corpo: {titulo: string, descricao: string}) {

        let isValid: boolean = true;

        if (!corpo.titulo) {
            this.acionarErrorCamposModal('desc');
            return isValid = false;
        }

        if (!corpo.descricao ) {
            this.acionarErrorCamposModal('desc');
            return isValid = false;
        }

        if (corpo.titulo.length < 4) {
            this.acionarErrorCamposModal('titulo');
            return isValid =  false;
        }

        if (corpo.titulo.length > 100) {
            this.acionarErrorCamposModal('titulo');
            return isValid =  false;
        }

        if (corpo.descricao.length < 4) {
            this.acionarErrorCamposModal('desc');
            return isValid =  false;
        }
        if (corpo.descricao.length > 200) {
            this.acionarErrorCamposModal('desc');
            return isValid =  false;
        }

        return isValid
    }

    acionarErrorCamposModal (campo: string) {
        if (campo == 'titulo') {
              this.erros.tituloErr = true;

            setTimeout(() => {
                this.erros.tituloErr = false
            }, 2000);

            return
        }

        if (campo == 'desc') {
            this.erros.descErr = true;

            setTimeout(() => {
                this.erros.descErr = false
            }, 2000);

            return
        }
        return
    }

}
