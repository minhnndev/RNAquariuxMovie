import {IconType} from '../types';

const customIcons: any = {};

export const registerCustomIconType = (id: string, customIcon: any) => {
  customIcons[id] = customIcon;
};

export default (type: IconType): any => {
  switch (type) {
    case 'Zocial':
      return require('react-native-vector-icons/Zocial').default;
    case 'Octicons':
      return require('react-native-vector-icons/Octicons').default;
    case 'material':
      return require('react-native-vector-icons/MaterialIcons').default;
    case 'MaterialCommunityIcons':
      return require('react-native-vector-icons/MaterialCommunityIcons')
        .default;
    case 'Ionicons':
      return require('react-native-vector-icons/Ionicons').default;
    case 'Foundation':
      return require('react-native-vector-icons/Foundation').default;
    case 'EvilIcons':
      return require('react-native-vector-icons/EvilIcons').default;
    case 'Entypo':
      return require('react-native-vector-icons/Entypo').default;
    case 'FontAwesome':
      return require('react-native-vector-icons/FontAwesome').default;
    case 'FontAwesome5':
      return require('react-native-vector-icons/FontAwesome5').default;
    case 'SimpleLineIcons':
      return require('react-native-vector-icons/SimpleLineIcons').default;
    case 'Feather':
      return require('react-native-vector-icons/Feather').default;
    case 'AntDesign':
      return require('react-native-vector-icons/AntDesign').default;
    case 'Fontisto':
      return require('react-native-vector-icons/Fontisto').default;
    default:
      if (Object.prototype.hasOwnProperty.call(customIcons, type)) {
        return customIcons[type];
      }
      return require('react-native-vector-icons/Ionicons').default;
  }
};
