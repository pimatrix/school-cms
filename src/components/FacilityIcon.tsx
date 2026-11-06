import {
  BookOpen,
  Drama,
  FlaskConical,
  Microscope,
  Monitor,
  Music,
  Rocket,
  School,
  Trophy,
  Wrench,
  type LucideIcon,
} from 'lucide-react';

// Facility icons are stored as short KEYS (chosen from a list in the
// admin panel). Rows saved before this change may still hold a legacy
// emoji in the icon column — those are mapped to the same icons here,
// so no emoji ever reaches the rendered page.
const ICONS: Record<string, LucideIcon> = {
  school: School,
  sports: Trophy,
  science: FlaskConical,
  lab: Microscope,
  innovation: Rocket,
  vocational: Wrench,
  computer: Monitor,
  library: BookOpen,
  arts: Drama,
  music: Music,
  // Legacy emoji values (old admin free-text field / old seed data)
  '🏫': School,
  '🏃': Trophy,
  '⚽': Trophy,
  '🔬': FlaskConical,
  '🧪': FlaskConical,
  '🚀': Rocket,
  '🛠️': Wrench,
  '🛠': Wrench,
  '💻': Monitor,
  '🖥️': Monitor,
  '🖥': Monitor,
  '📚': BookOpen,
  '🎭': Drama,
  '🎵': Music,
};

/** The named choices offered in the admin Facilities form. */
export const FACILITY_ICON_KEYS = Object.keys(ICONS).filter((k) =>
  /^[a-z]+$/.test(k)
);

export default function FacilityIcon({
  icon,
  className = 'w-8 h-8',
}: {
  icon?: string | null;
  className?: string;
}) {
  const Icon = ICONS[(icon || '').trim()] || School;
  return <Icon className={className} aria-hidden />;
}
