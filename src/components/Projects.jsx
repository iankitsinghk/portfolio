const projects = [
  {
    title: 'Customer Booking Analytics',
    desc: 'CDS View & ABAP Reporting',
    tag: 'ABAP'
  },
  {
    title: 'Frequent Flyer Analysis',
    desc: 'Prime & Non-Prime Analysis',
    tag: 'CDS View'
  },
  {
    title: 'Sales Order Dashboard',
    desc: 'Fiori & ABAP OData Service',
    tag: 'Fiori'
  },
]

export default function Projects() {
  return (
    <section id="projects" className="py-16 px-16 bg-gray-50">
      <h2 className="text-2xl font-bold mb-8 pb-2 border-b border-gray-200">
        Featured Projects
      </h2>
      <div className="flex gap-6 flex-wrap">
        {projects.map(project => (
          <div key={project.title} className="bg-white rounded-lg shadow-md overflow-hidden w-64 hover:shadow-xl transition duration-200">
            {/* Project Image Placeholder */}
            <div style={{backgroundColor: '#dbeafe'}} className="h-40 flex items-center justify-center">
              <span style={{color: '#2563eb'}} className="text-4xl font-bold opacity-30">
                {project.tag}
              </span>
            </div>
            <div className="p-4">
              <h3 className="font-bold text-gray-800 mb-1">{project.title}</h3>
              <p className="text-gray-500 text-sm">{project.desc}</p>
              <button
                style={{backgroundColor: '#2563eb'}}
                className="mt-4 text-white text-sm px-4 py-1 rounded hover:opacity-90 transition duration-200"
              >
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-10">
        <button
          style={{backgroundColor: '#2563eb'}}
          className="text-white px-10 py-2 rounded font-medium hover:opacity-90 transition duration-200"
        >
          View All Projects
        </button>
      </div>
    </section>
  )
}