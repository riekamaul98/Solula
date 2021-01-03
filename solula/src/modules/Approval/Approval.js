import React, { Component } from 'react';
import { Dimensions, StyleSheet, Platform, View, ScrollView, Text, StatusBar, SafeAreaView, TouchableOpacity, Image } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const IS_IOS = Platform.OS === 'ios';
const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');

function wp (percentage) {
    const value = (percentage * viewportWidth) / 100;
    return Math.round(value);
}

const slideHeight = viewportHeight * 0.45;
const slideWidth = wp(75);
const itemHorizontalMargin = wp(2);

const sliderWidth = viewportWidth;
const itemWidth = slideWidth + itemHorizontalMargin * 2;

const entryBorderRadius = 20;

const dataResend = [
  {
    id : '1',
    name : 'Ghozi Alwan',
    job : 'Programmer'
  },
  {
    id : '2',
    name : 'Ghozi Alwan',
    job : 'Programmer'
  },
  {
    id : '3',
    name : 'Ghozi Alwan',
    job : 'Programmer'
  },
  {
    id : '4',
    name : 'Ghozi Alwan',
    job : 'Programmer'
  }
]

const IS_ANDROID = Platform.OS === 'android';
const SLIDER_1_FIRST_ITEM = 1;

export default class Approval extends Component {

    constructor (props) {
        super(props);
        this.state = {
            slider1ActiveSlide: SLIDER_1_FIRST_ITEM,
            slider1ActiveSlide2: SLIDER_1_FIRST_ITEM
        };
    }

    _renderItemApproval ({item, index}, parallaxProps) {
        return (
          <View
            activeOpacity={1}
            style={[styles.slideInnerContainer]}
          >
            {/* <View style={styles.shadow} /> */}
            <View style={[styles.imageContainer]}>

            </View>

            <View style={[styles.textContainer]}>
                <Text
                  style={[styles.subtitle]}
                  numberOfLines={2}
                >
                </Text>
            </View>
            
        </View>
        );
    }

    approvalCard (number, title) {
        const { slider1ActiveSlide2 } = this.state;

        return (
            <View style={styles.exampleContainer}>
                {/* <Text style={styles.title}>{`Example ${number}`}</Text>
                <Text style={styles.subtitle}>{title}</Text> */}
                <Carousel
                  ref={c => this._slider1Ref = c}
                  data={dataResend}
                  renderItem={this._renderItemApproval}
                  sliderWidth={sliderWidth}
                  itemWidth={itemWidth}
                  hasParallaxImages={false}
                  firstItem={SLIDER_1_FIRST_ITEM}
                  inactiveSlideScale={0.94}
                  inactiveSlideOpacity={1}
                  // inactiveSlideShift={20}
                  containerCustomStyle={styles.slider}
                  contentContainerCustomStyle={styles.sliderContentContainer}
                  loop={false}
                  loopClonesPerSide={2}
                  autoplay={false}
                  // autoplayDelay={500}
                  // autoplayInterval={3000}
                  onSnapToItem={(index) => this.setState({ slider1ActiveSlide2: index }) }
                />
            </View>
        );
    }

    

    get gradient () {
      return (
        <LinearGradient
          colors={[colors.background1, colors.background2]}
          startPoint={{ x: 1, y: 0 }}
          endPoint={{ x: 0, y: 1 }}
          style={styles.gradient}
        />
      );
    }

    render () {

        const approvalCardRender = this.approvalCard(1);


      return (
        <SafeAreaView style={styles.safeArea}>
          <View style={styles.container}>
            {/* { this.gradient } */}
            <ScrollView
              style={styles.scrollview}
              scrollEventThrottle={200}
              directionalLockEnabled={true}
            >
              { approvalCardRender }
            </ScrollView>
          </View>
        </SafeAreaView>
      );
    }
}


Approval.navigationOptions = ({navigation}) => ({
  title : 'Approval',
  headerBackTitle: null,
  header : (props) => {
    return(
      <View style={{height:50, flexDirection:'row'}} >
      <View style={{justifyContent:'center'}}>
        <TouchableOpacity style={{justifyContent:'center'}} onPress={() => navigation.goBack()}>
          <View style={{justifyContent:'center', marginLeft:10}}>
            <MaterialIcons 
              style={{backgroundColor : 'transparent'}} 
              name={"close"}
              color={"#898A8F"}
              size={25}
            />
          </View>
        </TouchableOpacity>
      </View>
      
      <View style={{justifyContent:'center', marginLeft:10}}>
        <Text style={{color:'#2180D9', fontSize:18, fontWeight:'bold'}}>{props.scene.descriptor.options.title}</Text>
      </View>
    </View>
    )
  }
})



const colors = {
  black: '#1a1917',
  gray: '#888888',
  background1: '#B721FF',
  background2: '#21D4FD'
};

const styles = StyleSheet.create({
  safeArea: {
      flex: 1,
      backgroundColor: colors.black
  },
  container: {
      flex: 1,
      // backgroundColor: colors.background1
      backgroundColor: '#fff'
  },
  gradient: {
      ...StyleSheet.absoluteFillObject
  },
  scrollview: {
      flex: 1
  },
  exampleContainer: {
      paddingVertical: 30
  },
  exampleContainerDark: {
      backgroundColor: colors.black
  },
  exampleContainerLight: {
      backgroundColor: 'white'
  },
  title: {
      paddingHorizontal: 30,
      backgroundColor: 'transparent',
      color: 'rgba(255, 255, 255, 0.9)',
      fontSize: 20,
      fontWeight: 'bold',
      textAlign: 'center'
  },
  titleDark: {
      color: colors.black
  },
  subtitle: {
      marginTop: 5,
      paddingHorizontal: 30,
      backgroundColor: 'transparent',
      color: 'rgba(255, 255, 255, 0.75)',
      fontSize: 13,
      fontStyle: 'italic',
      textAlign: 'center'
  },
  slider: {
      marginTop: 15,
      overflow: 'visible' // for custom animations
  },
  sliderContentContainer: {
      paddingVertical: 10 // for custom animation
  },
  paginationContainer: {
      paddingVertical: 8
  },
  paginationDot: {
      width: 8,
      height: 8,
      borderRadius: 4,
      marginHorizontal: 8
  },
  slideInnerContainer: {
		width: itemWidth,
		height: slideHeight,
		paddingHorizontal: itemHorizontalMargin,
		paddingBottom: 18 // needed for shadow
	},
	shadow: {
		position: 'absolute',
		top: 0,
		left: itemHorizontalMargin,
		right: itemHorizontalMargin,
		bottom: 18,
		shadowColor: colors.black,
		shadowOpacity: 0.25,
		shadowOffset: { width: 0, height: 10 },
		shadowRadius: 10,
		borderRadius: entryBorderRadius
	},
	imageContainer: {
		flex: 1,
		marginBottom: IS_IOS ? 0 : -1, // Prevent a random Android rendering issue
		// backgroundColor: 'white',
		backgroundColor: '#2180D9',
		borderTopLeftRadius: entryBorderRadius,
		borderTopRightRadius: entryBorderRadius
	},
	imageContainerEven: {
		// backgroundColor: colors.black
	},
	image: {
		...StyleSheet.absoluteFillObject,
		resizeMode: 'cover',
		borderRadius: IS_IOS ? entryBorderRadius : 0,
		borderTopLeftRadius: entryBorderRadius,
		borderTopRightRadius: entryBorderRadius
	},
	// image's border radius is buggy on iOS; let's hack it!
	radiusMask: {
		position: 'absolute',
		bottom: 0,
		left: 0,
		right: 0,
		height: entryBorderRadius,
		backgroundColor: 'white'
	},
	radiusMaskEven: {
		// backgroundColor: colors.black
	},
	textContainer: {
		justifyContent: 'center',
		paddingTop: 20 - entryBorderRadius,
		paddingBottom: 20,
		paddingHorizontal: 16,
		// backgroundColor: 'white',
		backgroundColor: '#2180D9',
		borderBottomLeftRadius: entryBorderRadius,
		borderBottomRightRadius: entryBorderRadius
	},
	textContainerEven: {
		// backgroundColor: colors.black
	},
	title: {
		color: colors.black,
		fontSize: 13,
		fontWeight: 'bold',
		letterSpacing: 0.5
	},
	titleEven: {
		color: 'white'
	},
	subtitle: {
		marginTop: 6,
		color: colors.gray,
		fontSize: 12,
		fontStyle: 'italic'
	},
	subtitleEven: {
		color: 'rgba(255, 255, 255, 0.7)'
	}
});