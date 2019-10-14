import {Component, OnInit} from '@angular/core';
import {CompanyserviceService} from '../companyservice.service';
import {Company} from '../company';
import {FormCompany} from '../FormCompany';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  listCompany: Company[];
  company: Company;
  FormCompany: FormCompany;
  message;
  id;
  constructor(private companyService: CompanyserviceService) {
  }

  ngOnInit() {
    this.getAllCompany();
  }


  getAllCompany() {
    this.companyService.getAllCompany().subscribe(list => {
      this.listCompany = list;
    }, error => {
      this.companyService.handleError(error);
    });
  }

  deleteCompany(id: number) {
    this.companyService.findByIdCompany(id).subscribe(company => {
      this.company = company;
    });
    this.id = this.company.id;
    // console.log(JSON.stringify(this.company));
    // this.FormCompany = new FormCompany(
    //   this.company.id,
    //   false
    // );
    //
    // this.companyService.editActive(this.FormCompany).subscribe(() => {
    //  alert('thay doi trang thai thanh cong~~`');
    // }, error => {
    //   this.companyService.handleError(error);
    // });
  }
}
