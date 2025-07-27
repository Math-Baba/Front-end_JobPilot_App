import React, { useState } from "react";
import { Search, Filter, Plus, ChevronDown, ChevronUp } from "lucide-react";
import FilterPanel from "./FilterPanel";
import { filterJobApplications } from "../service/jobApplication.service";
import {
  FilterJobApplications,
  ENTREPRISE_TYPES,
  ENTREPRISE_SECTEURS,
  POSTE_STATUTS,
  POSTE_TYPES,
} from "../types/Entreprise";

interface SearchAndFiltersProps {
  onSearch: (value: string) => void;
  onAddNew: () => void;
  onUpdateResults: (results: any[]) => void;
  onReset: () => void;
}

const SearchAndFilters: React.FC<SearchAndFiltersProps> = ({
  onSearch,
  onAddNew,
  onUpdateResults,
  onReset,
}) => {
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [filters, setFilters] = useState<FilterJobApplications>({
    positionType: [],
    status: [],
    sector: [],
    companyType: [],
  });

  const handleApplyAdvancedFilters = async () => {
    try {
      // Conversion simple avec les Records
      const apiFilters = {
        positionType: filters.positionType
          ?.map((key) => POSTE_TYPES[key])
          .filter(Boolean),
        status: filters.status
          ?.map((key) => POSTE_STATUTS[key])
          .filter(Boolean),
        sector: filters.sector
          ?.map((key) => ENTREPRISE_SECTEURS[key])
          .filter(Boolean),
        companyType: filters.companyType
          ?.map((key) => ENTREPRISE_TYPES[key])
          .filter(Boolean),
      };

      const results = await filterJobApplications(apiFilters);
      onUpdateResults(results);
      setShowAdvancedFilters(false);
    } catch (error) {
      console.error("Erreur lors du filtrage:", error);
    }
  };

  const handleResetAll = () => {
    // Réinitialiser les filtres locaux
    setFilters({
      positionType: [],
      status: [],
      sector: [],
      companyType: [],
    });
    
    // Réinitialiser la valeur de recherche
    setSearchValue("");

    // Utiliser onReset() du parent pour récupérer toutes les données
    onReset();

    // Masquer les filtres avancés après reset
    setShowAdvancedFilters(false);
  };

  const handleSearchChange = (value: string) => {
    setSearchValue(value);
    onSearch(value);
  };

  return (
    <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6 mb-6">
      {/* Recherche simple */}
      <div className="mb-4">
        <div className="relative mb-2">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Rechercher par nom..."
            value={searchValue}
            onChange={(e) => handleSearchChange(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-col md:flex-row md:items-center gap-2 justify-between mb-4">
        <button
          onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
          className="flex items-center text-[#000814] hover:underline text-sm"
        >
          <Filter className="w-4 h-4 mr-1" />
          {showAdvancedFilters
            ? "Masquer les filtres avancés"
            : "Afficher les filtres avancés"}
          {showAdvancedFilters ? (
            <ChevronUp className="ml-1 w-4 h-4" />
          ) : (
            <ChevronDown className="ml-1 w-4 h-4" />
          )}
        </button>
        <div className="flex gap-2">
          <button
            onClick={handleResetAll}
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
          >
            Réinitialiser
          </button>
          <button
            onClick={onAddNew}
            className="flex items-center px-4 py-2 bg-[#000814] text-white rounded-lg hover:bg-[#1b263b]"
          >
            <Plus className="w-4 h-4 mr-2" />
            Nouvelle Candidature
          </button>
        </div>
      </div>

      {/* Filtres avancés */}
      {showAdvancedFilters && (
        <div className="mt-2">
          <FilterPanel
            filters={filters}
            setFilters={setFilters}
            onReset={handleResetAll}
            onApply={handleApplyAdvancedFilters}
          />
        </div>
      )}
    </div>
  );
};

export default SearchAndFilters;