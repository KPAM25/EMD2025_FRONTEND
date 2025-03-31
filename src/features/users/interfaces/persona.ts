export interface Pais {
  idPais: number;
  catalogKey: number;
  descripcion: string;
  orden: number;
  estatus: number;
}

export interface Entidad {
  idEntidad: number;
  catalogKey: string;
  entidadFederativa: string;
  abreviatura: string;
  fkPais: Pais;
  estatusEntidad: number;
}

export interface Sexo {
  idSexo: number;
  catalogKey: number;
  descripcion: string;
  orden: number;
  estatusSexo: number;
}

export interface Persona {
  idPersona: number;
  activoPersona: number;
  nombresPersona: string;
  primerApellidoPersona: string;
  segundoApellidoPersona: string | null;
  fechaNacimientoPersona: string;
  curpPersona: string;
  fkPaisNac: Pais;
  fkEntidadNac: Entidad;
  fkGenero: null;
  fkSexox: null;
  fkSexoCurp: Sexo;
  fkUnidad: null;
  curpValida: boolean;
  fechaRegistro: string;
  horaRegistro: string;
  fkUsuarioRegistro: null;
} 