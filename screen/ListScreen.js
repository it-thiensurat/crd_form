import React from 'react'
import {
    View,
    Text,
    Image,
    FlatList,
    TextInput,
    Dimensions,
    ScrollView,
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
    BASEURL,
    GETACTIVITY
} from '../utils/contants'

import logo from '../assets/image/logo.png'

import StorageService from '../utils/StorageServies'
import Helper from '../utils/Helper'
import { indicatorControll, userInfoControll } from '../actions'


const DEVICE_WIDTH = Dimensions.get('window').width;
class ListScreen extends React.Component {


    state = {
        activity: []
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
                this.setState({ activity: results.data })
                props.indicatorControll(false)
            } else {
                props.indicatorControll(false)
                alert(`${results.message}`)
            }
        })
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
            <View>
                <TouchableOpacity style={{ padding: 8 }}
                    onPress={
                        () => this.props.navigation.push('Profile')
                        //  that.props.navigation.replace('List'), this.props.navigation.push('Profile')

                    }>
                    <Icon name="user" color={secondaryColor} size={20} />
                </TouchableOpacity>
            </View>
        );
    }

    handleBack = () => {
        // this.props.navigation.pop()
        // const props = this.props
        // if (props.reducer.userInfo != '') {
        //     return true
        // } else {
        //     return false
        // }
        return false
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBack)
    }

    componentDidMount() {
        this.onLogin()
        BackHandler.addEventListener('hardwareBackPress', this.handleBack)
    }

    renderItem = ({ item, index }) => {
        return (
            <View style={[styles.shadow, styles.backgrounSecondary, { padding: 10, width: DEVICE_WIDTH - 10, margin: 3, alignSelf: 'center', borderRadius: 6 }]}>
                <View style={[styles.container, styles.containerRow]}>
                    <View style={[styles.center, { flex: 0.2, marginRight: 5 }]}>
                        <View style={[styles.center, { width: 60, height: 60, borderRadius: 30, backgroundColor: '#D3D5D1' }]}>
                            {/* <Icon name={'user'} color={`gray`} size={40} /> */}
                            <Image
                                style={{width: 60, height: 60, borderRadius: 30}}
                                source={{uri:"http://app.thiensurat.co.th/assanee/upload/iconprofile/picture1.png"}}
                            />
                        </View>
                    </View>
                    <View style={{ flex: 0.75, justifyContent: 'center' }}>
                        <Text>{`${item.ActID}`}</Text>
                        <Text>{`${item.ActName}`}</Text>
                    </View>
                </View>
            </View>
        )
    }

    render() {

        //   const props = this.props
        //   const sample = props.reducer.sampleItem

        return (

            <View style={[styles.container, styles.backgrounSecondary]}>
                <NavigationBar
                    componentLeft={this.ComponentLeft}
                    componentCenter={this.ComponentCenter}
                    componentRight={
                        this.ComponentRight

                    }
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
                <View style={[styles.container]}>
                    <FlatList
                        initialNumToRender={10}
                        data={this.state.activity}
                        renderItem={this.renderItem} />
                </View>
            </View>
        )
    }
}

const mapStateToProps = (state) => ({
    reducer: state.fetchReducer
})

const mapDispatchToProps = {
    indicatorControll
}









export default connect(mapStateToProps, mapDispatchToProps)(ListScreen)