import { useState, useEffect } from 'react';
import { construcCurp } from '@/helpers/curp'; // Asegúrate de ajustar la ruta según tu proyecto

// Definimos la interfaz de los valores del formulario
interface CurpFormValues {
  nombre: string;
  apellidoPaterno: string;
  apellidoMaterno: string;
  sexo: string;
  fechaNacimiento: Date;
  estado: string;
}

// Hook reutilizable para construir la CURP dinámicamente
const useCurpBuilder = (initialValues: CurpFormValues) => {
  const [formValues, setFormValues] = useState<CurpFormValues>(initialValues);
  const [curp, setCurp] = useState<string>('');

  useEffect(() => {
    // Se genera la CURP base con la función existente (que produce 18 caracteres)
    const baseCurp = construcCurp({
      name: formValues.nombre,
      firstLastName: formValues.apellidoPaterno,
      secondLastName: formValues.apellidoMaterno,
      sex: formValues.sexo,
      birthDate: formValues.fechaNacimiento,
      state: formValues.estado,
    });

    // La función construcCurp asigna por defecto los últimos dos dígitos (para homoclave y verificador).
    // Si el usuario ingresa manualmente ambos valores, se reemplazan los dígitos 17 y 18

    setCurp(baseCurp);
  }, [formValues]);

  return { curp, formValues, setFormValues };
};

export default useCurpBuilder;
