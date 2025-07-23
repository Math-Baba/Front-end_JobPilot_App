import React from "react";
import { ENTREPRISE_TYPES, ENTREPRISE_SECTEURS, POSTE_STATUTS, POSTE_TYPES } from "../types/Entreprise";

const dateApplication = ["2024-01-01", "2024-06-01"];

interface FilterPanelProps {
  filterName: string;
  setFilterName: (value: string) => void;
  filtertypePoste: string[];
  setFiltertypePoste: (value: string[]) => void;
  filterStatus: string[];
  setFilterStatus: (value: string[]) => void;
  filterStartDates: string[];
  setFilterStartDates: (value: string[]) => void;
  filterTypeEntreprise: string[];
  setFilterTypeEntreprise: (value: string[]) => void;
  filterSecteurs: string[];
  setFilterSecteurs: (value: string[]) => void;
  onReset: () => void;
  onApply: () => void;
}

const FilterPanel: React.FC<FilterPanelProps> = ({
  filterName,
  setFilterName,
  filtertypePoste,
  setFiltertypePoste,
  filterStatus,
  setFilterStatus,
  filterStartDates,
  setFilterStartDates,
  filterTypeEntreprise,
  setFilterTypeEntreprise,
  filterSecteurs,
  setFilterSecteurs,
  onReset,
  onApply,
}) => {
  const toggleCheckbox = (
    value: string,
    setter: (value: string[]) => void,
    state: string[]
  ) => {
    if (state.includes(value)) {
      setter(state.filter((v) => v !== value));
    } else {
      setter([...state, value]);
    }
  };

  return (
    <div className="p-4 border rounded-lg w-full max-w-md bg-white shadow">
      <h2 className="text-lg font-semibold mb-4">Filtres</h2>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Nom du poste</label>
        <input
          type="text"
          className="w-full border px-3 py-2 rounded"
          placeholder="Rechercher un nom"
          value={filterName}
          onChange={(e) => setFilterName(e.target.value)}
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Type</label>
        {POSTE_TYPES.map((type) => (
          <label key={type} className="flex items-center space-x-2 mb-1">
            <input
              type="checkbox"
              checked={filtertypePoste.includes(type)}
              onChange={() =>
                toggleCheckbox(type, setFiltertypePoste, filtertypePoste)
              }
            />
            <span>{type}</span>
          </label>
        ))}
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Date de candidature</label>
        {dateApplication.map((date) => (
          <label key={date} className="flex items-center space-x-2 mb-1">
            <input
              type="checkbox"
              checked={filterStartDates.includes(date)}
              onChange={() =>
                toggleCheckbox(date, setFilterStartDates, filterStartDates)
              }
            />
            <span>{date}</span>
          </label>
        ))}
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Statut</label>
        {POSTE_STATUTS.map((status) => (
          <label key={status} className="flex items-center space-x-2 mb-1">
            <input
              type="checkbox"
              checked={filterStatus.includes(status)}
              onChange={() =>
                toggleCheckbox(status, setFilterStatus, filterStatus)
              }
            />
            <span>{status}</span>
          </label>
        ))}
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Secteur</label>
        {ENTREPRISE_SECTEURS.map((secteur) => (
          <label key={secteur} className="flex items-center space-x-2 mb-1">
            <input
              type="checkbox"
              checked={filterSecteurs.includes(secteur)}
              onChange={() =>
                toggleCheckbox(secteur, setFilterSecteurs, filterSecteurs)
              }
            />
            <span>{secteur}</span>
          </label>
        ))}
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Type d'entreprise</label>
        {ENTREPRISE_TYPES.map((type) => (
          <label key={type} className="flex items-center space-x-2 mb-1">
            <input
              type="checkbox"
              checked={filterTypeEntreprise.includes(type)}
              onChange={() =>
                toggleCheckbox(type, setFilterTypeEntreprise, filterTypeEntreprise)
              }
            />
            <span>{type}</span>
          </label>
        ))}
      </div>

      <div className="flex justify-between mt-4">
        <button
          onClick={onReset}
          className="px-4 py-2 text-sm bg-gray-200 rounded hover:bg-gray-300"
        >
          Réinitialiser
        </button>
        <button
          onClick={onApply}
          className="px-4 py-2 text-sm bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Filtrer
        </button>
      </div>
    </div>
  );
};

export default FilterPanel;
