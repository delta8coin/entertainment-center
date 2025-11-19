import { useState, useEffect } from 'react';
import {
  allSections,
  learningCenterStats
} from '../data/soundLearningCenter';
import type {
  LearningSection,
  LearningTopic,
  Resource
} from '../data/soundLearningCenter';

// Resource type badge component
const ResourceBadge = ({ type }: { type: Resource['type'] }) => {
  const colors = {
    video: 'bg-red-500/20 text-red-300 border border-red-500/30',
    article: 'bg-blue-500/20 text-blue-300 border border-blue-500/30',
    book: 'bg-amber-500/20 text-amber-300 border border-amber-500/30',
    course: 'bg-green-500/20 text-green-300 border border-green-500/30',
    research: 'bg-purple-500/20 text-purple-300 border border-purple-500/30'
  };

  return (
    <span className={`px-2.5 py-1 rounded-full text-xs font-semibold uppercase tracking-wide ${colors[type]}`}>
      {type}
    </span>
  );
};

// Individual topic card component
const TopicCard = ({ topic, isExpanded, onToggle }: {
  topic: LearningTopic;
  isExpanded: boolean;
  onToggle: () => void;
}) => {
  return (
    <div className={`group/card bg-gradient-to-br from-white/5 via-white/[0.03] to-white/[0.01] rounded-2xl overflow-hidden transition-all duration-500 hover:from-white/10 hover:via-white/[0.07] hover:to-white/5 border border-white/10 hover:border-netflix-red/40 shadow-xl hover:shadow-2xl hover:shadow-netflix-red/20 backdrop-blur-sm ${isExpanded ? 'ring-2 ring-netflix-red/30 shadow-2xl shadow-netflix-red/20' : ''} hover:scale-[1.01] transform`}>
      <button
        onClick={onToggle}
        className="w-full text-left p-5 sm:p-7 md:p-8 flex justify-between items-start gap-4 sm:gap-6"
      >
        <div className="flex-1 min-w-0">
          <h4 className="text-base sm:text-lg md:text-xl font-bold text-white mb-2 sm:mb-3 group-hover/card:text-netflix-red transition-all duration-300 leading-tight">
            {topic.title}
          </h4>
          <p className="text-gray-400 text-sm sm:text-base leading-relaxed line-clamp-2 group-hover/card:text-gray-300 transition-colors">
            {topic.description}
          </p>
        </div>
        <span className={`flex-shrink-0 text-netflix-red transition-all duration-500 bg-netflix-red/10 rounded-full p-2 sm:p-2.5 group-hover/card:bg-netflix-red/20 group-hover/card:scale-110 ${isExpanded ? 'rotate-180 bg-netflix-red/30' : ''}`}>
          <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </span>
      </button>

      {isExpanded && (
        <div className="px-5 sm:px-7 md:px-8 pb-6 sm:pb-8 border-t border-white/10 pt-6 sm:pt-7 animate-fadeIn bg-gradient-to-b from-transparent via-black/10 to-black/30">
          {/* Key Points */}
          <div className="mb-8">
            <h5 className="text-sm sm:text-base font-bold text-netflix-red mb-5 flex items-center gap-2.5">
              <span className="w-2 h-2 bg-netflix-red rounded-full animate-pulse"></span>
              Key Concepts
            </h5>
            <ul className="space-y-3 sm:space-y-4">
              {topic.keyPoints.map((point, idx) => (
                <li
                  key={idx}
                  className="flex items-start gap-3 sm:gap-4 text-sm sm:text-base text-gray-300 bg-gradient-to-r from-white/[0.08] to-white/[0.02] rounded-xl p-4 sm:p-5 hover:from-white/[0.12] hover:to-white/[0.05] transition-all duration-300 border border-white/5 hover:border-white/10 group/point backdrop-blur-sm"
                  style={{ animationDelay: `${idx * 50}ms` }}
                >
                  <span className="text-netflix-red mt-0.5 flex-shrink-0 text-lg sm:text-xl font-bold group-hover/point:scale-125 transition-transform duration-300">→</span>
                  <span className="leading-relaxed">{point}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h5 className="text-sm sm:text-base font-bold text-netflix-red mb-5 flex items-center gap-2.5">
              <span className="w-2 h-2 bg-netflix-red rounded-full animate-pulse"></span>
              Learning Resources
            </h5>
            <div className="grid gap-4 sm:gap-5 sm:grid-cols-2 lg:grid-cols-2">
              {topic.resources.map((resource, idx) => (
                <div
                  key={idx}
                  className="group/resource bg-gradient-to-br from-black/50 via-black/40 to-black/70 rounded-xl p-5 sm:p-6 border border-white/10 hover:border-netflix-red/30 transition-all duration-500 hover:shadow-2xl hover:shadow-netflix-red/10 backdrop-blur-sm hover:scale-[1.02] transform"
                  style={{ animationDelay: `${idx * 75}ms` }}
                >
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <h6 className="text-sm sm:text-base font-semibold text-white flex-1 leading-snug">
                      {resource.url ? (
                        <a
                          href={resource.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:text-netflix-red transition-colors inline-flex items-center gap-2 group/link"
                        >
                          <span className="group-hover/link:underline decoration-netflix-red/50 underline-offset-2">{resource.title}</span>
                          <svg className="w-4 h-4 opacity-60 group-hover/link:opacity-100 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-all" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                          </svg>
                        </a>
                      ) : (
                        resource.title
                      )}
                    </h6>
                  </div>
                  <div className="mb-3">
                    <ResourceBadge type={resource.type} />
                  </div>
                  {resource.author && (
                    <p className="text-xs sm:text-sm text-gray-500 mb-3 font-medium flex items-center gap-2">
                      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                      {resource.author}
                    </p>
                  )}
                  <p className="text-xs sm:text-sm text-gray-400 leading-relaxed group-hover/resource:text-gray-300 transition-colors">{resource.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Related Topics */}
          {topic.relatedTopics && topic.relatedTopics.length > 0 && (
            <div className="mt-6 sm:mt-7 pt-5 sm:pt-6 border-t border-white/10">
              <p className="text-xs sm:text-sm text-gray-500 flex flex-wrap items-center gap-2 sm:gap-3">
                <span className="font-semibold flex items-center gap-1.5">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                  Related:
                </span>
                {topic.relatedTopics.map((related, idx) => (
                  <span key={idx} className="bg-gradient-to-r from-white/[0.08] to-white/[0.03] px-3 py-1.5 rounded-full hover:from-white/[0.12] hover:to-white/[0.06] transition-all duration-300 cursor-default border border-white/5 hover:border-white/10 text-gray-400 hover:text-gray-200">
                    {related}
                  </span>
                ))}
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

// Section component
const SectionBlock = ({ section, expandedTopics, toggleTopic }: {
  section: LearningSection;
  expandedTopics: Set<number>;
  toggleTopic: (id: number) => void;
}) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <section id={section.id} className="mb-16 sm:mb-20 scroll-mt-24">
      <div className="mb-8 sm:mb-10">
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="w-full flex items-center gap-4 sm:gap-6 group p-5 sm:p-7 md:p-8 rounded-2xl sm:rounded-3xl bg-gradient-to-r from-white/[0.08] via-white/[0.05] to-transparent hover:from-white/[0.12] hover:via-white/[0.08] transition-all duration-500 border border-white/10 hover:border-netflix-red/30 shadow-xl hover:shadow-2xl hover:shadow-netflix-red/10 backdrop-blur-sm"
        >
          <span className="text-4xl sm:text-5xl md:text-6xl p-3 sm:p-4 bg-gradient-to-br from-netflix-red/20 to-netflix-red/10 rounded-xl sm:rounded-2xl group-hover:from-netflix-red/30 group-hover:to-netflix-red/20 transition-all duration-500 group-hover:scale-110 transform shadow-lg">{section.icon}</span>
          <div className="text-left flex-1 min-w-0">
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white group-hover:text-netflix-red transition-colors mb-1 sm:mb-2 leading-tight">
              {section.title}
            </h2>
            <p className="text-sm sm:text-base md:text-lg text-gray-400 group-hover:text-gray-300 transition-colors leading-relaxed">{section.subtitle}</p>
          </div>
          <span className={`flex-shrink-0 text-gray-500 group-hover:text-netflix-red transition-all duration-500 bg-white/5 rounded-full p-2 sm:p-3 group-hover:bg-white/10 group-hover:scale-110 ${isCollapsed ? '' : 'rotate-180'}`}>
            <svg className="w-6 h-6 sm:w-7 sm:h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </span>
        </button>
      </div>

      {!isCollapsed && (
        <div className="animate-fadeIn pl-0 sm:pl-2 md:pl-6">
          <p className="text-gray-300 mb-8 sm:mb-10 leading-relaxed max-w-4xl text-base sm:text-lg md:text-xl border-l-4 border-netflix-red/40 pl-5 sm:pl-7 py-2 bg-gradient-to-r from-netflix-red/5 to-transparent rounded-r-xl">
            {section.overview}
          </p>

          <div className="grid gap-5 sm:gap-6">
            {section.topics.map((topic) => (
              <TopicCard
                key={topic.id}
                topic={topic}
                isExpanded={expandedTopics.has(topic.id)}
                onToggle={() => toggleTopic(topic.id)}
              />
            ))}
          </div>
        </div>
      )}
    </section>
  );
};

// Navigation sidebar for sections
const SectionNav = ({ sections, activeSection }: {
  sections: LearningSection[];
  activeSection: string;
}) => {
  return (
    <nav className="hidden lg:block fixed right-8 top-1/2 -translate-y-1/2 z-40">
      <div className="bg-gradient-to-br from-black/80 to-black/60 backdrop-blur-md rounded-2xl p-4 border border-white/10 shadow-2xl">
        <p className="text-xs text-gray-500 mb-3 font-semibold uppercase tracking-wider">Sections</p>
        <ul className="space-y-1.5">
          {sections.map((section) => (
            <li key={section.id}>
              <a
                href={`#${section.id}`}
                className={`flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm transition-all duration-300 ${
                  activeSection === section.id
                    ? 'bg-netflix-red/20 text-netflix-red border border-netflix-red/30 shadow-sm'
                    : 'text-gray-400 hover:text-white hover:bg-white/10 border border-transparent'
                }`}
              >
                <span className="text-lg">{section.icon}</span>
                <span className="hidden xl:inline truncate max-w-32 font-medium">{section.title}</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

// Main page component
const SoundLearningCenterPage = () => {
  const [expandedTopics, setExpandedTopics] = useState<Set<number>>(new Set());
  const [activeSection, setActiveSection] = useState(allSections[0]?.id || '');
  const [searchQuery, setSearchQuery] = useState('');

  const toggleTopic = (id: number) => {
    setExpandedTopics((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  const expandAll = () => {
    const allIds = allSections.flatMap(s => s.topics.map(t => t.id));
    setExpandedTopics(new Set(allIds));
  };

  const collapseAll = () => {
    setExpandedTopics(new Set());
  };

  // Filter sections based on search query
  const filteredSections = searchQuery
    ? allSections.map(section => ({
        ...section,
        topics: section.topics.filter(topic =>
          topic.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          topic.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          topic.keyPoints.some(point => point.toLowerCase().includes(searchQuery.toLowerCase()))
        )
      })).filter(section => section.topics.length > 0)
    : allSections;

  // Update active section based on scroll
  const handleScroll = () => {
    const sections = allSections.map(s => document.getElementById(s.id));
    const scrollPosition = window.scrollY + 200;

    for (let i = sections.length - 1; i >= 0; i--) {
      const section = sections[i];
      if (section && section.offsetTop <= scrollPosition) {
        setActiveSection(allSections[i].id);
        break;
      }
    }
  };

  // Set up scroll listener
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial call
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-netflix-black">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-b from-netflix-red/20 via-netflix-red/5 to-netflix-black pt-24 sm:pt-28 md:pt-32 pb-20 sm:pb-24 md:pb-28 overflow-hidden">
        {/* Decorative background elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-72 h-72 sm:w-96 sm:h-96 bg-netflix-red/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-10 right-10 w-80 h-80 sm:w-[500px] sm:h-[500px] bg-purple-500/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] sm:w-[800px] sm:h-[800px] md:w-[1000px] md:h-[1000px] bg-gradient-radial from-netflix-red/5 to-transparent rounded-full"></div>
          {/* Animated particles */}
          <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-netflix-red/30 rounded-full animate-ping"></div>
          <div className="absolute top-3/4 right-1/3 w-2 h-2 bg-netflix-red/30 rounded-full animate-ping" style={{ animationDelay: '0.5s' }}></div>
          <div className="absolute top-1/2 right-1/4 w-2 h-2 bg-netflix-red/30 rounded-full animate-ping" style={{ animationDelay: '1.5s' }}></div>
        </div>

        <div className="container-padding relative z-10">
          <div className="max-w-5xl mx-auto text-center">
            <div className="inline-block mb-6 sm:mb-8 animate-fadeIn">
              <span className="px-5 py-2 sm:px-6 sm:py-2.5 bg-gradient-to-r from-netflix-red/20 to-netflix-red/10 text-netflix-red text-sm sm:text-base font-semibold rounded-full border border-netflix-red/30 backdrop-blur-sm shadow-lg shadow-netflix-red/20 hover:shadow-netflix-red/30 hover:border-netflix-red/50 transition-all duration-300">
                Educational Resource
              </span>
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-4 sm:mb-6 tracking-tight animate-fadeIn leading-tight">
              Sound Learning Center
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl text-gray-300 mb-10 sm:mb-12 max-w-3xl mx-auto leading-relaxed animate-fadeIn">
              A comprehensive guide to the sciences of music, sound, and the brain
            </p>

            {/* Stats */}
            <div className="flex flex-wrap justify-center gap-4 sm:gap-6 lg:gap-8 mb-12 sm:mb-16">
              <div className="group text-center bg-gradient-to-br from-white/[0.12] via-white/[0.08] to-white/[0.04] backdrop-blur-md rounded-2xl px-8 sm:px-10 md:px-12 py-6 sm:py-7 md:py-8 border border-white/10 hover:border-netflix-red/40 transition-all duration-500 hover:scale-110 shadow-xl hover:shadow-2xl hover:shadow-netflix-red/20 cursor-default min-w-[140px] sm:min-w-[160px]">
                <p className="text-4xl sm:text-5xl md:text-6xl font-bold bg-gradient-to-br from-netflix-red via-red-400 to-netflix-red bg-clip-text text-transparent mb-2 group-hover:scale-110 transition-transform duration-300">
                  {learningCenterStats.totalSections}
                </p>
                <p className="text-xs sm:text-sm text-gray-400 font-semibold uppercase tracking-wider group-hover:text-gray-300 transition-colors">Disciplines</p>
              </div>
              <div className="group text-center bg-gradient-to-br from-white/[0.12] via-white/[0.08] to-white/[0.04] backdrop-blur-md rounded-2xl px-8 sm:px-10 md:px-12 py-6 sm:py-7 md:py-8 border border-white/10 hover:border-netflix-red/40 transition-all duration-500 hover:scale-110 shadow-xl hover:shadow-2xl hover:shadow-netflix-red/20 cursor-default min-w-[140px] sm:min-w-[160px]">
                <p className="text-4xl sm:text-5xl md:text-6xl font-bold bg-gradient-to-br from-netflix-red via-red-400 to-netflix-red bg-clip-text text-transparent mb-2 group-hover:scale-110 transition-transform duration-300">
                  {learningCenterStats.totalTopics}
                </p>
                <p className="text-xs sm:text-sm text-gray-400 font-semibold uppercase tracking-wider group-hover:text-gray-300 transition-colors">Topics</p>
              </div>
              <div className="group text-center bg-gradient-to-br from-white/[0.12] via-white/[0.08] to-white/[0.04] backdrop-blur-md rounded-2xl px-8 sm:px-10 md:px-12 py-6 sm:py-7 md:py-8 border border-white/10 hover:border-netflix-red/40 transition-all duration-500 hover:scale-110 shadow-xl hover:shadow-2xl hover:shadow-netflix-red/20 cursor-default min-w-[140px] sm:min-w-[160px]">
                <p className="text-4xl sm:text-5xl md:text-6xl font-bold bg-gradient-to-br from-netflix-red via-red-400 to-netflix-red bg-clip-text text-transparent mb-2 group-hover:scale-110 transition-transform duration-300">
                  {learningCenterStats.totalResources}
                </p>
                <p className="text-xs sm:text-sm text-gray-400 font-semibold uppercase tracking-wider group-hover:text-gray-300 transition-colors">Resources</p>
              </div>
            </div>

            {/* Search */}
            <div className="relative max-w-2xl mx-auto mb-10 sm:mb-12">
              <div className="relative group">
                <input
                  type="text"
                  placeholder="Search topics, concepts, or resources..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-gradient-to-r from-white/[0.12] to-white/[0.08] backdrop-blur-md border border-white/20 rounded-2xl px-6 py-4 sm:py-5 pl-14 sm:pl-16 pr-12 text-white placeholder-gray-400 focus:outline-none focus:border-netflix-red focus:ring-2 focus:ring-netflix-red/30 transition-all duration-500 shadow-2xl focus:shadow-netflix-red/20 text-base sm:text-lg group-hover:border-white/30"
                />
                <svg
                  className="absolute left-4 sm:left-5 top-1/2 -translate-y-1/2 w-6 h-6 sm:w-7 sm:h-7 text-gray-400 group-focus-within:text-netflix-red transition-colors duration-300"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-4 sm:right-5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-all duration-300 hover:scale-110 bg-white/5 hover:bg-white/10 rounded-full p-1.5"
                  >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                )}
              </div>
            </div>

            {/* Expand/Collapse buttons */}
            <div className="flex flex-wrap justify-center gap-3 sm:gap-4">
              <button
                onClick={expandAll}
                className="group px-6 sm:px-7 py-3 sm:py-3.5 text-sm sm:text-base font-semibold bg-gradient-to-r from-white/[0.12] to-white/[0.08] hover:from-white/[0.18] hover:to-white/[0.12] text-white rounded-xl sm:rounded-2xl transition-all duration-500 border border-white/10 hover:border-white/30 flex items-center gap-2.5 hover:scale-105 shadow-lg hover:shadow-xl backdrop-blur-sm"
              >
                <svg className="w-4 h-4 sm:w-5 sm:h-5 group-hover:rotate-90 transition-transform duration-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                </svg>
                <span className="hidden sm:inline">Expand All</span>
                <span className="sm:hidden">Expand</span>
              </button>
              <button
                onClick={collapseAll}
                className="group px-6 sm:px-7 py-3 sm:py-3.5 text-sm sm:text-base font-semibold bg-gradient-to-r from-white/[0.12] to-white/[0.08] hover:from-white/[0.18] hover:to-white/[0.12] text-white rounded-xl sm:rounded-2xl transition-all duration-500 border border-white/10 hover:border-white/30 flex items-center gap-2.5 hover:scale-105 shadow-lg hover:shadow-xl backdrop-blur-sm"
              >
                <svg className="w-4 h-4 sm:w-5 sm:h-5 group-hover:scale-75 transition-transform duration-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                </svg>
                <span className="hidden sm:inline">Collapse All</span>
                <span className="sm:hidden">Collapse</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Navigation (Mobile) */}
      <div className="lg:hidden sticky top-16 z-30 bg-gradient-to-b from-netflix-black via-netflix-black/98 to-netflix-black/95 backdrop-blur-xl border-b border-white/10 shadow-2xl">
        <div className="container-padding py-4 overflow-x-auto scrollbar-hide">
          <div className="flex gap-3 min-w-max px-1">
            {allSections.map((section) => (
              <a
                key={section.id}
                href={`#${section.id}`}
                className={`flex items-center gap-2.5 px-5 py-2.5 rounded-full text-sm font-semibold whitespace-nowrap transition-all duration-500 ${
                  activeSection === section.id
                    ? 'bg-gradient-to-r from-netflix-red to-red-600 text-white shadow-xl shadow-netflix-red/40 scale-105 border-2 border-white/20'
                    : 'bg-gradient-to-r from-white/[0.12] to-white/[0.08] text-gray-300 hover:from-white/[0.18] hover:to-white/[0.12] hover:text-white border border-white/10 hover:border-white/20 hover:scale-105'
                }`}
              >
                <span className="text-lg">{section.icon}</span>
                <span className="tracking-wide">{section.title.split(' ')[0]}</span>
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container-padding py-12 sm:py-16">
        <div className="max-w-4xl mx-auto lg:mr-48">
          {searchQuery && filteredSections.length === 0 ? (
            <div className="text-center py-20 sm:py-24 animate-fadeIn">
              <div className="inline-block p-6 sm:p-8 bg-gradient-to-br from-white/[0.08] to-white/[0.02] rounded-3xl mb-6 sm:mb-8 shadow-2xl backdrop-blur-sm border border-white/10">
                <svg className="w-16 h-16 sm:w-20 sm:h-20 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <p className="text-gray-400 text-lg sm:text-xl mb-3">No topics found matching</p>
              <p className="text-white text-xl sm:text-2xl font-bold mb-8 sm:mb-10 px-4">"{searchQuery}"</p>
              <button
                onClick={() => setSearchQuery('')}
                className="group px-8 py-4 bg-gradient-to-r from-netflix-red to-red-600 hover:from-red-600 hover:to-netflix-red text-white rounded-2xl transition-all duration-500 font-semibold shadow-xl hover:shadow-2xl hover:shadow-netflix-red/30 hover:scale-105 flex items-center gap-2 mx-auto"
              >
                <svg className="w-5 h-5 group-hover:rotate-90 transition-transform duration-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
                Clear search
              </button>
            </div>
          ) : (
            filteredSections.map((section) => (
              <SectionBlock
                key={section.id}
                section={section}
                expandedTopics={expandedTopics}
                toggleTopic={toggleTopic}
              />
            ))
          )}
        </div>
      </div>

      {/* Desktop Section Navigation */}
      <SectionNav sections={allSections} activeSection={activeSection} />

      {/* Footer CTA */}
      <div className="relative bg-gradient-to-t from-netflix-red/20 via-netflix-red/5 to-transparent py-20 sm:py-24 md:py-28 overflow-hidden mt-12 sm:mt-16">
        {/* Decorative elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute bottom-0 left-1/4 w-80 h-80 sm:w-96 sm:h-96 bg-netflix-red/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 right-1/4 w-80 h-80 sm:w-96 sm:h-96 bg-purple-500/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1.5s' }}></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-radial from-netflix-red/5 to-transparent rounded-full"></div>
        </div>

        <div className="container-padding text-center relative z-10">
          <div className="inline-block mb-6 sm:mb-8 animate-bounce">
            <span className="text-5xl sm:text-6xl md:text-7xl">🎵</span>
          </div>
          <h3 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-5 sm:mb-6 leading-tight">
            Continue Your Learning Journey
          </h3>
          <p className="text-gray-400 mb-10 sm:mb-12 max-w-3xl mx-auto text-base sm:text-lg md:text-xl leading-relaxed">
            Explore our other sections on frequencies, sound healing, meditation, and research
            to deepen your understanding of sound's transformative power.
          </p>
          <div className="flex flex-wrap justify-center gap-4 sm:gap-5">
            <a
              href="/frequencies"
              className="group px-7 sm:px-8 py-4 sm:py-5 bg-gradient-to-r from-white/[0.12] to-white/[0.08] hover:from-white/[0.18] hover:to-white/[0.12] text-white rounded-xl sm:rounded-2xl transition-all duration-500 border border-white/10 hover:border-white/30 font-semibold flex items-center gap-3 hover:scale-110 shadow-xl hover:shadow-2xl backdrop-blur-md text-sm sm:text-base"
            >
              <span className="text-2xl group-hover:scale-125 transition-transform duration-300">🔊</span>
              <span>Frequencies</span>
            </a>
            <a
              href="/sound-healing"
              className="group px-7 sm:px-8 py-4 sm:py-5 bg-gradient-to-r from-white/[0.12] to-white/[0.08] hover:from-white/[0.18] hover:to-white/[0.12] text-white rounded-xl sm:rounded-2xl transition-all duration-500 border border-white/10 hover:border-white/30 font-semibold flex items-center gap-3 hover:scale-110 shadow-xl hover:shadow-2xl backdrop-blur-md text-sm sm:text-base"
            >
              <span className="text-2xl group-hover:scale-125 transition-transform duration-300">🧘</span>
              <span>Sound Healing</span>
            </a>
            <a
              href="/research"
              className="group px-7 sm:px-8 py-4 sm:py-5 bg-gradient-to-r from-white/[0.12] to-white/[0.08] hover:from-white/[0.18] hover:to-white/[0.12] text-white rounded-xl sm:rounded-2xl transition-all duration-500 border border-white/10 hover:border-white/30 font-semibold flex items-center gap-3 hover:scale-110 shadow-xl hover:shadow-2xl backdrop-blur-md text-sm sm:text-base"
            >
              <span className="text-2xl group-hover:scale-125 transition-transform duration-300">📚</span>
              <span>Research</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SoundLearningCenterPage;
