const skillCategories = [
  {
    title: 'SAP',
    icon: '🔷',
    color: '#0057a8',
    skills: [
      { name: 'ABAP', level: 90 },
      { name: 'ABAP on HANA', level: 85 },
      { name: 'CDS Views', level: 88 },
      { name: 'SAP Fiori', level: 75 },
      { name: 'OData Services', level: 78 },
    ]
  },
  {
    title: 'Tools',
    icon: '🛠️',
    color: '#7c3aed',
    skills: [
      { name: 'Eclipse ADT', level: 90 },
      { name: 'SAP GUI', level: 95 },
      { name: 'Git', level: 75 },
      { name: 'SAP BAS', level: 70 },
      { name: 'SEGW', level: 80 },
    ]
  },
  {
    title: 'Database',
    icon: '🗄️',
    color: '#059669',
    skills: [
      { name: 'SAP HANA', level: 82 },
      { name: 'SQL', level: 85 },
      { name: 'Open SQL', level: 90 },
      { name: 'AMDP', level: 65 },
    ]
  },
  {
    title: 'Concepts',
    icon: '💡',
    color: '#d97706',
    skills: [
      { name: 'OOPS ABAP', level: 85 },
      { name: 'Data Modeling', level: 80 },
      { name: 'Performance Tuning', level: 75 },
      { name: 'Agile / Scrum', level: 70 },
    ]
  },
]

const tools = [
  { name: 'Eclipse ADT', icon: '⚙️' },
  { name: 'SAP GUI', icon: '🖥️' },
  { name: 'Git', icon: '🔀' },
  { name: 'SAP BAS', icon: '☁️' },
  { name: 'VS Code', icon: '💻' },
  { name: 'Postman', icon: '📮' },
  { name: 'JIRA', icon: '📋' },
  { name: 'Confluence', icon: '📝' },
]

export default function SkillsPage() {
  return (
    <div className="min-h-screen bg-gray-50">

      {/* Page Header */}
      <div style={{backgroundColor: '#1a2340'}} className="text-white py-16 px-16">
        <h1 className="text-4xl font-bold mb-2">My Skills</h1>
        <p className="text-blue-300">Technologies, tools and concepts I work with</p>
      </div>

      {/* Skill Bars Section */}
      <div className="py-14 px-16 bg-white">
        <h2 className="text-2xl font-bold text-gray-800 mb-10 pb-2 border-b border-gray-200">
          📊 Skill Proficiency
        </h2>
        <div className="grid grid-cols-2 gap-12">
          {skillCategories.map(category => (
            <div key={category.title}>
              <div className="flex items-center gap-3 mb-6">
                <span className="text-2xl">{category.icon}</span>
                <h3 className="text-xl font-bold text-gray-800">{category.title}</h3>
              </div>
              <div className="space-y-5">
                {category.skills.map(skill => (
                  <div key={skill.name}>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium text-gray-700">{skill.name}</span>
                      <span className="text-sm font-medium" style={{color: category.color}}>{skill.level}%</span>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-2.5">
                      <div
                        className="h-2.5 rounded-full transition-all duration-700"
                        style={{width: `${skill.level}%`, backgroundColor: category.color}}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Tools & Technologies Grid */}
      <div className="py-14 px-16 bg-gray-50">
        <h2 className="text-2xl font-bold text-gray-800 mb-10 pb-2 border-b border-gray-200">
          🧰 Tools & Technologies
        </h2>
        <div className="grid grid-cols-4 gap-6">
          {tools.map(tool => (
            <div
              key={tool.name}
              className="bg-white rounded-xl p-6 text-center shadow-sm border border-gray-100 hover:shadow-md hover:-translate-y-1 transition duration-200"
            >
              <div className="text-4xl mb-3">{tool.icon}</div>
              <p className="font-semibold text-gray-700">{tool.name}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Certifications Strip */}
<div style={{backgroundColor: '#1a2340'}} className="py-14 px-16">
  <h2 className="text-2xl font-bold text-white mb-8 pb-2 border-b border-gray-600">
    🏅 Certifications
  </h2>
  <div className="grid grid-cols-2 gap-6">
    {[
      {
        title: 'SAP Certified Development Associate – ABAP Cloud',
        status: 'Completed',
        year: '2023'
      },
      {
        title: 'SAP Certified Associate – Fiori',
        status: 'Upcoming',
        year: '2024'
      },
    ].map(cert => (
      <div key={cert.title} className="flex items-center gap-5 p-5 rounded-xl" style={{backgroundColor: '#243058'}}>
        <div className="text-4xl flex-shrink-0">🏅</div>
        <div className="flex-1">
          <h3 className="font-semibold text-white">{cert.title}</h3>
          <p className="text-gray-400 text-sm mt-1">{cert.year}</p>
        </div>
        <span
          className="text-sm px-4 py-1 rounded-full font-medium flex-shrink-0"
          style={{
            backgroundColor: cert.status === 'Completed' ? '#dcfce7' : '#fef9c3',
            color: cert.status === 'Completed' ? '#16a34a' : '#ca8a04'
          }}
        >
          {cert.status}
        </span>
      </div>
    ))}
  </div>
  {/* Credly Link */}
  <div className="mt-8 text-center">
    <p className="text-gray-400 text-sm mb-4">View all my verified badges and certifications on Credly</p>
    <button
      onClick={() => window.open('https://www.credly.com/users/iankitsinghk', '_blank')}
      style={{backgroundColor: '#FF6B00'}}
      className="text-white px-8 py-3 rounded-lg font-medium hover:opacity-90 transition duration-200"
    >
      🏆 View My Credly Profile →
    </button>
  </div>
</div>
      

    </div>
  )
}