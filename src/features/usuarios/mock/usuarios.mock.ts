import { Usuario } from '../interfaces/usuario';
import { mockPersonas } from '@/features/personas/mock/personas.mock';

export const mockUsuarios: Usuario[] = [
  {
    idUsuario: '1',
    username: 'jromero',
    email: 'juan.romero@example.com',
    persona: mockPersonas[0],
    rol: 'Administrador',
    estatus: 1,
    fechaCreacion: '2024-01-15',
  },
  {
    idUsuario: '2',
    username: 'mgarcia',
    email: 'maria.garcia@example.com',
    persona: mockPersonas[1],
    rol: 'Médico',
    estatus: 1,
    fechaCreacion: '2024-02-20',
  },
  {
    idUsuario: '3',
    username: 'chernandez',
    email: 'carlos.hernandez@example.com',
    persona: mockPersonas[2],
    rol: 'Recepción',
    estatus: 1,
    fechaCreacion: '2024-03-10',
  },
  {
    idUsuario: '4',
    username: 'alopez',
    email: 'ana.lopez@example.com',
    persona: mockPersonas[3],
    rol: 'Enfermera',
    estatus: 1,
    fechaCreacion: '2024-04-05',
  },
  {
    idUsuario: '5',
    username: 'prodriguez',
    email: 'pedro.rodriguez@example.com',
    persona: mockPersonas[4],
    rol: 'Médico',
    estatus: 1,
    fechaCreacion: '2024-05-12',
  },
];

