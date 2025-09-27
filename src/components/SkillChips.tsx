import { Badge } from "./ui/badge";

interface Skill {
  name: string;
  rating?: number;
}

interface SkillChipsProps {
  skills: Skill[];
}

export function SkillChips({ skills }: SkillChipsProps) {
  // Use brand color sequence for clear visual hierarchy
  const getSkillVariant = (index: number, total: number) => {
    const skillRank = Math.floor((index / total) * 3); // Divide into 3 tiers
    
    switch (skillRank) {
      case 0: // Top tier - Deep Red
        return {
          backgroundColor: '#B21F35', // Primary color
          color: '#ffffff',
          border: 'none'
        };
      case 1: // Medium tier - Soft Pink  
        return {
          backgroundColor: '#E6A8B4', // Accent color
          color: '#444444',
          border: 'none'
        };
      default: // Lower tier - Light Gray
        return {
          backgroundColor: '#EEEEEE', // Background color
          color: '#444444',
          border: '1px solid rgba(68, 68, 68, 0.15)'
        };
    }
  };

  return (
    <div className="flex flex-wrap gap-2">
      {skills.map((skill, index) => (
        <Badge 
          key={skill.name} 
          variant="secondary" 
          className="text-xs font-medium transition-all duration-200"
          style={getSkillVariant(index, skills.length)}
        >
          {skill.name}
        </Badge>
      ))}
    </div>
  );
}