const posts = [
  {
    title: 'Understanding CDS Views',
    desc: 'A deep dive into Core Data Services and how they simplify ABAP reporting.',
    date: '19-10-2023',
    category: 'CDS Views'
  },
  {
    title: 'ABAP Debugging Tips',
    desc: 'Learn effective debugging techniques to solve complex ABAP issues faster.',
    date: '03-11-2023',
    category: 'ABAP'
  },
  {
    title: 'Open SQL vs Native SQL',
    desc: 'Understanding the key differences and when to use each in SAP development.',
    date: '10-12-2023',
    category: 'Database'
  },
]

export default function Blog() {
  return (
    <section id="blog" style={{backgroundColor: '#f8fafc'}} className="py-16 px-16">
      <h2 className="text-2xl font-bold mb-8 pb-2 border-b border-gray-200">
        Latest Blog Posts
      </h2>
      <div className="grid grid-cols-3 gap-6">
        {posts.map(post => (
          <div key={post.title} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition duration-200">
            {/* Blog Image Placeholder */}
            <div style={{backgroundColor: '#1e2d50'}} className="h-40 flex items-center justify-center">
              <span className="text-blue-300 text-sm font-semibold tracking-widest uppercase">
                {post.category}
              </span>
            </div>
            <div className="p-5">
              <h3 className="font-bold text-gray-800 text-lg mb-2">{post.title}</h3>
              <p className="text-gray-500 text-sm mb-4">{post.desc}</p>
              <div className="flex justify-between items-center">
                <span className="text-xs text-gray-400">{post.date}</span>
                <button
                  style={{backgroundColor: '#2563eb'}}
                  className="text-white text-sm px-4 py-1 rounded hover:opacity-90 transition duration-200"
                >
                  Read More
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}