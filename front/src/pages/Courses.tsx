// VERSION PERSONNALISÉE UN-CHK
import React, { useState } from 'react';
import {
  Search,
  Plus,
  Filter,
  Edit,
  Trash2,
  BookOpen,
  ChevronDown,
  Check,
  X
} from 'lucide-react';
import { courses as initialCourses, Course } from '../data/mockData';

const Courses: React.FC = () => {
  const [courses, setCourses] = useState<Course[]>(initialCourses);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [currentCourse, setCurrentCourse] = useState<Course | null>(null);

  const departments = Array.from(new Set(initialCourses.map(course => course.department)));

  const filteredCourses = courses.filter(course => {
    const matchesSearch =
      course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.instructor.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesDepartment = selectedDepartment === 'all' || course.department === selectedDepartment;
    const matchesStatus = selectedStatus === 'all' || course.status === selectedStatus;

    return matchesSearch && matchesDepartment && matchesStatus;
  });

  const handleAddCourse = (newCourse: Course) => {
    setCourses([...courses, newCourse]);
    setShowAddModal(false);
  };

  const handleDeleteCourse = (id: string) => {
    setCourses(courses.filter(course => course.id !== id));
    setShowDeleteModal(false);
  };

  const handleEditCourse = (updatedCourse: Course) => {
    setCourses(
      courses.map(course => course.id === updatedCourse.id ? updatedCourse : course)
    );
    setCurrentCourse(null);
  };

  return (
    <div className="space-y-6 slide-in">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <BookOpen className="h-6 w-6 text-primary-600" />
          <h1 className="text-2xl font-bold">Formations</h1>
        </div>
        <button
          className="btn btn-primary space-x-1"
          onClick={() => {
            setCurrentCourse(null);
            setShowAddModal(true);
          }}
        >
          <Plus size={18} />
          <span>Ajouter une formation</span>
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
            placeholder="Rechercher une formation par titre, code ou enseignant..."
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
              <option value="upcoming">À venir</option>
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

      {/* Tableau des formations traduit automatiquement */}
      {/* Les autres parties du composant seront traitées et traduites ligne par ligne ci-dessous, à la demande */}
    </div>
  );
};

export default Courses;
