import React, { useState, useMemo } from 'react';
import { GraduationCap, Trash2 } from 'lucide-react';
import { Stage } from './types/Stage';
import { mockStages } from './data/mockData';
import StageCard from './components/StageCard';
import StageForm from './components/StageForm';
import SearchAndFilters from './components/SearchAndFilters';
import StageStats from './components/StageStats';

function App() {
  const [stages, setStages] = useState<Stage[]>(mockStages);
  const [selectedStage, setSelectedStage] = useState<Stage | undefined>();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [formMode, setFormMode] = useState<'create' | 'edit' | 'view'>('create');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [typeFilter, setTypeFilter] = useState('');
  const [sortBy, setSortBy] = useState('dateDebut');

  // Filtrage et tri des stages
  const filteredAndSortedStages = useMemo(() => {
    let filtered = stages.filter(stage => {
      const matchesSearch = searchTerm === '' || 
        stage.etudiant.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
        stage.etudiant.prenom.toLowerCase().includes(searchTerm.toLowerCase()) ||
        stage.entreprise.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
        stage.stage.poste.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesStatus = statusFilter === '' || stage.stage.statut === statusFilter;
      const matchesType = typeFilter === '' || stage.stage.type === typeFilter;
      
      return matchesSearch && matchesStatus && matchesType;
    });

    // Tri
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'dateDebut':
          return new Date(a.stage.dateDebut).getTime() - new Date(b.stage.dateDebut).getTime();
        case 'dateFin':
          return new Date(a.stage.dateFin).getTime() - new Date(b.stage.dateFin).getTime();
        case 'etudiant':
          return a.etudiant.nom.localeCompare(b.etudiant.nom);
        case 'entreprise':
          return a.entreprise.nom.localeCompare(b.entreprise.nom);
        case 'statut':
          return a.stage.statut.localeCompare(b.stage.statut);
        default:
          return 0;
      }
    });

    return filtered;
  }, [stages, searchTerm, statusFilter, typeFilter, sortBy]);

  const handleView = (stage: Stage) => {
    setSelectedStage(stage);
    setFormMode('view');
    setIsFormOpen(true);
  };

  const handleEdit = (stage: Stage) => {
    setSelectedStage(stage);
    setFormMode('edit');
    setIsFormOpen(true);
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer ce stage ?')) {
      setStages(stages.filter(stage => stage.id !== id));
    }
  };

  const handleAddNew = () => {
    setSelectedStage(undefined);
    setFormMode('create');
    setIsFormOpen(true);
  };

  const handleSave = (stageData: Partial<Stage>) => {
    if (formMode === 'create') {
      const newStage: Stage = {
        ...stageData as Stage,
        id: Date.now().toString(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      setStages([...stages, newStage]);
    } else if (formMode === 'edit' && selectedStage) {
      setStages(stages.map(stage => 
        stage.id === selectedStage.id 
          ? { ...stageData as Stage, id: selectedStage.id, updatedAt: new Date().toISOString() }
          : stage
      ));
    }
    setIsFormOpen(false);
    setSelectedStage(undefined);
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
    setSelectedStage(undefined);
  };

  const handleBulkDelete = () => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer tous les stages filtrés ?')) {
      const idsToDelete = new Set(filteredAndSortedStages.map(stage => stage.id));
      setStages(stages.filter(stage => !idsToDelete.has(stage.id)));
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <GraduationCap className="w-8 h-8 text-blue-600 mr-3" />
              <h1 className="text-2xl font-bold text-gray-900">Suivi des Stages</h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-500">
                {filteredAndSortedStages.length} stage{filteredAndSortedStages.length > 1 ? 's' : ''}
              </span>
              {filteredAndSortedStages.length > 0 && (
                <button
                  onClick={handleBulkDelete}
                  className="flex items-center px-3 py-1 text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200"
                  title="Supprimer tous les stages filtrés"
                >
                  <Trash2 className="w-4 h-4 mr-1" />
                  Supprimer tout
                </button>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats */}
        <StageStats stages={stages} />

        {/* Search and Filters */}
        <SearchAndFilters
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          statusFilter={statusFilter}
          onStatusFilterChange={setStatusFilter}
          typeFilter={typeFilter}
          onTypeFilterChange={setTypeFilter}
          sortBy={sortBy}
          onSortChange={setSortBy}
          onAddNew={handleAddNew}
        />

        {/* Stages Grid */}
        {filteredAndSortedStages.length === 0 ? (
          <div className="text-center py-12">
            <GraduationCap className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              {stages.length === 0 ? 'Aucun stage enregistré' : 'Aucun stage trouvé'}
            </h3>
            <p className="text-gray-500 mb-4">
              {stages.length === 0 
                ? 'Commencez par ajouter votre premier stage'
                : 'Essayez de modifier vos critères de recherche'
              }
            </p>
            {stages.length === 0 && (
              <button
                onClick={handleAddNew}
                className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
              >
                <GraduationCap className="w-4 h-4 mr-2" />
                Ajouter un stage
              </button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredAndSortedStages.map(stage => (
              <StageCard
                key={stage.id}
                stage={stage}
                onView={handleView}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            ))}
          </div>
        )}
      </main>

      {/* Stage Form */}
      <StageForm
        isOpen={isFormOpen}
        onClose={handleCloseForm}
        stage={selectedStage}
        onSave={handleSave}
        mode={formMode}
      />
    </div>
  );
}

export default App;