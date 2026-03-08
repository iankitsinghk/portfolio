const skillData = [
  {
    title: 'SAP',
    items: ['ABAP', 'ABAP on HANA', 'CDS Views']
  },
  {
    title: 'Tools',
    items: ['Eclipse ADT', 'SAP GUI', 'Git']
  },
  {
    title: 'Database',
    items: ['SAP HANA', 'SQL']
  },
  {
    title: 'Concepts',
    items: ['OOPS', 'Data Modeling', 'Performance Tuning']
  },
]

export default function Skills() {
  return (
    <section id="skills" style={{backgroundColor: '#1e2d50'}} className="py-16 px-16">
      <h2 className="text-2xl font-bold text-white mb-8 pb-2 border-b border-gray-500">
        Skills
      </h2>
      <div className="grid grid-cols-4 gap-6">
        {skillData.map(skill => (
          <div key={skill.title} style={{backgroundColor: '#243058'}} className="rounded-lg p-6 text-white">
            <h3 className="font-bold text-lg mb-4 text-blue-300">{skill.title}</h3>
            <ul className="space-y-3">
              {skill.items.map(item => (
                <li key={item} className="flex items-center gap-3 text-gray-300">
                  <span className="w-2 h-2 rounded-full flex-shrink-0" style={{backgroundColor: '#60a5fa'}}></span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="mt-10 text-center">
        <a href="#projects">
          <button style={{backgroundColor: '#2563eb'}} className="text-white px-10 py-2 rounded font-medium hover:opacity-90 transition duration-200">
            View Projects
          </button>
        </a>
      </div>
    </section>
  )
}