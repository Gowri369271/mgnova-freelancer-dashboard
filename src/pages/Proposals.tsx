import { motion, AnimatePresence } from 'framer-motion';
import { ProposalTable } from '@/components/proposals/ProposalTable';
import { useState, useCallback, useMemo } from 'react';
import { Sparkles } from 'lucide-react';
import { AIProposalGenerator } from '@/components/proposals/AIProposalGenerator';
import { proposals } from '@/data/mockData';

export default function Proposals() {
  const [isGeneratorOpen, setIsGeneratorOpen] = useState(false);
  const [statusFilter, setStatusFilter] = useState('all');
  
  const handleOpenGenerator = useCallback(() => {
    setIsGeneratorOpen(true);
  }, []);

  const statuses = ['all', 'pending', 'accepted', 'rejected'];

  // Real filtering logic
  const filteredProposals = useMemo(() => {
    if (statusFilter === 'all') {
      return proposals;
    }
    
    if (statusFilter === 'pending') {
      return proposals.filter(p => ['pending', 'applied', 'shortlisted'].includes(p.status));
    }
    
    if (statusFilter === 'accepted') {
      return proposals.filter(p => p.status === 'accepted');
    }
    
    if (statusFilter === 'rejected') {
      return proposals.filter(p => p.status === 'rejected');
    }
    
    return proposals;
  }, [statusFilter]);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
      <div className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-4xl font-bold text-foreground">Proposals</h1>
            <p className="text-muted-foreground mt-2">Manage and track your submitted proposals</p>
          </div>
          <button
            onClick={handleOpenGenerator}
            type="button"
            className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg font-medium hover:opacity-90 transition-opacity cursor-pointer"
          >
            <Sparkles size={18} />
            Generate with AI
          </button>
        </div>

        {/* Status Filters */}
        <div className="flex gap-2 flex-wrap">
          {statuses.map((status) => (
            <motion.button
              key={status}
              onClick={() => setStatusFilter(status)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`px-4 py-2 rounded-lg transition-colors capitalize font-medium ${
                statusFilter === status
                  ? 'bg-primary text-primary-foreground shadow-lg'
                  : 'bg-card border border-border text-foreground hover:bg-accent'
              }`}
            >
              {status}
              <span className="ml-2 text-xs">({statusFilter === status ? filteredProposals.length : proposals.filter(p => {
                if (status === 'all') return true;
                if (status === 'pending') return ['pending', 'applied', 'shortlisted'].includes(p.status);
                return p.status === status;
              }).length})</span>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Proposals Table with Animation */}
      <AnimatePresence mode="wait">
        <motion.div
          key={statusFilter}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          {filteredProposals.length > 0 ? (
            <ProposalTable proposals={filteredProposals} />
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12 bg-card rounded-lg border border-border"
            >
              <p className="text-muted-foreground text-lg">No proposals found in this category.</p>
            </motion.div>
          )}
        </motion.div>
      </AnimatePresence>

      {/* AI Proposal Generator Modal */}
      {isGeneratorOpen && (
        <AIProposalGenerator onClose={() => setIsGeneratorOpen(false)} />
      )}
    </motion.div>
  );
}
