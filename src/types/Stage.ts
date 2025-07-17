export interface Stage {
  id: string;
  etudiant: {
    nom: string;
    prenom: string;
    email: string;
    telephone: string;
  };
  entreprise: {
    nom: string;
    secteur: string;
    adresse: string;
    ville: string;
  };
  stage: {
    poste: string;
    description: string;
    dateDebut: string;
    dateFin: string;
    statut: 'En cours' | 'Terminé' | 'Annulé' | 'À venir';
    type: 'Stage' | 'Alternance' | 'Projet';
  };
  responsables: {
    entreprise: {
      nom: string;
      email: string;
      telephone: string;
    };
    ecole: {
      nom: string;
      email: string;
    };
  };
  notes: string;
  createdAt: string;
  updatedAt: string;
}