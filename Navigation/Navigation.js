import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from '@react-navigation/native';
import Search from "../Components/Search";
import FilmDetail from '../Components/FilmDetail';

const SearchStackNavigator = createStackNavigator({
  Search : {
    screen : Search,
    navigationOption : {
      title : "Rechercher",
    }
  },
  FilmDetail : {
    screen : FilmDetail
  },
});

export default createAppContainer(SearchStackNavigator);
