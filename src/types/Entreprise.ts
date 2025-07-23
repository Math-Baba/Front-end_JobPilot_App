export interface Entreprise {
  id: string;
  entreprise: {
    nom: string;
    secteur: 'Cybersécurité & Cloud' | 'Fintech' | 'IA & Data' | 'Développement logiciel' | 'Robotique & IOT' | 'Développement Web' | 'Autre';
    adresse: string;
    email: string;
    contact: number;
    typeEntreprise: 'PME' | 'Grande entreprise' | 'Start-up' | 'Association' | 'Administration' | 'Autre';
  };
  Poste: {
    poste: string;
    statut: 'En Attente' | 'Entretien' | 'Accepté' | 'Refusé';
    typePoste: 'Stage' | 'Alternance' | 'Emploi' | 'Autre' ;
    description: string;
    dateCandidature: string;
  };
  notes: string;
  createdAt: string;
  updatedAt: string;
}

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