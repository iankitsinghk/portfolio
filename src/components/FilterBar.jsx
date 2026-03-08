import { useState, useEffect } from 'react'

export default function FilterBar({
  searchPlaceholder = 'Search...',
  categories = [],
  series = [],
  onFilterChange,
  showReadTime = false,
  showSort = false,
  showSeries = false,
  resultCount = null,
}) {
  const [searchQuery, setSearchQuery] = useState('')
  const [activeCategories, setActiveCategories] = useState([])
  const [activeSeries, setActiveSeries] = useState('All')
  const [showFilter, setShowFilter] = useState(false)
  const [readTimeFilter, setReadTimeFilter] = useState('all')
  const [sortBy, setSortBy] = useState('newest')
  const [tagSearch, setTagSearch] = useState('')

  useEffect(() => {
  onFilterChange({ searchQuery, activeCategories, readTimeFilter, sortBy, activeSeries })
}, [searchQuery, activeCategories, readTimeFilter, sortBy, activeSeries])

  useEffect(() => {
    function handleClickOutside(e) {
      if (!e.target.closest('.filter-dropdown')) setShowFilter(false)
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  function formatTag(tag) {
    return tag.replace(/-/g, ' ').replace(/_/g, ' ').toUpperCase()
  }

  const filteredTags = categories.filter(cat =>
    cat.toLowerCase().includes(tagSearch.toLowerCase())
  )

  const activeFilterCount =
  activeCategories.length +
  (readTimeFilter !== 'all' ? 1 : 0) +
  (activeSeries !== 'All' ? 1 : 0)

  function clearAll() {
  setActiveCategories([])
  setActiveSeries('All')
  setReadTimeFilter('all')
  setSortBy('newest')
  setSearchQuery('')
  setTagSearch('')
  setShowFilter(false)
}

  return (
    <div className="px-16 py-6 bg-white border-b border-gray-200">
      <div className="flex gap-4 items-center flex-wrap">

        {/* Search */}
        <div className="relative flex-1 max-w-lg">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm">🔍</span>
          <input
            type="text"
            placeholder={searchPlaceholder}
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full border border-gray-300 rounded-lg pl-10 pr-10 py-2.5 text-sm focus:outline-none focus:border-blue-500"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 text-lg"
            >×</button>
          )}
        </div>

        {/* Filter Button */}
        <div className="relative filter-dropdown">
          <button
            onClick={() => setShowFilter(!showFilter)}
            className="flex items-center gap-2 px-5 py-2.5 rounded-lg border text-sm font-medium transition duration-200"
            style={{
              backgroundColor: activeFilterCount > 0 ? '#2563eb' : 'white',
              color: activeFilterCount > 0 ? 'white' : '#374151',
              borderColor: activeFilterCount > 0 ? '#2563eb' : '#d1d5db'
            }}
          >
            <span>⚙️ Filter</span>
            {activeFilterCount > 0 && (
              <span className="bg-white text-blue-600 text-xs px-2 py-0.5 rounded-full font-bold">
                {activeFilterCount}
              </span>
            )}
            <span className="text-xs">{showFilter ? '▲' : '▼'}</span>
          </button>

          {/* Dropdown Panel */}
          {showFilter && (
            <div
              className="absolute right-0 top-12 bg-white rounded-2xl shadow-2xl border border-gray-100 z-50 overflow-hidden"
              style={{width: '360px'}}
            >
              {/* Panel Header */}
              <div className="flex justify-between items-center px-5 py-4 border-b border-gray-100"
                style={{backgroundColor: '#f8fafc'}}>
                <div className="flex items-center gap-2">
                  <span className="text-lg">⚙️</span>
                  <h3 className="font-bold text-gray-800">Filter & Sort</h3>
                  {activeFilterCount > 0 && (
                    <span
                      className="text-xs px-2 py-0.5 rounded-full font-bold text-white"
                      style={{backgroundColor: '#2563eb'}}
                    >
                      {activeFilterCount} active
                    </span>
                  )}
                </div>
                <button
                  onClick={clearAll}
                  className="text-xs font-semibold hover:underline"
                  style={{color: '#ef4444'}}
                >
                  Clear all
                </button>
              </div>

              <div className="overflow-y-auto" style={{maxHeight: '480px'}}>

                {/* ── Tags Section ── */}
                {categories.length > 0 && (
                  <div className="px-5 py-4 border-b border-gray-100">
                    <div className="flex items-center gap-2 mb-3">
                      <span>🏷️</span>
                      <p className="text-xs font-bold text-gray-700 uppercase tracking-widest">
                        Filter by Tag
                      </p>
                    </div>
                    {/* Tag search */}
                    <div className="relative mb-3">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xs">🔍</span>
                      <input
                        type="text"
                        placeholder="Search tags..."
                        value={tagSearch}
                        onChange={e => setTagSearch(e.target.value)}
                        className="w-full border border-gray-200 rounded-lg pl-8 pr-3 py-2 text-xs focus:outline-none focus:border-blue-400"
                      />
                    </div>
                    {/* Tag pills */}
                    <div className="flex flex-wrap gap-2 max-h-28 overflow-y-auto">
                      {filteredTags.length > 0 ? filteredTags.map(cat => (
  <button
    key={cat}
    onClick={() => {
      setActiveCategories(prev =>
        prev.includes(cat)
          ? prev.filter(c => c !== cat)
          : [...prev, cat]
      )
    }}
    className="px-3 py-1.5 rounded-full text-xs font-medium transition duration-200 border flex items-center gap-1"
    style={{
      backgroundColor: activeCategories.includes(cat) ? '#2563eb' : '#f8fafc',
      color: activeCategories.includes(cat) ? 'white' : '#475569',
      borderColor: activeCategories.includes(cat) ? '#2563eb' : '#e5e7eb'
    }}
  >
    {activeCategories.includes(cat) && <span className="text-xs">✓</span>}
    {formatTag(cat)}
  </button>
)) : (
  <p className="text-xs text-gray-400">No tags found</p>
)}
                    </div>
                  </div>
                )}

                {/* ── Series Section ── */}
                {showSeries && (
                  <div className="px-5 py-4 border-b border-gray-100">
                    <div className="flex items-center gap-2 mb-3">
                      <span>📚</span>
                      <p className="text-xs font-bold text-gray-700 uppercase tracking-widest">
                        Filter by Series
                      </p>
                    </div>
                    {series.length > 0 ? (
                      <div className="flex flex-col gap-2">
                        {series.map(s => (
                          <button
                            key={s.slug}
                            onClick={() => {
                              setActiveSeries(activeSeries === s.slug ? 'All' : s.slug)
                              setShowFilter(false)
                            }}
                            className="flex items-center justify-between px-4 py-2.5 rounded-xl text-sm transition duration-200 border text-left"
                            style={{
                              backgroundColor: activeSeries === s.slug ? '#dbeafe' : '#f8fafc',
                              color: activeSeries === s.slug ? '#1d4ed8' : '#374151',
                              borderColor: activeSeries === s.slug ? '#bfdbfe' : '#e5e7eb'
                            }}
                          >
                            <div>
                              <p className="font-semibold text-sm">{s.name}</p>
                            
                            </div>
                            {activeSeries === s.slug && <span>✅</span>}
                          </button>
                        ))}
                      </div>
                    ) : (
                      <p className="text-xs text-gray-400 py-2">
                        No series yet. Create one on Hashnode!
                      </p>
                    )}
                  </div>
                )}

                {/* ── Read Time Section ── */}
                {showReadTime && (
                  <div className="px-5 py-4 border-b border-gray-100">
                    <div className="flex items-center gap-2 mb-3">
                      <span>⏱️</span>
                      <p className="text-xs font-bold text-gray-700 uppercase tracking-widest">
                        Filter by Read Time
                      </p>
                    </div>
                    <div className="grid grid-cols-3 gap-2">
                      {[
                        { label: '⚡ Quick', sublabel: 'Under 3 min', value: 'quick' },
                        { label: '📖 Medium', sublabel: '3 – 6 min', value: 'medium' },
                        { label: '🔬 Deep', sublabel: '6+ min', value: 'long' },
                      ].map(option => (
                        <button
                          key={option.value}
                          onClick={() => {
                            setReadTimeFilter(readTimeFilter === option.value ? 'all' : option.value)
                            setShowFilter(false)
                          }}
                          className="flex flex-col items-center py-3 px-2 rounded-xl text-xs font-medium transition duration-200 border"
                          style={{
                            backgroundColor: readTimeFilter === option.value ? '#dbeafe' : '#f8fafc',
                            color: readTimeFilter === option.value ? '#1d4ed8' : '#475569',
                            borderColor: readTimeFilter === option.value ? '#bfdbfe' : '#e5e7eb'
                          }}
                        >
                          <span className="text-lg mb-1">{option.label.split(' ')[0]}</span>
                          <span className="font-bold">{option.label.split(' ')[1]}</span>
                          <span className="opacity-60 text-xs">{option.sublabel}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* ── Sort Section ── */}
                {showSort && (
                  <div className="px-5 py-4">
                    <div className="flex items-center gap-2 mb-3">
                      <span>🔀</span>
                      <p className="text-xs font-bold text-gray-700 uppercase tracking-widest">
                        Sort By
                      </p>
                    </div>
                    <div className="flex flex-col gap-2">
                      {[
                        { label: '🕐 Newest First', value: 'newest' },
                        { label: '📅 Oldest First', value: 'oldest' },
                        { label: '📖 Longest Read', value: 'longest' },
                        { label: '⚡ Shortest Read', value: 'shortest' },
                      ].map(option => (
                        <button
                          key={option.value}
                          onClick={() => { setSortBy(option.value); setShowFilter(false) }}
                          className="flex items-center justify-between px-4 py-2.5 rounded-xl text-sm transition duration-200 border"
                          style={{
                            backgroundColor: sortBy === option.value ? '#dbeafe' : '#f8fafc',
                            color: sortBy === option.value ? '#1d4ed8' : '#374151',
                            borderColor: sortBy === option.value ? '#bfdbfe' : '#e5e7eb'
                          }}
                        >
                          {option.label}
                          {sortBy === option.value && <span>✅</span>}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

              </div>

              {/* Panel Footer */}
              <div className="px-5 py-3 border-t border-gray-100" style={{backgroundColor: '#f8fafc'}}>
                <p className="text-xs text-gray-400 text-center">
                  {resultCount !== null ? `${resultCount} result${resultCount !== 1 ? 's' : ''} found` : ''}
                </p>
              </div>

            </div>
          )}
        </div>

        {/* Active filter pills */}
        <div className="flex gap-2 flex-wrap">
          {activeCategories.map(cat => (
  <div
    key={cat}
    className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium"
    style={{backgroundColor: '#dbeafe', color: '#1d4ed8'}}
  >
    🏷️ {formatTag(cat)}
    <button
      onClick={() => setActiveCategories(prev => prev.filter(c => c !== cat))}
      className="hover:text-blue-900 font-bold"
    >×</button>
  </div>
))}
          {activeSeries !== 'All' && (
  <div className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium"
    style={{backgroundColor: '#dbeafe', color: '#1d4ed8'}}>
    📚 {activeSeries.replace(/-/g, ' ').replace(/_/g, ' ').toUpperCase()}
    <button onClick={() => setActiveSeries('All')} className="hover:text-blue-900 font-bold">×</button>
  </div>
)}
          {readTimeFilter !== 'all' && (
            <div className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium"
              style={{backgroundColor: '#dbeafe', color: '#1d4ed8'}}>
              {readTimeFilter === 'quick' ? '⚡ Quick' : readTimeFilter === 'medium' ? '📖 Medium' : '🔬 Deep dive'}
              <button onClick={() => setReadTimeFilter('all')} className="hover:text-blue-900 font-bold">×</button>
            </div>
          )}
        </div>

        {/* Results count */}
        {resultCount !== null && (
          <p className="text-sm text-gray-400 ml-auto flex-shrink-0">
            {resultCount} {resultCount === 1 ? 'result' : 'results'} found
          </p>
        )}

      </div>
    </div>
  )
}