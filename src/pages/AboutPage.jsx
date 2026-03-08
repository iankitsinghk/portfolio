export default function AboutPage() {
  const education = [
    {
      degree: 'B.Tech in Computer Science',
      school: 'XYZ University',
      year: '2019 – 2023',
      grade: 'CGPA: 8.5 / 10'
    },
    {
      degree: 'Higher Secondary (12th)',
      school: 'ABC School',
      year: '2018 – 2019',
      grade: 'Percentage: 88%'
    },
  ]

  const experience = [
    {
      role: 'SAP ABAP Developer',
      company: 'HCLTech',
      period: 'Aug 2023 – Present',
      points: [
        'Developed CDS Views for real-time analytics reporting',
        'Built ABAP programs for data migration and processing',
        'Worked on SAP Fiori apps using OData services',
        'Collaborated with functional consultants for requirement gathering',
      ]
    },
    {
      role: 'SAP Intern',
      company: 'HCLTech',
      period: 'Feb 2023 – Jul 2023',
      points: [
        'Learned ABAP fundamentals and SAP system navigation',
        'Assisted in debugging existing ABAP programs',
        'Created basic reports using ALV Grid',
      ]
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Page Header */}
      <div style={{backgroundColor: '#1a2340'}} className="text-white py-16 px-16">
        <h1 className="text-4xl font-bold mb-2">About Me</h1>
        <p className="text-blue-300">My background, education and experience</p>
      </div>

      {/* Bio Section */}
      <div className="py-14 px-16 bg-white">
        <div className="flex gap-12 items-center">
          {/* Photo */}
          <div className="w-48 h-48 rounded-full overflow-hidden border-4 flex-shrink-0" style={{borderColor: '#2563eb'}}>
            <img
              src="/photo.jpg"
              alt="Ankit Kumar Singh"
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.style.display = 'none'
                e.target.parentElement.style.backgroundColor = '#dbeafe'
                e.target.parentElement.innerHTML = '<div style="width:100%;height:100%;display:flex;align-items:center;justify-content:center;font-size:48px">👤</div>'
              }}
            />
          </div>
          {/* Bio Text */}
          <div>
            <h2 className="text-3xl font-bold text-gray-800 mb-2">Ankit Kumar Singh</h2>
            <p className="text-blue-600 font-semibold mb-4">SAP ABAP / ABAP on HANA Developer</p>
            <p className="text-gray-600 leading-relaxed max-w-2xl">
              I'm a B.Tech graduate passionate about SAP development, currently working at HCLTech.
              I specialize in ABAP on HANA, CDS Views, and Fiori development. I love building
              efficient, scalable SAP solutions and continuously upskilling to stay ahead in the
              SAP ecosystem. My ultimate goal is to join SAP Labs as an Associate Developer.
            </p>
            <div className="flex gap-4 mt-6">
              <span className="px-4 py-1 rounded-full text-sm font-medium text-white" style={{backgroundColor: '#2563eb'}}>
                📍 India
              </span>
              <span className="px-4 py-1 rounded-full text-sm font-medium text-white" style={{backgroundColor: '#16a34a'}}>
                💼 Open to Opportunities
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Education Section */}
      <div className="py-14 px-16 bg-gray-50">
        <h2 className="text-2xl font-bold text-gray-800 mb-8 pb-2 border-b border-gray-200">
          🎓 Education
        </h2>
        <div className="grid grid-cols-2 gap-6">
          {education.map(edu => (
            <div key={edu.degree} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition duration-200">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-bold text-gray-800 text-lg">{edu.degree}</h3>
                <span className="text-sm text-white px-3 py-1 rounded-full flex-shrink-0 ml-4" style={{backgroundColor: '#2563eb'}}>
                  {edu.year}
                </span>
              </div>
              <p className="text-blue-600 font-medium">{edu.school}</p>
              <p className="text-gray-500 text-sm mt-1">{edu.grade}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Work Experience Timeline */}
      <div className="py-14 px-16 bg-white">
        <h2 className="text-2xl font-bold text-gray-800 mb-10 pb-2 border-b border-gray-200">
          💼 Work Experience
        </h2>
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-6 top-0 bottom-0 w-0.5" style={{backgroundColor: '#bfdbfe'}}></div>

          <div className="space-y-10">
            {experience.map((exp, index) => (
              <div key={index} className="relative flex gap-8">
                {/* Circle on timeline */}
                <div className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 z-10 border-4 border-white shadow" style={{backgroundColor: '#2563eb'}}>
                  <span className="text-white text-xs font-bold">{index + 1}</span>
                </div>
                {/* Content */}
                <div className="bg-gray-50 rounded-xl p-6 flex-1 border border-gray-100 hover:shadow-md transition duration-200">
                  <div className="flex justify-between items-start mb-1">
                    <h3 className="font-bold text-gray-800 text-lg">{exp.role}</h3>
                    <span className="text-sm text-gray-500 flex-shrink-0 ml-4">{exp.period}</span>
                  </div>
                  <p className="font-semibold mb-3" style={{color: '#e31837'}}>{exp.company}</p>
                  <ul className="space-y-1">
                    {exp.points.map((point, i) => (
                      <li key={i} className="flex items-start gap-2 text-gray-600 text-sm">
                        <span className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{backgroundColor: '#2563eb'}}></span>
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

    </div>
  )
}