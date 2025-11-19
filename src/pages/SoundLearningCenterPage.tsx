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
    video: 'bg-red-500/20 text-red-300',
    article: 'bg-blue-500/20 text-blue-300',
    book: 'bg-amber-500/20 text-amber-300',
    course: 'bg-green-500/20 text-green-300',
    research: 'bg-purple-500/20 text-purple-300'
  };

  return (
    <span className={`px-2 py-0.5 rounded text-xs font-medium ${colors[type]}`}>
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
    <div className="bg-white/5 rounded-lg overflow-hidden transition-all duration-300 hover:bg-white/10">
      <button
        onClick={onToggle}
        className="w-full text-left p-4 sm:p-5 flex justify-between items-start gap-4"
      >
        <div className="flex-1">
          <h4 className="text-base sm:text-lg font-semibold text-white mb-2">
            {topic.title}
          </h4>
          <p className="text-gray-400 text-sm line-clamp-2">
            {topic.description}
          </p>
        </div>
        <span className={`text-netflix-red transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}>
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </span>
      </button>

      {isExpanded && (
        <div className="px-4 sm:px-5 pb-4 sm:pb-5 border-t border-white/10 pt-4 animate-fadeIn">
          {/* Key Points */}
          <div className="mb-4">
            <h5 className="text-sm font-semibold text-netflix-red mb-3">Key Concepts</h5>
            <ul className="space-y-2">
              {topic.keyPoints.map((point, idx) => (
                <li key={idx} className="flex items-start gap-2 text-sm text-gray-300">
                  <span className="text-netflix-red mt-1 flex-shrink-0">•</span>
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h5 className="text-sm font-semibold text-netflix-red mb-3">Learning Resources</h5>
            <div className="space-y-3">
              {topic.resources.map((resource, idx) => (
                <div key={idx} className="bg-black/30 rounded-lg p-3">
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <h6 className="text-sm font-medium text-white">
                      {resource.url ? (
                        <a
                          href={resource.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:text-netflix-red transition-colors"
                        >
                          {resource.title} ↗
                        </a>
                      ) : (
                        resource.title
                      )}
                    </h6>
                    <ResourceBadge type={resource.type} />
                  </div>
                  {resource.author && (
                    <p className="text-xs text-gray-500 mb-1">by {resource.author}</p>
                  )}
                  <p className="text-xs text-gray-400">{resource.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Related Topics */}
          {topic.relatedTopics && topic.relatedTopics.length > 0 && (
            <div className="mt-4 pt-3 border-t border-white/10">
              <p className="text-xs text-gray-500">
                Related: {topic.relatedTopics.join(' • ')}
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
    <section id={section.id} className="mb-12 scroll-mt-24">
      <div className="mb-6">
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="flex items-center gap-3 group"
        >
          <span className="text-3xl">{section.icon}</span>
          <div className="text-left">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white group-hover:text-netflix-red transition-colors">
              {section.title}
            </h2>
            <p className="text-sm text-gray-400">{section.subtitle}</p>
          </div>
          <span className={`ml-auto text-gray-500 transition-transform ${isCollapsed ? '' : 'rotate-180'}`}>
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </span>
        </button>
      </div>

      {!isCollapsed && (
        <div className="animate-fadeIn">
          <p className="text-gray-300 mb-6 leading-relaxed max-w-4xl">
            {section.overview}
          </p>

          <div className="grid gap-4">
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
      <div className="bg-black/60 backdrop-blur-sm rounded-lg p-3">
        <p className="text-xs text-gray-500 mb-2 font-medium">Sections</p>
        <ul className="space-y-1">
          {sections.map((section) => (
            <li key={section.id}>
              <a
                href={`#${section.id}`}
                className={`flex items-center gap-2 px-2 py-1.5 rounded text-sm transition-colors ${
                  activeSection === section.id
                    ? 'bg-netflix-red/20 text-netflix-red'
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <span>{section.icon}</span>
                <span className="hidden xl:inline truncate max-w-32">{section.title}</span>
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
      <div className="relative bg-gradient-to-b from-netflix-red/20 to-netflix-black pt-20 pb-12">
        <div className="container-padding">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
              Sound Learning Center
            </h1>
            <p className="text-lg sm:text-xl text-gray-300 mb-6">
              A comprehensive guide to the sciences of music, sound, and the brain
            </p>

            {/* Stats */}
            <div className="flex justify-center gap-6 sm:gap-10 mb-8">
              <div className="text-center">
                <p className="text-2xl sm:text-3xl font-bold text-netflix-red">
                  {learningCenterStats.totalSections}
                </p>
                <p className="text-xs sm:text-sm text-gray-400">Disciplines</p>
              </div>
              <div className="text-center">
                <p className="text-2xl sm:text-3xl font-bold text-netflix-red">
                  {learningCenterStats.totalTopics}
                </p>
                <p className="text-xs sm:text-sm text-gray-400">Topics</p>
              </div>
              <div className="text-center">
                <p className="text-2xl sm:text-3xl font-bold text-netflix-red">
                  {learningCenterStats.totalResources}
                </p>
                <p className="text-xs sm:text-sm text-gray-400">Resources</p>
              </div>
            </div>

            {/* Search */}
            <div className="relative max-w-md mx-auto mb-6">
              <input
                type="text"
                placeholder="Search topics, concepts, or resources..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 pl-10 text-white placeholder-gray-400 focus:outline-none focus:border-netflix-red transition-colors"
              />
              <svg
                className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>

            {/* Expand/Collapse buttons */}
            <div className="flex justify-center gap-3">
              <button
                onClick={expandAll}
                className="px-4 py-2 text-sm bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors"
              >
                Expand All
              </button>
              <button
                onClick={collapseAll}
                className="px-4 py-2 text-sm bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors"
              >
                Collapse All
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Navigation (Mobile) */}
      <div className="lg:hidden sticky top-16 z-30 bg-netflix-black/95 backdrop-blur-sm border-b border-white/10">
        <div className="container-padding py-3 overflow-x-auto">
          <div className="flex gap-2 min-w-max">
            {allSections.map((section) => (
              <a
                key={section.id}
                href={`#${section.id}`}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm whitespace-nowrap transition-colors ${
                  activeSection === section.id
                    ? 'bg-netflix-red text-white'
                    : 'bg-white/10 text-gray-300 hover:bg-white/20'
                }`}
              >
                <span>{section.icon}</span>
                <span>{section.title.split(' ')[0]}</span>
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container-padding pb-20">
        <div className="max-w-4xl mx-auto lg:mr-48">
          {searchQuery && filteredSections.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-400">No topics found matching "{searchQuery}"</p>
              <button
                onClick={() => setSearchQuery('')}
                className="mt-4 text-netflix-red hover:underline"
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
      <div className="bg-gradient-to-t from-netflix-red/10 to-transparent py-12">
        <div className="container-padding text-center">
          <h3 className="text-xl sm:text-2xl font-bold text-white mb-3">
            Continue Your Learning Journey
          </h3>
          <p className="text-gray-400 mb-6 max-w-2xl mx-auto">
            Explore our other sections on frequencies, sound healing, meditation, and research
            to deepen your understanding of sound's transformative power.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <a
              href="/frequencies"
              className="btn-secondary px-6 py-2 rounded-lg"
            >
              Frequencies
            </a>
            <a
              href="/sound-healing"
              className="btn-secondary px-6 py-2 rounded-lg"
            >
              Sound Healing
            </a>
            <a
              href="/research"
              className="btn-secondary px-6 py-2 rounded-lg"
            >
              Research
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SoundLearningCenterPage;
