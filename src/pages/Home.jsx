import { useNavigate } from 'react-router-dom'
import { useEffect, useRef } from 'react'
import Hero from '../components/Hero'
import Footer from '../components/Footer'

// ── Animation hook ──
function useReveal() {
  const ref = useRef(null)
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed')
          observer.unobserve(entry.target)
        }
      },
      { threshold: 0.1 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])
  return ref
}

const skillTags = [
  'ABAP', 'ABAP on HANA', 'CDS Views', 'SAP Fiori', 'OData Services',
  'Eclipse ADT', 'SAP GUI', 'Git', 'SAP HANA', 'Open SQL',
  'OOPS ABAP', 'Data Modeling', 'Performance Tuning', 'LSMW', 'BAPI',
]

const featuredProjects = [
  {
    title: 'Customer Booking Analytics',
    desc: 'CDS View based real-time analytics for customer booking trends.',
    category: 'CDS View',
    status: 'Completed',
    tags: ['CDS View', 'ABAP', 'SAP HANA'],
  },
  {
    title: 'Frequent Flyer Analysis',
    desc: 'Prime vs Non-Prime segmentation using HANA-optimized queries.',
    category: 'ABAP',
    status: 'Completed',
    tags: ['ABAP', 'Open SQL', 'Reporting'],
  },
  {
    title: 'Sales Order Dashboard',
    desc: 'Fiori app with OData backend showing live sales KPIs.',
    category: 'Fiori',
    status: 'In Progress',
    tags: ['Fiori', 'OData', 'UI5'],
  },
]

const latestPosts = [
  {
    title: 'Understanding CDS Views in SAP ABAP',
    category: 'CDS Views',
    date: '19 Oct 2023',
    readTime: '5 min read',
  },
  {
    title: 'ABAP Debugging Tips and Tricks',
    category: 'ABAP',
    date: '03 Nov 2023',
    readTime: '4 min read',
  },
]

const certifications = [
  {
    title: 'SAP Certified Development Associate – ABAP Cloud',
    status: 'Completed',
    year: '2023',
    icon: '🏅',
    desc: 'Validates expertise in ABAP programming on SAP BTP ABAP Environment.'
  },
  {
    title: 'SAP Certified Associate – Fiori',
    status: 'Upcoming',
    year: '2024',
    icon: '🎯',
    desc: 'Covers SAP Fiori UX design principles and application development.'
  },
]

export default function Home() {
  const navigate = useNavigate()
  const skillsRef = useReveal()
  const projectsRef = useReveal()
  const certsRef = useReveal()

  return (
    <div className="min-h-screen">

      <style>{`
        .reveal {
          opacity: 0;
          transform: translateY(28px);
          transition: opacity 0.6s ease, transform 0.6s ease;
        }
        .revealed {
          opacity: 1;
          transform: translateY(0);
        }
        .stagger > * {
          opacity: 0;
          transform: translateY(20px);
          transition: opacity 0.5s ease, transform 0.5s ease;
        }
        .revealed.stagger > *:nth-child(1) { opacity:1; transform:translateY(0); transition-delay: 0.05s }
        .revealed.stagger > *:nth-child(2) { opacity:1; transform:translateY(0); transition-delay: 0.15s }
        .revealed.stagger > *:nth-child(3) { opacity:1; transform:translateY(0); transition-delay: 0.25s }
        .revealed.stagger > *:nth-child(4) { opacity:1; transform:translateY(0); transition-delay: 0.35s }
        .revealed.stagger > *:nth-child(5) { opacity:1; transform:translateY(0); transition-delay: 0.45s }
      `}</style>

      {/* ── Hero ── */}
      <Hero />

      {/* ── Skills Tag Cloud ── */}
      <div ref={skillsRef} className="reveal py-14 px-16 bg-white">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-2xl font-bold text-gray-800 tracking-tight">What I Work With</h2>
            <p className="text-gray-400 text-sm mt-1">My core technologies and tools</p>
          </div>
          <button
            onClick={() => navigate('/skills')}
            style={{color: '#2563eb', border: '1px solid #2563eb'}}
            className="px-5 py-2 rounded-lg text-sm font-medium hover:bg-blue-50 transition duration-200"
          >
            View Skills →
          </button>
        </div>
        <div className="flex flex-wrap gap-3">
          {skillTags.map((tag, i) => (
            <span
              key={tag}
              className="px-4 py-2 rounded-full text-sm font-medium border transition duration-200 hover:shadow-md hover:-translate-y-0.5 cursor-default"
              style={{
                backgroundColor: i % 3 === 0 ? '#1e2d50' : i % 3 === 1 ? '#dbeafe' : '#f1f5f9',
                color: i % 3 === 0 ? '#93c5fd' : i % 3 === 1 ? '#1d4ed8' : '#475569',
                borderColor: i % 3 === 0 ? '#2d3f6b' : i % 3 === 1 ? '#bfdbfe' : '#e2e8f0',
              }}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* ── Projects + Blog ── */}
      <div ref={projectsRef} className="reveal py-14 px-16" style={{backgroundColor: '#f8fafc'}}>
        <div className="flex gap-10">

          {/* Left — Projects */}
          <div className="flex-1">
            <div className="flex justify-between items-center mb-8">
              <div>
                <h2 className="text-2xl font-bold text-gray-800 tracking-tight">Featured Projects</h2>
                <p className="text-gray-400 text-sm mt-1">A few things I've built</p>
              </div>
              <button
                onClick={() => navigate('/projects')}
                style={{color: '#2563eb', border: '1px solid #2563eb'}}
                className="px-5 py-2 rounded-lg text-sm font-medium hover:bg-blue-50 transition duration-200 flex-shrink-0"
              >
                View All →
              </button>
            </div>
            <div className="flex flex-col gap-4">
              {featuredProjects.map(project => (
                <div
                  key={project.title}
                  className="bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-lg hover:-translate-y-0.5 transition duration-200 overflow-hidden flex"
                >
                  <div
                    style={{backgroundColor: '#1e2d50', minHeight: '100%'}}
                    className="w-24 flex-shrink-0 flex items-center justify-center"
                  >
                    <span className="text-blue-300 text-xs font-bold tracking-widest uppercase px-2 text-center leading-relaxed">
                      {project.category}
                    </span>
                  </div>
                  <div className="py-4 px-5 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start mb-1.5">
                        <h3 className="font-bold text-gray-800 text-base leading-snug">{project.title}</h3>
                        <span
                          className="text-xs px-3 py-1 rounded-full font-semibold flex-shrink-0 ml-3"
                          style={{
                            backgroundColor: project.status === 'Completed' ? '#dcfce7' : '#fef9c3',
                            color: project.status === 'Completed' ? '#16a34a' : '#ca8a04'
                          }}
                        >
                          {project.status}
                        </span>
                      </div>
                      <p className="text-gray-500 text-xs mb-3 leading-relaxed">{project.desc}</p>
                      <div className="flex flex-wrap gap-1.5">
                        {project.tags.map(tag => (
                          <span
                            key={tag}
                            className="text-xs px-2.5 py-0.5 rounded-full font-medium"
                            style={{backgroundColor: '#dbeafe', color: '#1d4ed8'}}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="mt-3">
                      <button
                        onClick={() => navigate('/projects')}
                        style={{color: '#2563eb'}}
                        className="text-xs font-semibold hover:underline transition duration-200"
                      >
                        View Details →
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right — Blog */}
          <div className="w-68 flex-shrink-0" style={{width: '280px'}}>
            <div className="flex justify-between items-center mb-8">
              <div>
                <h2 className="text-2xl font-bold text-gray-800 tracking-tight">Latest Posts</h2>
                <p className="text-gray-400 text-sm mt-1">My recent articles</p>
              </div>
            </div>
            <div className="flex flex-col gap-4">
              {latestPosts.map(post => (
                <div
                  key={post.title}
                  onClick={() => navigate('/blog')}
                  className="bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-lg hover:-translate-y-0.5 transition duration-200 cursor-pointer overflow-hidden"
                >
                  <div className="relative h-32" style={{backgroundColor: '#1e2d50'}}>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-blue-300 text-xs font-bold tracking-widest uppercase">
                        {post.category}
                      </span>
                    </div>
                    <div
                      className="absolute bottom-0 left-0 right-0 h-8"
                      style={{background: 'linear-gradient(to bottom, transparent, rgba(20,32,65,0.9))'}}
                    ></div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold text-gray-800 text-sm mb-1.5 leading-snug">{post.title}</h3>
                    <div className="flex justify-between items-center">
                      <p className="text-gray-400 text-xs">{post.date}</p>
                      <span
                        className="text-xs px-2 py-0.5 rounded-full font-medium"
                        style={{backgroundColor: '#dbeafe', color: '#1d4ed8'}}
                      >
                        {post.readTime}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
              <button
                onClick={() => navigate('/blog')}
                style={{backgroundColor: '#2563eb'}}
                className="text-white w-full py-2.5 rounded-xl text-sm font-semibold hover:opacity-90 transition duration-200 mt-1"
              >
                Read All Posts →
              </button>
            </div>
          </div>

        </div>
      </div>

      {/* ── Certifications ── */}
      <div ref={certsRef} className="reveal py-14 px-16 bg-white">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-2xl font-bold text-gray-800 tracking-tight">Certifications</h2>
            <p className="text-gray-400 text-sm mt-1">My verified credentials</p>
          </div>
          <button
            onClick={() => window.open('https://www.credly.com/users/iankitsinghk', '_blank')}
            style={{color: '#FF6B00', border: '1px solid #FF6B00'}}
            className="px-5 py-2 rounded-lg text-sm font-medium hover:bg-orange-50 transition duration-200"
          >
            🏆 View on Credly →
          </button>
        </div>
        <div className="grid grid-cols-2 gap-6">
          {certifications.map(cert => (
            <div
              key={cert.title}
              className="relative rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg transition duration-200 overflow-hidden"
            >
              {/* Top accent bar */}
              <div
                className="h-1.5 w-full"
                style={{
                  backgroundColor: cert.status === 'Completed' ? '#16a34a' : '#ca8a04'
                }}
              ></div>
              <div className="p-6 flex gap-5 items-start">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0"
                  style={{backgroundColor: cert.status === 'Completed' ? '#dcfce7' : '#fef9c3'}}
                >
                  {cert.icon}
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start gap-3 mb-2">
                    <h3 className="font-bold text-gray-800 text-base leading-snug">{cert.title}</h3>
                    <span
                      className="text-xs px-3 py-1 rounded-full font-semibold flex-shrink-0"
                      style={{
                        backgroundColor: cert.status === 'Completed' ? '#dcfce7' : '#fef9c3',
                        color: cert.status === 'Completed' ? '#16a34a' : '#ca8a04'
                      }}
                    >
                      {cert.status}
                    </span>
                  </div>
                  <p className="text-gray-500 text-sm leading-relaxed mb-2">{cert.desc}</p>
                  <p className="text-xs font-medium" style={{color: '#94a3b8'}}>{cert.year}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Footer ── */}
      <Footer />

    </div>
  )
}