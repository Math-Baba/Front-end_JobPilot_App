import React from 'react';
import { Eye, Edit, Trash2, Building, User, Calendar, MapPin } from 'lucide-react';
import { Stage } from '../types/Stage';

interface StageCardProps {
  stage: Stage;
  onView: (stage: Stage) => void;
  onEdit: (stage: Stage) => void;
  onDelete: (id: string) => void;
}

const StageCard: React.FC<StageCardProps> = ({ stage, onView, onEdit, onDelete }) => {
  const getStatusColor = (statut: string) => {
    switch (statut) {
      case 'En cours':
        return 'bg-blue-100 text-blue-800';
      case 'Terminé':
        return 'bg-green-100 text-green-800';
      case 'Annulé':
        return 'bg-red-100 text-red-800';
      case 'À venir':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'Stage':
        return 'bg-purple-100 text-purple-800';
      case 'Alternance':
        return 'bg-indigo-100 text-indigo-800';
      case 'Projet':
        return 'bg-orange-100 text-orange-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6 hover:shadow-lg transition-shadow duration-200">
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            {stage.etudiant.prenom} {stage.etudiant.nom}
          </h3>
          <p className="text-gray-600 font-medium">{stage.stage.poste}</p>
        </div>
        <div className="flex space-x-2">
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(stage.stage.statut)}`}>
            {stage.stage.statut}
          </span>
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(stage.stage.type)}`}>
            {stage.stage.type}
          </span>
        </div>
      </div>

      <div className="space-y-2 mb-4">
        <div className="flex items-center text-sm text-gray-600">
          <Building className="w-4 h-4 mr-2" />
          <span>{stage.entreprise.nom} - {stage.entreprise.secteur}</span>
        </div>
        <div className="flex items-center text-sm text-gray-600">
          <MapPin className="w-4 h-4 mr-2" />
          <span>{stage.entreprise.ville}</span>
        </div>
        <div className="flex items-center text-sm text-gray-600">
          <Calendar className="w-4 h-4 mr-2" />
          <span>{new Date(stage.stage.dateDebut).toLocaleDateString('fr-FR')} - {new Date(stage.stage.dateFin).toLocaleDateString('fr-FR')}</span>
        </div>
        <div className="flex items-center text-sm text-gray-600">
          <User className="w-4 h-4 mr-2" />
          <span>{stage.responsables.entreprise.nom}</span>
        </div>
      </div>

      <div className="flex justify-end space-x-2">
        <button
          onClick={() => onView(stage)}
          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors duration-200"
          title="Voir les détails"
        >
          <Eye className="w-4 h-4" />
        </button>
        <button
          onClick={() => onEdit(stage)}
          className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors duration-200"
          title="Modifier"
        >
          <Edit className="w-4 h-4" />
        </button>
        <button
          onClick={() => onDelete(stage.id)}
          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200"
          title="Supprimer"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default StageCard;