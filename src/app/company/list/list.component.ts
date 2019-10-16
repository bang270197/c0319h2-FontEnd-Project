import {Component, OnInit} from '@angular/core';
import {CompanyserviceService} from '../companyservice.service';
import {Company} from '../company';
import {TokenStorageService} from '../../auth/token-storage.service';


@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  listCompany: Company[];
  company: Company;
  message;
  id;
  // roles: string[] = [];
  // showAndHide = false;

  constructor(private companyService: CompanyserviceService, private token: TokenStorageService) {
  }

  ngOnInit() {
    this.getAllCompany();
    // this.getRole();
  }
// test chuc nang phan quyen trang quan ly
  // getRole() {
  //   this.roles = this.token.getAuthorities();
  //   this.roles.every(role => {
  //     if (role === 'ROLE_ADMIN') {
  //       this.showAndHide = false;
  //     }
  //   });
  // }

  getAllCompany() {
    this.companyService.getAllCompany().subscribe(list => {
      this.listCompany = list;
    }, error => {
      this.companyService.handleError(error);
    });
  }

  changeActive(id) {
    this.companyService.getCompanyByid(id).subscribe(company => {
      this.company = company;
      // alert(JSON.stringify(this.company));

      this.companyService.changeActive(this.company.id).subscribe(() => {
        this.getAllCompany();
        // alert('Da thay doi active thanh cong');
      }, error => {
        this.companyService.handleError(error);
      });


    }, error => {
      this.companyService.handleError(error);
    });
  }


}
