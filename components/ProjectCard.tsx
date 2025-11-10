'use client';

import Link from 'next/link';
import { Project } from '@/types';
import AvatarGroup from './AvatarGroup';
import AnimatedIcon from './AnimatedIcon';
import { 
  PenTool, 
  Palette, 
  FileImage, 
  Droplet, 
  Brush, 
  Sparkles,
  Megaphone,
  Heart,
  ThumbsUp,
  ShoppingBag,
  Coffee,
  UtensilsCrossed,
  FolderKanban
} from 'lucide-react';

interface ProjectCardProps {
  project: Project;
}

const projectIcons: Record<string, any[]> = {
  'SuperApp': [PenTool, Palette, FileImage],
  'Cleaning': [Droplet, Brush],
  'SMM Courses': [Megaphone, Heart, ThumbsUp],
  'default': [ShoppingBag, Coffee, UtensilsCrossed],
};

export default function ProjectCard({ project }: ProjectCardProps) {
  const progress = project.totalTasks > 0
    ? Math.round((project.completedTasks / project.totalTasks) * 100)
    : 0;

  const icons = projectIcons[project.name] || projectIcons['default'];

  return (
    <Link href={`/projects/${project.id}`}>
      <div
        className="rounded-2xl p-5 text-white shadow-lg hover:shadow-xl transition-shadow cursor-pointer relative overflow-hidden"
        style={{ backgroundColor: project.color }}
      >
        {/* Animated background icon */}
        <div className="absolute top-4 right-4 opacity-10">
          <AnimatedIcon icon={FolderKanban} size={60} color="#ffffff" />
        </div>
        <div className="relative z-10">
          <div className="flex items-start justify-between mb-3">
            <AvatarGroup users={project.assignees} size={32} />
            <div className="flex gap-1.5">
              {icons.slice(0, 3).map((Icon, index) => (
                <div
                  key={index}
                  className="border-2 border-white rounded-lg p-1"
                >
                  <Icon size={16} className="text-white" strokeWidth={2} />
                </div>
              ))}
            </div>
          </div>
          <p className="text-xs opacity-90 mb-2">
            {project.completedTasks}/{project.totalTasks} tasks • {progress}%
          </p>
          <h2 className="text-2xl font-bold">{project.name}</h2>
        </div>
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 opacity-10">
          <div className="w-24 h-24 rounded-full bg-white -mr-12 -mt-12"></div>
        </div>
        <div className="absolute bottom-0 left-0 opacity-10">
          <div className="w-20 h-20 rounded-full bg-white -ml-10 -mb-10"></div>
        </div>
      </div>
    </Link>
  );
}


