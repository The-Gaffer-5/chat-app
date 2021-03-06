import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import Start from './components/Start';
import Chat from './components/Chat';

const navigator = createStackNavigator({
  Start: { screen: Start },
  Chat: { screen: Chat },
});

const navigatorContainer = createAppContainer(navigator);


export default navigatorContainer;
