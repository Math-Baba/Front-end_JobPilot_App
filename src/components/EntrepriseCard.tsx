import React from "react";
import {
  Eye,
  Edit,
  Trash2,
  Building,
  User,
  Calendar,
  MapPin,
  Factory,
} from "lucide-react";
import { Entreprise } from "../types/Entreprise";

interface EntrepriseCardProps {
  Entreprise: Entreprise;
  onView: (Entreprise: Entreprise) => void;
  onEdit: (Entreprise: Entreprise) => void;
  onDelete: (id: string) => void;
}

const EntrepriseCard: React.FC<EntrepriseCardProps> = ({
  Entreprise,
  onView,
  onEdit,
  onDelete,
}) => {
  const getStatusColor = (statut: string) => {
    switch (statut) {
      case "Entretien":
        return "bg-purple-100 text-blue-800";
      case "Accepté":
        return "bg-green-100 text-green-800";
      case "Refusé":
        return "bg-red-100 text-red-800";
      case "En Attente":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

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
      {/* Ligne du haut : titre à gauche, badges à droite */}
      <div className="flex justify-between items-start mb-2">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-1">
            {Entreprise.entreprise.nom}
          </h3>
          <p className="text-gray-600 font-medium">{Entreprise.Poste.poste}</p>
        </div>
        <div className="flex flex-row space-x-2">
          <span
            className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
              Entreprise.Poste.statut
            )}`}
          >
            {Entreprise.Poste.statut}
          </span>
          <span
            className={`px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(
              Entreprise.Poste.typePoste
            )}`}
          >
            {Entreprise.Poste.typePoste}
          </span>
        </div>
      </div>
      {/* Infos entreprise */}
      <div className="space-y-2 mb-4">
        <div className="flex items-center text-sm text-gray-600">
          <Building className="w-4 h-4 mr-2" />
          <span>{Entreprise.entreprise.secteur}</span>
        </div>
        <div className="flex items-center text-sm text-gray-600">
          <MapPin className="w-4 h-4 mr-2" />
          <span>{Entreprise.entreprise.adresse}</span>
        </div>
        <div className="flex items-center text-sm text-gray-600">
          <Calendar className="w-4 h-4 mr-2" />
          <span>
            {new Date(Entreprise.Poste.dateCandidature).toLocaleDateString(
              "fr-FR"
            )}
          </span>
        </div>
        <div className="flex items-center text-sm text-gray-600">
          <Factory className="w-4 h-4 mr-2" />
          <span>{Entreprise.entreprise.typeEntreprise}</span>
        </div>
      </div>
      {/* Boutons Rappel à gauche et Actions à droite */}
      <div className="flex justify-between items-center mt-4">
        <button className="px-3 py-1 bg-[#000814] text-white text-sm rounded-lg hover:bg-[#1b263b]">
          Rappel
        </button>

        <div className="flex space-x-2">
          <button
            onClick={() => onView(Entreprise)}
            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors duration-200"
            title="Voir les détails"
          >
            <Eye className="w-4 h-4" />
          </button>
          <button
            onClick={() => onEdit(Entreprise)}
            className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors duration-200"
            title="Modifier"
          >
            <Edit className="w-4 h-4" />
          </button>
          <button
            onClick={() => onDelete(Entreprise.id)}
            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200"
            title="Supprimer"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default EntrepriseCard;
export { EntrepriseCard };
