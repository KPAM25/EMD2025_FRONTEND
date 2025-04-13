'use client';
import { useState, useEffect } from 'react';
import { Pais } from '@/features/users/interfaces/persona';

interface Entidad {
  idEntidad: number;
  catalogKey: number;
  entidadFederativa: string;
  abreviatura: string;
  fkPais: Pais;
  estatusEntidad: number;
}

export const useEntidades = (paisId: string | undefined) => {
  const [entidades, setEntidades] = useState<Entidad[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEntidades = async () => {
      if (!paisId) {
        setEntidades([]);
        return;
      }

      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch(`http://localhost:8080/entidad/getByPais/${paisId}`);
        if (!response.ok) {
          throw new Error('Error al cargar las entidades');
        }
        const data = await response.json();
        setEntidades(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error desconocido');
        setEntidades([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchEntidades();
  }, [paisId]);

  return { entidades, isLoading, error };
}; 