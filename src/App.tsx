import { GraduationCap, Trash2 } from "lucide-react";
import EntrepriseCard from "./components/EntrepriseCard";
import EntrepriseForm from "./components/EntrepriseForm";
import SearchAndFilters from "./components/SearchAndFilters";
import EntrepriseStats from "./components/EntrepriseStats";
import Pagination from "./components/Pagination";
import { useAppLogic } from "./App.component";
import { getJobApplicationById } from "./service/jobApplication.service";
import { useState } from "react";

function App() {
  const {
    Entreprises,
    selectedEntreprise,
    setSelectedEntreprise,
    isFormOpen,
    setIsFormOpen,
    formMode,
    setFormMode,
    loading,
    error,
    handleDelete,
    handleSearch,
    handleAddNew,
    handleSave,
    handleCloseForm,
    handleResetFilters,
  } = useAppLogic();

  // État local pour les résultats filtrés par le backend
  const [filteredResults, setFilteredResults] = useState<any[]>([]);
  // Flag pour savoir si on utilise les filtres avancés
  const [isUsingAdvancedFilters, setIsUsingAdvancedFilters] = useState(false);

  // Fonction pour mettre à jour les résultats depuis les filtres avancés
  const handleUpdateResults = (results: any[]) => {
    setFilteredResults(results);
    setIsUsingAdvancedFilters(true);
  };

  // Fonction pour réinitialiser les filtres
  const handleReset = () => {
    setFilteredResults([]);
    setIsUsingAdvancedFilters(false);
    handleResetFilters();
  };

  // Fonction pour voir les détails
  const handleView = async (id: string) => {
    try {
      const fullData = await getJobApplicationById(id);
      setSelectedEntreprise(fullData);
      setFormMode("view");
      setIsFormOpen(true);
    } catch (error) {
      console.error("Erreur lors de la récupération des données:", error);
      alert("Impossible de récupérer les données. Veuillez réessayer.");
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
      console.error("Erreur lors de la récupération des données:", error);
      alert("Impossible de récupérer les données. Veuillez réessayer.");
    }
  };

  // Utiliser les résultats filtrés si on utilise les filtres avancés, sinon utiliser les résultats par défaut
  const displayedEntreprises = isUsingAdvancedFilters
    ? filteredResults
    : Entreprises;

  
  // Ajout des états pour la pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(6);

  // Calcul des données paginées
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = displayedEntreprises.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(displayedEntreprises.length / itemsPerPage);

  // Fonction pour changer de page
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
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
          onSearch={handleSearch}
          onAddNew={handleAddNew}
          onUpdateResults={handleUpdateResults}
          onReset={handleReset}
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
        ) : displayedEntreprises.length === 0 ? (
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
          <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {currentItems
              .slice()
              .sort(
                (a, b) =>
                  new Date(b.applicationDate).getTime() -
                  new Date(a.applicationDate).getTime()
              )
              .map((jobApplication) => (
                <EntrepriseCard
                  key={jobApplication.id}
                  jobApplication={jobApplication}
                  onView={() => handleView(jobApplication.id)}
                  onEdit={() => handleEdit(jobApplication.id)}
                  onDelete={() => handleDelete(jobApplication.id)}
                />
              ))}
          </div>
          
          {/* Utilisation du composant Pagination */}
          <Pagination 
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </>
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
