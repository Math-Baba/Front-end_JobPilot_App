import React, { useState, useMemo } from 'react';
import { GraduationCap, Trash2 } from 'lucide-react';
import { Entreprise } from './types/Entreprise';
import { mockEntreprises } from './data/mockData';
import EntrepriseCard from './components/EntrepriseCard';
import EntrepriseForm from './components/EntrepriseForm';
import SearchAndFilters from './components/SearchAndFilters';
import EntrepriseStats from './components/EntrepriseStats';
function App() {
  const [Entreprises, setEntreprises] = useState<Entreprise[]>(mockEntreprises);
  const [selectedEntreprise, setSelectedEntreprise] = useState<Entreprise | undefined>();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [formMode, setFormMode] = useState<'create' | 'edit' | 'view'>('create');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [typeFilter, setTypeFilter] = useState('');
  const [posteFilter, setPosteFilter] = useState('');
  const [sortBy, setSortBy] = useState('dateCandidature');
  

  // Filtrage et tri des Entreprises
  const filteredAndSortedEntreprises = useMemo(() => {
    const filtered = Entreprises.filter(({ entreprise, Poste }) => {
      const search = searchTerm.toLowerCase();

      const matchesSearch = searchTerm === '' || [
        entreprise.nom,
        entreprise.secteur,
        entreprise.typeEntreprise,
      ].some(val => val?.toLowerCase().includes(search));

      const matchesStatus = statusFilter === '' || Poste.statut === statusFilter;
      const matchesType = typeFilter === '' || Poste.typePoste === typeFilter;
      const matchesPoste = posteFilter === '' || Poste.poste.toLowerCase().includes(posteFilter.toLowerCase());

      return matchesSearch && matchesStatus && matchesType && matchesPoste;
    });

    // Tri
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'dateCandidature':
          return new Date(b.Poste.dateCandidature).getTime() - new Date(a.Poste.dateCandidature).getTime();
        case 'poste':
          return a.Poste.poste.toLowerCase().localeCompare(b.Poste.poste.toLowerCase());
        case 'typePoste':
          return a.Poste.typePoste.toLowerCase().localeCompare(b.Poste.typePoste.toLowerCase());
        case 'typeEntreprise':
          return a.entreprise.typeEntreprise.toLowerCase().localeCompare(b.entreprise.typeEntreprise.toLowerCase());
        case 'statut':
          return a.Poste.statut.toLowerCase().localeCompare(b.Poste.statut.toLowerCase());
        default:
          return 0;
      }
    });

    return filtered;
  }, [Entreprises, searchTerm, statusFilter, typeFilter, posteFilter, sortBy]);

  const handleView = (Entreprise: Entreprise) => {
    setSelectedEntreprise(Entreprise);
    setFormMode('view');
    setIsFormOpen(true);
  };

  const handleEdit = (Entreprise: Entreprise) => {
    setSelectedEntreprise(Entreprise);
    setFormMode('edit');
    setIsFormOpen(true);
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cette candidature ?')) {
      setEntreprises(Entreprises.filter(Entreprise => Entreprise.id !== id));
    }
  };

  const handleAddNew = () => {
    setSelectedEntreprise(undefined);
    setFormMode('create');
    setIsFormOpen(true);
  };

  const handleSave = (EntrepriseData: Partial<Entreprise>) => {
    if (formMode === 'create') {
      const newEntreprise: Entreprise = {
        ...EntrepriseData as Entreprise,
        id: Date.now().toString(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      setEntreprises([...Entreprises, newEntreprise]);
    } else if (formMode === 'edit' && selectedEntreprise) {
      setEntreprises(Entreprises.map(Entreprise => 
        Entreprise.id === selectedEntreprise.id 
          ? { ...EntrepriseData as Entreprise, id: selectedEntreprise.id, updatedAt: new Date().toISOString() }
          : Entreprise
      ));
    }
    setIsFormOpen(false);
    setSelectedEntreprise(undefined);
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
    setSelectedEntreprise(undefined);
  };

  const handleBulkDelete = () => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer toutes les candidatures filtrées ?')) {
      const idsToDelete = new Set(filteredAndSortedEntreprises.map(Entreprise => Entreprise.id));
      setEntreprises(Entreprises.filter(Entreprise => !idsToDelete.has(Entreprise.id)));
    }
  };

  const handleResetFilters = () => {
    setSearchTerm('');
    setStatusFilter('');
    setTypeFilter('');
    setSortBy('dateCandidature');
    setPosteFilter('');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <GraduationCap className="w-8 h-8 text-blue-600 mr-3" />
              <h1 className="text-2xl font-bold text-gray-900">JobPilot.Dev</h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-500">
                {filteredAndSortedEntreprises.length} Candidature{filteredAndSortedEntreprises.length > 1 ? 's' : ''}
              </span>
              {filteredAndSortedEntreprises.length > 0 && (
                <button
                  //onClick={handleBulkDelete}
                  className="flex items-center px-3 py-1 text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200"
                  title="Supprimer toutes les Candidatures filtrés"
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
        <EntrepriseStats Entreprises={Entreprises} />

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
          onReset={handleResetFilters}
          posteFilter={posteFilter}
          onPosteFilterChange={setPosteFilter}
        />

        {/* Entreprises Grid */}
        {filteredAndSortedEntreprises.length === 0 ? (
          <div className="text-center py-12">
            <GraduationCap className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              {Entreprises.length === 0 ? 'Aucune Candidature enregistré' : 'Aucune Candidature trouvé'}
            </h3>
            <p className="text-gray-500 mb-4">
              {Entreprises.length === 0 
                ? 'Commencez par ajouter votre première candidature'
                : 'Essayez de modifier vos critères de recherche'
              }
            </p>
            {Entreprises.length === 0 && (
              <button
                onClick={handleAddNew}
                className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
              >
                <GraduationCap className="w-4 h-4 mr-2" />
                Ajouter une candidature
              </button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredAndSortedEntreprises.map(Entreprise => (
              <EntrepriseCard
                key={Entreprise.id}
                Entreprise={Entreprise}
                onView={handleView}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            ))}
          </div>
        )}
      </main>

      {/* Entreprise Form */}
      <EntrepriseForm
        isOpen={isFormOpen}
        onClose={handleCloseForm}
        Entreprise={selectedEntreprise}
        onSave={handleSave}
        mode={formMode}
      />
    </div>
  );
}

export default App;