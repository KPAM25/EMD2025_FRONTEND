import { CatalogsResponse } from '@/interfaces/catalogs';

export const getCatalogOptions = (catalog: CatalogsResponse[]) => {
  if (!catalog) return [];
  return catalog.map((item) => ({
    value: String(item.id),
    label: capitalize(item.descripcion),
  }));
};

export const capitalize = (str: string) => {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1);
};
