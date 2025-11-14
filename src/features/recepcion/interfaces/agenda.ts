import { Persona } from '@/features/personas/interfaces/persona';

export interface Agenda {
  idAgenda: string;
  fecha: string;
  horaInicio: string;
  horaFin: string;
  medico: string;
  especialidad: string;
  disponible: boolean;
  paciente?: Persona;
  motivo?: string;
}

