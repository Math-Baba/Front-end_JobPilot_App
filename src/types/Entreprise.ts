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
    statut: 'Non Postulé' | 'Postulé' | 'Entretien' | 'Accepté' | 'Refusé';
    typePoste: 'Stage' | 'Alternance' | 'Emploi' | 'Autre' ;
    description: string;
    dateCandidature: string;
  };
  notes: string;
  createdAt: string;
  updatedAt: string;
}