import React, { Component } from './node_modules/react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import PropTypes from './node_modules/prop-types';
import { ParallaxImage } from './node_modules/react-native-snap-carousel';
// import styles from 'example/src/styles/SliderEntry.style';
// import styles from 'example/src/styles/SliderEntry.style';
import styles from '../styles/SliderEntry.style';

export default class SliderEntry2 extends Component {

    static propTypes = {
        data: PropTypes.object.isRequired,
        even: PropTypes.bool,
        parallax: PropTypes.bool,
        parallaxProps: PropTypes.object
    };

    // get image () {
    //     const { data: { illustration }, parallax, parallaxProps, even } = this.props;

    //     return parallax ? (
    //         <ParallaxImage
    //           source={{ uri: illustration }}
    //           containerStyle={[styles.imageContainer, even ? styles.imageContainerEven : {}]}
    //           style={styles.image}
    //           parallaxFactor={0.35}
    //           showSpinner={true}
    //           spinnerColor={even ? 'rgba(255, 255, 255, 0.4)' : 'rgba(0, 0, 0, 0.25)'}
    //           {...parallaxProps}
    //         />
    //     ) : (
    //         <Image
    //           source={{ uri: illustration }}
    //           style={styles.image}
    //         />
    //     );
    // }

    render () {
        const { data: { title, subtitle }, even } = this.props;

        const uppercaseTitle = title ? (
            <Text
              style={[styles.title, even ? styles.titleEven : {}]}
              numberOfLines={2}
            >
                { title.toUpperCase() }
            </Text>
        ) : false;

        return (
            <TouchableOpacity
              activeOpacity={1}
              style={styles.slideInnerContainer}
              onPress={() => { alert(`You've clicked '${title}'`); }}
              >
                {/* <View style={styles.shadow} /> */}
                <View style={[styles.imageContainer, even ? styles.imageContainerEven : {}]}>
                    {/* { this.image } */}
                    <View style={[styles.radiusMask, even ? styles.radiusMaskEven : {}]} />
                </View>
                <View style={[styles.textContainer, even ? styles.textContainerEven : {}]}>
                    { uppercaseTitle }
                    <Text
                      style={[styles.subtitle, even ? styles.subtitleEven : {}]}
                      numberOfLines={2}
                    >
                        { subtitle }
                    </Text>
                </View>
            </TouchableOpacity>
        );
    }
}