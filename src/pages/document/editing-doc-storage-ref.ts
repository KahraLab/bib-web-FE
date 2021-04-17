import { DocumentViewData } from '@/models';
import { useStorage } from '@vueuse/core';

export const editingDocViewData = useStorage<DocumentViewData | null>(
  'bib:editing-doc-view-data',
  {} as DocumentViewData
);
