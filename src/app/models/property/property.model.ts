export class Property {
    id?: string; // ID de la propiedad, puede ser opcional si lo genera el backend
    name: string; // Nombre de la propiedad (obligatorio)
    description: string; // Descripción de la propiedad (obligatorio)
    rooms: number; // Cantidad de habitaciones (obligatorio)
    bathrooms: number; // Cantidad de baños (obligatorio)
    petFriendly: boolean; // Indica si permite mascotas (obligatorio)
    pool: boolean; // Indica si tiene piscina (obligatorio)
    bbq: boolean; // Indica si tiene asador (obligatorio)
    pricePerNight: number; // Valor por noche de la propiedad
    ownerID: string; // ID del propietario (debe ser proporcionado por el sistema o usuario)
    municipalityName: string; // ID del municipio al que pertenece la propiedad (obligatorio)
    departmentName: string; // ID del departamento al que pertenece la propiedad (obligatorio)
    accessType?: string; // Tipo de acceso (carretera principal, secundaria, terciaria)

    constructor(
        id: string | undefined,
        name: string,
        description: string,
        rooms: number,
        bathrooms: number,
        petFriendly: boolean,
        pool: boolean,
        bbq: boolean,
        pricePerNight: number,
        ownerID: string,
        departmentName: string,
        municipalityName: string,
        accessType?: string
    ) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.rooms = rooms;
        this.bathrooms = bathrooms;
        this.petFriendly = petFriendly;
        this.pool = pool;
        this.bbq = bbq;
        this.pricePerNight = pricePerNight;
        this.ownerID = ownerID;
        this.municipalityName = municipalityName;
        this.departmentName = departmentName;
        this.accessType = accessType;
    }
}
