import { motion } from 'framer-motion';
import { ProjectCard } from '@/components/projects/ProjectCard';
import { ProposalTable } from '@/components/proposals/ProposalTable';
import { WalletPreview } from '@/components/wallet/WalletPreview';
import { AIProposalGenerator } from '@/components/proposals/AIProposalGenerator';
import { mockUser, projects, proposals } from '@/data/mockData';
import { useState } from 'react';
import { TrendingUp, Zap, Award, DollarSign } from 'lucide-react';

export default function Dashboard() {
  const [isGeneratorOpen, setIsGeneratorOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null);

  const handleGenerateProposal = (project: typeof projects[0]) => {
    setSelectedProject(project);
    setIsGeneratorOpen(true);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="w-full"
    >
      {/* Hero Section - Premium Welcome */}
      <div className="mb-16 pt-2">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-4"
        >
          <div>
            <span className="inline-block text-xs font-semibold text-secondary uppercase tracking-widest mb-4">
              Welcome Back
            </span>
            <h1 className="text-5xl md:text-6xl font-bold text-foreground leading-tight">
              {mockUser.name}
            </h1>
          </div>
          <p className="text-lg text-muted-foreground max-w-3xl leading-relaxed">
            Continue your journey as an elite freelancer on MGNOVA. Discover exceptional projects, pitch winning proposals, and grow your reputation in the premium talent ecosystem.
          </p>
        </motion.div>
      </div>

      {/* Key Metrics - Spacious Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
        {[
          { label: 'Total Earnings', value: '$24,850', subtext: '+12% this month', icon: DollarSign, color: 'text-secondary' },
          { label: 'Active Projects', value: '6', subtext: '+2 this month', icon: Zap, color: 'text-accent' },
          { label: 'Reputation Score', value: '4.8/5', subtext: '+0.2 this month', icon: Award, color: 'text-primary' },
          { label: 'Success Rate', value: '92%', subtext: 'Proposals accepted', icon: TrendingUp, color: 'text-primary' },
        ].map((metric, index) => {
          const Icon = metric.icon;
          return (
            <motion.div
              key={metric.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.12 }}
              className="group"
            >
              <div className="space-y-3">
                <Icon className={`${metric.color} w-6 h-6`} />
                <div>
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">{metric.label}</p>
                  <p className="text-3xl font-bold text-foreground mt-2">{metric.value}</p>
                  <p className="text-xs text-muted-foreground mt-2">{metric.subtext}</p>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Featured Opportunities */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="mb-20"
      >
        <div className="mb-8">
          <span className="inline-block text-xs font-semibold text-secondary uppercase tracking-widest mb-4">
            Hand-Picked
          </span>
          <h2 className="text-4xl font-bold text-foreground mb-3">Featured Opportunities</h2>
          <p className="text-muted-foreground max-w-2xl">Projects expertly matched to your skills and experience level</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.slice(0, 3).map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
            >
              <ProjectCard
                {...project}
                index={index}
                onGenerateProposal={() => handleGenerateProposal(project)}
              />
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Recent Activity */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.5 }}
        className="mb-20"
      >
        <div className="mb-8">
          <span className="inline-block text-xs font-semibold text-secondary uppercase tracking-widest mb-4">
            Activity
          </span>
          <h2 className="text-4xl font-bold text-foreground mb-3">Recent Proposals</h2>
          <p className="text-muted-foreground">Track your submitted proposals and their status</p>
        </div>
        <ProposalTable proposals={proposals.slice(0, 4)} />
      </motion.div>

      {/* Financial Overview */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
        className="mb-12"
      >
        <div className="mb-8">
          <span className="inline-block text-xs font-semibold text-secondary uppercase tracking-widest mb-4">
            Finance
          </span>
          <h2 className="text-4xl font-bold text-foreground mb-3">Your Wallet</h2>
          <p className="text-muted-foreground">Monitor earnings and manage payouts</p>
        </div>
        <WalletPreview />
      </motion.div>

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
