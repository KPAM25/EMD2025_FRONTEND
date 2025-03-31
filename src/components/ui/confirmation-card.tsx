import { Card, CardContent } from '@/components/ui/card';
import React from 'react';

type FieldData = {
  label: string;
  value: string | React.ReactNode;
};

type ConfirmationCardProps = {
  fields: FieldData[];
  title?: string;
  subtitle?: string;
  className?: string;
};

/**
 * Componente de card para confirmación de datos
 * Muestra información de forma estructurada para que el usuario confirme
 */
export const ConfirmationCard: React.FC<ConfirmationCardProps> = ({
  fields,
  title,
  subtitle,
  className = '',
}) => {
  return (
    <Card
      className={`border-t-4 border-t-primary bg-card/50 mt-4 ${className}`}
    >
      {(title || subtitle) && (
        <div className='border-b border-border/40 p-4 pb-2'>
          {title && <h3 className='text-lg font-medium'>{title}</h3>}
          {subtitle && (
            <p className='text-sm text-muted-foreground mt-1'>{subtitle}</p>
          )}
        </div>
      )}
      <CardContent className='p-6'>
        <div className='grid grid-cols-2 gap-4'>
          {fields.map((field, index) => (
            <div key={index} className='space-y-1'>
              <p className='text-sm font-medium text-muted-foreground'>
                {field.label}:
              </p>
              <div className='font-semibold'>{field.value || '-'}</div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

/**
 * Utilidad para formatear valores comunes
 */
export const formatters = {
  date: (date: Date | string) => {
    if (!date) return '-';
    const d = typeof date === 'string' ? new Date(date) : date;
    return d.toLocaleDateString('es-MX', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  },
  sex: (sexValue: string) => {
    switch (sexValue) {
      case '1':
        return 'Masculino';
      case '2':
        return 'Femenino';
      default:
        return sexValue || 'No especificado';
    }
  },
};
