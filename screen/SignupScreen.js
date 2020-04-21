import React from 'react'
import {
    View,
    Text,
    Image,
    TextInput,
    Dimensions,
    ScrollView,
    BackHandler,
    TouchableOpacity
} from 'react-native'
import { connect } from 'react-redux'
import { NavigationBar } from 'navigationbar-react-native'
import Icon from 'react-native-vector-icons/dist/FontAwesome'
import { RadioGroup, RadioButton } from 'react-native-flexi-radio-button'

import styles from '../style/style'
import {
    darkColor,
    primaryColor,
    secondaryColor
} from '../utils/contants'

import logo from '../assets/image/logo.png'

const DEVICE_WIDTH = Dimensions.get('window').width;
class SignupScreen extends React.Component {

    onSelectGender(index, value) {

    }

    onSubmit() {

    }

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
                <Image source={logo} style={[styles.imageToolbar]} />
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
                <ScrollView keyboardShouldPersistTaps={'never'}>
                    <View style={[styles.container]}>
                        <View style={styles.marginBetweenVertical}></View>
                        <View style={[styles.containerRow, { paddingLeft: 20 }]}>
                            <Text style={[styles.text22]}>{`Firstname`}</Text>
                            <Text style={[styles.text20, { color: 'red', textAlignVertical: 'center' }]}>{` *`}</Text>
                        </View>
                        <View style={[styles.shadow, styles.inputWithIcon, { alignSelf: 'center' }]}>
                            <TextInput
                                placeholder='Firstname'
                                ref={(input) => { this.firstname = input; }}
                                autoCapitalize={'none'}
                                returnKeyType={'next'}
                                blurOnSubmit={false}
                                onChangeText={(text) => this.setState({ firstname: text })}
                                onSubmitEditing={() => { this.lastname.focus() }}
                                style={[styles.inputContainer]} />
                        </View>
                        <View style={styles.marginBetweenVertical}></View>
                        <View style={styles.marginBetweenVertical}></View>
                        <View style={[styles.containerRow, { paddingLeft: 20 }]}>
                            <Text style={[styles.text22]}>{`Lastname`}</Text>
                            <Text style={[styles.text20, { color: 'red', textAlignVertical: 'center' }]}>{` *`}</Text>
                        </View>
                        <View style={[styles.shadow, styles.inputWithIcon, { alignSelf: 'center' }]}>
                            <TextInput
                                placeholder='Lastname'
                                ref={(input) => { this.lastname = input; }}
                                autoCapitalize={'none'}
                                returnKeyType={'next'}
                                blurOnSubmit={false}
                                onChangeText={(text) => this.setState({ Lastname: text })}
                                onSubmitEditing={() => { this.mobile.focus() }}
                                style={[styles.inputContainer]} />
                        </View>
                        <View style={styles.marginBetweenVertical}></View>
                        <View style={styles.marginBetweenVertical}></View>
                        <View style={[styles.containerRow, { paddingLeft: 20 }]}>
                            <Text style={[styles.text22]}>{`Gender`}</Text>
                            <Text style={[styles.text20, { color: 'red', textAlignVertical: 'center' }]}>{` *`}</Text>
                        </View>
                        <RadioGroup
                            size={30}
                            thickness={2}
                            color={primaryColor}
                            style={[styles.containerRow, { alignItems: 'center', justifyContent: 'space-around' }]}
                            highlightColor='transparent'
                            onSelect={(index, value) => this.onSelectGender(index, value)} >
                            <RadioButton
                                value='M'
                                color={primaryColor}  >
                                <Text style={[styles.text20]}>{`Male`}</Text>
                            </RadioButton>
                            <RadioButton
                                value='F'
                                color={primaryColor} >
                                <Text style={[styles.text20]}>{`Female`}</Text>
                            </RadioButton>
                        </RadioGroup>
                        <View style={styles.marginBetweenVertical}></View>
                        <View style={styles.marginBetweenVertical}></View>
                        <View style={[styles.containerRow, { paddingLeft: 20 }]}>
                            <Text style={[styles.text22]}>{`Mobile`}</Text>
                            <Text style={[styles.text20, { color: 'red', textAlignVertical: 'center' }]}>{` *`}</Text>
                        </View>
                        <View style={[styles.shadow, styles.inputWithIcon, { alignSelf: 'center' }]}>
                            <TextInput
                                placeholder='Mobile'
                                ref={(input) => { this.mobile = input; }}
                                autoCapitalize={'none'}
                                returnKeyType={'next'}
                                blurOnSubmit={false}
                                onChangeText={(text) => this.setState({ Mobile: text })}
                                onSubmitEditing={() => { this.email.focus() }}
                                style={[styles.inputContainer]} />
                        </View>
                        <View style={styles.marginBetweenVertical}></View>
                        <View style={styles.marginBetweenVertical}></View>
                        <View style={[styles.containerRow, { paddingLeft: 20 }]}>
                            <Text style={[styles.text22]}>{`Email`}</Text>
                            <Text style={[styles.text20, { color: 'red', textAlignVertical: 'center' }]}>{` *`}</Text>
                        </View>
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
                            <Text style={[styles.bold, styles.text26, { color: secondaryColor }]}>{`Sign up`}</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </View>
        )
    }
}

const mapStateToProps = (state) => ({
    reducer: state.fetchReducer
})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(SignupScreen)