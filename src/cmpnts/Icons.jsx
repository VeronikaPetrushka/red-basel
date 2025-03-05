import React from 'react';
import { Image, StyleSheet } from 'react-native';

const Icons = ({ type, active }) => {

  let imageSource;
  let iconStyle = [styles.icon];

  switch (type) {
    case '1':
      imageSource = require('../ass/routes/1.png');
      active && iconStyle.push(styles.active);
      break;
    case '2':
      imageSource = require('../ass/routes/2.png');
      active && iconStyle.push(styles.active);
      break;
    case '3':
      imageSource = require('../ass/routes/3.png');
      active && iconStyle.push(styles.active);
      break;
    case '4':
      imageSource = require('../ass/routes/4.png');
      active && iconStyle.push(styles.active);
      break;
    case 'arrow':
      imageSource = require('../ass/icons/arrow.png');
      break;
  }

  return (
    <Image 
      source={imageSource} 
      style={iconStyle} 
    />
  );
};

const styles = StyleSheet.create({

  icon: {
    width: '100%',
    height: '100%',
    objectFit: 'cover'
  },

  active: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    tintColor: '#cf0000',
  },

});

export default Icons;
