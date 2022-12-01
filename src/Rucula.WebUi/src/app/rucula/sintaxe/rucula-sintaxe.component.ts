import { Component, OnInit } from '@angular/core';
import { FormBuilder,Validators } from '@angular/forms';
import { RuculaService } from './rucula.service';
import { RuculaSintax } from './RuculaSintax';


@Component({
  selector: 'rucula-sintaxe',
  templateUrl: './rucula-sintaxe.component.html',
  styleUrls: ['./rucula-sintaxe.component.css']
})
export class RuculaSintaxeComponent implements OnInit {  

  constructor(private fb: FormBuilder, private rs:RuculaService) { 
  }

  private HeaderLeftList:string [] = ["code","descripition","Representation"] 
  RuculaList:RuculaSintax[] = [];
  Rucula!:RuculaSintax;
  ngOnInit(){
    this.rs.GetAll()
      .subscribe(resp => {
        this.RuculaList = (resp as RuculaSintax[])  
      })
  }
  PrepareForm(rucula:RuculaSintax){
    this.ruculaSintaxe.setValue(rucula)
  }
  ClearForm(){
    this.ruculaSintaxe.reset();
  }

  public get GetHeaderLeftList(){
    return this.HeaderLeftList
  }
  ruculaSintaxe = this.fb.group({
      code: ['', [Validators.required]],
      description: ['', [Validators.required]],
      description2: ['', Validators.required],
      atributesDefaut: ['', Validators.required],
      languageRuculaRepresentationDTO: this.fb.group({
        code: ['', Validators.required],
        description: ['', Validators.required]
      })
   });   
   Save(){
      this.Rucula = this.ruculaSintaxe.value as RuculaSintax
      this.Rucula.languageRuculaRepresentationDTO.codeRuculaForeKey = this.Rucula.code ;
      this.rs.Save(this.Rucula).subscribe(
        resp => console.log(resp)
      );
   }
}