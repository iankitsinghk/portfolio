export default function About() {
  return (
    <section id="about" className="py-16 px-16 bg-white">
      <h2 className="text-2xl font-bold mb-6 pb-2 border-b border-gray-200">About Me</h2>
      <div className="flex justify-between items-center gap-10">
        <div className="max-w-lg">
          <p className="text-gray-700 mb-3 text-lg">
            B.Tech graduate currently working at{' '}
            <span className="font-semibold" style={{color: '#e31837'}}>HCLTech</span>{' '}
            with expertise in ABAP on HANA, CDS Views, and Fiori development.
          </p>
          <p className="text-gray-700 text-lg">
            My goal is to become an Associate Developer at SAP Labs.
          </p>
        </div>

        {/* Company Logos */}
        <div className="flex gap-6 flex-shrink-0">
          <div className="border border-gray-200 rounded-lg px-8 py-5 shadow-sm flex items-center justify-center">
            <span className="font-bold text-xl" style={{color: '#e31837'}}>HCL</span>
            <span className="font-bold text-xl" style={{color: '#0057a8'}}>Tech</span>
          </div>
          <div className="border border-gray-200 rounded-lg px-8 py-5 shadow-sm flex items-center justify-center">
            <span className="font-bold text-xl" style={{color: '#0057a8'}}>SAP</span>
            <span className="text-sm ml-1 text-gray-500">Certified</span>
          </div>
        </div>
      </div>
    </section>
  )
}