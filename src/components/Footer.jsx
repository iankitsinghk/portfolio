import { useNavigate } from 'react-router-dom'

export default function Footer() {
  const navigate = useNavigate()

  return (
    <footer style={{backgroundColor: '#1a2340'}} className="text-white py-12 px-16">
      <div className="flex justify-between items-center">

        {/* Left - Name + tagline */}
        <div>
          <div className="text-xl font-bold mb-1">
            Ankit Kumar Singh<span style={{color: '#60a5fa'}}>.</span>
          </div>
          <p className="text-gray-400 text-sm">SAP ABAP / ABAP on HANA Developer</p>
        </div>

        {/* Center - CTA text */}
        <div className="text-center">
          <p className="text-gray-300 font-medium mb-1">Open to new opportunities & collaborations</p>
          <p className="text-gray-500 text-sm">Have something in mind? Let's talk.</p>
        </div>

        {/* Right - Single CTA button */}
        <button
          onClick={() => navigate('/contact')}
          style={{backgroundColor: '#2563eb'}}
          className="text-white px-8 py-3 rounded-lg font-medium hover:opacity-90 transition duration-200 flex-shrink-0"
        >
          Get In Touch →
        </button>

      </div>

      {/* Bottom bar */}
      <div className="border-t border-gray-700 mt-8 pt-6 flex justify-between items-center">
        <p className="text-gray-500 text-sm">
          © {new Date().getFullYear()} Ankit Kumar Singh. All rights reserved.
        </p>
        <button
          onClick={() => { window.scrollTo({top: 0, behavior: 'smooth'}) }}
          className="text-gray-500 hover:text-white text-sm transition duration-200"
        >
          Back to top ↑
        </button>
      </div>
    </footer>
  )
}