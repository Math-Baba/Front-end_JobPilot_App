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

export function useAppLogic() {
  const [Entreprises, setEntreprises] = useState<JobApplicationResponse[]>([]);
  const [selectedEntreprise, setSelectedEntreprise] = useState<
    JobApplicationRequest | undefined
  >();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [formMode, setFormMode] = useState<"create" | "edit" | "view">(
    "create"
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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

  const handleView = (jobApplication: JobApplicationRequest) => {
    setSelectedEntreprise(jobApplication);
    setFormMode("view");
    setIsFormOpen(true);
  };

  const handleEdit = (jobApplication: JobApplicationRequest) => {
    setSelectedEntreprise(jobApplication);
    setFormMode("edit");
    setIsFormOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (
      window.confirm("Êtes-vous sûr de vouloir supprimer cette candidature ?")
    ) {
      try {
        await deleteJob(Number(id));
        setEntreprises(
          Entreprises.filter((jobApplication) => jobApplication.id !== id)
        );
      } catch (error) {
        console.error("Erreur lors de la suppression :", error);
        alert("Impossible de supprimer la candidature. Veuillez réessayer.");
      }
    }
  };

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

  const handleAddNew = () => {
    setSelectedEntreprise(undefined);
    setFormMode("create");
    setIsFormOpen(true);
  };

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

  const handleCloseForm = () => {
    setIsFormOpen(false);
    setSelectedEntreprise(undefined);
  };

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
