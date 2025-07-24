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
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [posteFilter, setPosteFilter] = useState("");
  const [sortBy, setSortBy] = useState("applicationDate");
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

  const filteredAndSortedEntreprises = useMemo(() => {
    const filtered = Entreprises.filter((item) => {
      const search = searchTerm.toLowerCase();
      const matchesSearch =
        searchTerm === "" ||
        [item.companyName, item.sector, item.companyType].some((val) =>
          val.toLowerCase().includes(search)
        );
      const matchesStatus = statusFilter === "" || item.status === statusFilter;
      const matchesType = typeFilter === "" || item.positionType === typeFilter;
      const matchesPoste =
        posteFilter === "" ||
        item.jobTitle.toLowerCase().includes(posteFilter.toLowerCase());
      return matchesSearch && matchesStatus && matchesType && matchesPoste;
    });
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "applicationDate":
          return (
            new Date(b.applicationDate).getTime() -
            new Date(a.applicationDate).getTime()
          );
        case "jobTitle":
          return a.jobTitle
            .toLowerCase()
            .localeCompare(b.jobTitle.toLowerCase());
        case "positionType":
          return a.positionType
            .toLowerCase()
            .localeCompare(b.positionType.toLowerCase());
        case "companyType":
          return a.companyType
            .toLowerCase()
            .localeCompare(b.companyType.toLowerCase());
        case "status":
          return a.status.toLowerCase().localeCompare(b.status.toLowerCase());
        default:
          return 0;
      }
    });
    return filtered;
  }, [Entreprises, searchTerm, statusFilter, typeFilter, posteFilter, sortBy]);

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
        const created = await create(jobApplicationData);
        setEntreprises([...Entreprises, created]);
        window.location.reload();
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
        window.location.reload();
      }

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

  const handleResetFilters = () => {
    setSearchTerm("");
    setStatusFilter("");
    setTypeFilter("");
    setSortBy("applicationDate");
    setPosteFilter("");
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
    handleView,
    handleEdit,
    handleDelete,
    handleAddNew,
    handleSave,
    handleCloseForm,
    handleResetFilters,
  };
}
