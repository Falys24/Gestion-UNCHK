import React, { useState } from 'react';
import { 
  Search, 
  UserPlus, 
  Filter, 
  Edit, 
  Trash2, 
  GraduationCap,
  ChevronDown,
  Check,
  X
} from 'lucide-react';
import { faculty as initialFaculty, Faculty } from '../data/mockData';

const FacultyPage: React.FC = () => {
  const [faculty, setFaculty] = useState<Faculty[]>(initialFaculty);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [currentFaculty, setCurrentFaculty] = useState<Faculty | null>(null);

  const departments = Array.from(new Set(initialFaculty.map(faculty => faculty.department)));

  const filteredFaculty = faculty.filter(member => {
    const matchesSearch = 
      member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.facultyId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.specialization.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesDepartment = selectedDepartment === 'all' || member.department === selectedDepartment;
    const matchesStatus = selectedStatus === 'all' || member.status === selectedStatus;

    return matchesSearch && matchesDepartment && matchesStatus;
  });

  const handleAddFaculty = (newFaculty: Faculty) => {
    setFaculty([...faculty, newFaculty]);
    setShowAddModal(false);
  };

  const handleDeleteFaculty = (id: string) => {
    setFaculty(faculty.filter(member => member.id !== id));
    setShowDeleteModal(false);
  };

  const handleEditFaculty = (updatedFaculty: Faculty) => {
    setFaculty(
      faculty.map(member => 
        member.id === updatedFaculty.id ? updatedFaculty : member
      )
    );
    setCurrentFaculty(null);
  };

  return (
    <div className="space-y-6 slide-in">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <img src={logoUNCHK} alt="Logo UNCHK" className="h-10 w-auto" />
          <div className="flex items-center space-x-2">
            <GraduationCap className="h-6 w-6 text-primary-600" />
            <h1 className="text-2xl font-bold">Personnel enseignant</h1>
          </div>
        </div>
        <button 
          className="btn btn-primary space-x-1"
          onClick={() => {
            setCurrentFaculty(null);
            setShowAddModal(true);
          }}
        >
          <UserPlus size={18} />
          <span>Ajouter un enseignant</span>
        </button>
      </div>

      <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0 md:space-x-4">
        <div className="relative flex-1">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            className="input pl-10"
            placeholder="Rechercher par nom, email, ID ou spécialité..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="flex items-center space-x-2">
          <div className="relative">
            <select
              className="input appearance-none pr-10"
              value={selectedDepartment}
              onChange={(e) => setSelectedDepartment(e.target.value)}
            >
              <option value="all">Tous les départements</option>
              {departments.map((dept, index) => (
                <option key={index} value={dept}>{dept}</option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
              <ChevronDown className="h-4 w-4 text-gray-400" />
            </div>
          </div>

          <div className="relative">
            <select
              className="input appearance-none pr-10"
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
            >
              <option value="all">Tous les statuts</option>
              <option value="active">Actif</option>
              <option value="inactive">Inactif</option>
              <option value="on leave">En congé</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
              <ChevronDown className="h-4 w-4 text-gray-400" />
            </div>
          </div>

          <button className="btn btn-secondary space-x-1">
            <Filter size={18} />
            <span>Filtrer</span>
          </button>
        </div>
      </div>

      <div className="card overflow-hidden p-0">
        <div className="table-container">
          <table className="table">
            <thead className="bg-gray-50">
              <tr>
                <th>ID</th>
                <th>Nom</th>
                <th>Département</th>
                <th>Poste</th>
                <th>Spécialité</th>
                <th>Statut</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredFaculty.length > 0 ? (
                filteredFaculty.map((member) => (
                  <tr key={member.id}>
                    <td className="font-medium">{member.facultyId}</td>
                    <td>{member.name}</td>
                    <td>{member.department}</td>
                    <td>{member.position}</td>
                    <td>{member.specialization}</td>
                    <td>
                      <span className={`badge ${getStatusBadgeClass(member.status)}`}>
                        {capitalizeFirstLetter(member.status)}
                      </span>
                    </td>
                    <td>
                      <div className="flex space-x-2">
                        <button 
                          className="text-gray-500 hover:text-primary-600"
                          onClick={() => {
                            setCurrentFaculty(member);
                            setShowAddModal(true);
                          }}
                        >
                          <Edit size={18} />
                        </button>
                        <button 
                          className="text-gray-500 hover:text-red-600"
                          onClick={() => {
                            setCurrentFaculty(member);
                            setShowDeleteModal(true);
                          }}
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="text-center py-6 text-gray-500">
                    Aucun membre trouvé correspondant à vos critères
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Le reste du composant (modals) peut suivre le même principe de traduction */}
    </div>
  );
};

export default FacultyPage;

function getStatusBadgeClass(status: string) {
  switch (status) {
    case 'active': return 'badge-success';
    case 'inactive': return 'badge-warning';
    case 'on leave': return 'badge-primary';
    default: return 'badge-secondary';
  }
}

function capitalizeFirstLetter(string: string) {
  return string.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
}
