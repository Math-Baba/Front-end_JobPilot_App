import React from "react";
import {
  Eye,
  Edit,
  Trash2,
  Building,
  Calendar,
  MapPin,
  Factory,
} from "lucide-react";
import { JobApplicationResponse } from "../types/Entreprise";
import { statusLabels, sectorLabels, companyTypeLabels, positionTypeLabels } from "../types/Labels";

// Définition des propriétés attendues par ce composant
interface EntrepriseCardProps {
  jobApplication: JobApplicationResponse;
  onView: () => void;
  onEdit: () => void;
  onDelete: (id: string) => void;
}

const EntrepriseCard: React.FC<EntrepriseCardProps> = ({
  jobApplication,
  onView,
  onEdit,
  onDelete,
}) => {
  // Fonction pour définir les couleurs du statut
  const getStatusColor = (statut: string) => {
    switch (statut) {
      case "Entretien":
        return "bg-purple-100 text-blue-800";
      case "Accepté":
        return "bg-green-100 text-green-800";
      case "Refusé":
        return "bg-red-100 text-red-800";
      case "Attente":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  // Fonction pour définir les couleurs du type de poste
  const getTypeColor = (typePoste: string) => {
    switch (typePoste) {
      case "Stage":
        return "bg-purple-100 text-purple-800";
      case "Alternance":
        return "bg-indigo-100 text-indigo-800";
      case "Emploi":
        return "bg-orange-100 text-orange-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6 hover:shadow-lg transition-shadow duration-200">
      <div className="flex justify-between items-start mb-2">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-1">
            {jobApplication.companyName}
          </h3>
          <p className="text-gray-600 font-medium">{jobApplication.jobTitle}</p>
        </div>
        <div className="flex flex-row space-x-2">
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(statusLabels[jobApplication.status])}`}>
            {statusLabels[jobApplication.status]}
          </span>
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(positionTypeLabels[jobApplication.positionType])}`}>
            {positionTypeLabels[jobApplication.positionType]}
          </span>
        </div>
      </div>
      <div className="space-y-2 mb-4">
        <div className="flex items-center text-sm text-gray-600">
          <Building className="w-4 h-4 mr-2" />
          <span>{sectorLabels[jobApplication.sector]}</span>
        </div>
        <div className="flex items-center text-sm text-gray-600">
          <MapPin className="w-4 h-4 mr-2" />
          <span>{jobApplication.companyAdress}</span>
        </div>
        <div className="flex items-center text-sm text-gray-600">
          <Calendar className="w-4 h-4 mr-2" />
          <span>{new Date(jobApplication.applicationDate).toLocaleDateString("fr-FR")}</span>
        </div>
        <div className="flex items-center text-sm text-gray-600">
          <Factory className="w-4 h-4 mr-2" />
          <span>{companyTypeLabels[jobApplication.companyType]}</span>
        </div>
      </div>
      <div className="flex justify-between items-center mt-4">
        <a href={`mailto:${jobApplication.email}`} className="px-3 py-2 bg-[#000814] text-white text-sm rounded-lg hover:bg-[#1b263b]">
          Rappel
        </a>
        <div className="flex space-x-2">
          <button onClick={onView} className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors duration-200" title="Voir les détails">
            <Eye className="w-4 h-4" />
          </button>
          <button onClick={onEdit} className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors duration-200" title="Modifier">
            <Edit className="w-4 h-4" />
          </button>
          <button onClick={() => onDelete(jobApplication.id)} className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200" title="Supprimer">
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default EntrepriseCard;
export { EntrepriseCard };