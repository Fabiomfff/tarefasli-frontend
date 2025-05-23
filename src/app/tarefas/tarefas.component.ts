import { NgStyle } from '@angular/common';
import { TarefasService } from './tarefas.service';
import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-tarefas',
  imports: [FormsModule, NgStyle],
  templateUrl: './tarefas.component.html',
  styleUrl: './tarefas.component.css'
})
export class TarefasComponent {
    @Input() index: any;
    @Input() tarefa: any;
    @Input() token: any;

    constructor(private TarefasService: TarefasService){}
    editMode: boolean = false;

    titulo: string  = '';
    desc: string = '';

    ngOnInit(): void {
        if(this.tarefa) {
            this.titulo = this.tarefa.titulo;
            this.desc = this.tarefa.descricao;
        }
    }


    errorUpdate: boolean = false;
    save() {
        this.editMode = !this.editMode;
        let corpo = {
            id: this.tarefa.id,
            titulo: this.titulo,
            descricao: this.desc
        }

        this.TarefasService.updateTarefa(corpo, this.token).subscribe(
            (response: any) => {
                const index = this.TarefasService.tarefas.findIndex((tarefa:any) => tarefa.id === corpo.id);

                this.TarefasService.tarefas[index] = { 
                    ...this.TarefasService.tarefas[index], 
                    ...corpo
                };
            }, 
            (erro: any) => {
                this.errorUpdate = true;
                setTimeout(() => {
                    this.errorUpdate = false;
                }, 2000);
            }
        )
    }

    enterEditMode () {
        this.editMode = !this.editMode
    }

    deletarTrf() {
        let corpo = {
            id: this.tarefa.id
        }

        this.TarefasService.deleteTarefa(corpo, this.token).subscribe(
            (response: any) => {
                const index = this.TarefasService.tarefas.findIndex((tarefa:any) => tarefa.id === corpo.id);

                this.TarefasService.tarefas.splice(index, 1);
            }, 
            (erro: any) => {
                this.errorUpdate = true;
                setTimeout(() => {
                    this.errorUpdate = false;
                }, 2000);
            }
        )
    }
}
