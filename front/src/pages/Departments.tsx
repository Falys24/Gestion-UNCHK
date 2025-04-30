import React, { useState } from 'react';
import {
  Search,
  Plus,
  Filter,
  Edit,
  Trash2,
  Building2,
  Users,
  GraduationCap,
  Calendar,
  Phone,
  Mail,
  MapPin,
  Info,
  Check,
  X
} from 'lucide-react';
import { departments as initialDepartments, Department } from '../data/mockData';

const Departements: React.FC = () => {
  const [departments, setDepartments] = useState<Department[]>(initialDepartments);
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [currentDepartment, setCurrentDepartment] = useState<Department | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const filteredDepartments = departments.filter(department =>
    department.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    department.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
    department.headOfDepartment.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddDepartment = (newDepartment: Department) => {
    setDepartments([...departments, newDepartment]);
    setShowAddModal(false);
  };

  const handleEditDepartment = (updatedDepartment: Department) => {
    setDepartments(
      departments.map(department =>
        department.id === updatedDepartment.id ? updatedDepartment : department
      )
    );
    setShowAddModal(false);
  };

  const handleDeleteDepartment = (id: string) => {
    setDepartments(departments.filter(department => department.id !== id));
    setShowDeleteModal(false);
  };

  return (
    <div className="space-y-6 slide-in">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <img
            src="https://www.unchk.sn/wp-content/uploads/2023/05/Logo-UN-CHK-1-1024x904.png"
            alt="Logo UNCHK"
            className="h-10 w-10"
          />
          <h1 className="text-2xl font-bold">Départements</h1>
        </div>
        <div className="flex items-center space-x-2">
          <div className="flex rounded-md border border-gray-300 p-1">
            <button
              className={`rounded px-3 py-1 ${viewMode === 'grid' ? 'bg-primary-100 text-primary-700' : 'text-gray-500'}`}
              onClick={() => setViewMode('grid')}
            >
              Grille
            </button>
            <button
              className={`rounded px-3 py-1 ${viewMode === 'list' ? 'bg-primary-100 text-primary-700' : 'text-gray-500'}`}
              onClick={() => setViewMode('list')}
            >
              Liste
            </button>
          </div>
          <button
            className="btn btn-primary space-x-1"
            onClick={() => {
              setCurrentDepartment(null);
              setShowAddModal(true);
            }}
          >
            <Plus size={18} />
            <span>Ajouter un département</span>
          </button>
        </div>
      </div>

      <div className="flex items-center space-x-4">
        <div className="relative flex-1">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            className="input pl-10"
            placeholder="Rechercher un département par nom, code ou chef de département..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <button className="btn btn-secondary space-x-1">
          <Filter size={18} />
          <span>Filtrer</span>
        </button>
      </div>

      {/* Ici tu peux continuer à insérer la logique grid et list avec les noms traduits */}

      {showAddModal && (
        <DepartmentFormModal
          department={currentDepartment}
          onSave={currentDepartment ? handleEditDepartment : handleAddDepartment}
          onCancel={() => {
            setShowAddModal(false);
            setCurrentDepartment(null);
          }}
        />
      )}

      {showDeleteModal && currentDepartment && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-lg">
            <h2 className="text-xl font-bold text-gray-900">Confirmer la suppression</h2>
            <p className="mt-2 text-gray-600">
              Voulez-vous vraiment supprimer le département {currentDepartment.name} ? Cette action est définitive et peut affecter les étudiants et enseignants liés.
            </p>
            <div className="mt-6 flex justify-end space-x-3">
              <button
                className="btn btn-secondary"
                onClick={() => {
                  setShowDeleteModal(false);
                  setCurrentDepartment(null);
                }}
              >
                Annuler
              </button>
              <button
                className="btn btn-danger"
                onClick={() => handleDeleteDepartment(currentDepartment.id)}
              >
                Supprimer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Departements;
