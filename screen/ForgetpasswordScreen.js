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
    secondaryColor
} from '../utils/contants'

import logo2 from '../assets/image/logo_2.png'

class ForgetpasswordScreen extends React.Component {

    ComponentLeft = () => {
        return (
            <View>
                <TouchableOpacity style={{ padding: 8 }}
                    onPress={
                        () => this.handleBack()
                    }>
                    <Icon name='chevron-left' color={secondaryColor} size={20} />
                </TouchableOpacity>
            </View>
        );
    }

    ComponentCenter = () => {
        return (
            <View style={[styles.center]}>
                <Text style={[{ color: secondaryColor, fontSize: 26 }]}>{`Forget password`}</Text>
            </View>
        );
    }

    ComponentRight = () => {
        return (
            <View style={{ margin: 8 }}>
                <TouchableOpacity style={{ padding: 8 }}
                    onPress={
                        () => null
                    }>
                </TouchableOpacity>
            </View>
        );
    }

    handleBack = () => {
        this.props.navigation.pop()
        return true
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBack)
    }

    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBack)
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
                    <View style={[styles.shadow, styles.inputWithIcon, { alignSelf: 'center' }]}>
                        <TextInput
                            placeholder='Email'
                            ref={(input) => { this.email = input; }}
                            keyboardType='email-address'
                            autoCapitalize={'none'}
                            returnKeyType={'done'}
                            blurOnSubmit={false}
                            onChangeText={(text) => this.setState({ Email: text })}
                            onSubmitEditing={() => { null }}
                            style={[styles.inputContainer]} />
                    </View>
                    <View style={styles.marginBetweenVertical}></View>
                    <View style={styles.marginBetweenVertical}></View>
                    <TouchableOpacity style={[styles.mainButton, styles.center, { alignSelf: 'center' }]}
                        onPress={
                            () => this.onSubmit()
                        }>
                        <Text style={[styles.bold, styles.text26, { color: secondaryColor }]}>{`Send e-mail`}</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

const mapStateToProps = (state) => ({
    reducer: state.fetchReducer
})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(ForgetpasswordScreen)