import React,{ useState } from 'react';
import { Search, Filter, Plus, ChevronDown, ChevronUp } from 'lucide-react';
import FilterPanel from "./FilterPanel";

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
  onPosteFilterChange,
}) => {
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);

  // États locaux pour les filtres avancés
  const [filterName, setFilterName] = useState("");
  const [filtertypePoste, setFiltertypePoste] = useState<string[]>([]);
  const [filterStatus, setFilterStatus] = useState<string[]>([]);
  const [filterStartDates, setFilterStartDates] = useState<string[]>([]);
  const [filterSortBy, setFilterSortBy] = useState<string>("dateCandidature");
  const [filterTypeEntreprise, setFilterTypeEntreprise] = useState<string[]>([]);
  const [filterSecteurs, setFilterSecteurs] = useState<string[]>([]);

  // Appliquer les filtres avancés aux filtres principaux
  const handleApplyAdvancedFilters = () => {
    onSearchChange(filterName);
    onTypeFilterChange(filtertypePoste[0] || "");
    onStatusFilterChange(filterStatus[0] || "");
    onSortChange("typeEntreprise"); // le tri est fixé
    onTypeFilterChange(filterTypeEntreprise[0] || "");
    // Ici, il faudra adapter la logique pour appliquer filterSecteurs dans App
    setShowAdvancedFilters(false);
  };

  // Réinitialiser tous les filtres
  const handleResetAll = () => {
    setFilterName("");
    setFiltertypePoste([]);
    setFilterStatus([]);
    setFilterStartDates([]);
    setFilterTypeEntreprise([]);
    setFilterSecteurs([]);
    onReset();
  };

  return (
    <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6 mb-6">
      {/* Recherche */}
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

      {/* Actions principales (boutons + filtre avancé) */}
      <div className="flex flex-col md:flex-row md:items-center gap-2 justify-between mb-4">
        <button
          onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
          className="flex items-center text-blue-600 hover:underline text-sm"
        >
          <Filter className="w-4 h-4 mr-1" />
          {showAdvancedFilters ? "Masquer les filtres avancés" : "Afficher les filtres avancés"}
          {showAdvancedFilters ? <ChevronUp className="ml-1 w-4 h-4" /> : <ChevronDown className="ml-1 w-4 h-4" />}
        </button>
        <div className="flex gap-2">
          <button
            onClick={onReset}
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

      {/* Affichage du panneau de filtres avancés */}
      {showAdvancedFilters && (
        <div className="mt-2">
          <FilterPanel
            filterName={filterName}
            setFilterName={setFilterName}
            filtertypePoste={filtertypePoste}
            setFiltertypePoste={setFiltertypePoste}
            filterStatus={filterStatus}
            setFilterStatus={setFilterStatus}
            filterStartDates={filterStartDates}
            setFilterStartDates={setFilterStartDates}
            filterTypeEntreprise={filterTypeEntreprise}
            setFilterTypeEntreprise={setFilterTypeEntreprise}
            filterSecteurs={filterSecteurs}
            setFilterSecteurs={setFilterSecteurs}
            onReset={handleResetAll}
            onApply={handleApplyAdvancedFilters}
          />
        </div>
      )}
    </div>
  );
};

export default SearchAndFilters;
