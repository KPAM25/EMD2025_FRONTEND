export interface Persona {
  idPersona: string;
  curp: string;
  rfc: string;
  nombre: string;
  primerApellido: string;
  segundoApellido: string;
  nombreCompleto: string;
  fechaNacimiento: string;
  sexo: string;
  genero: string;
  sexoCurp: string;
  estado: string;
  pais: string;
  catalogKeySexo: string;
  estatusPersona?: number;
}

export interface Expediente {
  idPaciente: string;
  tipoSangre: string;
  esDesconocido: boolean;
  expedienteGeneral: string;
  expedienteUm: string;
  catalogKeySexo: string;
  persona: Persona;
  estatus?: number;
}

export interface Cita {
  idCita: string;
  fecha: string;
  hora: string;
  paciente: Persona;
  medico: string;
  motivo: string;
  estatus: 'programada' | 'completada' | 'cancelada';
}

export interface Consulta {
  idConsulta: string;
  fecha: string;
  paciente: Persona;
  medico: string;
  diagnostico: string;
  tratamiento: string;
  estatus: 'abierta' | 'cerrada';
}

