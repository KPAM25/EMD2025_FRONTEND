import { Persona } from '@/features/personas/interfaces/persona';

export interface Usuario {
  idUsuario: string;
  username: string;
  email: string;
  persona: Persona;
  rol: string;
  estatus: number;
  fechaCreacion: string;
}

