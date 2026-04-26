export type FieldType = 'text' | 'number' | 'date' | 'dropdown' | 'file' | 'boolean' | 'email' | 'phone';

export interface FieldDefinition {
  id: string;
  name: string;
  type: FieldType;
  required: boolean;
  options?: string[];
  order: number;
}

export interface MasterTemplate {
  id?: string;
  companyId: string;
  fields: FieldDefinition[];
  createdAt: string;
}

export interface Company {
  id?: string;
  name: string;
  businessType: string;
  ownerEmail: string;
  currentTemplateId?: string;
}

export interface Employee {
  id?: string;
  companyId: string;
  templateId: string;
  data: Record<string, any>;
  createdAt: string;
  updatedAt: string;
}
