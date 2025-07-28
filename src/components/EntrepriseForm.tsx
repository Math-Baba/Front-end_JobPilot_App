import React, { useState, useEffect } from "react";
import { X, Save, Building, Calendar, FileText } from "lucide-react";
import { JobApplicationRequest } from "../types/Entreprise";

interface EntrepriseFormProps {
  isOpen: boolean; // Contrôle si le formulaire est visible ou non
  onClose: () => void; // Fonction appelée pour fermer le formulaire
  request?: JobApplicationRequest; // Données à modifier ou afficher (optionnel)
  onSave: (request: Partial<JobApplicationRequest>) => void; // Fonction appelée pour sauvegarder (create/update)
  mode: "create" | "edit" | "view"; // Mode d’utilisation du formulaire (créer, modifier, visualiser)
}

const EntrepriseForm: React.FC<EntrepriseFormProps> = ({
  isOpen,
  onClose,
  request,
  onSave,
  mode,
}) => {
  // État local pour gérer les données du formulaire (initialisé vide ou avec request)
  const [formData, setFormData] = useState<Partial<JobApplicationRequest>>({
    jobCompanyInfo: {
      name: "",
      sector: "",
      adress: "",
      email: "",
      phone: 0,
      companyType: "",
    },
    jobPositionInfo: {
      jobTitle: "",
      description: "",
      status: "ATTENTE",
      positionType: "",
      applicationDate: "",
    },
    notes: "",
  });

  // À chaque fois que la prop request change, on met à jour formData avec ses valeurs
  useEffect(() => {
    if (request) {
      setFormData(request);
    } else {
      // Sinon on remet un formulaire vide avec valeurs par défaut
      setFormData({
        jobCompanyInfo: {
          name: "",
          sector: "",
          adress: "",
          email: "",
          phone: 0,
          companyType: "",
        },
        jobPositionInfo: {
          jobTitle: "",
          description: "",
          status: "ATTENTE",
          positionType: "STAGE",
          applicationDate: "",
        },
        notes: "",
      });
    }
  }, [request]);

  // Fonction appelée quand on valide le formulaire (submit)
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); // Empêche le rechargement de la page
    onSave(formData); // Envoie les données au parent via onSave
  };

  // Fonction pour modifier un champ "imbriqué" dans formData
  // Recoit un tableau de chaînes de caractères qui indique le chemin vers la propriété à modifier
  // Et la nouvelle valeur à attribuer à ce champ
  const updateNestedField = (path: string[], value: any) => {
    setFormData((prev) => {
      const newData = { ...prev };
      let current: any = newData;
      // Parcourt le chemin jusqu'à l’avant dernier niveau
      for (let i = 0; i < path.length - 1; i++) {
        current = current[path[i]];
      }
      // Modifie la valeur du champ ciblé
      current[path[path.length - 1]] = value;
      return newData;
    });
  };

  // En mode view, on désactive les champs du formulaire (Read only)
  const isReadOnly = mode === "view";

  // Si le formulaire n'est pas ouvert, on ne l'affiche pas
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
                  Nom de l'entreprise <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.jobCompanyInfo?.name}
                  onChange={(e) =>
                    updateNestedField(["jobCompanyInfo", "name"], e.target.value)
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                  disabled={isReadOnly}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Secteur <span className="text-red-500">*</span>
                </label>
                <select
                  value={formData.jobCompanyInfo?.sector}
                  required
                  onChange={(e) =>
                    updateNestedField(["jobCompanyInfo", "sector"], e.target.value)
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  disabled={isReadOnly}
                >
                  <option value="">-- Choisir un secteur --</option>
                  <option value="DEVELOPPEMENT_LOGICIEL">
                    Développement logiciel
                  </option>
                  <option value="ROBOTIQUE_IOT">Robotique & IOT</option>
                  <option value="AI_DATA">IA & Data</option>
                  <option value="DEVELOPPEMENT_WEB">Développement Web</option>
                  <option value="FINTECH">Fintech</option>
                  <option value="CYBERSECURITE_CLOUD">
                    Cybersécurité & Cloud
                  </option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Localisation 
                </label>
                <input
                  type="text"
                  value={formData.jobCompanyInfo?.adress || ""}
                  onChange={(e) =>
                    updateNestedField(["jobCompanyInfo", "adress"], e.target.value)
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  disabled={isReadOnly}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  value={formData.jobCompanyInfo?.email}
                  onChange={(e) =>
                    updateNestedField(["jobCompanyInfo", "email"], e.target.value)
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                  disabled={isReadOnly}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Numéro de téléphone 
                </label>
                <input
                  type="tel"
                  value={formData.jobCompanyInfo?.phone || ""}
                  onChange={(e) =>
                    updateNestedField(["jobCompanyInfo", "phone"], e.target.value)
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  disabled={isReadOnly}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Site web 
                </label>
                <input
                  type="text"
                  value={formData.jobCompanyInfo?.website || ""}
                  onChange={(e) =>
                    updateNestedField(["jobCompanyInfo", "website"], e.target.value)
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  disabled={isReadOnly}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Type d'entreprise <span className="text-red-500">*</span>
                </label>
                <select
                  value={formData.jobCompanyInfo?.companyType}
                  onChange={(e) =>
                    updateNestedField(
                      ["jobCompanyInfo", "companyType"],
                      e.target.value
                    )
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  disabled={isReadOnly}
                  required
                >
                  <option value="">-- Choisir un type --</option>
                  <option value="ADMINISTRATION">Administration</option>
                  <option value="ASSOCIATION">Association</option>
                  <option value="GRANDE_ENTREPRISE">Grande entreprise</option>
                  <option value="PME">PME</option>
                  <option value="STARTUP">Start-up</option>
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
                  Poste <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.jobPositionInfo?.jobTitle}
                  onChange={(e) =>
                    updateNestedField(["jobPositionInfo", "jobTitle"], e.target.value)
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                  disabled={isReadOnly}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Statut <span className="text-red-500">*</span>
                </label>
                <select
                  value={formData.jobPositionInfo?.status}
                  onChange={(e) =>
                    updateNestedField(["jobPositionInfo", "status"], e.target.value)
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  disabled={isReadOnly}
                  required
                >
                  <option value="ATTENTE">En Attente</option>
                  <option value="ENTRETIEN">Entretien</option>
                  <option value="ACCEPTE">Accepté</option>
                  <option value="REFUSE">Refusé</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Type de Poste <span className="text-red-500">*</span>
                </label>
                <select
                  value={formData.jobPositionInfo?.positionType || "Entreprise"}
                  onChange={(e) =>
                    updateNestedField(["jobPositionInfo", "positionType"], e.target.value)
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  disabled={isReadOnly}
                  required
                >
                  <option value="STAGE">Stage</option>
                  <option value="ALTERNANCE">Alternance</option>
                  <option value="EMPLOI">Emploi</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Date d'envoie de la candidature <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  value={formData.jobPositionInfo?.applicationDate || ""}
                  onChange={(e) =>
                    updateNestedField(
                      ["jobPositionInfo", "applicationDate"],
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
                  value={formData.jobPositionInfo?.description || ""}
                  onChange={(e) =>
                    updateNestedField(["jobPositionInfo", "description"], e.target.value)
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
                className="flex items-center px-4 py-2 bg-[#000814] text-white rounded-lg hover:bg-[#1b263b] transition-colors duration-200"
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
