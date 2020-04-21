import React from 'react'
import {
    View,
    Text,
    Image,
    TextInput,
    Dimensions,
    BackHandler,
    TouchableOpacity
} from 'react-native'
import { connect } from 'react-redux'
import { NavigationBar } from 'navigationbar-react-native'
import Icon from 'react-native-vector-icons/dist/FontAwesome'

import styles from '../style/style'
import {
    darkColor,
    primaryColor,
    secondaryColor,
    USERINFO_KEY
} from '../utils/contants'

import logo2 from '../assets/image/logo_2.png'
import StorageService from '../utils/StorageServies'

import { indicatorControll, userInfoControll } from '../actions'

class splashScreen extends React.Component {

    getStorage() {
        let that = this
        const props = that.props
        try {
            StorageService.get(USERINFO_KEY).then(obj => {
                if (obj !== null) {
                    let info = JSON.parse(obj)
                    props.userInfoControll('save', info)
                    that.props.navigation.replace('List2')
    
                } else {
                    that.props.navigation.replace('Login')

                }
            }).catch(function (error) {
                console.log(error);
            });
        } catch (error) {

        }
    }


    componentDidMount() {
        this.getStorage()
    }



    render() {
        return (
            <View style={[styles.container, styles.backgrounSecondary]}>
                <NavigationBar
                    componentLeft={this.ComponentLeft}
                    componentCenter={this.ComponentCenter}
                    componentRight={this.ComponentRight}
                    navigationBarStyle={{
                        backgroundColor: primaryColor,
                        elevation: 0,
                        shadowOpacity: 0,
                    }}
                    statusBarStyle={{
                        backgroundColor: darkColor,
                        elevation: 0,
                        shadowOpacity: 0,
                    }} />
                <View style={[styles.container, styles.center]}>
                    <Image source={logo2} style={[styles.imageLogo]} />
                    <View>
                        <Text style={{ color: primaryColor, textAlign: 'center' }}>{`Enter youre e-mail address we'll send you\na link to reset you password`}</Text>
                    </View>
                    <View style={styles.marginBetweenVertical}></View>

                    <View style={styles.marginBetweenVertical}></View>
                    <View style={styles.marginBetweenVertical}></View>

                </View>
            </View>
        )
    }
}

const mapStateToProps = (state) => ({
    reducer: state.fetchReducer
})

const mapDispatchToProps = {
    userInfoControll
}

export default connect(mapStateToProps, mapDispatchToProps)(splashScreen)