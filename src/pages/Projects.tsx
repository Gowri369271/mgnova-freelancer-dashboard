import { motion, AnimatePresence } from 'framer-motion';
import { ProjectCard } from '@/components/projects/ProjectCard';
import { AIProposalGenerator } from '@/components/proposals/AIProposalGenerator';
import { projects } from '@/data/mockData';
import { useState, useMemo } from 'react';
import { Search } from 'lucide-react';

export default function Projects() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [isGeneratorOpen, setIsGeneratorOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null);

  const filters = ['all', 'active', 'completed', 'high-budget'];
  
  // Real filtering logic with search and category filters
  const filteredProjects = useMemo(() => {
    let result = projects;

    // Search filtering - by title, client name, or skills
    if (searchTerm.trim()) {
      const searchLower = searchTerm.toLowerCase();
      result = result.filter((project) => 
        project.title.toLowerCase().includes(searchLower) ||
        project.client.toLowerCase().includes(searchLower) ||
        project.skills.some(skill => skill.toLowerCase().includes(searchLower))
      );
    }

    // Category filtering
    if (selectedFilter === 'active') {
      result = result.filter(p => p.matchScore >= 85);
    } else if (selectedFilter === 'completed') {
      result = result.filter(p => p.matchScore < 85);
    } else if (selectedFilter === 'high-budget') {
      result = result.filter(p => {
        const budgetMax = parseInt(p.budget.split('-')[1].replace('$', '').replace(',', '')) || 0;
        return budgetMax >= 5000;
      });
    }

    return result;
  }, [searchTerm, selectedFilter]);

  const handleGenerateProposal = (project: typeof projects[0]) => {
    setSelectedProject(project);
    setIsGeneratorOpen(true);
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
      <div className="mb-12">
        <h1 className="text-4xl font-bold text-foreground mb-3">Discover Projects</h1>
        <p className="text-muted-foreground mb-8 text-lg">Find and apply to projects that match your skills, expertise, and budget preferences</p>
        
        {/* Search Bar */}
        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={20} />
            <input
              type="text"
              placeholder="Search by project title, company name, or skills..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-card border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-all"
            />
          </div>
        </div>

        {/* Filter Buttons */}
        <div className="flex gap-2 flex-wrap">
          {filters.map((filter) => (
            <motion.button
              key={filter}
              onClick={() => setSelectedFilter(filter)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`px-4 py-2 rounded-lg transition-colors capitalize font-medium ${
                selectedFilter === filter
                  ? 'bg-primary text-primary-foreground shadow-lg'
                  : 'bg-card border border-border text-foreground hover:bg-accent'
              }`}
            >
              {filter}
              <span className="ml-2 text-xs">({selectedFilter === filter ? filteredProjects.length : projects.filter(p => {
                if (filter === 'all') return true;
                if (filter === 'active') return p.matchScore >= 85;
                if (filter === 'completed') return p.matchScore < 85;
                if (filter === 'high-budget') {
                  const budgetMax = parseInt(p.budget.split('-')[1].replace('$', '').replace(',', '')) || 0;
                  return budgetMax >= 5000;
                }
                return true;
              }).length})</span>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Projects Grid with Animation */}
      <AnimatePresence mode="wait">
        {filteredProjects.length > 0 ? (
          <motion.div
            key={`${searchTerm}-${selectedFilter}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <ProjectCard 
                  {...project} 
                  index={index}
                  onGenerateProposal={() => handleGenerateProposal(project)}
                />
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="text-center py-16 bg-card rounded-lg border border-border"
          >
            <p className="text-muted-foreground text-lg">No projects found matching your criteria.</p>
            <p className="text-muted-foreground text-sm mt-2">Try adjusting your filters or search terms</p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* AI Proposal Generator Modal */}
      {isGeneratorOpen && selectedProject && (
        <AIProposalGenerator 
          onClose={() => setIsGeneratorOpen(false)} 
          projectTitle={selectedProject.title}
          projectBudget={selectedProject.budget}
        />
      )}
    </motion.div>
  );
}
