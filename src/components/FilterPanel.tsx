import React from "react";
import {
  ENTREPRISE_TYPES,
  ENTREPRISE_SECTEURS,
  POSTE_STATUTS,
  POSTE_TYPES,
} from "../types/Entreprise";
import { FilterJobApplications } from "../types/Entreprise";

interface FilterPanelProps {
  filters: FilterJobApplications;
  setFilters: React.Dispatch<React.SetStateAction<FilterJobApplications>>; // Fonction pour modifier les filtres
  onReset: () => void;
  onApply: () => Promise<void>;
}

const FilterPanel: React.FC<FilterPanelProps> = ({
  filters,
  setFilters,
  onApply,
}) => {
  // Fonction appelée quand on clique sur une case à cocher pour ajouter ou retirer un filtre
  const handleCheckboxChange = (filterType: keyof FilterJobApplications, value: string) => {
    setFilters(prev => {
      // Récupère la valeur actuelle du filtre
      const currentValues = prev[filterType] || [];
      // Vérifie si la valeur est coché
      const isChecked = currentValues.includes(value);
      
      return {
        ...prev,
        // Si la valeur est déjà cochée, on la retire, sinon on l'ajoute
        [filterType]: isChecked
          ? currentValues.filter(item => item !== value)
          : [...currentValues, value]
      };
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await onApply(); // Appelle la fonction d'application des filtres passée en props
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-4 border rounded-lg bg-white shadow space-y-4 w-full max-w-md"
    >
      <h2 className="text-lg font-semibold">Filtres</h2>

      <fieldset>
        <legend className="text-sm font-medium mb-1">Type de poste</legend>
        {Object.keys(POSTE_TYPES).map((type) => (
          <label key={type} className="flex items-center space-x-2 mb-1">
            <input 
              type="checkbox" 
              checked={filters.positionType?.includes(type) || false}
              onChange={() => handleCheckboxChange('positionType', type)}
            />
            <span>{type}</span>
          </label>
        ))}
      </fieldset>

      

      <fieldset>
        <legend className="text-sm font-medium mb-1">Statut</legend>
        {Object.keys(POSTE_STATUTS).map((status) => (
          <label key={status} className="flex items-center space-x-2 mb-1">
            <input 
              type="checkbox" 
              checked={filters.status?.includes(status) || false}
              onChange={() => handleCheckboxChange('status', status)}
            />
            <span>{status}</span>
          </label>
        ))}
      </fieldset>

      <fieldset>
        <legend className="text-sm font-medium mb-1">Secteur</legend>
        {Object.keys(ENTREPRISE_SECTEURS).map((secteur) => (
          <label key={secteur} className="flex items-center space-x-2 mb-1">
            <input 
              type="checkbox" 
              checked={filters.sector?.includes(secteur) || false}
              onChange={() => handleCheckboxChange('sector', secteur)}
            />
            <span>{secteur}</span>
          </label>
        ))}
      </fieldset>

      <fieldset>
        <legend className="text-sm font-medium mb-1">Type d'entreprise</legend>
        {Object.keys(ENTREPRISE_TYPES).map((type) => (
          <label key={type} className="flex items-center space-x-2 mb-1">
            <input 
              type="checkbox" 
              checked={filters.companyType?.includes(type) || false}
              onChange={() => handleCheckboxChange('companyType', type)}
            />
            <span>{type}</span>
          </label>
        ))}
      </fieldset>

      <div className="flex justify-between">
        <button
          type="submit"
          className="px-4 py-2 text-sm bg-[#000814] text-white rounded hover:bg-[#1b263b]"
        >
          Appliquer
        </button>
      </div>
    </form>
  );
};

export default FilterPanel;