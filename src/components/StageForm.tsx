import React, { useState, useEffect } from 'react';
import { X, Save, User, Building, Calendar, FileText, Users } from 'lucide-react';
import { Stage } from '../types/Stage';

interface StageFormProps {
  isOpen: boolean;
  onClose: () => void;
  stage?: Stage;
  onSave: (stage: Partial<Stage>) => void;
  mode: 'create' | 'edit' | 'view';
}

const StageForm: React.FC<StageFormProps> = ({ isOpen, onClose, stage, onSave, mode }) => {
  const [formData, setFormData] = useState<Partial<Stage>>({
    etudiant: {
      nom: '',
      prenom: '',
      email: '',
      telephone: ''
    },
    entreprise: {
      nom: '',
      secteur: '',
      adresse: '',
      ville: ''
    },
    stage: {
      poste: '',
      description: '',
      dateDebut: '',
      dateFin: '',
      statut: 'À venir',
      type: 'Stage'
    },
    responsables: {
      entreprise: {
        nom: '',
        email: '',
        telephone: ''
      },
      ecole: {
        nom: '',
        email: ''
      }
    },
    notes: ''
  });

  useEffect(() => {
    if (stage) {
      setFormData(stage);
    } else {
      setFormData({
        etudiant: {
          nom: '',
          prenom: '',
          email: '',
          telephone: ''
        },
        entreprise: {
          nom: '',
          secteur: '',
          adresse: '',
          ville: ''
        },
        stage: {
          poste: '',
          description: '',
          dateDebut: '',
          dateFin: '',
          statut: 'À venir',
          type: 'Stage'
        },
        responsables: {
          entreprise: {
            nom: '',
            email: '',
            telephone: ''
          },
          ecole: {
            nom: '',
            email: ''
          }
        },
        notes: ''
      });
    }
  }, [stage]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  const updateNestedField = (path: string[], value: any) => {
    setFormData(prev => {
      const newData = { ...prev };
      let current: any = newData;
      for (let i = 0; i < path.length - 1; i++) {
        current = current[path[i]];
      }
      current[path[path.length - 1]] = value;
      return newData;
    });
  };

  const isReadOnly = mode === 'view';

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-end z-50">
      <div className="bg-white w-full max-w-2xl h-full overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 p-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold text-gray-900">
              {mode === 'create' ? 'Nouveau Stage' : mode === 'edit' ? 'Modifier le Stage' : 'Détails du Stage'}
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
          {/* Étudiant */}
          <div className="space-y-4">
            <div className="flex items-center text-lg font-medium text-gray-900">
              <User className="w-5 h-5 mr-2" />
              Informations Étudiant
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nom</label>
                <input
                  type="text"
                  value={formData.etudiant?.nom || ''}
                  onChange={(e) => updateNestedField(['etudiant', 'nom'], e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                  disabled={isReadOnly}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Prénom</label>
                <input
                  type="text"
                  value={formData.etudiant?.prenom || ''}
                  onChange={(e) => updateNestedField(['etudiant', 'prenom'], e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                  disabled={isReadOnly}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  value={formData.etudiant?.email || ''}
                  onChange={(e) => updateNestedField(['etudiant', 'email'], e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                  disabled={isReadOnly}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Téléphone</label>
                <input
                  type="tel"
                  value={formData.etudiant?.telephone || ''}
                  onChange={(e) => updateNestedField(['etudiant', 'telephone'], e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  disabled={isReadOnly}
                />
              </div>
            </div>
          </div>

          {/* Entreprise */}
          <div className="space-y-4">
            <div className="flex items-center text-lg font-medium text-gray-900">
              <Building className="w-5 h-5 mr-2" />
              Informations Entreprise
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nom de l'entreprise</label>
                <input
                  type="text"
                  value={formData.entreprise?.nom || ''}
                  onChange={(e) => updateNestedField(['entreprise', 'nom'], e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                  disabled={isReadOnly}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Secteur</label>
                <input
                  type="text"
                  value={formData.entreprise?.secteur || ''}
                  onChange={(e) => updateNestedField(['entreprise', 'secteur'], e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                  disabled={isReadOnly}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Adresse</label>
                <input
                  type="text"
                  value={formData.entreprise?.adresse || ''}
                  onChange={(e) => updateNestedField(['entreprise', 'adresse'], e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  disabled={isReadOnly}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Ville</label>
                <input
                  type="text"
                  value={formData.entreprise?.ville || ''}
                  onChange={(e) => updateNestedField(['entreprise', 'ville'], e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                  disabled={isReadOnly}
                />
              </div>
            </div>
          </div>

          {/* Stage */}
          <div className="space-y-4">
            <div className="flex items-center text-lg font-medium text-gray-900">
              <Calendar className="w-5 h-5 mr-2" />
              Informations Stage
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Poste</label>
                <input
                  type="text"
                  value={formData.stage?.poste || ''}
                  onChange={(e) => updateNestedField(['stage', 'poste'], e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                  disabled={isReadOnly}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Date de début</label>
                <input
                  type="date"
                  value={formData.stage?.dateDebut || ''}
                  onChange={(e) => updateNestedField(['stage', 'dateDebut'], e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                  disabled={isReadOnly}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Date de fin</label>
                <input
                  type="date"
                  value={formData.stage?.dateFin || ''}
                  onChange={(e) => updateNestedField(['stage', 'dateFin'], e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                  disabled={isReadOnly}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Statut</label>
                <select
                  value={formData.stage?.statut || 'À venir'}
                  onChange={(e) => updateNestedField(['stage', 'statut'], e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  disabled={isReadOnly}
                >
                  <option value="À venir">À venir</option>
                  <option value="En cours">En cours</option>
                  <option value="Terminé">Terminé</option>
                  <option value="Annulé">Annulé</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
                <select
                  value={formData.stage?.type || 'Stage'}
                  onChange={(e) => updateNestedField(['stage', 'type'], e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  disabled={isReadOnly}
                >
                  <option value="Stage">Stage</option>
                  <option value="Alternance">Alternance</option>
                  <option value="Projet">Projet</option>
                </select>
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  value={formData.stage?.description || ''}
                  onChange={(e) => updateNestedField(['stage', 'description'], e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  rows={3}
                  disabled={isReadOnly}
                />
              </div>
            </div>
          </div>

          {/* Responsables */}
          <div className="space-y-4">
            <div className="flex items-center text-lg font-medium text-gray-900">
              <Users className="w-5 h-5 mr-2" />
              Responsables
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h4 className="font-medium text-gray-900">Responsable Entreprise</h4>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Nom</label>
                  <input
                    type="text"
                    value={formData.responsables?.entreprise?.nom || ''}
                    onChange={(e) => updateNestedField(['responsables', 'entreprise', 'nom'], e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    disabled={isReadOnly}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input
                    type="email"
                    value={formData.responsables?.entreprise?.email || ''}
                    onChange={(e) => updateNestedField(['responsables', 'entreprise', 'email'], e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    disabled={isReadOnly}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Téléphone</label>
                  <input
                    type="tel"
                    value={formData.responsables?.entreprise?.telephone || ''}
                    onChange={(e) => updateNestedField(['responsables', 'entreprise', 'telephone'], e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    disabled={isReadOnly}
                  />
                </div>
              </div>
              <div className="space-y-4">
                <h4 className="font-medium text-gray-900">Responsable École</h4>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Nom</label>
                  <input
                    type="text"
                    value={formData.responsables?.ecole?.nom || ''}
                    onChange={(e) => updateNestedField(['responsables', 'ecole', 'nom'], e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    disabled={isReadOnly}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input
                    type="email"
                    value={formData.responsables?.ecole?.email || ''}
                    onChange={(e) => updateNestedField(['responsables', 'ecole', 'email'], e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    disabled={isReadOnly}
                  />
                </div>
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
                value={formData.notes || ''}
                onChange={(e) => updateNestedField(['notes'], e.target.value)}
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
                {mode === 'create' ? 'Créer' : 'Modifier'}
              </button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default StageForm;