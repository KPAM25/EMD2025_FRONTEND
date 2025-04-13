'use client';
import { HeaderPageComponent } from '@/components/header-page';
import React from 'react';
import { useModalStore } from '@/store/use-modal';
import { useRouter } from 'next/navigation';
import { PersonalInfoForm } from '@/components/forms/person-form';
import { Modal } from '@/components/ui/modal';
import { ExpedientePersonalInfo } from '@/models/persona-info.schema';
import { ConfirmationCard, formatters } from '@/components/ui/confirmation-card';
import api from '@/lib/api';
import { AxiosError } from 'axios';

// Componente para mostrar datos de confirmación con buena UI/UX
const ConfirmUserData = ({ data }: { data: ExpedientePersonalInfo }) => {
  const fields = [
    { label: 'Nombre', value: data.nombre },
    { label: 'Apellido Paterno', value: data.primerApellido },
    { label: 'Apellido Materno', value: data.segundoApellido || '-' },
    {
      label: 'Fecha de Nacimiento',
      value: formatters.date(data.fechaNacimiento),
    },
    { label: 'CURP', value: data.curp },
    { label: 'Sexo', value: formatters.sex(data.sexo) },
  ];

  return (
    <ConfirmationCard
      fields={fields}
      title='Información del Usuario'
      subtitle='Los siguientes datos serán registrados en el sistema'
    />
  );
};

const NewUserPage = () => {
  const router = useRouter();
  const { openModal } = useModalStore();

  const transformData = (formData: ExpedientePersonalInfo) => {
    // Validamos que los datos requeridos no estén vacíos
    if (!formData.nombre || !formData.primerApellido || !formData.fechaNacimiento || 
        !formData.curp || !formData.sexo || !formData.paisNacimiento || !formData.estadoNacimiento) {
      throw new Error('Todos los campos son obligatorios');
    }

    const transformedData = {
      activoPersona: 1,
      nombresPersona: formData.nombre.trim(),
      primerApellidoPersona: formData.primerApellido.trim(),
      segundoApellidoPersona: formData.segundoApellido?.trim() || '',
      fechaNacimientoPersona: formData.fechaNacimiento,
      curpPersona: formData.curp.trim(),
      fkSexoCurp: {
        catalogKey: formData.sexo
      },
      fkPaisNac: {
        idPais: parseInt(formData.paisNacimiento)
      },
      fkEntidadNac: {
        catalogKey: formData.estadoNacimiento
      }
    };

    console.log('Datos transformados:', transformedData);
    return transformedData;
  };

  const handleSubmit = async (formData: ExpedientePersonalInfo) => {
    console.log("Datos del formulario:", formData);
    
    // Abrimos el modal de confirmación
    openModal({
      title: 'Confirmar datos del usuario',
      description: 'Por favor verifica la información antes de guardar',
      content: <ConfirmUserData data={formData} />,
      okText: 'Guardar usuario',
      cancelText: 'Modificar datos',
      onOk: async () => {
        try {
          // Transformamos los datos al formato requerido
          const transformedData = transformData(formData);
          
          // Realizamos la llamada al backend
          console.log('Enviando datos al backend:', transformedData);
          const response = await api.post('/persona/create', transformedData);
          console.log('Respuesta del backend:', response);
          
          if (response.status === 201) {
            router.push('/admin/usuarios');
          }
        } catch (error: unknown) {
          console.error('Error completo:', error);
          let errorMessage = 'Error al crear el usuario';
          
          if (error instanceof AxiosError) {
            if (error.response?.data?.message) {
              errorMessage = error.response.data.message;
            } else if (error.response?.data) {
              errorMessage = JSON.stringify(error.response.data);
            } else if (error.message) {
              errorMessage = error.message;
            }
          }
          
          // Aquí podrías mostrar el error al usuario de manera más amigable
          alert(errorMessage); // O usar un componente de notificación más elegante
        }
      },
    });
  };

  return (
    <div>
      <HeaderPageComponent title='Nuevo usuario' />
      <PersonalInfoForm
        initialData={{
          nombre: '',
          primerApellido: '',
          segundoApellido: '',
          fechaNacimiento: '',
          sexo: '',
          paisNacimiento: '',
          estadoNacimiento: '',
        }}
        onSubmit={handleSubmit}
      />
      <Modal />
    </div>
  );
};

export default NewUserPage;
