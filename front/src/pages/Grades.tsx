import React, { useState } from 'react';
import { 
  Search, 
  Plus, 
  Filter, 
  Edit, 
  Trash2, 
  GraduationCap,
  ChevronDown,
  Check,
  X
} from 'lucide-react';
import { grades as initialGrades, Grade, students, courses } from '../data/mockData';

const Grades: React.FC = () => {
  const [grades, setGrades] = useState<Grade[]>(initialGrades);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCourse, setSelectedCourse] = useState<string>('all');
  const [selectedSemester, setSelectedSemester] = useState<string>('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [currentGrade, setCurrentGrade] = useState<Grade | null>(null);

  const uniqueCourses = Array.from(new Set(initialGrades.map(grade => grade.courseCode)));
  const uniqueSemesters = Array.from(new Set(initialGrades.map(grade => `${grade.semester} ${grade.academicYear}`)));

  const filteredGrades = grades.filter(grade => {
    const matchesSearch = 
      grade.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      grade.courseCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
      grade.courseTitle.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCourse = selectedCourse === 'all' || grade.courseCode === selectedCourse;
    const matchesSemester = selectedSemester === 'all' || `${grade.semester} ${grade.academicYear}` === selectedSemester;

    return matchesSearch && matchesCourse && matchesSemester;
  });

  const handleAddGrade = (newGrade: Grade) => {
    setGrades([...grades, newGrade]);
    setShowAddModal(false);
  };

  const handleEditGrade = (updatedGrade: Grade) => {
    setGrades(
      grades.map(grade => 
        grade.id === updatedGrade.id ? updatedGrade : grade
      )
    );
    setCurrentGrade(null);
    setShowAddModal(false);
  };

  const handleDeleteGrade = (id: string) => {
    setGrades(grades.filter(grade => grade.id !== id));
    setShowDeleteModal(false);
  };

  const getGradeBadgeClass = (grade: string) => {
    const gradeValue = grade.charAt(0);
    switch (gradeValue) {
      case 'A': return 'badge-success';
      case 'B': return 'badge-primary';
      case 'C': return 'bg-purple-100 text-purple-800';
      case 'D': return 'badge-warning';
      case 'F': return 'badge-danger';
      default: return 'badge-primary';
    }
  };

  return (
    <div className="space-y-6 slide-in">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <img src={logoUNCHK} alt="Logo UNCHK" className="h-10 w-auto" />
          <div className="flex items-center space-x-2">
            <GraduationCap className="h-6 w-6 text-primary-600" />
            <h1 className="text-2xl font-bold">Notes des étudiants</h1>
          </div>
        </div>
        <button 
          className="btn btn-primary space-x-1"
          onClick={() => {
            setCurrentGrade(null);
            setShowAddModal(true);
          }}
        >
          <Plus size={18} />
          <span>Ajouter une note</span>
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
            placeholder="Rechercher par étudiant, code ou titre du cours..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="flex items-center space-x-2">
          <div className="relative">
            <select
              className="input appearance-none pr-10"
              value={selectedCourse}
              onChange={(e) => setSelectedCourse(e.target.value)}
            >
              <option value="all">Tous les cours</option>
              {uniqueCourses.map((course, index) => (
                <option key={index} value={course}>{course}</option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
              <ChevronDown className="h-4 w-4 text-gray-400" />
            </div>
          </div>

          <div className="relative">
            <select
              className="input appearance-none pr-10"
              value={selectedSemester}
              onChange={(e) => setSelectedSemester(e.target.value)}
            >
              <option value="all">Tous les semestres</option>
              {uniqueSemesters.map((semester, index) => (
                <option key={index} value={semester}>{semester}</option>
              ))}
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

      {/* Ajout d'un tableau des notes */}
      <div className="card overflow-hidden p-0">
        <div className="table-container">
          <table className="table">
            <thead className="bg-gray-50">
              <tr>
                <th>Étudiant</th>
                <th>Cours</th>
                <th>Semestre</th>
                <th>Note</th>
                <th>Enseignant</th>
                <th>Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredGrades.length > 0 ? (
                filteredGrades.map((grade) => (
                  <tr key={grade.id}>
                    <td className="font-medium">{grade.studentName}</td>
                    <td>
                      <div>
                        <div className="font-medium">{grade.courseCode}</div>
                        <div className="text-xs text-gray-500">{grade.courseTitle}</div>
                      </div>
                    </td>
                    <td>{grade.semester} {grade.academicYear}</td>
                    <td>
                      <span className={`badge ${getGradeBadgeClass(grade.grade)}`}>
                        {grade.grade} ({grade.gradePoints.toFixed(1)})
                      </span>
                    </td>
                    <td>{grade.instructorName}</td>
                    <td>{new Date(grade.submissionDate).toLocaleDateString()}</td>
                    <td>
                      <div className="flex space-x-2">
                        <button 
                          className="text-gray-500 hover:text-primary-600"
                          onClick={() => {
                            setCurrentGrade(grade);
                            setShowAddModal(true);
                          }}
                        >
                          <Edit size={18} />
                        </button>
                        <button 
                          className="text-gray-500 hover:text-red-600"
                          onClick={() => {
                            setCurrentGrade(grade);
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
                    Aucune note trouvée correspondant à vos critères
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modals (ajout/édition/suppression) à personnaliser comme dans les autres composants */}
    </div>
  );
};

export default Grades;
