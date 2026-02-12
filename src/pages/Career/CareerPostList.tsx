import React from 'react';
import CareerPostItem from './CareerPostItem';
import { JobPost } from './Career';
import { FaInbox } from 'react-icons/fa';

interface CareerPostListProps {
  jobPosts: JobPost[];
  onApplyNow: (job: JobPost) => void;
}

const CareerPostList: React.FC<CareerPostListProps> = ({ jobPosts, onApplyNow }) => {
  if (jobPosts.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 bg-[var(--bg-card)] rounded-3xl border-2 border-dashed border-[var(--border-color)] text-[var(--text-muted)]">
        <div className="bg-[var(--bg-main)] p-6 rounded-full mb-4">
          <FaInbox size={40} />
        </div>
        <h3 className="font-black uppercase tracking-widest text-sm text-[var(--text-main)]">No Openings Found</h3>
        <p className="text-xs font-medium max-w-xs text-center mt-2 px-6">We don't have any matching positions at the moment, but we're always looking for great talent. Check back soon!</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6">
      {jobPosts.map((job) => (
        <CareerPostItem key={job.id} job={job} onApplyNow={onApplyNow} />
      ))}
    </div>
  );
};

export default CareerPostList;