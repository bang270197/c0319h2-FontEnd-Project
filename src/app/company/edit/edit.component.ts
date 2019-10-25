import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {CompanyserviceService} from '../companyservice.service';
import {Company} from '../company';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Relationship} from '../Relationship';
import {Language} from '../Language';
import {Specialize} from '../Specialize';
import {Market} from '../Market';
import {Technology} from '../../technology/technology';
import {TechnologyServiceService} from '../../technology/technology-service.service';


@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  // luu company duoc tra ve sau khi them
  newCompany: Company;
  // luu company lay theo id
  company: Company;
  // khoi tao doi tuong de sua
  editCompany: Company;
  // luu doi tuong
  relationship: Relationship;
  specialize: Specialize[];
  language: Language[];
  market: Market[];
  technology: Technology[];
  // luu id doi tuong
  languageId: number[] = [];
  specializeId: number[] = [];
  marketId: number[] = [];
  technologyId: number[] = [];

  formCompany: FormGroup;
  // hien thi du kieu
  Arrayrelationship: Relationship[];
  Arraylanguage: Language[];
  Arrayspecialize: Specialize[];
  Arraymarket: Market[];
  Arraytechnology: Technology[];

  formData = new FormData();
  file: any;
  imageLogo = '';
  message = '';
  message1 = '';


  showMessageTrue = true;
  showMessageFalse = true;
  constructor(private active: ActivatedRoute,
              private companyService: CompanyserviceService,
              private fb: FormBuilder,
              private technologyService: TechnologyServiceService
  ) {
  }

  ngOnInit() {

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
    });
    this.getCompanyById();
    this.getAllRelationship();
    this.getAllLanguage();
    this.getAllSpecialize();
    this.getAllTechnology();
    this.getAllMarket();
  }

  getCompanyById(): void {
    debugger;
    const id = +this.active.snapshot.paramMap.get('id');
    this.companyService.getCompanyByid(id).subscribe(company => this.company = company);
  }


  getAllRelationship() {
    this.companyService.getAllRelationship().subscribe(list => {
      this.Arrayrelationship = list;
    });
  }

  getAllLanguage() {
    this.companyService.getAllLanguage().subscribe(list => {
      this.Arraylanguage = list;
    });
  }

  getAllSpecialize() {
    this.companyService.getAllSpecialize().subscribe(list => {
      this.Arrayspecialize = list;
    });
  }

  getAllTechnology() {
    this.technologyService.getAllTechnology().subscribe(list => {
      this.Arraytechnology = list;
    });
  }

  getAllMarket() {
    this.companyService.getAllMarket().subscribe(list => {
      this.Arraymarket = list;
    });
  }


  onCheckboxChangeRelationship(rela: Relationship) {
    this.relationship = rela;
  }


  onCheckboxChangeSpecialize(event, spec: Specialize) {
    this.specialize = this.company.specialize;
    if (event.target.checked) {
      if (this.travetruefalseSpec(spec) === false) {
        this.specialize.push(spec);
      }
    } else {
      for (let x = 0; x < this.specialize.length; x++) {
        if (spec.name === this.specialize[x].name) {
          this.specialize.splice(x, 1);
        }
      }
    }
  }


  onCheckboxChangeLanguage(event, lang: Language) {
    this.language = this.company.language;
    if (event.target.checked) {
      if (this.travetruefalseLang(lang) === false) {
        this.language.push(lang);
      }
    } else {
      for (let x = 0; x < this.language.length; x++) {
        if (lang.name === this.language[x].name) {
          this.language.splice(x, 1);
        }
      }
    }
  }


  onCheckboxChangeTechnology(event, tech: Technology) {
    this.technology = this.company.technology;
    if (event.target.checked) {
      if (this.travetruefalseTech(tech) === false) {
        this.technology.push(tech);
      }
    } else {
      for (let x = 0; x < this.technology.length; x++) {
        if (tech.name === this.technology[x].name) {
          this.technology.splice(x, 1);
        }
      }
    }
  }

  onCheckboxChangeMarket(event, mar: Market) {
    this.market = this.company.market;
    if (event.target.checked) {
      if (this.travetruefalseMar(mar) === false) {
        this.market.push(mar);
      }
    } else {
      for (let x = 0; x < this.market.length; x++) {
        if (mar.name === this.market[x].name) {
          this.market.splice(x, 1);
        }
      }
    }
  }

  selectFile(event: any) {
    if (event.target.files.length > 0) {
      this.file = event.target.files[0];
      this.imageLogo = event.target.files[0].name;
    }
  }

  onSubmit() {
    if (this.language == null) {
      this.language = this.company.language;
    }
    if (this.relationship == null) {
      this.relationship = this.company.relationship;
    }
    if (this.market == null) {
      this.market = this.company.market;
    }
    if (this.specialize == null) {
      this.specialize = this.company.specialize;
    }

    if (this.technology == null) {
      this.technology = this.company.technology;
    }
    this.editCompany = new Company(
      this.formCompany.get('companyName').value,
      this.formCompany.get('shortname').value,
      this.formCompany.get('address').value,
      this.formCompany.get('website').value,
      this.formCompany.get('phonenumber').value,
      this.formCompany.get('email').value,
      this.formCompany.get('introductoryinformation').value,
      this.relationship,
      this.specialize,
      this.language,
      this.technology,
      this.market,
      this.formCompany.get('note').value
    );

    this.companyService.editCompany(this.company.id, this.editCompany).subscribe(newCompany => {
      this.newCompany = newCompany;
      if (this.file != null) {
        this.formData.append('companylogo', this.file);
        this.companyService.addLogo(this.newCompany.id, this.formData).subscribe(() => {
          // this.message1 = 'Sua anh thanh cong';
          this.getCompanyById();
        }, error => {
          // this.message1 = 'Sua anh that bai ';
        });
      }
      this.getCompanyById();
      this.showMessageTrue = false;
      this.showMessageFalse = true;
      this.message = 'Sua company thanh cong cong';
    }, error => {
      this.showMessageTrue = true;
      this.showMessageFalse = false;
      this.message1 = 'Sua company that bai ';
      this.companyService.handleError(error);
    });
  }

  // hàm so sánh đối tượng có tồn tại trong mảng
  travetruefalseLang(lang: Language): boolean {
    for (let i = 0; i < this.company.language.length; i++) {
      if (lang.name === this.company.language[i].name) {
        return true;
        break;
      }
    }
    return false;
  }


  travetruefalseSpec(spec: Specialize): boolean {
    for (let i = 0; i < this.company.specialize.length; i++) {
      if (spec.name === this.company.specialize[i].name) {
        return true;
        break;
      }
    }
    return false;
  }

  travetruefalseTech(tech: Technology): boolean {
    for (let i = 0; i < this.company.technology.length; i++) {
      if (tech.name === this.company.technology[i].name) {
        return true;
        break;
      }
    }
    return false;
  }


  travetruefalseMar(mar: Market): boolean {
    for (let i = 0; i < this.company.market.length; i++) {
      if (mar.name === this.company.market[i].name) {
        return true;
        break;
      }
    }
    return false;
  }


  // hàm so sánh hiển thị checked
  sosanhLang(lang: Language): boolean {
    for (let i = 0; i < this.company.language.length; i++) {
      if (lang.name === this.company.language[i].name) {
        return true;
        break;
      }
    }
  }

  sosanhTech(tech: Technology): boolean {
    for (let i = 0; i < this.company.technology.length; i++) {
      if (tech.name === this.company.technology[i].name) {
        return true;
        break;
      }
    }
  }

  sosanhMar(mar: Market): boolean {
    for (let i = 0; i < this.company.market.length; i++) {
      if (mar.name === this.company.market[i].name) {
        return true;
        break;
      }
    }
  }

  sosanhSpec(spec: Specialize): boolean {
    for (let i = 0; i < this.company.specialize.length; i++) {
      if (spec.name === this.company.specialize[i].name) {
        return true;
        break;
      }
    }
  }

  sosanhRela(rela: Relationship): boolean {

    if (rela.name === this.company.relationship.name) {
      return true;
    } else {
      return false;
    }

  }

}
