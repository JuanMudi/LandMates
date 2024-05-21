import { Municipality } from "./municipality.model";

// models/department.model.ts
export interface Department {
    id: string;
    name: string;
    municipalities: Municipality[];
}
