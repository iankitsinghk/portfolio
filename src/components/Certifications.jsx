const certifications = [
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
]

export default function Certifications() {
  return (
    <section id="certifications" className="py-16 px-16 bg-white">
      <h2 className="text-2xl font-bold mb-8 pb-2 border-b border-gray-200">
        Certifications
      </h2>
      <ul className="space-y-6">
        {certifications.map(cert => (
          <li key={cert.title} className="flex items-center gap-5 p-5 rounded-lg border border-gray-100 shadow-sm hover:shadow-md transition duration-200">
            {/* Medal Icon */}
            <div className="text-4xl flex-shrink-0">🏅</div>
            <div className="flex-1">
              <h3 className="font-semibold text-gray-800 text-lg">{cert.title}</h3>
              <p className="text-gray-500 text-sm mt-1">{cert.year}</p>
            </div>
            {/* Status Badge */}
            <span
              className="text-sm px-4 py-1 rounded-full font-medium flex-shrink-0"
              style={{
                backgroundColor: cert.status === 'Completed' ? '#dcfce7' : '#fef9c3',
                color: cert.status === 'Completed' ? '#16a34a' : '#ca8a04'
              }}
            >
              {cert.status}
            </span>
          </li>
        ))}
      </ul>
    </section>
  )
}