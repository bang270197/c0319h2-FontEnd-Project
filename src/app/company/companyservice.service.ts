import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpEvent, HttpHeaders} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {Company} from './company';
import {Technology} from '../technology/technology';

const httpOption = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class CompanyserviceService {
  private logoUrlApi = 'http://localhost:8080/companyImg/';
  private companyUrl = 'http://localhost:8080/company';
  private activeUrl = 'http://localhost:8080/changeActive';

  constructor(private http: HttpClient) {
  }

  changeActive(id: number): Observable<any> {
    return this.http.put(this.activeUrl + '/' + id, httpOption).pipe(
      catchError(this.handleError)
    );
  }

  getAllCompany(): Observable<Company[]> {
    return this.http.get<Company[]>(this.companyUrl);
  }

  createCompany(formdata): Observable<Company> {
    return this.http.post<Company>(this.companyUrl, formdata);
  }

  getCompanyByid(id: number): Observable<Company> {
    return this.http.get<Company>(this.companyUrl + '/' + id);
  }

  findBycompanyName(companyName: string): Observable<Company> {
    return this.http.get<Company>(this.companyUrl + '/' + companyName);
  }

  createLogo(companyName: string, formdata): Observable<HttpEvent<any>> {
    return this.http.post<any>(this.logoUrlApi + companyName, formdata, {reportProgress: true, observe: 'events'}).pipe(
      catchError(this.handleError)
    );
  }

  // updateAvatar(formData): Observable<HttpEvent<any>> {
  //   return this.http.post<any>(this.editAvatarUrl, formData, {reportProgress: true, observe: 'events'}).pipe(
  //     catchError(this.handleError)
  //   );
  // }


  handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(`Backend returned code ${error.status}, ` + `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError('Something bad happened. Please try again later.');
  }
}
