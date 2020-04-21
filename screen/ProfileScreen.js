import React from 'react'
import {
    View,
    Text,
    Image,
    TextInput,
    ScrollView,
    Dimensions,
    BackHandler,
    TouchableOpacity
} from 'react-native'
import { connect } from 'react-redux'
import ImagePicker from 'react-native-image-crop-picker'
import { NavigationBar } from 'navigationbar-react-native'
import Icon from 'react-native-vector-icons/dist/FontAwesome'

import StorageService from '../utils/StorageServies'
import {userInfoControll}from '../actions'

import styles from '../style/style'
import {
    darkColor,
    primaryColor,
    secondaryColor
} from '../utils/contants'

class ProfileScreen extends React.Component {

    state = {
        ImageSorce: '',
        ImageBase64: ''
    }

    selectProfile() {
        ImagePicker.openPicker({
            multiple: false,
            includeBase64: true
        }).then(images => {
            console.log(images);
            this.setState({
                ImageSorce: images.path,
                ImageBase64: images.data
            });
        });
    }

    openCamera() {
        ImagePicker.openCamera({
            width: 800,
            height: 600,
            cropping: false,
        }).then(image => {
            this.setState({
                ImageSorce: image.path,
                ImageBase64: image.data
            });
        });
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
                <Text style={[styles.bold, styles.text26, { color: secondaryColor }]}>{`Profile`}</Text>
            </View>
        );
    }

    ComponentRight = () => {
        return (
            <View style={{ margin: 8 }}>
                <TouchableOpacity style={{ padding: 8 }}
                    onPress={
                        () => {

                            let that = this
                            const props = that.props

                            StorageService.clear()
                            props.userInfoControll('clear', "")
                            props.navigation.replace('Login')


                        }
                    }>
                    <Icon name='power-off' color={secondaryColor} size={20} />

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
        const props = this.props.reducer

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
                <View style={[styles.container]}>
                    <View style={[styles.backgroundPrimary, styles.center, { height: 220 }]}>
                        <View style={[styles.imageProfile, styles.center, styles.backgrounSecondary]}>
                            {
                                this.state.ImageSorce != '' ?
                                    <Image source={{ uri: this.state.ImageSorce }} style={{ width: 140, height: 140, borderRadius: 80 }} />
                                    :
                                    <Icon name="user" color='gray' size={100} />
                            }
                        </View>
                        <View style={styles.marginBetweenVertical}></View>
                        <View style={[styles.container, styles.containerRow]}>
                            <View style={[{ flex: 0.5, alignItems: 'flex-end', paddingRight: 20 }]}>
                                <TouchableOpacity style={[styles.center, { width: 40, height: 40, borderRadius: 25, backgroundColor: '#D3D5D1' }]}
                                    onPress={
                                        () => this.openCamera()
                                    }>
                                    <Icon name="camera" color='gray' size={25} />
                                </TouchableOpacity>
                            </View>
                            <View style={[{ flex: 0.5, paddingLeft: 20 }]}>
                                <TouchableOpacity style={[styles.center, { width: 40, height: 40, borderRadius: 25, backgroundColor: '#D3D5D1' }]}
                                    onPress={
                                        () => this.selectProfile()
                                    }>
                                    <Icon name="image" color='gray' size={25} />
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                    <ScrollView style={[styles.container]}>
                        <View style={{ padding: 10 }}>
                            <View style={{ padding: 4, borderBottomWidth: 0.5, borderBottomColor: '#D3D5D1' }}>
                                <Text style={[styles.bold, styles.text26, { color: 'gray' }]}>{`Fullname`}</Text>
                                <Text style={[styles.text26, { color: 'gray', textAlignVertical: 'bottom' }]}>{`${props.userInfo.FullName}`}</Text>
                            </View>
                            <View style={{ padding: 4, borderBottomWidth: 0.5, borderBottomColor: '#D3D5D1' }}>
                                <Text style={[styles.bold, styles.text26, { color: 'gray' }]}>{`Email`}</Text>
                                <Text style={[styles.text26, { color: 'gray', textAlignVertical: 'bottom' }]}>{`proxima@appdividend.com`}</Text>
                            </View>
                            <View style={{ padding: 4, borderBottomWidth: 0.5, borderBottomColor: '#D3D5D1' }}>
                                <Text style={[styles.bold, styles.text26, { color: 'gray' }]}>{`Mobile`}</Text>
                                <Text style={[styles.text26, { color: 'gray', textAlignVertical: 'bottom' }]}>{`+66 098 002 0000`}</Text>
                            </View>




                        </View>
                    </ScrollView>
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

export default connect(mapStateToProps, mapDispatchToProps)(ProfileScreen)