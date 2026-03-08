export default function Hero() {
  return (
    <section id="home" style={{backgroundColor: '#1a2340'}} className="text-white flex items-center justify-between px-16 py-20 min-h-[500px]">
      <div className="max-w-lg">
        <h1 className="text-5xl font-bold mb-3">Hi, I'm Ankit Kumar Singh</h1>
        <h2 className="text-xl font-semibold mb-4" style={{color: '#93c5fd'}}>
          SAP ABAP / ABAP on HANA Developer
        </h2>
        <p className="text-gray-300 mb-8">
          Passionate about building efficient SAP solutions and aspiring to join SAP Labs.
        </p>
        <div className="flex gap-4">
          <button className="border border-white px-6 py-2 rounded font-medium hover:bg-white hover:text-[#1a2340] transition duration-200">
            Download Resume
          </button>
          <button style={{backgroundColor: '#2563eb'}} className="px-6 py-2 rounded font-medium hover:opacity-90 transition duration-200">
            View My Work
          </button>
        </div>
      </div>

      {/* Profile Photo Placeholder */}
      <div className="w-72 h-72 rounded-full overflow-hidden border-4 border-blue-400 flex-shrink-0">
        <img
          src="/photo.jpg"
          alt="Ankit Kumar Singh"
          className="w-full h-full object-cover"
          onError={(e) => { e.target.style.display='none' }}
        />
      </div>
    </section>
  )
}