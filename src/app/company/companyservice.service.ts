import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpEvent} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {Company} from './company';

@Injectable({
  providedIn: 'root'
})
export class CompanyserviceService {
  private logoUrlApi = 'http://localhost:8080/companyImg';
  private companyUrl = 'http://localhost:8080/company';

  constructor(private http: HttpClient) {
  }

  getAllCompany(): Observable<Company[]> {
    return this.http.get<Company[]>(this.companyUrl);
  }

  createCompany(formdata): Observable<any> {
    return this.http.post(this.companyUrl, formdata);
  }

  findByIdCompany(id: number): Observable<Company> {
    return this.http.get<Company>(this.companyUrl + '/' + id);
  }

  createLogo(formData): Observable<HttpEvent<any>> {
    return this.http.post<any>(this.logoUrlApi, formData, {reportProgress: true, observe: 'events'}).pipe(
      catchError(this.handleError)
    );
  }


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
