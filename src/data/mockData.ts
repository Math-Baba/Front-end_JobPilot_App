import { Entreprise } from '../types/Entreprise';

export const mockEntreprises: Entreprise[] = [
  {
    id: '1',
    entreprise: {
      nom: 'TechCorp',
      secteur: 'Fintech',
      adresse: '123 Rue de la Tech',
      email: 'techcorp@gmail.com',
      contact: 4567890,
      typeEntreprise: 'PME',
    },
    Poste: {
      poste: 'Développeur Frontend',
      description: 'Développement d\'applications web avec React',
      statut: 'Entretien',
      typePoste: 'Alternance',
      dateCandidature: '2024-02-29',
    },
    notes: 'Aucun',
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-01-15T10:00:00Z',
  },
  {
    id: '2',
    entreprise: {
      nom: 'DataScience Inc',
      secteur: 'IA & Data',
      adresse: '456 Avenue des Données',
      email: 'datascience@gmail.com',
      contact: 4567890,
      typeEntreprise: 'Start-up',
    },
    Poste: {
      poste: 'Data Analyst',
      description: 'Analyse de données et création de tableaux de bord',
      statut: 'Postulé',
      typePoste: 'Emploi',
      dateCandidature: '2025-02-19',
    },
    notes: 'Bon profil analytique, recommandé par le département',
    createdAt: '2024-01-20T14:30:00Z',
    updatedAt: '2024-01-20T14:30:00Z'
  },
  {
    id: '3',
    entreprise: {
      nom: 'CyberSécurité',
      secteur: 'Cybersécurité & Cloud',
      adresse: '789 Boulevard du Commerce',
      email: 'markpro@gmail.com',
      contact: 4567890,
      typeEntreprise: 'Start-up',
    },
    Poste: {
      poste: 'Assistant Marketing Digital',
      description: 'Gestion des réseaux sociaux et campagnes publicitaires',
      statut: 'Refusé',
      typePoste: 'Stage',
      dateCandidature: '2025-08-02',
    },
    notes: 'Excellent Entreprise, étudiante très créative',
    createdAt: '2023-08-15T09:00:00Z',
    updatedAt: '2024-03-01T16:00:00Z'
  },
  {
    id: '4',
    entreprise: {
      nom: 'InnovateLab',
      secteur: 'Développement Web',
      adresse: '321 Rue de l\'Innovation',
      email: 'markpro@gmail.com',
      contact: 4567890,
      typeEntreprise: 'Grande entreprise',
    },
    Poste: {
      poste: 'Développeur Full Stack',
      description: 'Développement d\'applications web et mobile',
      statut: 'Postulé',
      typePoste: 'Alternance',
      dateCandidature: '2024-12-21',
    },
    notes: 'Alternance très prometteuse, bon investissement',
    createdAt: '2024-01-01T08:00:00Z',
    updatedAt: '2024-01-01T08:00:00Z'
  }
];