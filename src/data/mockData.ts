import { Stage } from '../types/Stage';

export const mockStages: Stage[] = [
  {
    id: '1',
    etudiant: {
      nom: 'Dubois',
      prenom: 'Marie',
      email: 'marie.dubois@email.com',
      telephone: '0123456789'
    },
    entreprise: {
      nom: 'TechCorp',
      secteur: 'Informatique',
      adresse: '123 Rue de la Tech',
      ville: 'Paris'
    },
    stage: {
      poste: 'Développeur Frontend',
      description: 'Développement d\'applications web avec React',
      dateDebut: '2024-02-01',
      dateFin: '2024-07-31',
      statut: 'En cours',
      type: 'Stage'
    },
    responsables: {
      entreprise: {
        nom: 'Jean Martin',
        email: 'jean.martin@techcorp.com',
        telephone: '0123456788'
      },
      ecole: {
        nom: 'Prof. Durand',
        email: 'durand@ecole.edu'
      }
    },
    notes: 'Étudiant très motivé, bon niveau technique',
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-01-15T10:00:00Z'
  },
  {
    id: '2',
    etudiant: {
      nom: 'Lefebvre',
      prenom: 'Pierre',
      email: 'pierre.lefebvre@email.com',
      telephone: '0123456790'
    },
    entreprise: {
      nom: 'DataScience Inc',
      secteur: 'Data Science',
      adresse: '456 Avenue des Données',
      ville: 'Lyon'
    },
    stage: {
      poste: 'Data Analyst',
      description: 'Analyse de données et création de tableaux de bord',
      dateDebut: '2024-03-01',
      dateFin: '2024-08-31',
      statut: 'À venir',
      type: 'Stage'
    },
    responsables: {
      entreprise: {
        nom: 'Sophie Bernard',
        email: 'sophie.bernard@datascience.com',
        telephone: '0123456791'
      },
      ecole: {
        nom: 'Prof. Moreau',
        email: 'moreau@ecole.edu'
      }
    },
    notes: 'Bon profil analytique, recommandé par le département',
    createdAt: '2024-01-20T14:30:00Z',
    updatedAt: '2024-01-20T14:30:00Z'
  },
  {
    id: '3',
    etudiant: {
      nom: 'Garcia',
      prenom: 'Ana',
      email: 'ana.garcia@email.com',
      telephone: '0123456792'
    },
    entreprise: {
      nom: 'Marketing Pro',
      secteur: 'Marketing',
      adresse: '789 Boulevard du Commerce',
      ville: 'Marseille'
    },
    stage: {
      poste: 'Assistant Marketing Digital',
      description: 'Gestion des réseaux sociaux et campagnes publicitaires',
      dateDebut: '2023-09-01',
      dateFin: '2024-02-29',
      statut: 'Terminé',
      type: 'Stage'
    },
    responsables: {
      entreprise: {
        nom: 'Marc Dubois',
        email: 'marc.dubois@marketingpro.com',
        telephone: '0123456793'
      },
      ecole: {
        nom: 'Prof. Leroy',
        email: 'leroy@ecole.edu'
      }
    },
    notes: 'Excellent stage, étudiante très créative',
    createdAt: '2023-08-15T09:00:00Z',
    updatedAt: '2024-03-01T16:00:00Z'
  },
  {
    id: '4',
    etudiant: {
      nom: 'Kowalski',
      prenom: 'Adam',
      email: 'adam.kowalski@email.com',
      telephone: '0123456794'
    },
    entreprise: {
      nom: 'InnovateLab',
      secteur: 'Recherche & Développement',
      adresse: '321 Rue de l\'Innovation',
      ville: 'Toulouse'
    },
    stage: {
      poste: 'Développeur Full Stack',
      description: 'Développement d\'applications web et mobile',
      dateDebut: '2024-01-15',
      dateFin: '2024-06-15',
      statut: 'En cours',
      type: 'Alternance'
    },
    responsables: {
      entreprise: {
        nom: 'Claire Martin',
        email: 'claire.martin@innovatelab.com',
        telephone: '0123456795'
      },
      ecole: {
        nom: 'Prof. Petit',
        email: 'petit@ecole.edu'
      }
    },
    notes: 'Alternance très prometteuse, bon investissement',
    createdAt: '2024-01-01T08:00:00Z',
    updatedAt: '2024-01-01T08:00:00Z'
  }
];