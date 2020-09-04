import {Component, OnInit, ViewChild} from '@angular/core';
import { EntryService } from "../entry.service";
import { MatTableDataSource } from "@angular/material/table";
import { EntryElement } from "../interfaces/EntryElement";
import { MatDialog } from "@angular/material/dialog";
import {UpdateEntryComponent} from "../update-entry/update-entry.component";
import {MatSort} from "@angular/material/sort";
import {MatPaginator} from "@angular/material/paginator";

@Component({
  selector: 'app-entries',
  templateUrl: './entries.component.html',
  styleUrls: ['./entries.component.css']
})
export class EntriesComponent implements OnInit {

  displayedColumns: string[] = ['Description', 'IsExpense', 'Value', 'Actions'];
  dataSource;

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private service: EntryService, private dialog: MatDialog) { }

  ngOnInit(){
    this.service.getAll().subscribe((data) =>{
      console.log('Result - ', data);
      this.dataSource = new MatTableDataSource<EntryElement>(data as EntryElement[]);
      // For pagination:
      this.dataSource.paginator = this.paginator;
    })
  }

  applyFilter(filterValue: string){
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  updateEntry(entry){
    console.log(entry);
    this.dialog.open(UpdateEntryComponent, {
      data:{
        Id: entry.Id,
        Description: entry.Description,
        IsExpense: entry.IsExpense,
        Value: entry.Value
      }
    })
  }

}
