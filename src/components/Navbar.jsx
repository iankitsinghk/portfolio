import { Link, useLocation } from 'react-router-dom'

export default function Navbar() {
  const location = useLocation()
  const links = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Skills', path: '/skills' },
    { name: 'Projects', path: '/projects' },
    { name: 'Blog', path: '/blog' },
    { name: 'Contact', path: '/contact' },
  ]

  return (
    <nav style={{backgroundColor: '#1a2340'}} className="text-white flex justify-between items-center px-10 py-4 sticky top-0 z-50">
      <Link to="/" className="text-2xl font-bold text-white no-underline">
        Ankit Kumar Singh<span style={{color: '#60a5fa'}}>.</span>
      </Link>
      <ul className="flex gap-8 text-sm list-none m-0 p-0">
        {links.map(link => (
          <li key={link.name}>
            <Link
              to={link.path}
              className="no-underline transition duration-200"
              style={{
                color: location.pathname === link.path ? '#60a5fa' : 'white',
                borderBottom: location.pathname === link.path ? '2px solid #60a5fa' : 'none',
                paddingBottom: '4px'
              }}
            >
              {link.name}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}