import { useState, useEffect } from 'react'
import GiscusComments from '../components/GiscusComments'
import FilterBar from '../components/FilterBar'

const PUBLICATION_ID = '69ad669d86766ac3a62b3e9f'

const fallbackPosts = [
  {
    id: '1',
    title: 'Understanding CDS Views in SAP ABAP',
    brief: 'A deep dive into Core Data Services and how they simplify ABAP reporting.',
    content: null,
    tags: [{ name: 'CDS Views' }],
    publishedAt: '2023-10-19',
    readTimeInMinutes: 5,
    slug: 'understanding-cds-views',
    url: '#',
    coverImage: null,
    series: null,
  },
  {
    id: '2',
    title: 'ABAP Debugging Tips and Tricks',
    brief: 'Learn effective debugging techniques to solve complex ABAP issues faster.',
    content: null,
    tags: [{ name: 'ABAP' }],
    publishedAt: '2023-11-03',
    readTimeInMinutes: 4,
    slug: 'abap-debugging-tips',
    url: '#',
    coverImage: null,
    series: null,
  },
]

function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString('en-US', {
    day: 'numeric', month: 'short', year: 'numeric'
  })
}

function formatTag(tag) {
  return tag.replace(/-/g, ' ').replace(/_/g, ' ').toUpperCase()
}

export default function BlogPage() {
  const [posts, setPosts] = useState([])
  const [series, setSeries] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedPost, setSelectedPost] = useState(null)
  const [currentPage, setCurrentPage] = useState(1)
  const POSTS_PER_PAGE = 12

  // Filter state
  const [searchQuery, setSearchQuery] = useState('')
  const [activeCategories, setActiveCategories] = useState([])
  const [activeSeries, setActiveSeries] = useState('All')
  const [readTimeFilter, setReadTimeFilter] = useState('all')
  const [sortBy, setSortBy] = useState('newest')

  useEffect(() => {
  async function fetchData() {
    try {
      // First fetch posts
      const postsRes = await fetch('https://gql.hashnode.com', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    query: `
      query {
        publication(id: "${PUBLICATION_ID}") {
          posts(first: 20) {
            edges {
              node {
                id
                title
                brief
                slug
                url
                publishedAt
                readTimeInMinutes
                tags { name }
                coverImage { url }
                content { html }
                series { slug name }
              }
            }
          }
        }
      }
    `
  })
})
      const postsData = await postsRes.json()
      const fetched = postsData?.data?.publication?.posts?.edges?.map(e => e.node) || []
      setPosts(fetched.length > 0 ? fetched : fallbackPosts)

      // Then fetch series separately — won't break posts if it fails
      try {
        const seriesRes = await fetch('https://gql.hashnode.com', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    query: `
      query {
        publication(id: "${PUBLICATION_ID}") {
          seriesList(first: 10) {
            edges {
              node {
                slug
                name
              }
            }
          }
        }
      }
    `
  })
})
const seriesData = await seriesRes.json()
const fetchedSeries = seriesData?.data?.publication?.seriesList?.edges?.map(e => e.node) || []
setSeries(fetchedSeries)
      } catch {
        setSeries([])
      }

    } catch {
      setPosts(fallbackPosts)
    } finally {
      setLoading(false)
    }
  }
  fetchData()
}, [])

useEffect(() => {
  setCurrentPage(1)
}, [searchQuery, activeCategories, readTimeFilter, sortBy, activeSeries])

  const allCategories = ['All', ...new Set(posts.flatMap(p => p.tags?.map(t => t.name) || []))]

  const filtered = posts
  .filter(post => {
    const matchesCategory = activeCategories.length === 0 ||
      post.tags?.some(t => activeCategories.includes(t.name))
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.brief?.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesReadTime =
      readTimeFilter === 'all' ? true :
      readTimeFilter === 'quick' ? post.readTimeInMinutes < 3 :
      readTimeFilter === 'medium' ? post.readTimeInMinutes >= 3 && post.readTimeInMinutes <= 6 :
      post.readTimeInMinutes > 6
    const matchesSeries = activeSeries === 'All' ||
      post.series?.slug === activeSeries
    return matchesCategory && matchesSearch && matchesReadTime && matchesSeries
  })
  .sort((a, b) => {
    if (sortBy === 'newest') return new Date(b.publishedAt) - new Date(a.publishedAt)
    if (sortBy === 'oldest') return new Date(a.publishedAt) - new Date(b.publishedAt)
    if (sortBy === 'longest') return b.readTimeInMinutes - a.readTimeInMinutes
    if (sortBy === 'shortest') return a.readTimeInMinutes - b.readTimeInMinutes
    return 0
  })

  const totalPages = Math.ceil(filtered.length / POSTS_PER_PAGE)
const paginated = filtered.slice(
  (currentPage - 1) * POSTS_PER_PAGE,
  currentPage * POSTS_PER_PAGE
)

  // ── Full Article View ──
  if (selectedPost) {
    return (
      <div className="min-h-screen bg-gray-50">

        {/* Article Header */}
        <div style={{backgroundColor: '#1a2340'}} className="text-white py-16 px-16">
          <button
            onClick={() => setSelectedPost(null)}
            className="text-blue-300 text-sm mb-6 hover:text-white transition flex items-center gap-2"
          >
            ← Back to Blog
          </button>

          {/* Series badge */}
          {selectedPost.series && (
            <div
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold mb-4"
              style={{backgroundColor: '#1e3a5f', color: '#93c5fd', border: '1px solid #2d4f7c'}}
            >
              📚 Part of series: {selectedPost.series.name}
            </div>
          )}

          <div className="flex flex-wrap gap-2 mb-4">
            {selectedPost.tags?.map(tag => (
              <span
                key={tag.name}
                className="text-xs px-3 py-1 rounded-full font-medium"
                style={{backgroundColor: '#2563eb'}}
              >
                {formatTag(tag.name)}
              </span>
            ))}
          </div>

          <h1 className="text-4xl font-bold mt-3 mb-4 max-w-3xl leading-tight">
            {selectedPost.title}
          </h1>
          <div className="flex gap-4 text-gray-400 text-sm">
            <span>📅 {formatDate(selectedPost.publishedAt)}</span>
            <span>⏱ {selectedPost.readTimeInMinutes} min read</span>
          </div>
        </div>

        {/* Cover Image */}
        {selectedPost.coverImage?.url && (
          <div className="px-16 pt-10 max-w-4xl mx-auto">
            <img
              src={selectedPost.coverImage.url}
              alt={selectedPost.title}
              className="w-full rounded-2xl shadow-lg object-cover max-h-80"
            />
          </div>
        )}

        {/* Article Content */}
        <div className="max-w-3xl mx-auto py-12 px-8">
          <style>{`
            .blog-content { font-size: 1.1rem; line-height: 1.9; color: #374151; }
            .blog-content h1 { font-size: 2rem; font-weight: 800; color: #111827; margin: 2.5rem 0 1rem; }
            .blog-content h2 { font-size: 1.6rem; font-weight: 700; color: #111827; margin: 2.5rem 0 1rem; padding-bottom: 0.5rem; border-bottom: 2px solid #dbeafe; }
            .blog-content h3 { font-size: 1.3rem; font-weight: 700; color: #1e2d50; margin: 2rem 0 0.75rem; }
            .blog-content p { margin-bottom: 1.4rem; }
            .blog-content ul, .blog-content ol { margin: 1rem 0 1.5rem 1.5rem; }
            .blog-content ul { list-style-type: disc; }
            .blog-content ol { list-style-type: decimal; }
            .blog-content li { margin-bottom: 0.5rem; padding-left: 0.25rem; }
            .blog-content strong { color: #111827; font-weight: 700; }
            .blog-content a { color: #2563eb; text-decoration: underline; }
            .blog-content blockquote { border-left: 4px solid #2563eb; padding: 0.75rem 1.25rem; margin: 1.5rem 0; background: #eff6ff; border-radius: 0 8px 8px 0; color: #1e40af; font-style: italic; }
            .blog-content pre { background: #1e2d50; color: #93c5fd; padding: 1.5rem; border-radius: 12px; overflow-x: auto; margin: 1.5rem 0; font-size: 0.9rem; line-height: 1.7; }
            .blog-content code { background: #f1f5f9; color: #1e2d50; padding: 0.2rem 0.5rem; border-radius: 4px; font-size: 0.9rem; font-family: monospace; }
            .blog-content pre code { background: transparent; color: #93c5fd; padding: 0; }
            .blog-content table { width: 100%; border-collapse: collapse; margin: 1.5rem 0; border-radius: 8px; overflow: hidden; box-shadow: 0 1px 4px rgba(0,0,0,0.08); }
            .blog-content th { background: #1e2d50; color: white; padding: 0.75rem 1rem; text-align: left; font-weight: 600; }
            .blog-content td { padding: 0.75rem 1rem; border-bottom: 1px solid #e5e7eb; }
            .blog-content tr:nth-child(even) td { background: #f8fafc; }
            .blog-content img { width: 100%; border-radius: 12px; margin: 1.5rem 0; box-shadow: 0 4px 12px rgba(0,0,0,0.1); }
            .blog-content hr { border: none; border-top: 2px solid #e5e7eb; margin: 2.5rem 0; }
          `}</style>

          {/* Summary */}
          <p className="text-xl text-gray-600 mb-10 leading-relaxed border-l-4 pl-6 italic"
            style={{borderColor: '#2563eb'}}>
            {selectedPost.brief}
          </p>

          {/* Content */}
          {selectedPost.content?.html ? (
            <div
              className="blog-content"
              dangerouslySetInnerHTML={{__html: selectedPost.content.html}}
            />
          ) : (
            <div className="text-center py-10">
              <p className="text-gray-500 mb-4">Read the full article on Hashnode</p>
              <button
                onClick={() => window.open(selectedPost.url, '_blank')}
                style={{backgroundColor: '#2563eb'}}
                className="text-white px-8 py-3 rounded-lg font-medium hover:opacity-90 transition"
              >
                Read on Hashnode →
              </button>
            </div>
          )}

          {/* Giscus Comments */}
          <GiscusComments postId={selectedPost.slug} />
        </div>
      </div>
    )
  }

  // ── Blog List View ──
  return (
    <div className="min-h-screen bg-gray-50">

      {/* Page Header */}
      <div style={{backgroundColor: '#1a2340'}} className="text-white py-16 px-16">
        <h1 className="text-4xl font-bold mb-2">Blog</h1>
        <p className="text-blue-300">My thoughts, tutorials and technical articles</p>
      </div>

      {/* FilterBar */}
      <FilterBar
        searchPlaceholder="Search articles..."
        categories={allCategories.filter(c => c !== 'All')}
        series={series}
        onFilterChange={({ searchQuery, activeCategories, readTimeFilter, sortBy, activeSeries }) => {
  setSearchQuery(searchQuery)
  setActiveCategories(activeCategories)
  setReadTimeFilter(readTimeFilter)
  setSortBy(sortBy)
  setActiveSeries(activeSeries)
}}
        showReadTime={true}
        showSort={true}
        showSeries={true}
        resultCount={filtered.length}
      />

      {/* Blog Cards */}
<div className="px-16 py-12">
  {loading ? (
    <div className="text-center py-20">
      <div className="text-5xl mb-4">⏳</div>
      <p className="text-gray-400">Loading posts from Hashnode...</p>
    </div>
  ) : filtered.length === 0 ? (
    <div className="text-center py-20 text-gray-400">
      <div className="text-5xl mb-4">🔍</div>
      <p className="text-xl mb-2">No articles found</p>
      <p className="text-sm mb-4">Try adjusting your search or filters</p>
      <button
        onClick={() => {
          setSearchQuery('')
          setActiveCategories([])
          setReadTimeFilter('all')
          setActiveSeries('All')
        }}
        style={{backgroundColor: '#2563eb'}}
        className="text-white px-6 py-2 rounded-lg text-sm hover:opacity-90 transition"
      >
        Clear all filters
      </button>
    </div>
  ) : (
    <>
      {/* 3-column grid */}
      <div className="grid grid-cols-3 gap-8">
        {paginated.map(post => (
          <div
            key={post.id}
            className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg hover:-translate-y-0.5 transition duration-200 cursor-pointer flex flex-col"
            onClick={() => setSelectedPost(post)}
          >
            {/* Cover image or placeholder */}
            {post.coverImage?.url ? (
              <img
                src={post.coverImage.url}
                alt={post.title}
                className="w-full h-44 object-cover"
              />
            ) : (
              <div style={{backgroundColor: '#1e2d50'}} className="h-44 flex items-center justify-center flex-shrink-0">
                <span className="text-blue-300 text-sm font-semibold tracking-widest uppercase">
                  {post.tags?.[0]?.name?.replace(/-/g, ' ').replace(/_/g, ' ').toUpperCase() || 'SAP'}
                </span>
              </div>
            )}

            <div className="p-5 flex flex-col flex-1">
              {/* Series badge */}
              {post.series && (
                <div
                  className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium mb-3 self-start"
                  style={{backgroundColor: '#f0f9ff', color: '#0369a1', border: '1px solid #bae6fd'}}
                >
                  📚 {post.series.name}
                </div>
              )}

              {/* Tags + read time */}
              <div className="flex justify-between items-start mb-3">
                <div className="flex gap-1.5 flex-wrap flex-1 mr-2">
                  {post.tags?.slice(0, 3).map(tag => (
                    <span
                      key={tag.name}
                      className="text-xs px-2.5 py-1 rounded-full font-medium"
                      style={{backgroundColor: '#dbeafe', color: '#1d4ed8'}}
                    >
                      {tag.name.replace(/-/g, ' ').replace(/_/g, ' ').toUpperCase()}
                    </span>
                  ))}
                  {post.tags?.length > 3 && (
                    <span
                      className="text-xs px-2.5 py-1 rounded-full font-medium"
                      style={{backgroundColor: '#f1f5f9', color: '#64748b'}}
                    >
                      +{post.tags.length - 3}
                    </span>
                  )}
                </div>
                <span className="text-xs text-gray-400 flex-shrink-0">
                  {post.readTimeInMinutes} min
                </span>
              </div>

              {/* Title */}
              <h3 className="font-bold text-gray-800 text-lg mb-2 leading-snug line-clamp-2">
                {post.title}
              </h3>

              {/* Brief */}
              <p className="text-gray-500 text-sm mb-4 leading-relaxed line-clamp-2 flex-1">
                {post.brief}
              </p>

              {/* Footer */}
              <div className="flex justify-between items-center mt-auto pt-3 border-t border-gray-50">
                <span className="text-xs text-gray-400">📅 {formatDate(post.publishedAt)}</span>
                <button
                  style={{backgroundColor: '#2563eb'}}
                  className="text-white text-xs px-4 py-1.5 rounded-lg hover:opacity-90 transition duration-200"
                >
                  Read More →
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 mt-12">

          {/* Prev button */}
          <button
            onClick={() => { setCurrentPage(p => p - 1); window.scrollTo(0, 0) }}
            disabled={currentPage === 1}
            className="flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium border transition duration-200"
            style={{
              backgroundColor: currentPage === 1 ? '#f8fafc' : 'white',
              color: currentPage === 1 ? '#cbd5e1' : '#374151',
              borderColor: currentPage === 1 ? '#e2e8f0' : '#d1d5db',
              cursor: currentPage === 1 ? 'not-allowed' : 'pointer'
            }}
          >
            ← Prev
          </button>

          {/* Page numbers */}
          <div className="flex gap-1">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => {
              // Show first, last, current, and neighbors — collapse rest with "..."
              const showPage =
                page === 1 ||
                page === totalPages ||
                Math.abs(page - currentPage) <= 1

              if (!showPage) {
                if (page === 2 || page === totalPages - 1) {
                  return (
                    <span key={page} className="px-2 py-2.5 text-gray-400 text-sm">...</span>
                  )
                }
                return null
              }

              return (
                <button
                  key={page}
                  onClick={() => { setCurrentPage(page); window.scrollTo(0, 0) }}
                  className="w-10 h-10 rounded-lg text-sm font-medium transition duration-200"
                  style={{
                    backgroundColor: currentPage === page ? '#2563eb' : 'white',
                    color: currentPage === page ? 'white' : '#374151',
                    border: `1px solid ${currentPage === page ? '#2563eb' : '#d1d5db'}`
                  }}
                >
                  {page}
                </button>
              )
            })}
          </div>

          {/* Next button */}
          <button
            onClick={() => { setCurrentPage(p => p + 1); window.scrollTo(0, 0) }}
            disabled={currentPage === totalPages}
            className="flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium border transition duration-200"
            style={{
              backgroundColor: currentPage === totalPages ? '#f8fafc' : 'white',
              color: currentPage === totalPages ? '#cbd5e1' : '#374151',
              borderColor: currentPage === totalPages ? '#e2e8f0' : '#d1d5db',
              cursor: currentPage === totalPages ? 'not-allowed' : 'pointer'
            }}
          >
            Next →
          </button>

        </div>
      )}

      {/* Page info */}
      {totalPages > 1 && (
        <p className="text-center text-xs text-gray-400 mt-4">
          Page {currentPage} of {totalPages} · {filtered.length} total posts
        </p>
      )}

    </>
  )}
</div>

    </div>
  )
}