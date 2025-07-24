import { GraduationCap, Trash2 } from "lucide-react";
import EntrepriseCard from "./components/EntrepriseCard";
import EntrepriseForm from "./components/EntrepriseForm";
import SearchAndFilters from "./components/SearchAndFilters";
import EntrepriseStats from "./components/EntrepriseStats";
import { useAppLogic } from "./App.component";
import { getJobApplicationById } from "./service/jobApplication.service";

function App() {
  const {
    Entreprises,
    selectedEntreprise,
    setSelectedEntreprise,
    isFormOpen,
    setIsFormOpen,
    formMode,
    setFormMode,
    searchTerm,
    setSearchTerm,
    statusFilter,
    setStatusFilter,
    typeFilter,
    setTypeFilter,
    posteFilter,
    setPosteFilter,
    sortBy,
    setSortBy,
    loading,
    error,
    filteredAndSortedEntreprises,
    handleDelete,
    handleAddNew,
    handleSave,
    handleCloseForm,
    handleResetFilters,
  } = useAppLogic();

  // Fonction pour voir les détails 
  const handleView = async (id: string) => {
    try {
      const fullData = await getJobApplicationById(id);
      setSelectedEntreprise(fullData);
      setFormMode("view");
      setIsFormOpen(true);
    } catch (error) {
      console.error('Erreur lors de la récupération des données:', error);
      alert('Impossible de récupérer les données. Veuillez réessayer.');
    }
  };

  // Fonction pour éditer 
  const handleEdit = async (id: string) => {
    try {
      const fullData = await getJobApplicationById(id);
      setSelectedEntreprise(fullData);
      setFormMode("edit");
      setIsFormOpen(true);
    } catch (error) {
      console.error('Erreur lors de la récupération des données:', error);
      alert('Impossible de récupérer les données. Veuillez réessayer.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <GraduationCap className="w-8 h-8 text-blue-600 mr-3" />
              <h1 className="text-2xl font-bold text-gray-900">JobPilot</h1>
            </div>
          </div>
        </div>
      </header>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <EntrepriseStats Entreprises={Entreprises} />
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
        {loading ? (
          <div className="text-center py-12">
            <GraduationCap className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Chargement des candidatures...
            </h3>
            <p className="text-gray-500 mb-4">
              Veuillez patienter pendant le chargement des données.
            </p>
          </div>
        ) : error ? (
          <div className="text-center py-12">
            <Trash2 className="w-12 h-12 text-red-500 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Erreur de chargement
            </h3>
            <p className="text-gray-500 mb-4">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
            >
              <GraduationCap className="w-4 h-4 mr-2" />
              Réessayer
            </button>
          </div>
        ) : filteredAndSortedEntreprises.length === 0 ? (
          <div className="text-center py-12">
            <GraduationCap className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              {Entreprises.length === 0
                ? "Aucune Candidature enregistré"
                : "Aucune Candidature trouvé"}
            </h3>
            <p className="text-gray-500 mb-4">
              {Entreprises.length === 0
                ? "Commencez par ajouter votre première candidature"
                : "Essayez de modifier vos critères de recherche"}
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
            {filteredAndSortedEntreprises.map((jobApplication) => (
              <EntrepriseCard
                key={jobApplication.id}
                jobApplication={jobApplication}
                onView={() => handleView(jobApplication.id)}
                onEdit={() => handleEdit(jobApplication.id)}
                onDelete={handleDelete}
              />
            ))}
          </div>
        )}
      </main>
      <EntrepriseForm
        isOpen={isFormOpen}
        onClose={handleCloseForm}
        request={selectedEntreprise}
        onSave={handleSave}
        mode={formMode}
      />
    </div>
  );
}

export default App;