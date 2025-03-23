import { icons } from 'lucide-react-native';
import { ViewStyle } from 'react-native';

type IconProps = {
  name: keyof typeof icons;
  color?: string;
  size?: number;
  style?: ViewStyle;
};

const Icon = ({ name, color, size, style }: IconProps) => {
  const LucideIcon = icons[name];

  if (!LucideIcon) {
    console.warn(`Icon "${name}" does not exist in lucide-react-native.`);
    return null;
  }

  return <LucideIcon color={color} size={size} style={style} />;
};

export default Icon;
