import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Department } from '../../models/location/department.model';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Property } from '../../models/property/property.model';


@Injectable({
  providedIn: 'root'
})
export class NewPropertyService {

  private apiUrl = environment.apiUrl;
  municipalityId: string = '';

  constructor(private http: HttpClient) { }

  loadDepartments(): Observable<Department[]> {
    return this.http.get<Department[]>(`${this.apiUrl}/department`);
}
  createProperty(property: Property): Observable<Property> {
    this.municipalityId = property.municipalityName;
    const { municipalityName,departmentName, accessType, ownerID , ...propertyWithoutDepartment } = property;

    const propertyToSend = { ...propertyWithoutDepartment, municipalityId : this.municipalityId}; 
    
    return this.http.post<Property>(`${this.apiUrl}/property`, propertyToSend);
  }
  updateProperty(property: Property) {

    this.municipalityId = property.municipalityName;
    const { municipalityName,departmentName, accessType, ownerID , ...propertyWithoutDepartment } = property;

    const propertyToSend = { ...propertyWithoutDepartment, municipalityId : this.municipalityId}; 
    
    return this.http.put<Property>(`${this.apiUrl}/property/${propertyToSend.id}`, propertyToSend);
    
}

}