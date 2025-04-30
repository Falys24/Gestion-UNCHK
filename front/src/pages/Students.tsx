import React, { useState } from 'react';
import { 
  Search, 
  UserPlus, 
  Filter, 
  Edit, 
  Trash2, 
  Users,
  ChevronDown,
  Check,
  X
} from 'lucide-react';
import { students as initialStudents, Student } from '../data/mockData';

const Students: React.FC = () => {
  const [students, setStudents] = useState<Student[]>(initialStudents);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [currentStudent, setCurrentStudent] = useState<Student | null>(null);

  const departments = Array.from(new Set(initialStudents.map(student => student.department)));

  const filteredStudents = students.filter(student => {
    const matchesSearch = 
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.studentId.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesDepartment = selectedDepartment === 'all' || student.department === selectedDepartment;
    const matchesStatus = selectedStatus === 'all' || student.status === selectedStatus;

    return matchesSearch && matchesDepartment && matchesStatus;
  });

  const handleAddStudent = (newStudent: Student) => {
    setStudents([...students, newStudent]);
    setShowAddModal(false);
  };

  const handleDeleteStudent = (id: string) => {
    setStudents(students.filter(student => student.id !== id));
    setShowDeleteModal(false);
  };

  const handleEditStudent = (updatedStudent: Student) => {
    setStudents(
      students.map(student => 
        student.id === updatedStudent.id ? updatedStudent : student
      )
    );
    setCurrentStudent(null);
  };

  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case 'active': return 'badge-success';
      case 'inactive': return 'badge-warning';
      case 'graduated': return 'badge-primary';
      case 'suspended': return 'badge-danger';
      default: return 'badge-primary';
    }
  };

  const capitalizeFirstLetter = (string: string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  return (
    <div className="space-y-6 slide-in">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <img src={logoUNCHK} alt="Logo UNCHK" className="h-10 w-auto" />
          <div className="flex items-center space-x-2">
            <Users className="h-6 w-6 text-primary-600" />
            <h1 className="text-2xl font-bold">Étudiants</h1>
          </div>
        </div>
        <button 
          className="btn btn-primary space-x-1"
          onClick={() => {
            setCurrentStudent(null);
            setShowAddModal(true);
          }}
        >
          <UserPlus size={18} />
          <span>Ajouter un étudiant</span>
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
            placeholder="Rechercher un étudiant par nom, email ou identifiant..."
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
              <option value="graduated">Diplômé</option>
              <option value="suspended">Suspendu</option>
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
                <th>ID Étudiant</th>
                <th>Nom</th>
                <th>Département</th>
                <th>Email</th>
                <th>Statut</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredStudents.length > 0 ? (
                filteredStudents.map((student) => (
                  <tr key={student.id}>
                    <td className="font-medium">{student.studentId}</td>
                    <td>{student.name}</td>
                    <td>{student.department}</td>
                    <td>{student.email}</td>
                    <td>
                      <span className={`badge ${getStatusBadgeClass(student.status)}`}>
                        {capitalizeFirstLetter(student.status)}
                      </span>
                    </td>
                    <td>
                      <div className="flex space-x-2">
                        <button 
                          className="text-gray-500 hover:text-primary-600"
                          onClick={() => {
                            setCurrentStudent(student);
                            setShowAddModal(true);
                          }}
                        >
                          <Edit size={18} />
                        </button>
                        <button 
                          className="text-gray-500 hover:text-red-600"
                          onClick={() => {
                            setCurrentStudent(student);
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
                  <td colSpan={6} className="text-center py-6 text-gray-500">
                    Aucun étudiant ne correspond à vos critères
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Students;
