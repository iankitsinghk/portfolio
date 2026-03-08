import { useState } from 'react'

export default function Contact() {
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

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)
    setTimeout(() => setSubmitted(false), 3000)
    setFormData({ name: '', email: '', subject: '', message: '' })
  }

  return (
    <section id="contact" className="py-16 px-16 bg-white">
      <h2 className="text-2xl font-bold mb-8 pb-2 border-b border-gray-200">
        Contact Me
      </h2>
      <div className="flex gap-16">

        {/* Left - Contact Info */}
        <div className="flex-shrink-0">
          <p className="text-gray-600 mb-6 max-w-xs">
            Feel free to reach out for collaborations, opportunities, or just a friendly chat!
          </p>
          <ul className="space-y-4 text-gray-700">
            <li className="flex items-center gap-3">
              <span className="text-2xl">📧</span>
              <span>ankit@email.com</span>
            </li>
            <li className="flex items-center gap-3">
              <span className="text-2xl">💼</span>
              <span>linkedin.com/in/ankit</span>
            </li>
            <li className="flex items-center gap-3">
              <span className="text-2xl">📍</span>
              <span>India</span>
            </li>
          </ul>
        </div>

        {/* Right - Contact Form */}
        <div className="flex-1 max-w-lg">
          {submitted && (
            <div className="mb-4 p-3 rounded-lg text-green-700 font-medium" style={{backgroundColor: '#dcfce7'}}>
              ✅ Message sent successfully!
            </div>
          )}
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                value={formData.name}
                onChange={handleChange}
                className="border border-gray-300 rounded px-4 py-2 w-full focus:outline-none focus:border-blue-500"
              />
              <input
                type="email"
                name="email"
                placeholder="Your Email"
                value={formData.email}
                onChange={handleChange}
                className="border border-gray-300 rounded px-4 py-2 w-full focus:outline-none focus:border-blue-500"
              />
            </div>
            <input
              type="text"
              name="subject"
              placeholder="Subject"
              value={formData.subject}
              onChange={handleChange}
              className="border border-gray-300 rounded px-4 py-2 w-full focus:outline-none focus:border-blue-500"
            />
            <textarea
              name="message"
              placeholder="Your Message"
              value={formData.message}
              onChange={handleChange}
              rows={5}
              className="border border-gray-300 rounded px-4 py-2 w-full focus:outline-none focus:border-blue-500 resize-none"
            />
            <button
              onClick={handleSubmit}
              style={{backgroundColor: '#2563eb'}}
              className="text-white px-10 py-2 rounded font-medium hover:opacity-90 transition duration-200 w-full"
            >
              Send Message
            </button>
          </div>
        </div>

      </div>
    </section>
  )
}