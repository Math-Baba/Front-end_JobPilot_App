import React from 'react';
import { TrendingUp, Send, UserCheck, CheckCircle } from 'lucide-react';
import { JobApplicationResponse } from '../types/Entreprise';

interface EntrepriseStatsProps {
  Entreprises: JobApplicationResponse[];
}

const EntrepriseStats: React.FC<EntrepriseStatsProps> = ({ Entreprises }) => {
  const stats = {
    total: Entreprises.length,
    enCours: Entreprises.filter(s => s.status === 'ATTENTE').length,
    entretien: Entreprises.filter(s => s.status === 'ENTRETIEN').length,
    accepte: Entreprises.filter(s => s.status === 'ACCEPTE').length,
    entreprises: new Set(Entreprises.map(s => s.companyName)).size
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
      <div className="bg-[#fdf0d5] rounded-lg shadow-md border border-gray-200 p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">Total de Candidatures</p>
            <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
          </div>
          <div className="p-3 bg-gray-100 rounded-full">
            <TrendingUp className="w-6 h-6 text-black-600" />
          </div>
        </div>
      </div>

      <div className="bg-[#a8dadc] rounded-lg shadow-md border border-gray-200 p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">En Attente</p>
            <p className="text-2xl font-bold text-blue-600">{stats.enCours}</p>
          </div>
          <div className="p-3 bg-blue-100 rounded-full">
            <Send className="w-6 h-6 text-blue-600" />
          </div>
        </div>
      </div>

      <div className="bg-[#ffe5ec] rounded-lg shadow-md border border-gray-200 p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">Entretiens</p>
            <p className="text-2xl font-bold text-purple-600">{stats.entretien}</p>
          </div>
          <div className="p-3 bg-purple-100 rounded-full">
            <UserCheck className="w-6 h-6 text-purple-600" />
          </div>
        </div>
      </div>

      <div className="bg-green-200 rounded-lg shadow-md border border-gray-200 p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">Acceptés</p>
            <p className="text-2xl font-bold text-green-600">{stats.accepte}</p>
          </div>
          <div className="p-3 bg-green-100 rounded-full">
            <CheckCircle className="w-6 h-6 text-green-600" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EntrepriseStats;