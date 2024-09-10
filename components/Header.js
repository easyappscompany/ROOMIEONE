import React from 'react';
import { withNavigation } from '@react-navigation/compat';
import { StyleSheet, Platform, Dimensions } from 'react-native';
import { Block, NavBar, theme } from 'galio-framework';
import Icon from './Icon';
import argonTheme from '../constants/Theme';

const { height } = Dimensions.get('window');
const iPhoneX = () => Platform.OS === 'ios' && (height === 812 || height === 896);

class Header extends React.Component {
  handleLeftPress = () => {
    const { back, navigation } = this.props;
    return back ? navigation.goBack() : navigation.openDrawer();
  };

  render() {
    const { back, white, transparent, bgColor, iconColor, ...props } = this.props;

    const headerStyles = [
      styles.shadow,
      transparent ? { backgroundColor: 'rgba(0,0,0,0)' } : null,
    ];

    const navbarStyles = [
      styles.navbar,
      bgColor && { backgroundColor: bgColor },
    ];

    return (
      <Block style={headerStyles}>
        <NavBar
          style={navbarStyles}
          transparent={transparent}
          left={
            <Icon
              name={back ? 'chevron-left' : 'menu'}
              family="entypo"
              size={20}
              onPress={this.handleLeftPress}
              color={iconColor || (white ? argonTheme.COLORS.WHITE : argonTheme.COLORS.ICON)}
              style={{ marginTop: 2 }}
            />
          }
          leftStyle={{ paddingVertical: 12, flex: 0.2 }}
          {...props}
        />
      </Block>
    );
  }
}

const styles = StyleSheet.create({
  navbar: {
    paddingVertical: 0,
    paddingBottom: theme.SIZES.BASE * 1.5,
    paddingTop: iPhoneX ? theme.SIZES.BASE * 4 : theme.SIZES.BASE,
    zIndex: 5,
  },
  shadow: {
    backgroundColor: theme.COLORS.WHITE,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    shadowOpacity: 0.2,
    elevation: 3,
  },
});

export default withNavigation(Header);
