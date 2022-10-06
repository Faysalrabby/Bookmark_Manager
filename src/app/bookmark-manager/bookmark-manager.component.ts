import { Component, OnInit } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';
import { AppService } from '../app.service';
import { BookmarkEntryComponent } from './bookmark-entry/bookmark-entry.component';

@Component({
  selector: 'app-bookmark-manager',
  templateUrl: './bookmark-manager.component.html',
  styleUrls: ['./bookmark-manager.component.css']
})
export class BookmarkManagerComponent implements OnInit {

  constructor(private modal : NzModalService , private message : NzMessageService , private service : AppService) { }
  data                                : any;
  interval                            : any;
  categories                          = [];
  category                            = [];
  listOfData                          = [];
  listOfDisplayData                   : any;
  isVisible                           = false;
  detailscomponent                    : any ={
    title                             : '',
    url                               : '',
    categoryName                      : '',
  }


  title                               = 'Bookmark Manager'
  ngOnInit(): void {
    this.getData();
  }


  getData(){
    this.category = JSON.parse(localStorage.getItem('listdata')) ?? [];
     
      this.listOfData = this.category;
      this.listOfDisplayData = [...this.listOfData]
  }

  onAddBookmark(data: any): void {
    const title = data ? data.title + '\'s Edit' : 'Add ' + this.title;
    const drawerRef = this.modal.create<BookmarkEntryComponent, {record: any}>({
      nzMaskClosable: false,
      nzContent: BookmarkEntryComponent,
      nzComponentParams: {
        record: data ? data : {boomarkId: 0},
        list: this.listOfData,
      },
     
    });
  
    drawerRef.afterOpen.subscribe(() => {
      console.log('Modal(Component) open');
    });
  
    drawerRef.afterClose.subscribe((r: any) => {
     
      this.getData();
          
    });
  }


  onDetails(d){
      this.isVisible = true;
      this.detailscomponent = d;
  }

  onClear(){
    localStorage.clear();
    this.message.success('Local Storage Clear Succesfully')
    this.getData();
  }

  mouseOver(e){
        console.log(e);
   this.interval =  setInterval(()=> {
          this.detailscomponent = e;
        },3000)
        this.isVisible= true
  }


  mouseLeave(e){
    console.log(e);
    clearInterval((this.interval))
    this.isVisible= false;
  }

}
