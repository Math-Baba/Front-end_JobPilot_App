import React, { useState, useEffect } from "react";
import {
  X,
  Save,
  Building,
  Calendar,
  FileText,
} from "lucide-react";
import { Entreprise } from "../types/Entreprise";

interface EntrepriseFormProps {
  isOpen: boolean;
  onClose: () => void;
  Entreprise?: Entreprise;
  onSave: (Entreprise: Partial<Entreprise>) => void;
  mode: "create" | "edit" | "view";
}

const EntrepriseForm: React.FC<EntrepriseFormProps> = ({
  isOpen,
  onClose,
  Entreprise,
  onSave,
  mode,
}) => {
  const [formData, setFormData] = useState<Partial<Entreprise>>({
    entreprise: {
      nom: "",
      secteur: 'Autre',
      adresse: "",
      email: "",
      contact: 0,
      typeEntreprise: 'Autre',
    },
    Poste: {
      poste: "",
      description: "",
      statut: "En Attente",
      typePoste: 'Autre',
      dateCandidature: "",
    },
    notes: "",
  });

  useEffect(() => {
    if (Entreprise) {
      setFormData(Entreprise);
    } else {
      setFormData({
        entreprise: {
          nom: "",
          secteur: 'Autre',
          adresse: "",
          email: "",
          contact: 0,
          typeEntreprise: 'Autre',
        },
        Poste: {
          poste: "",
          description: "",
          statut: "En Attente",
          typePoste: 'Autre',
          dateCandidature: "",
        },
        notes: "",
      });
    }
  }, [Entreprise]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  const updateNestedField = (path: string[], value: any) => {
    setFormData((prev) => {
      const newData = { ...prev };
      let current: any = newData;
      for (let i = 0; i < path.length - 1; i++) {
        current = current[path[i]];
      }
      current[path[path.length - 1]] = value;
      return newData;
    });
  };

  const isReadOnly = mode === "view";

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-end z-50">
      <div className="bg-white w-full max-w-2xl h-full overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 p-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold text-gray-900">
              {mode === "create"
                ? "Nouvelle candidature"
                : mode === "edit"
                ? "Modifier la candidature"
                : "Détails de la candidature"}
            </h2>
            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-8">
          {/* Entreprise */}
          <div className="space-y-4">
            <div className="flex items-center text-lg font-medium text-gray-900">
              <Building className="w-5 h-5 mr-2" />
              Informations Entreprise
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nom de l'entreprise
                </label>
                <input
                  type="text"
                  value={formData.entreprise?.nom || ""}
                  onChange={(e) =>
                    updateNestedField(["entreprise", "nom"], e.target.value)
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                  disabled={isReadOnly}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Secteur
                </label>
                <select
                  value={formData.entreprise?.secteur || ""}
                  onChange={(e) =>
                    updateNestedField(["entreprise", "secteur"], e.target.value)
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  disabled={isReadOnly}
                >
                  <option value="">-- Choisir un secteur --</option>
                  <option value="Développement logiciel">
                    Développement logiciel
                  </option>
                  <option value="Robotique & IOT">Robotique & IOT</option>
                  <option value="IA & Data">IA & Data</option>
                  <option value="Développement Web">Développement Web</option>
                  <option value="Fintech">Fintech</option>
                  <option value="Cybersécurité & Cloud">
                    Cybersécurité & Cloud
                  </option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Adresse
                </label>
                <input
                  type="text"
                  value={formData.entreprise?.adresse || ""}
                  onChange={(e) =>
                    updateNestedField(["entreprise", "adresse"], e.target.value)
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  disabled={isReadOnly}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  value={formData.entreprise?.email || ""}
                  onChange={(e) =>
                    updateNestedField(["entreprise", "email"], e.target.value)
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                  disabled={isReadOnly}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Contact
                </label>
                <input
                  type="tel"
                  value={formData.entreprise?.contact || ""}
                  onChange={(e) =>
                    updateNestedField(["entreprise", "contact"], e.target.value)
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                  disabled={isReadOnly}
                />
              </div>
                            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Type d'entreprise
                </label>
                <select
                  value={formData.entreprise?.typeEntreprise || ""}
                  onChange={(e) =>
                    updateNestedField(["entreprise", "typeEntreprise"], e.target.value)
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  disabled={isReadOnly}
                >
                  <option value="">-- Choisir un type --</option>
                  <option value="Administration">Administration</option>
                  <option value="Association">Association</option>
                  <option value="Grande entreprise">Grande entreprise</option>
                  <option value="PME">PME</option>
                  <option value="Start-up">Start-up</option>
                </select>
              </div>
            </div>
          </div>

          {/* Poste */}
          <div className="space-y-4">
            <div className="flex items-center text-lg font-medium text-gray-900">
              <Calendar className="w-5 h-5 mr-2" />
              Informations du Poste
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Poste
                </label>
                <input
                  type="text"
                  value={formData.Poste?.poste || ""}
                  onChange={(e) =>
                    updateNestedField(["Poste", "poste"], e.target.value)
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                  disabled={isReadOnly}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Statut
                </label>
                <select
                  value={formData.Poste?.statut || "À venir"}
                  onChange={(e) =>
                    updateNestedField(["Poste", "statut"], e.target.value)
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  disabled={isReadOnly}
                >
                  <option value="En Attente">En Attente</option>
                  <option value="Entretien">Entretien</option>
                  <option value="Accepté">Accepté</option>
                  <option value="Refusé">Refusé</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Type de Poste
                </label>
                <select
                  value={formData.Poste?.typePoste || "Entreprise"}
                  onChange={(e) =>
                    updateNestedField(["Poste", "typePoste"], e.target.value)
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  disabled={isReadOnly}
                >
                  <option value="Stage">Stage</option>
                  <option value="Alternance">Alternance</option>
                  <option value="Emploi">Emploi</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Date d'envoie de la candidature
                </label>
                <input
                  type="date"
                  value={formData.Poste?.dateCandidature || ""}
                  onChange={(e) =>
                    updateNestedField(
                      ["Poste", "dateCandidature"],
                      e.target.value
                    )
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                  disabled={isReadOnly}
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  value={formData.Poste?.description || ""}
                  onChange={(e) =>
                    updateNestedField(
                      ["Poste", "description"],
                      e.target.value
                    )
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  rows={3}
                  disabled={isReadOnly}
                />
              </div>
            </div>
          </div>

          {/* Notes */}
          <div className="space-y-4">
            <div className="flex items-center text-lg font-medium text-gray-900">
              <FileText className="w-5 h-5 mr-2" />
              Notes
            </div>
            <div>
              <textarea
                value={formData.notes || ""}
                onChange={(e) => updateNestedField(["notes"], e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                rows={4}
                placeholder="Notes additionnelles..."
                disabled={isReadOnly}
              />
            </div>
          </div>

          {/* Actions */}
          {!isReadOnly && (
            <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors duration-200"
              >
                Annuler
              </button>
              <button
                type="submit"
                className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
              >
                <Save className="w-4 h-4 mr-2" />
                {mode === "create" ? "Créer" : "Modifier"}
              </button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default EntrepriseForm;
