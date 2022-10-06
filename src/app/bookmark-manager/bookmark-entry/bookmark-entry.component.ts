import { JsonpInterceptor } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { AppService } from '../../app.service';

@Component({
  selector: 'app-bookmark-entry',
  templateUrl: './bookmark-entry.component.html',
  styleUrls: ['./bookmark-entry.component.css']
})
export class BookmarkEntryComponent implements OnInit {
  catList: any;


  constructor(private fb : FormBuilder, private modalRef: NzModalRef , private service : AppService) { }
  @Input()
  record                              : any;
  list                                = [];
  listdata                            : any;
  detailsList                         = [];
  category                            : any = {
    categoryName                      : '',
    detail                            : []
  };
  categoryList                        : any;
  title                               : 'Add Bookmark'
  frm                                 : FormGroup;
  isDisable                           = false;

  ngOnInit(): void {
    this.getData();
    this.InitForm();

  }

  InitForm(){
    this.frm = this.fb.group({
          title                       : ['', Validators.required],
          url                         : ['', [Validators.required, Validators.pattern('(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?')]],
          categoryName                : ['', Validators.required],
    })
  }


  getData(){
         this.categoryList = JSON.parse(localStorage.getItem('listdata')) ?? [];
         this.listdata = [...this.categoryList]
         console.log(this.categoryList);
         this.catList = this.categoryList;
        
  }


  onSubmit(){
    let val = this.frm.value;
    
    if(this.frm.valid){
         
      if(this.listdata.filter(o=> o.categoryName === val.categoryName).length === 0){
            this.category.categoryName = val?.categoryName;
            this.category.detail = [...this.category.detail, val];
            this.listdata = [...this.listdata, this.category]
      }
      else{
        let index = this.listdata.map(o=> o.categoryName).indexOf(val.categoryName);
        this.listdata[index].categoryName = val.categoryName;
        if(this.listdata[index].detail.length>0){
          if(this.listdata[index].detail.filter(o=> o.title === val.title).length === 0){
            this.listdata[index].detail = [...this.listdata[index].detail, val]
          }
        }
      }
            console.log(this.listdata);
            
         if(this.listdata.length>0){
          localStorage.setItem('listdata', JSON.stringify(this.listdata));
          this.modalRef.close(this.listdata)
         }
    }
  }

  onClose(){
    this.modalRef.close();
  }



  onAddCategory(){
    this.isDisable = !this.isDisable;
  }

  onInput(){
        url : this.frm.value.url
        
  }

  

}
