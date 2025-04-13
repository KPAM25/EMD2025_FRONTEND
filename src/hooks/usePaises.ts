'use client';
import { useState, useEffect } from 'react';

export interface Pais {
  idPais: number;
  catalogKey: number;
  descripcion: string;
  orden: number;
  estatus: number;
}

export const usePaises = () => {
  const [paises, setPaises] = useState<Pais[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPaises = async () => {
      try {
        const response = await fetch('http://localhost:8080/pais/getAllEstatus/1');
        if (!response.ok) {
          throw new Error('Error al cargar los países');
        }
        const data = await response.json();
        setPaises(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error desconocido');
      } finally {
        setIsLoading(false);
      }
    };

    fetchPaises();
  }, []);

  return { paises, isLoading, error };
}; 