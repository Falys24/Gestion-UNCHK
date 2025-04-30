import React from 'react';
import { 
  Users, 
  GraduationCap, 
  BookOpen, 
  Building2,
  TrendingUp,
  Clock,
  User,
  BookCheck
} from 'lucide-react';
import { statsData } from '../data/mockData';

const Dashboard: React.FC = () => {
  return (
    <div className="space-y-6 slide-in">
      {/* En-tête avec logo */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <img
            src="https://www.unchk.sn/wp-content/uploads/2023/05/Logo-UN-CHK-1-1024x904.png"
            alt="Logo UN-CHK"
            className="h-12 w-12 object-contain"
          />
          <h1 className="text-2xl font-bold">Tableau de bord</h1>
        </div>
        <span className="text-sm text-gray-500">Dernière mise à jour : {new Date().toLocaleDateString()}</span>
      </div>
      
      {/* Vue d'ensemble des statistiques */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard 
          title="Total Étudiants" 
          value={statsData.totalStudents} 
          icon={<Users className="h-6 w-6 text-blue-600" />}
          trend="+3,2% cette année"
          color="blue"
        />
        <StatCard 
          title="Enseignants/Formateurs" 
          value={statsData.totalFaculty} 
          icon={<GraduationCap className="h-6 w-6 text-green-600" />}
          trend="+1,8% cette année"
          color="green"
        />
        <StatCard 
          title="Formations" 
          value={statsData.totalCourses} 
          icon={<BookOpen className="h-6 w-6 text-purple-600" />}
          trend="+5,4% cette année"
          color="purple"
        />
        <StatCard 
          title="Départements" 
          value={statsData.totalDepartments} 
          icon={<Building2 className="h-6 w-6 text-amber-600" />}
          trend="Stable"
          color="amber"
        />
      </div>
      
      {/* Graphique étudiants par département */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="card space-y-2">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Étudiants par département</h2>
            <button className="text-sm text-primary-600 hover:text-primary-700">
              Voir tout
            </button>
          </div>
          <div className="space-y-2">
            {statsData.studentsByDepartment.map((dept, index) => (
              <div key={index} className="flex flex-col">
                <div className="flex items-center justify-between text-sm">
                  <span>{dept.name}</span>
                  <span className="font-semibold">{dept.count} étudiants</span>
                </div>
                <div className="mt-1 h-2 w-full overflow-hidden rounded-full bg-gray-200">
                  <div 
                    className={`h-2 rounded-full ${getBarColor(index)}`}
                    style={{width: `${(dept.count / 200) * 100}%`}}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Activité récente */}
        <div className="card space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Activité récente</h2>
            <button className="text-sm text-primary-600 hover:text-primary-700">
              Voir tout
            </button>
          </div>
          <div className="space-y-4">
            {statsData.recentActivity.map((activity) => (
              <div key={activity.id} className="flex items-start space-x-3">
                <div className={`flex h-8 w-8 items-center justify-center rounded-full ${getActivityIconBg(activity.type)}`}>
                  {getActivityIcon(activity.type)}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">{activity.description}</p>
                  <p className="text-xs text-gray-500">{new Date(activity.date).toLocaleDateString()}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Actions rapides */}
      <div className="card">
        <h2 className="mb-4 text-lg font-semibold">Actions rapides</h2>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
          <QuickActionButton icon={<User className="h-6 w-6" />} label="Ajouter étudiant" path="/students" />
          <QuickActionButton icon={<GraduationCap className="h-6 w-6" />} label="Ajouter formateur" path="/faculty" />
          <QuickActionButton icon={<BookOpen className="h-6 w-6" />} label="Nouvelle formation" path="/courses" />
          <QuickActionButton icon={<BookCheck className="h-6 w-6" />} label="Enregistrer notes" path="/grades" />
        </div>
      </div>
    </div>
  );
};

interface StatCardProps {
  title: string;
  value: number;
  icon: React.ReactNode;
  trend: string;
  color: 'blue' | 'green' | 'purple' | 'amber' | 'red';
}

const StatCard: React.FC<StatCardProps> = ({ title, value, icon, trend, color }) => {
  const getColorClass = () => {
    switch (color) {
      case 'blue': return 'bg-blue-50 border-blue-200';
      case 'green': return 'bg-green-50 border-green-200';
      case 'purple': return 'bg-purple-50 border-purple-200';
      case 'amber': return 'bg-amber-50 border-amber-200';
      case 'red': return 'bg-red-50 border-red-200';
      default: return 'bg-gray-50 border-gray-200';
    }
  };

  return (
    <div className={`rounded-lg border p-4 ${getColorClass()}`}>
      <div className="flex items-center justify-between">
        <div className="font-medium text-gray-500">{title}</div>
        {icon}
      </div>
      <div className="mt-2 text-3xl font-bold">{value}</div>
      <div className="mt-1 flex items-center text-xs">
        <TrendingUp className="mr-1 h-3 w-3 text-green-500" />
        <span className="text-gray-500">{trend}</span>
      </div>
    </div>
  );
};

interface QuickActionButtonProps {
  icon: React.ReactNode;
  label: string;
  path: string;
}

const QuickActionButton: React.FC<QuickActionButtonProps> = ({ icon, label, path }) => {
  return (
    <a href={path} className="flex flex-col items-center justify-center rounded-lg border border-gray-200 p-4 transition-colors hover:bg-gray-50">
      <div className="mb-2 rounded-full bg-primary-100 p-2 text-primary-600">
        {icon}
      </div>
      <span className="text-sm font-medium">{label}</span>
    </a>
  );
};

const getBarColor = (index: number) => {
  const colors = ['bg-blue-500', 'bg-green-500', 'bg-purple-500', 'bg-amber-500', 'bg-red-500', 'bg-indigo-500', 'bg-pink-500'];
  return colors[index % colors.length];
};

const getActivityIconBg = (type: string) => {
  switch (type) {
    case 'enrollment': return 'bg-blue-100 text-blue-600';
    case 'grade': return 'bg-green-100 text-green-600';
    case 'course': return 'bg-purple-100 text-purple-600';
    case 'faculty': return 'bg-amber-100 text-amber-600';
    default: return 'bg-gray-100 text-gray-600';
  }
};

const getActivityIcon = (type: string) => {
  switch (type) {
    case 'enrollment': return <User className="h-4 w-4" />;
    case 'grade': return <BookCheck className="h-4 w-4" />;
    case 'course': return <BookOpen className="h-4 w-4" />;
    case 'faculty': return <GraduationCap className="h-4 w-4" />;
    default: return <Clock className="h-4 w-4" />;
  }
};

export default Dashboard;
