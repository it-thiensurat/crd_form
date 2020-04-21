import React from 'react'
import {
    View,
    Text,
    Image,
    TextInput,
    Dimensions,
    TouchableOpacity,
    BackHandler
} from 'react-native'
import { connect } from 'react-redux'
import { NavigationBar } from 'navigationbar-react-native'
import Icon from 'react-native-vector-icons/dist/FontAwesome'

import styles from '../style/style'
import {
    darkColor,
    primaryColor,
    secondaryColor,
    BASEURL,
    LOGINURL,
    USERINFO_KEY,
    GETACTIVITY
} from '../utils/contants'

import logo from '../assets/image/logo.png'
import { indicatorControll, userInfoControll } from '../actions'
import Helper from '../utils/Helper'
import StorageService from '../utils/StorageServies'
import RNExitApp from 'react-native-exit-app';

const DEVICE_WIDTH = Dimensions.get('window').width;
class ListScreen_json extends React.Component {

    state = {
        activity:[]
    }


    onLogin() {

        let that = this
        const props = that.props
        let header = {
            // 'Authorization': '',
            //'x-api-key': API_KEY
        }

        let formData = new FormData();


        formData.append('empid', props.reducer.userInfo.UsrName);


        props.indicatorControll(true)
        Helper.post(BASEURL + GETACTIVITY, formData, header, (results) => {

            if (results.status == 'SUCCESS') {
                console.log(results.data)
                this.setState({activity:results.data})
                props.indicatorControll(false)
            } else {
                props.indicatorControll(false)
                alert(`${results.message}`)
            }
        })
    }




    getStorage() {
    
    }


    handleBack = () => {
        //   this.props.navigation.pop()

        // let that = this
        // const props = that.props
        // try {
        //     StorageService.get(USERINFO_KEY).then(obj => {
        //         if (obj !== null) {
        //           //  let info = JSON.parse(obj)
        //           //  props.userInfoControll('save', info)
        //           //  that.props.navigation.replace('List')
        //          // return false
        //          console.log('ok555');
        //         } else {
        //           //  that.props.navigation.replace('Login')
        //          // RNExitApp.exitApp();
        //          console.log("error555");
        //         }
        //     }).catch(function (error) {
        //         console.log(error);
        //     });
        // } catch (error) {

        // }

        RNExitApp.exitApp();
     //  return false
    }
    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBack)
    }

    componentDidMount() {

        this.onLogin() 
        BackHandler.addEventListener('hardwareBackPress', this.handleBack)
    }

    forgetPassword() {
        this.props.navigation.push('Forget')
    }

    signup() {
        this.props.navigation.push('Signup')
    }


    render() {
        return (
            <View style={[styles.container, styles.backgroundPrimary, styles.center]}>
                <NavigationBar
                    componentLeft={() => { <View></View> }}
                    componentCenter={() => { <View></View> }}
                    componentRight={() => { <View></View> }}
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
                <Image source={logo} style={[styles.imageLogo]} />
                <View style={[styles.shadow, styles.inputWithIcon]}>
                    <Icon name="user" color={primaryColor} size={26} />
                    <TextInput style={[styles.inputContainer]}
                        ref={(input) => { this.username = input; }}
                        placeholder='Username'
                        keyboardType='email-address'
                        returnKeyType='next'
                        autoCapitalize='none'
                        value={this.state.username}
                        onChangeText={(text) => this.setState({ username: text })}
                        onSubmitEditing={() => this.password.focus()} />
                </View>
                <View style={styles.marginBetweenVertical}></View>
                <View style={[styles.shadow, styles.inputWithIcon]}>
                    <Icon name="lock" color={primaryColor} size={26} />
                    <TextInput style={[styles.inputContainer]}
                        ref={(input) => { this.password = input; }}
                        placeholder='Password'
                        returnKeyType='done'
                        autoCapitalize='none'
                        secureTextEntry={true}
                        value={this.state.password}
                        onChangeText={(text) => this.setState({ password: text })}
                        onSubmitEditing={() => this.onLogin()} />
                </View>
                <View style={styles.marginBetweenVertical}></View>
                <View style={styles.marginBetweenVertical}></View>
                <TouchableOpacity style={[styles.mainButton, styles.center]}
                    onPress={
                        () => this.onLogin()
                    }>
                    <Text style={[styles.bold, styles.text26, { color: secondaryColor }]}>{`Sign in`}</Text>
                </TouchableOpacity>
                <View style={styles.marginBetweenVertical}></View>
                <View style={[styles.containerRow, { width: DEVICE_WIDTH - 40, justifyContent: 'space-between' }]}>
                    <TouchableOpacity style={{ alignSelf: 'flex-start', padding: 4 }}
                        onPress={
                            () => this.signup()
                        }>
                        <Text style={[styles.text20, { color: secondaryColor }]}>{`Sign up`}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{ alignSelf: 'flex-end', padding: 4 }}
                        onPress={
                            () => this.forgetPassword()
                        }>
                        <Text style={[styles.text20, { color: secondaryColor }]}>{`forget password ?`}</Text>
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
    indicatorControll, userInfoControll
}

export default connect(mapStateToProps, mapDispatchToProps)(ListScreen_json)