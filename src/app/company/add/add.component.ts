import {Component, OnInit} from '@angular/core';
import {Company} from '../company';
import {CompanyserviceService} from '../companyservice.service';
import {TechnologyServiceService} from '../../technology/technology-service.service';
import {Technology} from '../../technology/technology';
import {Observable} from 'rxjs';
import {FormArray, FormBuilder, FormGroup} from '@angular/forms';
import {chainedInstruction} from '@angular/compiler/src/render3/view/util';
import {HttpEvent, HttpEventType} from '@angular/common/http';


@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {
  newCompany: Company;
  company: Company;
  message;
  messageImg;
  technology: Technology[];
  ArrayTechnology: number[] = [];
  newTechnology: Technology[] = [];
  relationship = ['Doi tac', 'Khach hang'];
  specialize = ['Product', 'outsourcing'];
  language = ['php', 'java', '.net'];
  market = ['Nhat', 'Viet Nam', 'Eu'];
  active = ['true', 'false'];
  formCompany: FormGroup;
  temArr: any = {brands: []};
  file: any;
  imageLogo = '';
  formData = new FormData();
  id: number;

  constructor(private companyService: CompanyserviceService,
              private technologyService: TechnologyServiceService,
              private fb: FormBuilder
  ) {
  }

  ngOnInit() {
    // this.company = this.companyService.findByIdCompany();
    this.getAllTechnology();
    this.formCompany = this.fb.group({
      companyName: [''],
      shortname: [''],
      address: [''],
      website: [''],
      phonenumber: [''],
      email: [''],
      introductoryinformation: [''],
      relationship: [''],
      specialize: [''],
      language: [''],
      technology: [''],
      market: [''],
      note: [''],
      active: ['']
    });
  }

  getAllTechnology() {
    this.technologyService.getAllTechnology().subscribe(list => {
      this.technology = list;
    });
  }


  selectFile(event) {
    if (event.target.files.length > 0) {
      this.file = event.target.files[0];
      this.imageLogo = event.target.files[0].name;
    }
  }


  onCheckboxChange(event, tech: Technology) {
  debugger;
    if (event.target.checked) {
      this.ArrayTechnology.push(tech.id);
    } else {
      for (let i = 0; i < this.technology.length; i++) {
        if (this.ArrayTechnology[i] === tech.id) {
          this.ArrayTechnology.splice(i, 1);
        }
      }
    }
    this.newTechnology = [];
    for (let j = 0; j < this.ArrayTechnology.length; j++) {
      if (this.ArrayTechnology[j] != null) {
        this.technologyService.getTechnologyById(this.ArrayTechnology[j]).subscribe(newTech => {
          this.newTechnology.push(newTech);
        });
      }
    }
    // alert(this.ArrayTechnology);
  }

  // getTechByid(id) {
  //   this.technologyService.getTechnologyById(id).subscribe(technology => {
  //     this.newTechnology = technology;
  //   });
  // }

  onSubmit() {


    this.company = new Company(
      this.formCompany.get('companyName').value,
      this.formCompany.get('shortname').value,
      this.formCompany.get('address').value,
      this.formCompany.get('website').value,
      this.formCompany.get('phonenumber').value,
      this.formCompany.get('email').value,
      this.formCompany.get('introductoryinformation').value,
      this.formCompany.get('relationship').value,
      this.formCompany.get('specialize').value,
      this.formCompany.get('language').value,
      this.formCompany.get('market').value,
      this.formCompany.get('note').value,
      this.newTechnology
    );
    this.companyService.createCompany(this.company).subscribe(newComapny => {
      this.newCompany = newComapny;


      if (this.file != null) {
        this.formData.append('companylogo', this.file);
        this.companyService.createLogo(this.newCompany.companyName, this.formData).subscribe(
          (event: HttpEvent<any>) => {
            switch (event.type) {
              case HttpEventType.Sent:
                console.log('Request has been made!');
                break;
              case HttpEventType.ResponseHeader:
                console.log('Response header has been received!');
                break;

              case HttpEventType.Response:
                console.log('User successfully updated!!', event.body);
            }
            // this.loading = false;
            this.messageImg = 'Avatar uploaded successfully!';
          },
          error1 => {
            this.messageImg = 'Failed to upload avatar!!. Cause: ' + error1.message;
          }
        );
      }


      // alert(`Detail: ${JSON.stringify(this.newCompany.companyName)}`);
      this.message = 'Them Company thanh cong!!';
      alert('them thanh cong');
    }, error => {
      this.message = 'Them that bai!!';
      alert('them that bai');
      this.companyService.handleError(error);
    });


  }
}
