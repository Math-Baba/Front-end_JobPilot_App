import React from 'react';
import { TrendingUp, Users, Building, Calendar } from 'lucide-react';
import { Stage } from '../types/Stage';

interface StageStatsProps {
  stages: Stage[];
}

const StageStats: React.FC<StageStatsProps> = ({ stages }) => {
  const stats = {
    total: stages.length,
    enCours: stages.filter(s => s.stage.statut === 'En cours').length,
    termine: stages.filter(s => s.stage.statut === 'Terminé').length,
    aVenir: stages.filter(s => s.stage.statut === 'À venir').length,
    entreprises: new Set(stages.map(s => s.entreprise.nom)).size
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
      <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">Total Stages</p>
            <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
          </div>
          <div className="p-3 bg-blue-100 rounded-full">
            <TrendingUp className="w-6 h-6 text-blue-600" />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">En Cours</p>
            <p className="text-2xl font-bold text-blue-600">{stats.enCours}</p>
          </div>
          <div className="p-3 bg-blue-100 rounded-full">
            <Users className="w-6 h-6 text-blue-600" />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">Terminés</p>
            <p className="text-2xl font-bold text-green-600">{stats.termine}</p>
          </div>
          <div className="p-3 bg-green-100 rounded-full">
            <Calendar className="w-6 h-6 text-green-600" />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">Entreprises</p>
            <p className="text-2xl font-bold text-purple-600">{stats.entreprises}</p>
          </div>
          <div className="p-3 bg-purple-100 rounded-full">
            <Building className="w-6 h-6 text-purple-600" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default StageStats;