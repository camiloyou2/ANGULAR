export class datos_monografia {
    codigo: string;
    creditos: string;
    id_documento: string;
    id_estado: string;
    id_opcion: string;
    nombre: string;
    numero_documento: string;
    semestre: string;
    solicitudes_sis: string;
   
   
    constructor(
        codigo: string,
        creditos: string,
        id_documento: string,
        id_estado: string,
        id_opcion: string = '',
        nombre: string = '',
        numero_documento: string = '',
        semestre: string = '',
        solicitudes_sis: string = ''
        
    ) {

        
        this.codigo = codigo;
        this.creditos = creditos;
        this.id_documento = id_documento;
        this.id_estado = id_estado;
        this.id_opcion = id_opcion;
        this.nombre = nombre;
        this.numero_documento = numero_documento;
        this.semestre = semestre;
        this.solicitudes_sis = solicitudes_sis;
       
    }
}





