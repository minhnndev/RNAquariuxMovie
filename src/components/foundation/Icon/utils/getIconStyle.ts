import {IconType} from '../types';

export default (type: IconType, extraProps: any) => {
  switch (type) {
    case 'Zocial':
      return {};
    case 'Octicons':
      return {};
    case 'Material':
      return {};
    case 'MaterialCommunityIcons':
      return {};
    case 'Ionicons':
      return {};
    case 'Foundation':
      return {};
    case 'EvilIcons':
      return {};
    case 'Entypo':
      return {};
    case 'FontAwesome':
      return {};
    case 'FontAwesome5':
      return {
        solid: extraProps.solid || false,
        brand: extraProps.brand || false,
      };
    case 'SimpleLineIcons':
      return {};
    case 'Feather':
      return {};
    case 'AntDesign':
      return {};
    case 'Fontisto':
      return {};
    default:
      return {};
  }
};
