import { useState } from 'react'

const projects = [
  {
    id: 1,
    title: 'Customer Booking Analytics',
    desc: 'A CDS View based analytical report to track customer bookings, cancellations, and trends in real time.',
    fullDesc: `This project involved building a comprehensive analytics solution using SAP CDS Views and ABAP reporting. 
    The system provides real-time visibility into customer booking patterns, cancellation rates, and revenue trends.
    
    The solution uses CDS Views with aggregations and filters pushed down to the HANA database layer for optimal performance. 
    An ALV Grid report was built on top to allow business users to slice and dice data interactively.`,
    category: 'CDS View',
    tags: ['CDS View', 'ABAP', 'SAP HANA', 'ALV'],
    github: 'https://github.com/ankit/customer-booking-analytics',
    status: 'Completed',
    year: '2023',
  },
  {
    id: 2,
    title: 'Frequent Flyer Analysis',
    desc: 'Prime vs Non-Prime customer segmentation using ABAP reporting and HANA optimized queries.',
    fullDesc: `This project focuses on segmenting airline customers into Prime and Non-Prime categories based on 
    their travel frequency and spending patterns. 
    
    Built using ABAP with HANA-optimized Open SQL queries to ensure fast data retrieval. 
    The report provides marketing teams with actionable insights to target high-value customers.`,
    category: 'ABAP',
    tags: ['ABAP', 'SAP HANA', 'Open SQL', 'Reporting'],
    github: 'https://github.com/ankit/frequent-flyer-analysis',
    status: 'Completed',
    year: '2023',
  },
  {
    id: 3,
    title: 'Sales Order Dashboard',
    desc: 'A Fiori app with OData service backend showing live sales order status and KPIs.',
    fullDesc: `A modern SAP Fiori Elements application built on top of a custom OData V2 service. 
    The dashboard displays live sales order status, delivery timelines, and key performance indicators.
    
    The backend OData service was built using SEGW transaction with custom function imports for 
    complex business logic. The Fiori app uses SmartTable and SmartFilterBar for a rich user experience.`,
    category: 'Fiori',
    tags: ['Fiori', 'OData', 'ABAP', 'UI5'],
    github: 'https://github.com/ankit/sales-order-dashboard',
    status: 'In Progress',
    year: '2024',
  },
  {
    id: 4,
    title: 'Data Migration Toolkit',
    desc: 'LSMW and BAPI based data migration tool for moving legacy data into SAP S/4HANA.',
    fullDesc: `A reusable toolkit for migrating legacy system data into SAP S/4HANA using a combination 
    of LSMW, BAPIs, and custom ABAP programs.
    
    The toolkit includes data validation, error logging, and rollback capabilities to ensure 
    data integrity during migration. Successfully migrated over 50,000 master data records.`,
    category: 'ABAP',
    tags: ['ABAP', 'BAPI', 'LSMW', 'S/4HANA', 'Data Migration'],
    github: 'https://github.com/ankit/data-migration-toolkit',
    status: 'Completed',
    year: '2024',
  },
]

const categories = ['All', 'ABAP', 'CDS View', 'Fiori']

export default function ProjectsPage() {
  const [activeCategory, setActiveCategory] = useState('All')
  const [selectedProject, setSelectedProject] = useState(null)

  const filtered = activeCategory === 'All'
    ? projects
    : projects.filter(p => p.category === activeCategory)

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Page Header */}
      <div style={{backgroundColor: '#1a2340'}} className="text-white py-16 px-16">
        <h1 className="text-4xl font-bold mb-2">My Projects</h1>
        <p className="text-blue-300">Things I've built and worked on</p>
      </div>

      {/* Filter Tabs */}
      <div className="px-16 py-8 bg-white border-b border-gray-200">
        <div className="flex gap-3">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className="px-6 py-2 rounded-full font-medium text-sm transition duration-200"
              style={{
                backgroundColor: activeCategory === cat ? '#2563eb' : '#f1f5f9',
                color: activeCategory === cat ? 'white' : '#475569'
              }}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Project Cards */}
      <div className="px-16 py-12">
        <div className="grid grid-cols-2 gap-8">
          {filtered.map(project => (
            <div key={project.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition duration-200">
              {/* Image placeholder */}
              <div style={{backgroundColor: '#1e2d50'}} className="h-48 flex items-center justify-center relative">
                <span className="text-blue-300 text-lg font-semibold tracking-widest uppercase">
                  {project.category}
                </span>
                <span
                  className="absolute top-4 right-4 text-xs px-3 py-1 rounded-full font-medium"
                  style={{
                    backgroundColor: project.status === 'Completed' ? '#dcfce7' : '#fef9c3',
                    color: project.status === 'Completed' ? '#16a34a' : '#ca8a04'
                  }}
                >
                  {project.status}
                </span>
              </div>

              <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-bold text-gray-800 text-xl">{project.title}</h3>
                  <span className="text-sm text-gray-400 flex-shrink-0 ml-2">{project.year}</span>
                </div>
                <p className="text-gray-500 text-sm mb-4">{project.desc}</p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-5">
                  {project.tags.map(tag => (
                    <span key={tag} className="text-xs px-3 py-1 rounded-full" style={{backgroundColor: '#dbeafe', color: '#1d4ed8'}}>
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Buttons */}
<div className="flex gap-3">
  <button
    onClick={() => setSelectedProject(project)}
    style={{backgroundColor: '#2563eb'}}
    className="text-white text-sm px-5 py-2 rounded-lg hover:opacity-90 transition duration-200"
  >
    View Details
  </button>
  <button
    onClick={() => window.open(project.github, '_blank')}
    style={{border: '1px solid #d1d5db', color: '#4b5563', backgroundColor: 'white'}}
    className="text-sm px-5 py-2 rounded-lg hover:opacity-80 transition duration-200"
  >
    GitHub →
  </button>
</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Detail Modal */}
      {selectedProject && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-8"
          style={{backgroundColor: 'rgba(0,0,0,0.6)'}}
          onClick={() => setSelectedProject(null)}
        >
          <div
            className="bg-white rounded-2xl max-w-2xl w-full max-h-[80vh] overflow-y-auto shadow-2xl"
            onClick={e => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div style={{backgroundColor: '#1a2340'}} className="text-white p-8 rounded-t-2xl">
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-2xl font-bold mb-1">{selectedProject.title}</h2>
                  <p className="text-blue-300 text-sm">{selectedProject.category} · {selectedProject.year}</p>
                </div>
                <button
                  onClick={() => setSelectedProject(null)}
                  className="text-gray-400 hover:text-white text-2xl leading-none ml-4"
                >
                  ✕
                </button>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-8">
              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-6">
                {selectedProject.tags.map(tag => (
                  <span key={tag} className="text-xs px-3 py-1 rounded-full" style={{backgroundColor: '#dbeafe', color: '#1d4ed8'}}>
                    {tag}
                  </span>
                ))}
              </div>

              {/* Full Description */}
              <p className="text-gray-600 leading-relaxed whitespace-pre-line mb-6">
                {selectedProject.fullDesc}
              </p>

              {/* Status */}
              <div className="flex items-center gap-3 mb-6">
                <span className="text-gray-700 font-medium">Status:</span>
                <span
                  className="text-sm px-4 py-1 rounded-full font-medium"
                  style={{
                    backgroundColor: selectedProject.status === 'Completed' ? '#dcfce7' : '#fef9c3',
                    color: selectedProject.status === 'Completed' ? '#16a34a' : '#ca8a04'
                  }}
                >
                  {selectedProject.status}
                </span>
              </div>

              {/* GitHub Button */}
              
                <button
  onClick={() => window.open(selectedProject.github, '_blank')}
  style={{backgroundColor: '#2563eb'}}
  className="text-white px-8 py-2 rounded-lg hover:opacity-90 transition duration-200 font-medium"
>
  View on GitHub →
</button>
            </div>
          </div>
        </div>
      )}

    </div>
  )
}