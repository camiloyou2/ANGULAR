export class datos_pasantia {
    codigo: string;
    fullnameestudent: string;
    ID: string;
    nombre: string;
    fecha_inicio: string;
    id_profesor: string;
    terminada: string;
    fullnameteacher: string;
    id_convenio: string;

    constructor(
        codigo: string,
        fullnameestudent: string,
        ID: string,
        nombre: string,
        fecha_inicio: string = '',
        id_profesor: string = '',
        terminada: string = '',
        fullnameteacher: string = '',
        id_convenio: string = ''
    ) {
        this.codigo = codigo;
        this.fullnameestudent = fullnameestudent;
        this.ID = ID;
        this.nombre = nombre;
        this.fecha_inicio = fecha_inicio;
        this.id_profesor = id_profesor;
        this.terminada = terminada;
        this.fullnameteacher = fullnameteacher;
        this.id_convenio = id_convenio;
    }
}





