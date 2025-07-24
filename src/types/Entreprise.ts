export interface JobApplicationRequest {
  id?: string;
  jobCompanyInfo: {
    id?: string;
    name: string;
    sector: 'CYBERSECURITE_CLOUD' | 'FINTECH' | 'AI_DATA' | 'DEVELOPPEMENT_LOGICIEL' | 'ROBOTIQUE_IOT' | 'DEVELOPPEMENT_WEB' | '' ;
    adress?: string | null;
    email: string;
    phone?: number | null;
    companyType: 'ADMINISTRATION' | 'ASSOCIATION' | 'GRANDE_ENTREPRISE' | 'PME' | 'STARTUP' | '';
  };
  jobPositionInfo: {
    id?: string;
    jobTitle: string;
    status: 'ATTENTE' | 'ACCEPTE' | 'REFUSE' | 'ENTRETIEN' | '';
    positionType: 'STAGE' | 'ALTERNANCE' | 'EMPLOI' | '';
    applicationDate: string; 
    description?: string | null;
  };
  notes?: string | null;
}

export interface JobApplicationResponse {
  id: string;
  companyName: string;
  sector: 'CYBERSECURITE_CLOUD' | 'FINTECH' | 'AI_DATA' | 'DEVELOPPEMENT_LOGICIEL' | 'ROBOTIQUE_IOT' | 'DEVELOPPEMENT_WEB' | '';
  companyAdress: string;
  companyType: 'ADMINISTRATION' | 'ASSOCIATION' | 'GRANDE_ENTREPRISE' | 'PME' | 'STARTUP' | '';
  jobTitle: string;
  status: 'ATTENTE' | 'ACCEPTE' | 'REFUSE' | 'ENTRETIEN' | '';
  positionType: 'STAGE' | 'ALTERNANCE' | 'EMPLOI' | '';
  applicationDate: string;
};


export const ENTREPRISE_TYPES = [
  'PME',
  'Grande entreprise',
  'Start-up',
  'Association',
  'Administration',
  'Autre',
] as const;

export const ENTREPRISE_SECTEURS = [
  'Cybersécurité & Cloud',
  'Fintech',
  'IA & Data',
  'Développement logiciel',
  'Robotique & IOT',
  'Développement Web',
  'Autre',
] as const;

export const POSTE_STATUTS = [
  'En Attente',
  'Entretien',
  'Accepté', 
  'Refusé',
] as const;

export const POSTE_TYPES = [
  'Stage',
  'Alternance',
  'Emploi' 
] as const;