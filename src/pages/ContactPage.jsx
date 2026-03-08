import { useState } from 'react'

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = () => {
    if (!formData.name || !formData.email || !formData.message) return
    setSubmitted(true)
    setTimeout(() => setSubmitted(false), 4000)
    setFormData({ name: '', email: '', subject: '', message: '' })
  }

  const socials = [
    {
      name: 'LinkedIn',
      handle: '@iankitsinghk',
      desc: 'Connect with me professionally',
      icon: '💼',
      color: '#0077b5',
      link: 'https://www.linkedin.com/in/iankitsinghk'
    },
    {
      name: 'GitHub',
      handle: '@iankitsinghk',
      desc: 'Check out my code and projects',
      icon: '🐙',
      color: '#333333',
      link: 'https://github.com/iankitsinghk'
    },
    {
      name: 'Email',
      handle: 'iankitsinghk@gmail.com',
      desc: 'Send me a direct email',
      icon: '📧',
      color: '#ea4335',
      link: 'mailto:iankitsinghk@gmail.com'
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Page Header */}
      <div style={{backgroundColor: '#1a2340'}} className="text-white py-16 px-16">
        <h1 className="text-4xl font-bold mb-2">Contact Me</h1>
        <p className="text-blue-300">Let's connect and build something great together</p>
      </div>

      {/* Social Cards */}
      <div className="py-14 px-16 bg-white">
        <h2 className="text-2xl font-bold text-gray-800 mb-8 pb-2 border-b border-gray-200">
          🌐 Find Me Online
        </h2>
        <div className="grid grid-cols-3 gap-6">
          {socials.map(social => (
            <button
              key={social.name}
              onClick={() => window.open(social.link, '_blank')}
              className="text-left p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-lg hover:-translate-y-1 transition duration-200 bg-white"
            >
              <div
                className="w-14 h-14 rounded-full flex items-center justify-center text-2xl mb-4"
                style={{backgroundColor: social.color + '18'}}
              >
                {social.icon}
              </div>
              <h3 className="font-bold text-gray-800 text-lg mb-1">{social.name}</h3>
              <p className="text-sm font-medium mb-1" style={{color: social.color}}>{social.handle}</p>
              <p className="text-gray-400 text-sm">{social.desc}</p>
              <div
                className="mt-4 text-sm font-medium flex items-center gap-1"
                style={{color: social.color}}
              >
                Visit {social.name} →
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Contact Form + Info */}
      <div className="py-14 px-16 bg-gray-50">
        <div className="flex gap-16">

          {/* Left - Info */}
          <div className="w-72 flex-shrink-0">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 pb-2 border-b border-gray-200">
              📬 Get In Touch
            </h2>
            <p className="text-gray-600 mb-8 leading-relaxed">
              Have a project in mind, a job opportunity, or just want to say hi?
              Fill out the form and I'll get back to you as soon as possible!
            </p>
            <div className="space-y-5">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0" style={{backgroundColor: '#dbeafe'}}>
                  📧
                </div>
                <div>
                  <p className="text-xs text-gray-400 mb-0.5">Email</p>
                  <p className="text-sm font-medium text-gray-700">iankitsinghk@gmail.com</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0" style={{backgroundColor: '#dbeafe'}}>
                  💼
                </div>
                <div>
                  <p className="text-xs text-gray-400 mb-0.5">LinkedIn</p>
                  <p className="text-sm font-medium text-gray-700">iankitsinghk</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0" style={{backgroundColor: '#dbeafe'}}>
                  📍
                </div>
                <div>
                  <p className="text-xs text-gray-400 mb-0.5">Location</p>
                  <p className="text-sm font-medium text-gray-700">India</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0" style={{backgroundColor: '#dcfce7'}}>
                  🟢
                </div>
                <div>
                  <p className="text-xs text-gray-400 mb-0.5">Status</p>
                  <p className="text-sm font-medium" style={{color: '#16a34a'}}>Open to Opportunities</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right - Form */}
          <div className="flex-1 max-w-xl">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 pb-2 border-b border-gray-200">
              ✉️ Send a Message
            </h2>

            {submitted && (
              <div className="mb-6 p-4 rounded-xl flex items-center gap-3" style={{backgroundColor: '#dcfce7'}}>
                <span className="text-2xl">✅</span>
                <div>
                  <p className="font-semibold text-green-800">Message sent!</p>
                  <p className="text-green-700 text-sm">Thanks for reaching out. I'll get back to you soon.</p>
                </div>
              </div>
            )}

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-1 block">Your Name *</label>
                  <input
                    type="text"
                    name="name"
                    placeholder="John Doe"
                    value={formData.name}
                    onChange={handleChange}
                    className="border border-gray-300 rounded-lg px-4 py-2.5 w-full text-sm focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-1 block">Your Email *</label>
                  <input
                    type="email"
                    name="email"
                    placeholder="john@email.com"
                    value={formData.email}
                    onChange={handleChange}
                    className="border border-gray-300 rounded-lg px-4 py-2.5 w-full text-sm focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 mb-1 block">Subject</label>
                <input
                  type="text"
                  name="subject"
                  placeholder="Job Opportunity / Collaboration / Just saying hi!"
                  value={formData.subject}
                  onChange={handleChange}
                  className="border border-gray-300 rounded-lg px-4 py-2.5 w-full text-sm focus:outline-none focus:border-blue-500"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 mb-1 block">Message *</label>
                <textarea
                  name="message"
                  placeholder="Hi Ankit, I'd love to connect about..."
                  value={formData.message}
                  onChange={handleChange}
                  rows={6}
                  className="border border-gray-300 rounded-lg px-4 py-2.5 w-full text-sm focus:outline-none focus:border-blue-500 resize-none"
                />
              </div>
              <button
                onClick={handleSubmit}
                style={{backgroundColor: '#2563eb'}}
                className="text-white px-10 py-3 rounded-lg font-medium hover:opacity-90 transition duration-200 w-full text-sm"
              >
                Send Message →
              </button>
            </div>
          </div>

        </div>
      </div>

    </div>
  )
}