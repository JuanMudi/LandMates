import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Property } from '../../models/property/property.model';
import { Department } from '../../models/location/department.model';


@Injectable({
  providedIn: 'root'
})
export class PropertiesService {

  private apiUrl = environment.apiUrl;


  constructor(private http: HttpClient) { }

  loadDepartments(): Observable<Department[]> {
    return this.http.get<Department[]>(`${this.apiUrl}/department`);
}

  getMyProperties() : Observable<Property[]>{
    return this.http.get<Property[]>(`${this.apiUrl}/property/me`);
  }
  
   // Obtener todas las propiedades
   findProperties(municipality: string, name: string): Observable<Property[]> {
    let url = `${this.apiUrl}/property`;

    if (municipality === '' && name === '') {
      return this.http.get<Property[]>(url + "?exclude=true");
    }

    if (municipality === '' && name !== '') {
      url += `/find?name=${name}`;
      return this.http.get<Property[]>(url);
    }

    if (municipality !== '' && name === '') {
      url += `/find?municipality=${municipality}`;
      return this.http.get<Property[]>(url);
    }

    url += `/find?municipality=${municipality}&name=${name}`;
    return this.http.get<Property[]>(url);
  }

  // Obtener una propiedad por ID
  getPropertyById(id: string): Observable<Property> {
    return this.http.get<Property>(`${this.apiUrl}/property/${id}`)
}

  getPropertyNameById(id: string): Observable<string> {
    return this.http.get<Property>(`${this.apiUrl}/property/${id}`).pipe(map(property => property.name));
  }

  getPropertyPriceById(id: string): Observable<number> {
    return this.http.get<Property>(`${this.apiUrl}/property/${id}`).pipe(map(property => property.pricePerNight));
  }

  deleteProperty(id: string) {
    this.http.delete(`${this.apiUrl}/property/${id}`).subscribe(
      () => {
        console.log('Property deleted');
      }
    );
  }
}
