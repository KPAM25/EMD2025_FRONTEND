import { Role } from '@/interfaces/roles';
import {
  Users,
  Calendar,
  FileText,
  AlertTriangle,
  Activity,
  Building2,
  UserPlus,
  Clock,
  ClipboardCheck,
  FileClock,
  UserRound,
  HeartPulse,
  Pill,
} from 'lucide-react';

// Datos de ejemplo - en un caso real vendrían del backend
const mockData = {
  adminGlobal: {
    pacientesActivos: '2,845',
    citasHoy: '124',
    expedientesAbiertos: '37',
    ocupacionMedicos: '78%',
    alertasPendientes: '12',
    centrosActivos: '8',
    usuariosActivos: '34',
    ultimasActividades: [
      {
        id: 1,
        usuario: 'Dra. Martínez',
        accion: 'Creó un nuevo expediente',
        tiempo: 'hace 5 minutos',
        tipo: 'expediente',
      },
      {
        id: 2,
        usuario: 'Dr. López',
        accion: 'Agendó una cita',
        tiempo: 'hace 15 minutos',
        tipo: 'cita',
      },
      {
        id: 3,
        usuario: 'Enf. Rodríguez',
        accion: 'Actualizó historia clínica',
        tiempo: 'hace 28 minutos',
        tipo: 'expediente',
      },
      {
        id: 4,
        usuario: 'Admin Técnico',
        accion: 'Creó nuevo usuario',
        tiempo: 'hace 42 minutos',
        tipo: 'usuario',
      },
      {
        id: 5,
        usuario: 'Recepción Central',
        accion: 'Canceló cita',
        tiempo: 'hace 1 hora',
        tipo: 'cita',
      },
    ],
    alertasSeguridad: [
      {
        id: 1,
        tipo: 'Crítica',
        mensaje: 'Múltiples intentos de acceso fallidos',
        tiempo: 'hace 10 minutos',
      },
      {
        id: 2,
        tipo: 'Advertencia',
        mensaje: 'Sesión inactiva por más de 2 horas',
        tiempo: 'hace 2 horas',
      },
    ],
    citasPendientes: [
      {
        id: 1,
        paciente: 'María García',
        médico: 'Dr. Hernández',
        hora: '14:30',
        estado: 'Confirmada',
      },
      {
        id: 2,
        paciente: 'Juan López',
        médico: 'Dra. Martínez',
        hora: '15:15',
        estado: 'Pendiente',
      },
      {
        id: 3,
        paciente: 'Ana Sánchez',
        médico: 'Dr. González',
        hora: '16:00',
        estado: 'Confirmada',
      },
    ],
  },
  medico: {
    pacientesHoy: '12',
    citasPendientesCount: '5',
    proximaCita: '15:30',
    expedientesPendientes: '3',
    ultimasActividades: [
      {
        id: 1,
        usuario: 'Usted',
        accion: 'Actualizó expediente de Juan López',
        tiempo: 'hace 15 minutos',
        tipo: 'expediente',
      },
      {
        id: 2,
        usuario: 'Usted',
        accion: 'Completó consulta con María García',
        tiempo: 'hace 35 minutos',
        tipo: 'cita',
      },
    ],
    citasPendientes: [
      {
        id: 1,
        paciente: 'Roberto Gómez',
        médico: 'Dr. Hernández',
        hora: '15:30',
        estado: 'Confirmada',
      },
      {
        id: 2,
        paciente: 'Carmen Ruiz',
        médico: 'Dr. Hernández',
        hora: '16:00',
        estado: 'En sala de espera',
      },
    ],
  },
  enfermeria: {
    pacientesActivos: '18',
    proximosIngresos: '3',
    tareasAsignadas: '7',
    ultimasActividades: [
      {
        id: 1,
        usuario: 'Usted',
        accion: 'Registró signos vitales de paciente #123',
        tiempo: 'hace 10 minutos',
        tipo: 'expediente',
      },
      {
        id: 2,
        usuario: 'Dra. Martínez',
        accion: 'Asignó tarea de asistencia',
        tiempo: 'hace 30 minutos',
        tipo: 'usuario',
      },
    ],
  },
  recepcion: {
    citasHoy: '42',
    llegadasRegistradas: '27',
    salaEspera: '5',
    citasPendientes: [
      {
        id: 1,
        paciente: 'María García',
        médico: 'Dr. Hernández',
        hora: '14:30',
        estado: 'En sala de espera',
      },
      {
        id: 2,
        paciente: 'Juan López',
        médico: 'Dra. Martínez',
        hora: '15:15',
        estado: 'Pendiente',
      },
    ],
    ultimasActividades: [
      {
        id: 1,
        usuario: 'Usted',
        accion: 'Registró llegada de paciente',
        tiempo: 'hace 5 minutos',
        tipo: 'cita',
      },
      {
        id: 2,
        usuario: 'Usted',
        accion: 'Reprogramó cita',
        tiempo: 'hace 15 minutos',
        tipo: 'cita',
      },
    ],
  },
};

// Definición para configurar dashboards según el rol
export const dashboardConfig = {
  // Dashboard para Administrador Global
  [Role.ADMIN_GLOBAL]: {
    statCards: [
      {
        title: 'Pacientes Activos',
        value: mockData.adminGlobal.pacientesActivos,
        description: 'del mes',
        icon: Users,
        trend: 'up',
        trendValue: '12.5%',
      },
      {
        title: 'Citas Programadas Hoy',
        value: mockData.adminGlobal.citasHoy,
        description: '14 pendientes',
        icon: Calendar,
        trend: 'up',
        trendValue: '8.2%',
      },
      {
        title: 'Expedientes Abiertos',
        value: mockData.adminGlobal.expedientesAbiertos,
        description: 'necesitan revisión',
        icon: FileText,
        trend: 'down',
        trendValue: '3.1%',
      },
      {
        title: 'Alertas Activas',
        value: mockData.adminGlobal.alertasPendientes,
        description: '4 críticas',
        icon: AlertTriangle,
        trend: 'up',
        trendValue: '24%',
      },
      {
        title: 'Ocupación de Médicos',
        value: mockData.adminGlobal.ocupacionMedicos,
        description: 'capacidad total',
        icon: Activity,
        trend: 'up',
        trendValue: '5.4%',
      },
      {
        title: 'Centros Médicos Activos',
        value: mockData.adminGlobal.centrosActivos,
        description: 'de 10 totales',
        icon: Building2,
        trend: null,
        trendValue: null,
      },
      {
        title: 'Usuarios en línea',
        value: mockData.adminGlobal.usuariosActivos,
        description: 'en este momento',
        icon: UserPlus,
        trend: null,
        trendValue: null,
      },
    ],
    showCharts: true,
    chartTabs: [
      {
        id: 'citas',
        label: 'Citas',
        description: 'Gráfico de citas completadas vs canceladas',
      },
      {
        id: 'pacientes',
        label: 'Pacientes',
        description: 'Nuevos pacientes registrados',
      },
      {
        id: 'expedientes',
        label: 'Expedientes',
        description: 'Expedientes creados y actualizados',
      },
    ],
    recentActivities: mockData.adminGlobal.ultimasActividades,
    showAppointments: true,
    appointments: mockData.adminGlobal.citasPendientes,
    showAlerts: true,
    securityAlerts: mockData.adminGlobal.alertasSeguridad,
  },

  // Dashboard para Médicos
  [Role.MEDICO]: {
    statCards: [
      {
        title: 'Pacientes Hoy',
        value: mockData.medico.pacientesHoy,
        description: 'en su agenda',
        icon: Users,
        trend: null,
        trendValue: null,
      },
      {
        title: 'Citas Pendientes',
        value: mockData.medico.citasPendientesCount,
        description: 'próxima: ' + mockData.medico.proximaCita,
        icon: Calendar,
        trend: null,
        trendValue: null,
      },
      {
        title: 'Expedientes Pendientes',
        value: mockData.medico.expedientesPendientes,
        description: 'requieren actualización',
        icon: FileText,
        trend: null,
        trendValue: null,
      },
      {
        title: 'Ocupación de Hoy',
        value: '65%',
        description: 'de su horario',
        icon: Clock,
        trend: null,
        trendValue: null,
      },
    ],
    showCharts: true,
    chartTabs: [
      {
        id: 'historial',
        label: 'Historial',
        description: 'Consultas realizadas esta semana',
      },
      {
        id: 'diagnosticos',
        label: 'Diagnósticos',
        description: 'Diagnósticos más frecuentes',
      },
    ],
    recentActivities: mockData.medico.ultimasActividades,
    showAppointments: true,
    appointments: mockData.medico.citasPendientes,
    showAlerts: false,
  },

  // Dashboard para Enfermería
  [Role.ENFERMERIA]: {
    statCards: [
      {
        title: 'Pacientes Activos',
        value: mockData.enfermeria.pacientesActivos,
        description: 'en el área',
        icon: HeartPulse,
        trend: null,
        trendValue: null,
      },
      {
        title: 'Próximos Ingresos',
        value: mockData.enfermeria.proximosIngresos,
        description: 'en la próxima hora',
        icon: UserRound,
        trend: null,
        trendValue: null,
      },
      {
        title: 'Tareas Asignadas',
        value: mockData.enfermeria.tareasAsignadas,
        description: '2 urgentes',
        icon: ClipboardCheck,
        trend: null,
        trendValue: null,
      },
      {
        title: 'Medicamentos',
        value: '8',
        description: 'pendientes de administrar',
        icon: Pill,
        trend: null,
        trendValue: null,
      },
    ],
    showCharts: false,
    recentActivities: mockData.enfermeria.ultimasActividades,
    showAppointments: false,
    showAlerts: false,
  },

  // Dashboard para Recepción
  [Role.RECEPCIONISTA]: {
    statCards: [
      {
        title: 'Citas Hoy',
        value: mockData.recepcion.citasHoy,
        description: 'programadas',
        icon: Calendar,
        trend: null,
        trendValue: null,
      },
      {
        title: 'Llegadas Registradas',
        value: mockData.recepcion.llegadasRegistradas,
        description: 'de hoy',
        icon: UserRound,
        trend: null,
        trendValue: null,
      },
      {
        title: 'Sala de Espera',
        value: mockData.recepcion.salaEspera,
        description: 'pacientes',
        icon: Clock,
        trend: null,
        trendValue: null,
      },
      {
        title: 'Próxima Disponibilidad',
        value: 'Mañana',
        description: '10:00 AM',
        icon: FileClock,
        trend: null,
        trendValue: null,
      },
    ],
    showCharts: false,
    recentActivities: mockData.recepcion.ultimasActividades,
    showAppointments: true,
    appointments: mockData.recepcion.citasPendientes,
    showAlerts: false,
  },

  // Dashboard por defecto (para roles sin configuración específica)
  default: {
    statCards: [
      {
        title: 'Citas Hoy',
        value: 'N/A',
        description: 'sin datos',
        icon: Calendar,
        trend: null,
        trendValue: null,
      },
    ],
    showCharts: false,
    recentActivities: [],
    showAppointments: false,
    showAlerts: false,
  },
};
