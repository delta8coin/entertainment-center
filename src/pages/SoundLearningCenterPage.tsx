import { useState } from 'react';
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
    <div className={`bg-gradient-to-br from-white/5 to-white/[0.02] rounded-xl overflow-hidden transition-all duration-300 hover:from-white/10 hover:to-white/5 border border-white/10 hover:border-netflix-red/30 shadow-lg hover:shadow-netflix-red/10 ${isExpanded ? 'ring-1 ring-netflix-red/20' : ''}`}>
      <button
        onClick={onToggle}
        className="w-full text-left p-4 sm:p-6 flex justify-between items-start gap-4"
      >
        <div className="flex-1">
          <h4 className="text-base sm:text-lg font-bold text-white mb-2 group-hover:text-netflix-red transition-colors">
            {topic.title}
          </h4>
          <p className="text-gray-400 text-sm leading-relaxed line-clamp-2">
            {topic.description}
          </p>
        </div>
        <span className={`text-netflix-red transition-all duration-300 bg-netflix-red/10 rounded-full p-1.5 ${isExpanded ? 'rotate-180 bg-netflix-red/20' : ''}`}>
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </span>
      </button>

      {isExpanded && (
        <div className="px-4 sm:px-6 pb-4 sm:pb-6 border-t border-white/10 pt-5 animate-fadeIn bg-gradient-to-b from-transparent to-black/20">
          {/* Key Points */}
          <div className="mb-6">
            <h5 className="text-sm font-bold text-netflix-red mb-4 flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-netflix-red rounded-full"></span>
              Key Concepts
            </h5>
            <ul className="space-y-3">
              {topic.keyPoints.map((point, idx) => (
                <li key={idx} className="flex items-start gap-3 text-sm text-gray-300 bg-white/5 rounded-lg p-3 hover:bg-white/10 transition-colors">
                  <span className="text-netflix-red mt-0.5 flex-shrink-0 text-lg">→</span>
                  <span className="leading-relaxed">{point}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h5 className="text-sm font-bold text-netflix-red mb-4 flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-netflix-red rounded-full"></span>
              Learning Resources
            </h5>
            <div className="grid gap-3 sm:grid-cols-2">
              {topic.resources.map((resource, idx) => (
                <div key={idx} className="bg-gradient-to-br from-black/40 to-black/60 rounded-xl p-4 border border-white/5 hover:border-white/20 transition-all duration-300 hover:shadow-lg group">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <h6 className="text-sm font-semibold text-white flex-1">
                      {resource.url ? (
                        <a
                          href={resource.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:text-netflix-red transition-colors inline-flex items-center gap-1"
                        >
                          {resource.title}
                          <svg className="w-3.5 h-3.5 opacity-50 group-hover:opacity-100 transition-opacity" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                          </svg>
                        </a>
                      ) : (
                        resource.title
                      )}
                    </h6>
                  </div>
                  <div className="mb-2">
                    <ResourceBadge type={resource.type} />
                  </div>
                  {resource.author && (
                    <p className="text-xs text-gray-500 mb-2 font-medium">by {resource.author}</p>
                  )}
                  <p className="text-xs text-gray-400 leading-relaxed">{resource.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Related Topics */}
          {topic.relatedTopics && topic.relatedTopics.length > 0 && (
            <div className="mt-5 pt-4 border-t border-white/10">
              <p className="text-xs text-gray-500 flex flex-wrap items-center gap-2">
                <span className="font-semibold">Related:</span>
                {topic.relatedTopics.map((related, idx) => (
                  <span key={idx} className="bg-white/5 px-2 py-0.5 rounded-full hover:bg-white/10 transition-colors cursor-default">
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
    <section id={section.id} className="mb-16 scroll-mt-24">
      <div className="mb-8">
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="w-full flex items-center gap-4 group p-4 sm:p-6 rounded-2xl bg-gradient-to-r from-white/5 to-transparent hover:from-white/10 transition-all duration-300 border border-white/5 hover:border-white/10"
        >
          <span className="text-4xl sm:text-5xl p-3 bg-netflix-red/10 rounded-xl group-hover:bg-netflix-red/20 transition-colors">{section.icon}</span>
          <div className="text-left flex-1">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white group-hover:text-netflix-red transition-colors mb-1">
              {section.title}
            </h2>
            <p className="text-sm sm:text-base text-gray-400">{section.subtitle}</p>
          </div>
          <span className={`text-gray-500 transition-all duration-300 bg-white/5 rounded-full p-2 group-hover:bg-white/10 ${isCollapsed ? '' : 'rotate-180'}`}>
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </span>
        </button>
      </div>

      {!isCollapsed && (
        <div className="animate-fadeIn pl-0 sm:pl-4">
          <p className="text-gray-300 mb-8 leading-relaxed max-w-4xl text-base sm:text-lg border-l-2 border-netflix-red/30 pl-4 sm:pl-6">
            {section.overview}
          </p>

          <div className="grid gap-4 sm:gap-5">
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
  useState(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  });

  return (
    <div className="min-h-screen bg-netflix-black">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-b from-netflix-red/20 via-netflix-red/5 to-netflix-black pt-20 pb-16 overflow-hidden">
        {/* Decorative background elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-72 h-72 bg-netflix-red/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-radial from-netflix-red/5 to-transparent rounded-full"></div>
        </div>

        <div className="container-padding relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-block mb-6">
              <span className="px-4 py-1.5 bg-netflix-red/20 text-netflix-red text-sm font-semibold rounded-full border border-netflix-red/30">
                Educational Resource
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 tracking-tight">
              Sound Learning Center
            </h1>
            <p className="text-lg sm:text-xl text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed">
              A comprehensive guide to the sciences of music, sound, and the brain
            </p>

            {/* Stats */}
            <div className="flex flex-wrap justify-center gap-4 sm:gap-6 mb-10">
              <div className="text-center bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm rounded-xl px-6 sm:px-8 py-4 border border-white/10 hover:border-netflix-red/30 transition-all duration-300 hover:scale-105">
                <p className="text-3xl sm:text-4xl font-bold text-netflix-red mb-1">
                  {learningCenterStats.totalSections}
                </p>
                <p className="text-xs sm:text-sm text-gray-400 font-medium uppercase tracking-wide">Disciplines</p>
              </div>
              <div className="text-center bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm rounded-xl px-6 sm:px-8 py-4 border border-white/10 hover:border-netflix-red/30 transition-all duration-300 hover:scale-105">
                <p className="text-3xl sm:text-4xl font-bold text-netflix-red mb-1">
                  {learningCenterStats.totalTopics}
                </p>
                <p className="text-xs sm:text-sm text-gray-400 font-medium uppercase tracking-wide">Topics</p>
              </div>
              <div className="text-center bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm rounded-xl px-6 sm:px-8 py-4 border border-white/10 hover:border-netflix-red/30 transition-all duration-300 hover:scale-105">
                <p className="text-3xl sm:text-4xl font-bold text-netflix-red mb-1">
                  {learningCenterStats.totalResources}
                </p>
                <p className="text-xs sm:text-sm text-gray-400 font-medium uppercase tracking-wide">Resources</p>
              </div>
            </div>

            {/* Search */}
            <div className="relative max-w-lg mx-auto mb-8">
              <input
                type="text"
                placeholder="Search topics, concepts, or resources..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl px-5 py-4 pl-12 text-white placeholder-gray-400 focus:outline-none focus:border-netflix-red focus:ring-2 focus:ring-netflix-red/20 transition-all duration-300 shadow-lg"
              />
              <svg
                className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
            </div>

            {/* Expand/Collapse buttons */}
            <div className="flex justify-center gap-4">
              <button
                onClick={expandAll}
                className="px-5 py-2.5 text-sm font-medium bg-white/10 hover:bg-white/20 text-white rounded-xl transition-all duration-300 border border-white/10 hover:border-white/20 flex items-center gap-2"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                </svg>
                Expand All
              </button>
              <button
                onClick={collapseAll}
                className="px-5 py-2.5 text-sm font-medium bg-white/10 hover:bg-white/20 text-white rounded-xl transition-all duration-300 border border-white/10 hover:border-white/20 flex items-center gap-2"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                </svg>
                Collapse All
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Navigation (Mobile) */}
      <div className="lg:hidden sticky top-16 z-30 bg-netflix-black/95 backdrop-blur-md border-b border-white/10 shadow-lg">
        <div className="container-padding py-3 overflow-x-auto scrollbar-hide">
          <div className="flex gap-2 min-w-max">
            {allSections.map((section) => (
              <a
                key={section.id}
                href={`#${section.id}`}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-300 ${
                  activeSection === section.id
                    ? 'bg-netflix-red text-white shadow-lg shadow-netflix-red/30'
                    : 'bg-white/10 text-gray-300 hover:bg-white/20 border border-white/5'
                }`}
              >
                <span className="text-base">{section.icon}</span>
                <span>{section.title.split(' ')[0]}</span>
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container-padding py-12 sm:py-16">
        <div className="max-w-4xl mx-auto lg:mr-48">
          {searchQuery && filteredSections.length === 0 ? (
            <div className="text-center py-16">
              <div className="inline-block p-4 bg-white/5 rounded-full mb-4">
                <svg className="w-12 h-12 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <p className="text-gray-400 text-lg mb-2">No topics found matching</p>
              <p className="text-white font-semibold mb-6">"{searchQuery}"</p>
              <button
                onClick={() => setSearchQuery('')}
                className="px-5 py-2.5 bg-netflix-red hover:bg-netflix-red/80 text-white rounded-xl transition-all duration-300 font-medium"
              >
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
      <div className="relative bg-gradient-to-t from-netflix-red/20 via-netflix-red/5 to-transparent py-16 overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute bottom-0 left-1/4 w-64 h-64 bg-netflix-red/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-purple-500/5 rounded-full blur-3xl"></div>
        </div>

        <div className="container-padding text-center relative z-10">
          <div className="inline-block mb-4">
            <span className="text-4xl">🎵</span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-bold text-white mb-4">
            Continue Your Learning Journey
          </h3>
          <p className="text-gray-400 mb-8 max-w-2xl mx-auto text-base sm:text-lg leading-relaxed">
            Explore our other sections on frequencies, sound healing, meditation, and research
            to deepen your understanding of sound's transformative power.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="/frequencies"
              className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white rounded-xl transition-all duration-300 border border-white/10 hover:border-white/20 font-medium flex items-center gap-2 hover:scale-105"
            >
              <span>🔊</span>
              Frequencies
            </a>
            <a
              href="/sound-healing"
              className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white rounded-xl transition-all duration-300 border border-white/10 hover:border-white/20 font-medium flex items-center gap-2 hover:scale-105"
            >
              <span>🧘</span>
              Sound Healing
            </a>
            <a
              href="/research"
              className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white rounded-xl transition-all duration-300 border border-white/10 hover:border-white/20 font-medium flex items-center gap-2 hover:scale-105"
            >
              <span>📚</span>
              Research
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SoundLearningCenterPage;
