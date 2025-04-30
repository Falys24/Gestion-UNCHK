// Mock data for demonstration purposes

// Student data
export interface Student {
  id: string;
  name: string;
  email: string;
  studentId: string;
  department: string;
  enrollmentDate: string;
  status: 'active' | 'inactive' | 'graduated' | 'suspended';
  gender: 'male' | 'female' | 'other';
  dateOfBirth: string;
  contactNumber: string;
  address: string;
}

export const students: Student[] = [
  {
    id: '1',
    name: 'John Smith',
    email: 'john.smith@university.edu',
    studentId: 'S2020001',
    department: 'Computer Science',
    enrollmentDate: '2020-09-01',
    status: 'active',
    gender: 'male',
    dateOfBirth: '1998-05-15',
    contactNumber: '(555) 123-4567',
    address: '123 Campus Drive, University City'
  },
  {
    id: '2',
    name: 'Emma Johnson',
    email: 'emma.johnson@university.edu',
    studentId: 'S2020002',
    department: 'Business Administration',
    enrollmentDate: '2020-09-01',
    status: 'active',
    gender: 'female',
    dateOfBirth: '1999-08-22',
    contactNumber: '(555) 234-5678',
    address: '456 University Ave, College Town'
  },
  {
    id: '3',
    name: 'Michael Chen',
    email: 'michael.chen@university.edu',
    studentId: 'S2019003',
    department: 'Electrical Engineering',
    enrollmentDate: '2019-09-01',
    status: 'active',
    gender: 'male',
    dateOfBirth: '2000-02-10',
    contactNumber: '(555) 345-6789',
    address: '789 Academic Blvd, Scholar City'
  },
  {
    id: '4',
    name: 'Sophia Rodriguez',
    email: 'sophia.rodriguez@university.edu',
    studentId: 'S2021004',
    department: 'Psychology',
    enrollmentDate: '2021-09-01',
    status: 'active',
    gender: 'female',
    dateOfBirth: '2001-11-30',
    contactNumber: '(555) 456-7890',
    address: '321 Learning Lane, Education Town'
  },
  {
    id: '5',
    name: 'James Wilson',
    email: 'james.wilson@university.edu',
    studentId: 'S2018005',
    department: 'Mathematics',
    enrollmentDate: '2018-09-01',
    status: 'graduated',
    gender: 'male',
    dateOfBirth: '1997-07-18',
    contactNumber: '(555) 567-8901',
    address: '654 Knowledge Road, Wisdom City'
  },
  {
    id: '6',
    name: 'Olivia Brown',
    email: 'olivia.brown@university.edu',
    studentId: 'S2022006',
    department: 'Chemistry',
    enrollmentDate: '2022-09-01',
    status: 'active',
    gender: 'female',
    dateOfBirth: '2002-04-05',
    contactNumber: '(555) 678-9012',
    address: '987 Science Street, Research Park'
  }
];

// Faculty data
export interface Faculty {
  id: string;
  name: string;
  email: string;
  facultyId: string;
  department: string;
  position: string;
  joinDate: string;
  status: 'active' | 'inactive' | 'on leave';
  specialization: string;
  contactNumber: string;
  office: string;
}

export const faculty: Faculty[] = [
  {
    id: '1',
    name: 'Dr. Robert Davis',
    email: 'robert.davis@university.edu',
    facultyId: 'F001',
    department: 'Computer Science',
    position: 'Professor',
    joinDate: '2010-08-15',
    status: 'active',
    specialization: 'Artificial Intelligence',
    contactNumber: '(555) 111-2222',
    office: 'Tech Building, Room 305'
  },
  {
    id: '2',
    name: 'Dr. Sarah Miller',
    email: 'sarah.miller@university.edu',
    facultyId: 'F002',
    department: 'Business Administration',
    position: 'Associate Professor',
    joinDate: '2015-01-10',
    status: 'active',
    specialization: 'Marketing Strategies',
    contactNumber: '(555) 222-3333',
    office: 'Business Building, Room 210'
  },
  {
    id: '3',
    name: 'Dr. David Kim',
    email: 'david.kim@university.edu',
    facultyId: 'F003',
    department: 'Electrical Engineering',
    position: 'Assistant Professor',
    joinDate: '2018-08-20',
    status: 'active',
    specialization: 'Robotics',
    contactNumber: '(555) 333-4444',
    office: 'Engineering Building, Room 405'
  },
  {
    id: '4',
    name: 'Dr. Jennifer Lopez',
    email: 'jennifer.lopez@university.edu',
    facultyId: 'F004',
    department: 'Psychology',
    position: 'Professor',
    joinDate: '2008-09-01',
    status: 'on leave',
    specialization: 'Cognitive Psychology',
    contactNumber: '(555) 444-5555',
    office: 'Social Sciences Building, Room 201'
  }
];

// Course data
export interface Course {
  id: string;
  code: string;
  title: string;
  description: string;
  department: string;
  credits: number;
  instructor: string;
  schedule: string;
  location: string;
  maxCapacity: number;
  currentEnrollment: number;
  status: 'active' | 'inactive' | 'upcoming';
}

export const courses: Course[] = [
  {
    id: '1',
    code: 'CS101',
    title: 'Introduction to Computer Science',
    description: 'A foundational course covering basic concepts in computer science including algorithms, data structures, and problem-solving strategies.',
    department: 'Computer Science',
    credits: 3,
    instructor: 'Dr. Robert Davis',
    schedule: 'Mon/Wed 10:00 AM - 11:30 AM',
    location: 'Tech Building, Room 101',
    maxCapacity: 50,
    currentEnrollment: 45,
    status: 'active'
  },
  {
    id: '2',
    code: 'BUS202',
    title: 'Principles of Marketing',
    description: 'An overview of marketing principles, consumer behavior, and market research methods.',
    department: 'Business Administration',
    credits: 3,
    instructor: 'Dr. Sarah Miller',
    schedule: 'Tue/Thu 1:00 PM - 2:30 PM',
    location: 'Business Building, Room 105',
    maxCapacity: 40,
    currentEnrollment: 38,
    status: 'active'
  },
  {
    id: '3',
    code: 'EE301',
    title: 'Digital Electronics',
    description: 'Advanced concepts in digital circuit design, including microprocessors and programmable logic devices.',
    department: 'Electrical Engineering',
    credits: 4,
    instructor: 'Dr. David Kim',
    schedule: 'Mon/Wed/Fri 9:00 AM - 10:00 AM',
    location: 'Engineering Building, Room 201',
    maxCapacity: 30,
    currentEnrollment: 25,
    status: 'active'
  },
  {
    id: '4',
    code: 'PSY201',
    title: 'Introduction to Psychology',
    description: 'Survey of major psychological theories, concepts, and applications.',
    department: 'Psychology',
    credits: 3,
    instructor: 'Dr. Jennifer Lopez',
    schedule: 'Tue/Thu 10:00 AM - 11:30 AM',
    location: 'Social Sciences Building, Room 110',
    maxCapacity: 60,
    currentEnrollment: 55,
    status: 'active'
  },
  {
    id: '5',
    code: 'MATH101',
    title: 'Calculus I',
    description: 'Introduction to differential and integral calculus of functions of one variable.',
    department: 'Mathematics',
    credits: 4,
    instructor: 'Dr. Alan Thompson',
    schedule: 'Mon/Wed/Fri 11:00 AM - 12:00 PM',
    location: 'Science Building, Room 205',
    maxCapacity: 35,
    currentEnrollment: 32,
    status: 'active'
  }
];

// Departments data
export interface Department {
  id: string;
  name: string;
  code: string;
  headOfDepartment: string;
  email: string;
  phone: string;
  building: string;
  office: string;
  establishedDate: string;
  facultyCount: number;
  studentCount: number;
  description: string;
}

export const departments: Department[] = [
  {
    id: '1',
    name: 'Computer Science',
    code: 'CS',
    headOfDepartment: 'Dr. Robert Davis',
    email: 'cs.department@university.edu',
    phone: '(555) 123-0001',
    building: 'Tech Building',
    office: 'Room 300',
    establishedDate: '1985-09-01',
    facultyCount: 15,
    studentCount: 250,
    description: 'The Department of Computer Science offers programs in computing theory, software development, and emerging technologies.'
  },
  {
    id: '2',
    name: 'Business Administration',
    code: 'BUS',
    headOfDepartment: 'Dr. Sarah Miller',
    email: 'business.department@university.edu',
    phone: '(555) 123-0002',
    building: 'Business Building',
    office: 'Room 200',
    establishedDate: '1970-09-01',
    facultyCount: 20,
    studentCount: 350,
    description: 'The Department of Business Administration offers programs in management, marketing, finance, and entrepreneurship.'
  },
  {
    id: '3',
    name: 'Electrical Engineering',
    code: 'EE',
    headOfDepartment: 'Dr. David Kim',
    email: 'ee.department@university.edu',
    phone: '(555) 123-0003',
    building: 'Engineering Building',
    office: 'Room 400',
    establishedDate: '1975-09-01',
    facultyCount: 18,
    studentCount: 200,
    description: 'The Department of Electrical Engineering offers programs in circuits, electronics, power systems, and control systems.'
  },
  {
    id: '4',
    name: 'Psychology',
    code: 'PSY',
    headOfDepartment: 'Dr. Jennifer Lopez',
    email: 'psychology.department@university.edu',
    phone: '(555) 123-0004',
    building: 'Social Sciences Building',
    office: 'Room 200',
    establishedDate: '1980-09-01',
    facultyCount: 12,
    studentCount: 180,
    description: 'The Department of Psychology offers programs in clinical, cognitive, developmental, and social psychology.'
  },
  {
    id: '5',
    name: 'Mathematics',
    code: 'MATH',
    headOfDepartment: 'Dr. Alan Thompson',
    email: 'math.department@university.edu',
    phone: '(555) 123-0005',
    building: 'Science Building',
    office: 'Room 200',
    establishedDate: '1965-09-01',
    facultyCount: 14,
    studentCount: 150,
    description: 'The Department of Mathematics offers programs in pure and applied mathematics, statistics, and mathematical modeling.'
  }
];

// Grades data
export interface Grade {
  id: string;
  studentId: string;
  studentName: string;
  courseId: string;
  courseCode: string;
  courseTitle: string;
  semester: string;
  academicYear: string;
  grade: string;
  gradePoints: number;
  instructorId: string;
  instructorName: string;
  submissionDate: string;
  comments?: string;
}

export const grades: Grade[] = [
  {
    id: '1',
    studentId: '1',
    studentName: 'John Smith',
    courseId: '1',
    courseCode: 'CS101',
    courseTitle: 'Introduction to Computer Science',
    semester: 'Fall',
    academicYear: '2023-2024',
    grade: 'A',
    gradePoints: 4.0,
    instructorId: '1',
    instructorName: 'Dr. Robert Davis',
    submissionDate: '2023-12-20',
    comments: 'Excellent performance throughout the course.'
  },
  {
    id: '2',
    studentId: '1',
    studentName: 'John Smith',
    courseId: '5',
    courseCode: 'MATH101',
    courseTitle: 'Calculus I',
    semester: 'Fall',
    academicYear: '2023-2024',
    grade: 'B+',
    gradePoints: 3.5,
    instructorId: '5',
    instructorName: 'Dr. Alan Thompson',
    submissionDate: '2023-12-19'
  },
  {
    id: '3',
    studentId: '2',
    studentName: 'Emma Johnson',
    courseId: '2',
    courseCode: 'BUS202',
    courseTitle: 'Principles of Marketing',
    semester: 'Fall',
    academicYear: '2023-2024',
    grade: 'A-',
    gradePoints: 3.7,
    instructorId: '2',
    instructorName: 'Dr. Sarah Miller',
    submissionDate: '2023-12-18',
    comments: 'Strong analytical skills demonstrated in all assignments.'
  },
  {
    id: '4',
    studentId: '3',
    studentName: 'Michael Chen',
    courseId: '3',
    courseCode: 'EE301',
    courseTitle: 'Digital Electronics',
    semester: 'Fall',
    academicYear: '2023-2024',
    grade: 'A',
    gradePoints: 4.0,
    instructorId: '3',
    instructorName: 'Dr. David Kim',
    submissionDate: '2023-12-21'
  },
  {
    id: '5',
    studentId: '4',
    studentName: 'Sophia Rodriguez',
    courseId: '4',
    courseCode: 'PSY201',
    courseTitle: 'Introduction to Psychology',
    semester: 'Fall',
    academicYear: '2023-2024',
    grade: 'B',
    gradePoints: 3.0,
    instructorId: '4',
    instructorName: 'Dr. Jennifer Lopez',
    submissionDate: '2023-12-17'
  }
];

// Stats and dashboard data
export interface StatsData {
  totalStudents: number;
  totalFaculty: number;
  totalCourses: number;
  totalDepartments: number;
  studentsByDepartment: { name: string; count: number }[];
  recentActivity: {
    id: string;
    type: 'enrollment' | 'grade' | 'course' | 'faculty';
    description: string;
    date: string;
  }[];
}

export const statsData: StatsData = {
  totalStudents: students.length,
  totalFaculty: faculty.length,
  totalCourses: courses.length,
  totalDepartments: departments.length,
  studentsByDepartment: [
    { name: 'Computer Science', count: 120 },
    { name: 'Business Administration', count: 180 },
    { name: 'Electrical Engineering', count: 90 },
    { name: 'Psychology', count: 75 },
    { name: 'Mathematics', count: 65 }
  ],
  recentActivity: [
    {
      id: '1',
      type: 'enrollment',
      description: 'New student Emma Johnson enrolled in Business Administration',
      date: '2023-09-01'
    },
    {
      id: '2',
      type: 'grade',
      description: 'Grades posted for CS101: Introduction to Computer Science',
      date: '2023-12-20'
    },
    {
      id: '3',
      type: 'course',
      description: 'New course added: AI485 - Advanced Machine Learning',
      date: '2023-12-15'
    },
    {
      id: '4',
      type: 'faculty',
      description: 'Dr. Thomas Wright joined Mathematics Department',
      date: '2023-12-10'
    },
    {
      id: '5',
      type: 'enrollment',
      description: 'Michael Chen transferred to Electrical Engineering Department',
      date: '2023-12-05'
    }
  ]
};