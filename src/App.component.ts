import { useState, useMemo, useEffect } from "react";
import {
  JobApplicationRequest,
  JobApplicationResponse,
} from "./types/Entreprise";
import {
  getAllJobApplications,
  create,
  update,
  deleteJob,
  search,
} from "./service/jobApplication.service";

// Hook personnalisé contenant toute la logique de gestion des candidatures
export function useAppLogic() {
  // Liste des candidatures
  const [Entreprises, setEntreprises] = useState<JobApplicationResponse[]>([]);

  // Candidature sélectionnée pour la modification ou l’affichage
  const [selectedEntreprise, setSelectedEntreprise] = useState<
    JobApplicationRequest | undefined
  >();

  // État d’ouverture du formulaire 
  const [isFormOpen, setIsFormOpen] = useState(false);

  // Mode du formulaire
  const [formMode, setFormMode] = useState<"create" | "edit" | "view">(
    "create"
  );

  // Indicateur de chargement
  const [loading, setLoading] = useState(true);

  // Indicateur d'erreur
  const [error, setError] = useState<string | null>(null);

  // Chargement initial des données à l’ouverture de la page
  useEffect(() => {
    setLoading(true);
    getAllJobApplications()
      .then((data) => {
        setEntreprises(data);
        setLoading(false);
      })
      .catch(() => {
        setError("Erreur lors du chargement des candidatures");
        setLoading(false);
      });
  }, []);

  // Afficher une fiche candidature en mode lecture seule
  const handleView = (jobApplication: JobApplicationRequest) => {
    setSelectedEntreprise(jobApplication);
    setFormMode("view");
    setIsFormOpen(true);
  };

  // Modifier une candidature existante
  const handleEdit = (jobApplication: JobApplicationRequest) => {
    setSelectedEntreprise(jobApplication);
    setFormMode("edit");
    setIsFormOpen(true);
  };

  // Supprimer une candidature avec confirmation
  const handleDelete = async (id: string) => {
    if (
      window.confirm("Êtes-vous sûr de vouloir supprimer cette candidature ?")
    ) {
      try {
        await deleteJob(Number(id));
        // On met à jour la liste localement
        setEntreprises(
          Entreprises.filter((jobApplication) => jobApplication.id !== id)
        );
      } catch (error) {
        console.error("Erreur lors de la suppression :", error);
        alert("Impossible de supprimer la candidature. Veuillez réessayer.");
      }
    }
  };

  // Recherche de candidatures par mot-clé
  const handleSearch = async (term: string) => {
    try {
      if (term.trim() === "") {
        // Si recherche vide, on recharge tout
        const all = await getAllJobApplications();
        setEntreprises(all);
      } else {
        const results = await search(term);
        setEntreprises(results);
      }
    } catch (error) {
      console.error("Erreur lors de la recherche :", error);
      setError("La recherche a échoué. Veuillez réessayer.");
    }
  };

  // Ouvrir un formulaire vide pour ajouter une nouvelle candidature
  const handleAddNew = () => {
    setSelectedEntreprise(undefined);
    setFormMode("create");
    setIsFormOpen(true);
  };

  // Vérifie que les données d’une candidature sont valides (tous les champs obligatoires)
  function isValidJobApplication(
    data: Partial<JobApplicationRequest>
  ): data is JobApplicationRequest {
    return (
      data.jobCompanyInfo !== undefined &&
      typeof data.jobCompanyInfo.name === "string" &&
      data.jobCompanyInfo.name.trim() !== "" &&
      typeof data.jobCompanyInfo.sector === "string" &&
      data.jobCompanyInfo.sector !== undefined &&
      data.jobCompanyInfo.email !== undefined &&
      typeof data.jobCompanyInfo.email === "string" &&
      data.jobCompanyInfo.email.trim() !== "" &&
      data.jobCompanyInfo.companyType !== undefined &&
      data.jobPositionInfo !== undefined &&
      typeof data.jobPositionInfo.jobTitle === "string" &&
      data.jobPositionInfo.jobTitle.trim() !== "" &&
      typeof data.jobPositionInfo.status === "string" &&
      typeof data.jobPositionInfo.positionType === "string" &&
      typeof data.jobPositionInfo.applicationDate === "string" &&
      data.jobPositionInfo.applicationDate.trim() !== ""
    );
  }

  // Sauvegarde d’une candidature (création ou modification)
  const handleSave = async (
    jobApplicationData: Partial<JobApplicationRequest>
  ) => {
    try {
      if (!isValidJobApplication(jobApplicationData)) {
        console.error("Données invalides : champs obligatoires manquants");
        return;
      }

      if (formMode === "create") {
        await create(jobApplicationData);
      } else if (formMode === "edit" && selectedEntreprise) {
        const updated = await update({
          ...jobApplicationData,
          id: selectedEntreprise.id,
        });
        // Mise à jour dans la liste locale
        setEntreprises(
          Entreprises.map((jobApplication) =>
            jobApplication.id === selectedEntreprise.id
              ? updated
              : jobApplication
          )
        );
      }
      window.location.reload();

      setIsFormOpen(false);
      setSelectedEntreprise(undefined);
    } catch (error) {
      console.error("Erreur lors de la sauvegarde :", error);
    }
  };

  // Fermer le formulaire sans enregistrer
  const handleCloseForm = () => {
    setIsFormOpen(false);
    setSelectedEntreprise(undefined);
  };

  // Réinitialise les filtres de recherche en rechargeant toutes les données
  const handleResetFilters = async () => {
    try {
      setLoading(true);
      const all = await getAllJobApplications();
      setEntreprises(all);
      setLoading(false);
    } catch (error) {
      console.error("Erreur lors du reset:", error);
      setError("Erreur lors du rechargement des données");
      setLoading(false);
    }
  };

  return {
    Entreprises,
    setEntreprises,
    selectedEntreprise,
    setSelectedEntreprise,
    isFormOpen,
    setIsFormOpen,
    formMode,
    setFormMode,
    handleView,
    handleEdit,
    handleDelete,
    handleSearch,
    handleAddNew,
    handleSave,
    handleCloseForm,
    handleResetFilters,
    loading,
    error
  };
}
