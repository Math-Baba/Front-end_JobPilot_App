export type Sector = 'CYBERSECURITE_CLOUD' | 'FINTECH' | 'AI_DATA' | 'DEVELOPPEMENT_LOGICIEL' | 'ROBOTIQUE_IOT' | 'DEVELOPPEMENT_WEB' | '';
export type CompanyType = 'ADMINISTRATION' | 'ASSOCIATION' | 'GRANDE_ENTREPRISE' | 'PME' | 'STARTUP' | '';
export type Status = 'ATTENTE' | 'ACCEPTE' | 'REFUSE' | 'ENTRETIEN' | '';
export type PositionType = 'STAGE' | 'ALTERNANCE' | 'EMPLOI' | '';

export interface JobApplicationRequest {
  id?: string;
  jobCompanyInfo: {
    id?: string;
    name: string;
    sector: Sector;
    adress?: string | null;
    email: string;
    phone?: number | null;
    website?: string | null;
    companyType: CompanyType;
  };
  jobPositionInfo: {
    id?: string;
    jobTitle: string;
    status: Status;
    positionType: PositionType;
    applicationDate: string; 
    description?: string | null;
  };
  notes?: string | null;
}

export interface JobApplicationResponse {
  id: string;
  companyName: string;
  email: string;
  sector: Sector;
  companyAdress: string;
  companyType: CompanyType;
  jobTitle: string;
  status: Status;
  positionType: PositionType;
  applicationDate: string;
};

export interface FilterJobApplications {
  positionType?: string[];
  status?: string[];
  sector?: string[];
  companyType?: string[];
}



export const ENTREPRISE_TYPES : Record<string, CompanyType> = {
  'PME': 'PME',
  'Grande entreprise': 'GRANDE_ENTREPRISE',
  'Start-up': 'STARTUP',
  'Association': 'ASSOCIATION',
  'Administration': 'ADMINISTRATION',
}

export const ENTREPRISE_SECTEURS : Record<string, Sector> = {
  'Cybersécurité & Cloud': 'CYBERSECURITE_CLOUD',
  'Fintech': 'FINTECH',
  'IA & Data': 'AI_DATA',
  'Développement logiciel': 'DEVELOPPEMENT_LOGICIEL',
  'Robotique & IOT': 'ROBOTIQUE_IOT',
  'Développement Web': 'DEVELOPPEMENT_WEB',
} 

export const POSTE_STATUTS : Record<string, Status> = {
  'En Attente': 'ATTENTE',
  'Entretien': 'ENTRETIEN',
  'Accepté': 'ACCEPTE',
  'Refusé': 'REFUSE'
}

export const POSTE_TYPES : Record<string, PositionType> = { 
  'Stage': 'STAGE',
  'Alternance': 'ALTERNANCE',
  'Emploi': 'EMPLOI'
}
