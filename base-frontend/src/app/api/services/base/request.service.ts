import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, catchError, map, Observable, throwError } from "rxjs";


interface RequestState<T> {
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
  data?: T;
  error?: any;
}

@Injectable({
  providedIn: 'root',
})
export class RequestService {
  constructor(private http: HttpClient) {}

  /**
   * @template T
   * @param {string} url 
   * @param {'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'} method 
   * @param {object} [options]
   * @param {any} [options.body]
   * @param {HttpHeaders} [options.headers]
   * @param {HttpParams} [options.params]
   * @param {'json'} [options.responseType] 
   * @returns {Observable<RequestService<T>>}
   */
  doRequest<T>(
    url: string,
    method: 'GET' | 'POST' | 'PATCH' | 'PUT' | 'DELETE',
    options: {
      body?: any;
      headers?: HttpHeaders;
      params?: HttpParams;
      responseType?: 'json';
    } = {}
  ): Observable<RequestState<T>> {
    //Cria um novo BehaviorSubject para cada requisição, garantido que cada uma seja independente
    const requestSubject = new BehaviorSubject<RequestState<T>>({
      isLoading: true,
      isSuccess: false,
      isError: false,
    });

    const request$ = this.http.request<T>(method, url, options).pipe(
      map((data) => {
        const successState: RequestState<T> = {
          isLoading: false,
          isSuccess: true,
          isError: false,
          data,
        };
        requestSubject.next(successState);
        requestSubject.complete();
        return successState;
      }),
      catchError((error: HttpErrorResponse) => {
        const errorState: RequestState<T> = {
          isLoading: false,
          isSuccess: false,
          isError: true,
          error,
        };
        requestSubject.next(errorState);
        requestSubject.complete();
        return throwError(() => error);
      })
    );

    //Inicia requisição
    request$.subscribe();

    return requestSubject.asObservable();
  }
}