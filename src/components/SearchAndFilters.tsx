import React from 'react';
import { Search, Filter, Plus } from 'lucide-react';

interface SearchAndFiltersProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  statusFilter: string;
  onStatusFilterChange: (value: string) => void;
  typeFilter: string;
  onTypeFilterChange: (value: string) => void;
  sortBy: string;
  onSortChange: (value: string) => void;
  onAddNew: () => void;
  onReset: () => void;
  posteFilter: string;
  onPosteFilterChange: (value: string) => void;
}

const SearchAndFilters: React.FC<SearchAndFiltersProps> = ({
  searchTerm,
  onSearchChange,
  statusFilter,
  onStatusFilterChange,
  typeFilter,
  onTypeFilterChange,
  sortBy,
  onSortChange,
  onAddNew,
  onReset,
  posteFilter,
  onPosteFilterChange
}) => {
  return (
    <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6 mb-6">
      {/* Barre de recherche en haut */}
      <div className="mb-4">
        <div className="relative mb-2">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Rechercher par nom, entreprise, poste..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>
      {/* Filtres, reset et bouton ajouter en bas */}
      <div className="flex flex-col md:flex-row md:items-center gap-4 justify-between">
        <div className="flex gap-4 flex-1">
          <select
            value={statusFilter}
            onChange={(e) => onStatusFilterChange(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            title="Filtrer par statut"
          >
            <option value="">Tous les statuts</option>
            <option value="Non Postulé">Non Postulé</option>
            <option value="Postulé">Postulé</option>
            <option value="Entretien">Entretien</option>
            <option value="Accepté">Accepté</option>
            <option value="Refusé">Refusé</option>
          </select>

          <select
            value={typeFilter}
            onChange={(e) => onTypeFilterChange(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            title="Filtrer par type de poste"
          >
            <option value="">Tous les types</option>
            <option value="Stage">Stage</option>
            <option value="Alternance">Alternance</option>
            <option value="Emploi">Emploi</option>
          </select>

          <select
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            title="Trier par"
          >
            <option value="poste">Intitulé du poste</option>
            <option value="typeEntreprise">Type d'entreprise</option>
            <option value="dateCandidature">Date de candidature</option>
          </select>
        </div>
        <div className="flex gap-2 mt-2 md:mt-0">
          <button
            onClick={onReset}
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors duration-200"
          >
            Réinitialiser
          </button>
          <button
            onClick={onAddNew}
            className="flex items-center px-4 py-2 bg-[#000814] text-white rounded-lg hover:bg-[#1b263b] transition-colors duration-200"
          >
            <Plus className="w-4 h-4 mr-2" />
            Nouvelle Candidature
          </button>
        </div>
      </div>
    </div>
  );
};

export default SearchAndFilters;