'use client';
import { useState, useEffect } from 'react';

interface Sexo {
  idSexo: number;
  catalogKey: number;
  descripcion: string;
  orden: number;
  estatusSexo: number;
}

export const useSexos = () => {
  const [sexos, setSexos] = useState<Sexo[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSexos = async () => {
      try {
        const response = await fetch('http://localhost:8080/sexo/getAllEstatus/1');
        if (!response.ok) {
          throw new Error('Error al cargar los sexos');
        }
        const data = await response.json();
        setSexos(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error desconocido');
      } finally {
        setIsLoading(false);
      }
    };

    fetchSexos();
  }, []);

  return { sexos, isLoading, error };
}; 