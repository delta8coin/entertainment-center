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
    <section id={section.id} className="mb-20 sm:mb-24 lg:mb-28 scroll-mt-24">
      <div className="mb-10 sm:mb-12">
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="w-full flex items-center gap-5 sm:gap-7 md:gap-8 group p-6 sm:p-8 md:p-10 rounded-3xl bg-gradient-to-r from-netflix-red/10 via-purple-500/5 to-transparent hover:from-netflix-red/15 hover:via-purple-500/10 transition-all duration-500 border-2 border-white/10 hover:border-netflix-red/40 shadow-2xl hover:shadow-3xl hover:shadow-netflix-red/20 backdrop-blur-sm relative overflow-hidden"
        >
          {/* Animated background gradient */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

          <span className="relative text-5xl sm:text-6xl md:text-7xl lg:text-8xl p-4 sm:p-5 md:p-6 bg-gradient-to-br from-netflix-red/30 via-purple-500/20 to-netflix-red/10 rounded-2xl sm:rounded-3xl group-hover:from-netflix-red/40 group-hover:via-purple-500/30 group-hover:to-purple-500/20 transition-all duration-500 group-hover:scale-110 transform shadow-2xl border border-white/10 group-hover:border-white/20">{section.icon}</span>

          <div className="text-left flex-1 min-w-0 relative">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent group-hover:from-netflix-red group-hover:via-purple-500 group-hover:to-netflix-red transition-all duration-500 mb-2 sm:mb-3 leading-tight">
              {section.title}
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-400 group-hover:text-gray-200 transition-colors leading-relaxed">{section.subtitle}</p>
          </div>

          <span className={`relative flex-shrink-0 text-gray-500 group-hover:text-netflix-red transition-all duration-500 bg-white/10 rounded-full p-3 sm:p-4 group-hover:bg-netflix-red/20 group-hover:scale-110 border border-white/10 group-hover:border-netflix-red/30 ${isCollapsed ? '' : 'rotate-180'}`}>
            <svg className="w-7 h-7 sm:w-8 sm:h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
            </svg>
          </span>
        </button>
      </div>

      {!isCollapsed && (
        <div className="animate-fadeIn">
          <p className="text-gray-200 mb-10 sm:mb-12 leading-relaxed max-w-5xl mx-auto text-lg sm:text-xl md:text-2xl border-l-4 border-gradient-to-b from-netflix-red via-purple-500 to-blue-500 pl-6 sm:pl-8 py-4 bg-gradient-to-r from-netflix-red/10 via-purple-500/5 to-transparent rounded-r-2xl backdrop-blur-sm shadow-lg">
            {section.overview}
          </p>

          <div className="grid gap-6 sm:gap-7 lg:gap-8">
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

// Progress indicator for sections
const ProgressIndicator = ({ sections, activeSection }: {
  sections: LearningSection[];
  activeSection: string;
}) => {
  const activeIndex = sections.findIndex(s => s.id === activeSection);
  const progress = ((activeIndex + 1) / sections.length) * 100;

  return (
    <div className="hidden lg:block fixed left-8 top-1/2 -translate-y-1/2 z-40">
      <div className="relative">
        {/* Progress bar */}
        <div className="w-1 h-64 bg-white/5 rounded-full overflow-hidden">
          <div
            className="w-full bg-gradient-to-b from-netflix-red to-purple-500 transition-all duration-500 rounded-full"
            style={{ height: `${progress}%` }}
          />
        </div>

        {/* Section dots */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 h-full flex flex-col justify-between py-2">
          {sections.map((section, idx) => (
            <a
              key={section.id}
              href={`#${section.id}`}
              className="group relative"
              title={section.title}
            >
              <div className={`w-3 h-3 rounded-full transition-all duration-300 ${
                activeSection === section.id
                  ? 'bg-netflix-red scale-150 shadow-lg shadow-netflix-red/50'
                  : idx <= activeIndex
                  ? 'bg-purple-500'
                  : 'bg-white/20 hover:bg-white/40'
              }`} />

              {/* Tooltip */}
              <div className="absolute left-6 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap">
                <div className="bg-black/90 backdrop-blur-md border border-white/20 rounded-lg px-3 py-2 shadow-xl">
                  <p className="text-xs font-semibold text-white flex items-center gap-2">
                    <span className="text-base">{section.icon}</span>
                    {section.title}
                  </p>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
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
      <div className="relative bg-gradient-to-b from-netflix-red/20 via-purple-500/10 to-netflix-black pt-24 sm:pt-28 md:pt-32 lg:pt-40 pb-20 sm:pb-24 md:pb-28 lg:pb-32 overflow-hidden">
        {/* Decorative background elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-96 h-96 sm:w-[500px] sm:h-[500px] bg-netflix-red/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-10 right-10 w-96 h-96 sm:w-[600px] sm:h-[600px] bg-purple-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
          <div className="absolute top-1/3 right-1/4 w-80 h-80 sm:w-[400px] sm:h-[400px] bg-blue-500/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] sm:w-[1000px] sm:h-[1000px] md:w-[1200px] md:h-[1200px] bg-gradient-radial from-netflix-red/5 to-transparent rounded-full"></div>

          {/* Animated particles */}
          <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-netflix-red/40 rounded-full animate-ping"></div>
          <div className="absolute top-3/4 right-1/3 w-2 h-2 bg-purple-500/40 rounded-full animate-ping" style={{ animationDelay: '0.5s' }}></div>
          <div className="absolute top-1/2 right-1/4 w-2 h-2 bg-blue-500/40 rounded-full animate-ping" style={{ animationDelay: '1.5s' }}></div>
          <div className="absolute bottom-1/4 left-1/3 w-2 h-2 bg-netflix-red/40 rounded-full animate-ping" style={{ animationDelay: '2.5s' }}></div>

          {/* Floating music notes */}
          <div className="absolute top-1/3 left-1/5 text-netflix-red/20 text-4xl animate-bounce" style={{ animationDuration: '3s', animationDelay: '0s' }}>♪</div>
          <div className="absolute top-2/3 right-1/5 text-purple-500/20 text-5xl animate-bounce" style={{ animationDuration: '4s', animationDelay: '1s' }}>♫</div>
          <div className="absolute top-1/2 right-1/3 text-blue-500/15 text-3xl animate-bounce" style={{ animationDuration: '3.5s', animationDelay: '2s' }}>♪</div>
        </div>

        <div className="container-padding relative z-10">
          <div className="max-w-6xl mx-auto text-center">
            <div className="inline-block mb-6 sm:mb-8 lg:mb-10 animate-fadeIn">
              <span className="px-6 py-2.5 sm:px-8 sm:py-3 bg-gradient-to-r from-netflix-red/20 via-purple-500/20 to-netflix-red/20 text-netflix-red text-sm sm:text-base lg:text-lg font-semibold rounded-full border border-netflix-red/30 backdrop-blur-sm shadow-lg shadow-netflix-red/20 hover:shadow-netflix-red/40 hover:border-netflix-red/50 transition-all duration-300 hover:scale-105 cursor-default">
                🎓 Premium Educational Resource
              </span>
            </div>

            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-white mb-6 sm:mb-8 tracking-tight animate-fadeIn leading-tight">
              <span className="inline-block bg-gradient-to-r from-white via-gray-100 to-white bg-clip-text text-transparent">
                Sound Learning
              </span>
              <br />
              <span className="inline-block bg-gradient-to-r from-netflix-red via-purple-500 to-netflix-red bg-clip-text text-transparent animate-gradient bg-size-200">
                Center
              </span>
            </h1>

            <p className="text-xl sm:text-2xl md:text-3xl text-gray-300 mb-12 sm:mb-14 lg:mb-16 max-w-4xl mx-auto leading-relaxed animate-fadeIn font-light">
              A comprehensive guide to the <span className="text-netflix-red font-semibold">sciences of music</span>, <span className="text-purple-500 font-semibold">sound</span>, and the <span className="text-blue-400 font-semibold">brain</span>
            </p>

            {/* Stats */}
            <div className="flex flex-wrap justify-center gap-5 sm:gap-6 lg:gap-8 mb-14 sm:mb-16 lg:mb-20">
              <div className="group relative text-center bg-gradient-to-br from-netflix-red/20 via-white/[0.08] to-white/[0.04] backdrop-blur-md rounded-3xl px-10 sm:px-12 md:px-14 py-7 sm:py-8 md:py-10 border border-netflix-red/30 hover:border-netflix-red/60 transition-all duration-500 hover:scale-110 shadow-2xl hover:shadow-3xl hover:shadow-netflix-red/30 cursor-default min-w-[160px] sm:min-w-[180px] overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-netflix-red/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <p className="text-5xl sm:text-6xl md:text-7xl font-bold bg-gradient-to-br from-netflix-red via-purple-500 to-netflix-red bg-clip-text text-transparent mb-3 group-hover:scale-110 transition-transform duration-300 relative z-10">
                  {learningCenterStats.totalSections}
                </p>
                <p className="text-sm sm:text-base text-gray-300 font-bold uppercase tracking-wider group-hover:text-white transition-colors relative z-10">Disciplines</p>
              </div>

              <div className="group relative text-center bg-gradient-to-br from-purple-500/20 via-white/[0.08] to-white/[0.04] backdrop-blur-md rounded-3xl px-10 sm:px-12 md:px-14 py-7 sm:py-8 md:py-10 border border-purple-500/30 hover:border-purple-500/60 transition-all duration-500 hover:scale-110 shadow-2xl hover:shadow-3xl hover:shadow-purple-500/30 cursor-default min-w-[160px] sm:min-w-[180px] overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <p className="text-5xl sm:text-6xl md:text-7xl font-bold bg-gradient-to-br from-purple-500 via-netflix-red to-purple-500 bg-clip-text text-transparent mb-3 group-hover:scale-110 transition-transform duration-300 relative z-10">
                  {learningCenterStats.totalTopics}
                </p>
                <p className="text-sm sm:text-base text-gray-300 font-bold uppercase tracking-wider group-hover:text-white transition-colors relative z-10">Topics</p>
              </div>

              <div className="group relative text-center bg-gradient-to-br from-blue-500/20 via-white/[0.08] to-white/[0.04] backdrop-blur-md rounded-3xl px-10 sm:px-12 md:px-14 py-7 sm:py-8 md:py-10 border border-blue-500/30 hover:border-blue-400/60 transition-all duration-500 hover:scale-110 shadow-2xl hover:shadow-3xl hover:shadow-blue-500/30 cursor-default min-w-[160px] sm:min-w-[180px] overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <p className="text-5xl sm:text-6xl md:text-7xl font-bold bg-gradient-to-br from-blue-400 via-purple-500 to-blue-400 bg-clip-text text-transparent mb-3 group-hover:scale-110 transition-transform duration-300 relative z-10">
                  {learningCenterStats.totalResources}
                </p>
                <p className="text-sm sm:text-base text-gray-300 font-bold uppercase tracking-wider group-hover:text-white transition-colors relative z-10">Resources</p>
              </div>
            </div>

            {/* Search */}
            <div className="relative max-w-3xl mx-auto mb-12 sm:mb-14 lg:mb-16">
              <div className="relative group">
                <input
                  type="text"
                  placeholder="🔍 Search topics, concepts, or resources..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-gradient-to-r from-white/[0.15] via-white/[0.12] to-white/[0.15] backdrop-blur-md border-2 border-white/20 rounded-2xl px-7 py-5 sm:py-6 pl-16 sm:pl-18 pr-14 text-white placeholder-gray-400 focus:outline-none focus:border-netflix-red focus:ring-4 focus:ring-netflix-red/20 transition-all duration-500 shadow-2xl focus:shadow-netflix-red/30 text-base sm:text-lg lg:text-xl group-hover:border-white/30 hover:shadow-xl"
                />
                <svg
                  className="absolute left-5 sm:left-6 top-1/2 -translate-y-1/2 w-7 h-7 sm:w-8 sm:h-8 text-gray-400 group-focus-within:text-netflix-red group-focus-within:scale-110 transition-all duration-300"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-5 sm:right-6 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-all duration-300 hover:scale-110 bg-white/10 hover:bg-netflix-red/30 rounded-full p-2"
                  >
                    <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                )}
              </div>
            </div>

            {/* Expand/Collapse buttons */}
            <div className="flex flex-wrap justify-center gap-4 sm:gap-5">
              <button
                onClick={expandAll}
                className="group relative px-7 sm:px-9 py-4 sm:py-4.5 text-sm sm:text-base lg:text-lg font-semibold bg-gradient-to-r from-netflix-red/20 via-white/[0.12] to-netflix-red/20 hover:from-netflix-red/30 hover:via-white/[0.18] hover:to-netflix-red/30 text-white rounded-2xl transition-all duration-500 border-2 border-netflix-red/30 hover:border-netflix-red/50 flex items-center gap-3 hover:scale-105 shadow-xl hover:shadow-2xl hover:shadow-netflix-red/30 backdrop-blur-sm overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                <svg className="w-5 h-5 sm:w-6 sm:h-6 group-hover:rotate-90 transition-transform duration-500 relative z-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                </svg>
                <span className="relative z-10">Expand All Topics</span>
              </button>
              <button
                onClick={collapseAll}
                className="group relative px-7 sm:px-9 py-4 sm:py-4.5 text-sm sm:text-base lg:text-lg font-semibold bg-gradient-to-r from-purple-500/20 via-white/[0.12] to-purple-500/20 hover:from-purple-500/30 hover:via-white/[0.18] hover:to-purple-500/30 text-white rounded-2xl transition-all duration-500 border-2 border-purple-500/30 hover:border-purple-500/50 flex items-center gap-3 hover:scale-105 shadow-xl hover:shadow-2xl hover:shadow-purple-500/30 backdrop-blur-sm overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                <svg className="w-5 h-5 sm:w-6 sm:h-6 group-hover:scale-75 transition-transform duration-500 relative z-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                </svg>
                <span className="relative z-10">Collapse All Topics</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Navigation (Mobile) */}
      <div className="lg:hidden sticky top-16 z-30 bg-gradient-to-b from-netflix-black via-netflix-black/98 to-netflix-black/90 backdrop-blur-xl border-b-2 border-white/10 shadow-2xl">
        <div className="container-padding py-5 overflow-x-auto scrollbar-hide">
          <div className="flex gap-3 sm:gap-4 min-w-max px-1">
            {allSections.map((section) => (
              <a
                key={section.id}
                href={`#${section.id}`}
                className={`flex items-center gap-3 px-6 py-3 rounded-2xl text-sm sm:text-base font-bold whitespace-nowrap transition-all duration-500 ${
                  activeSection === section.id
                    ? 'bg-gradient-to-r from-netflix-red via-purple-500 to-netflix-red text-white shadow-xl shadow-netflix-red/50 scale-105 border-2 border-white/30 animate-gradient bg-size-200'
                    : 'bg-gradient-to-r from-white/[0.15] to-white/[0.10] text-gray-300 hover:from-white/[0.22] hover:to-white/[0.15] hover:text-white border-2 border-white/10 hover:border-white/25 hover:scale-105 shadow-lg'
                }`}
              >
                <span className="text-xl sm:text-2xl">{section.icon}</span>
                <span className="tracking-wide">{section.title.split(' ')[0]}</span>
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container-padding py-12 sm:py-16 lg:py-20">
        <div className="max-w-6xl mx-auto">
          {searchQuery && filteredSections.length === 0 ? (
            <div className="text-center py-20 sm:py-24 lg:py-32 animate-fadeIn">
              <div className="inline-block p-8 sm:p-10 bg-gradient-to-br from-netflix-red/10 via-purple-500/10 to-white/[0.02] rounded-3xl mb-8 sm:mb-10 shadow-2xl backdrop-blur-sm border border-white/10 relative overflow-hidden">
                {/* Animated background */}
                <div className="absolute inset-0 bg-gradient-to-r from-netflix-red/5 via-purple-500/5 to-transparent animate-pulse"></div>
                <svg className="w-20 h-20 sm:w-24 sm:h-24 text-gray-500 relative z-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <p className="text-gray-400 text-xl sm:text-2xl mb-4 font-medium">No topics found matching</p>
              <p className="text-white text-2xl sm:text-3xl font-bold mb-10 sm:mb-12 px-4 max-w-2xl mx-auto">"{searchQuery}"</p>
              <button
                onClick={() => setSearchQuery('')}
                className="group px-8 sm:px-10 py-4 sm:py-5 bg-gradient-to-r from-netflix-red via-purple-500 to-netflix-red hover:from-purple-500 hover:via-netflix-red hover:to-purple-500 text-white rounded-2xl transition-all duration-500 font-semibold shadow-xl hover:shadow-2xl hover:shadow-netflix-red/40 hover:scale-105 flex items-center gap-3 mx-auto text-base sm:text-lg bg-size-200 animate-gradient"
              >
                <svg className="w-5 h-5 sm:w-6 sm:h-6 group-hover:rotate-90 transition-transform duration-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
                <span>Clear search and explore all topics</span>
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

      {/* Desktop Progress Navigation */}
      <ProgressIndicator sections={allSections} activeSection={activeSection} />

      {/* Footer CTA */}
      <div className="relative bg-gradient-to-t from-netflix-red/25 via-purple-500/10 to-transparent py-24 sm:py-28 md:py-32 lg:py-40 overflow-hidden mt-16 sm:mt-20 lg:mt-24">
        {/* Decorative elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute bottom-0 left-1/4 w-96 h-96 sm:w-[500px] sm:h-[500px] bg-netflix-red/15 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 sm:w-[500px] sm:h-[500px] bg-purple-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1.5s' }}></div>
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-radial from-netflix-red/10 to-transparent rounded-full"></div>

          {/* Floating music notes */}
          <div className="absolute bottom-1/4 left-1/4 text-netflix-red/20 text-5xl animate-bounce" style={{ animationDuration: '3s' }}>♪</div>
          <div className="absolute top-1/3 right-1/4 text-purple-500/20 text-6xl animate-bounce" style={{ animationDuration: '4s', animationDelay: '1s' }}>♫</div>
        </div>

        <div className="container-padding text-center relative z-10">
          <div className="inline-block mb-8 sm:mb-10 lg:mb-12">
            <div className="relative">
              <span className="text-6xl sm:text-7xl md:text-8xl animate-bounce">🎵</span>
              <div className="absolute inset-0 bg-gradient-to-r from-netflix-red/20 to-purple-500/20 rounded-full blur-2xl"></div>
            </div>
          </div>

          <h3 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 sm:mb-8 leading-tight">
            <span className="bg-gradient-to-r from-white via-gray-100 to-white bg-clip-text text-transparent">
              Continue Your
            </span>
            <br />
            <span className="bg-gradient-to-r from-netflix-red via-purple-500 to-netflix-red bg-clip-text text-transparent animate-gradient bg-size-200">
              Learning Journey
            </span>
          </h3>

          <p className="text-gray-300 mb-12 sm:mb-14 lg:mb-16 max-w-4xl mx-auto text-lg sm:text-xl md:text-2xl leading-relaxed font-light">
            Explore our other sections on <span className="text-netflix-red font-semibold">frequencies</span>, <span className="text-purple-500 font-semibold">sound healing</span>, and <span className="text-blue-400 font-semibold">research</span> to deepen your understanding of sound's transformative power
          </p>

          <div className="flex flex-wrap justify-center gap-5 sm:gap-6">
            <a
              href="/frequencies"
              className="group relative px-8 sm:px-10 py-5 sm:py-6 bg-gradient-to-r from-netflix-red/20 via-white/[0.12] to-netflix-red/20 hover:from-netflix-red/30 hover:via-white/[0.18] hover:to-netflix-red/30 text-white rounded-2xl transition-all duration-500 border-2 border-netflix-red/30 hover:border-netflix-red/50 font-bold flex items-center gap-3 sm:gap-4 hover:scale-110 shadow-2xl hover:shadow-3xl hover:shadow-netflix-red/30 backdrop-blur-md text-base sm:text-lg overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
              <span className="text-3xl sm:text-4xl group-hover:scale-125 transition-transform duration-300 relative z-10">🔊</span>
              <span className="relative z-10">Frequencies</span>
            </a>

            <a
              href="/sound-healing"
              className="group relative px-8 sm:px-10 py-5 sm:py-6 bg-gradient-to-r from-purple-500/20 via-white/[0.12] to-purple-500/20 hover:from-purple-500/30 hover:via-white/[0.18] hover:to-purple-500/30 text-white rounded-2xl transition-all duration-500 border-2 border-purple-500/30 hover:border-purple-500/50 font-bold flex items-center gap-3 sm:gap-4 hover:scale-110 shadow-2xl hover:shadow-3xl hover:shadow-purple-500/30 backdrop-blur-md text-base sm:text-lg overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
              <span className="text-3xl sm:text-4xl group-hover:scale-125 transition-transform duration-300 relative z-10">🧘</span>
              <span className="relative z-10">Sound Healing</span>
            </a>

            <a
              href="/research"
              className="group relative px-8 sm:px-10 py-5 sm:py-6 bg-gradient-to-r from-blue-500/20 via-white/[0.12] to-blue-500/20 hover:from-blue-500/30 hover:via-white/[0.18] hover:to-blue-500/30 text-white rounded-2xl transition-all duration-500 border-2 border-blue-500/30 hover:border-blue-500/50 font-bold flex items-center gap-3 sm:gap-4 hover:scale-110 shadow-2xl hover:shadow-3xl hover:shadow-blue-500/30 backdrop-blur-md text-base sm:text-lg overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
              <span className="text-3xl sm:text-4xl group-hover:scale-125 transition-transform duration-300 relative z-10">📚</span>
              <span className="relative z-10">Research</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SoundLearningCenterPage;
