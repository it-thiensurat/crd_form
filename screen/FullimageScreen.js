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
import Gallery from 'react-native-image-gallery';

import styles from '../style/style'

import {
    darkColor,
    primaryColor,
    secondaryColor,
    BASEURL,
    GetList,
    GETACTIVITY,
    Savedata
} from '../utils/contants'

class FullimageScreen extends React.Component {

   state={
        image_url:this.props.route.params.url
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
                
            </View>
        );
    }

    ComponentRight = () => {
        return (
            <View style={{ margin: 8 }}>
            </View>
        );
    }

    handleBack = () => {
        if (this.props.navigation.isFocused()) {
            this.props.navigation.pop();
            return true;
        }
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBack)
    }

    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBack)
    }

    render() {
        return (
            <View style={[styles.container]}>
                <NavigationBar
                    componentLeft={this.ComponentLeft}
                    componentCenter={this.ComponentCenter}
                    componentRight={
                        this.ComponentRight

                    }
                    navigationBarStyle={{
                        backgroundColor: 'black',
                        elevation: 0,
                        shadowOpacity: 0,
                    }}
                    statusBarStyle={{
                        backgroundColor: darkColor,
                        elevation: 0,
                        shadowOpacity: 0,
                    }} />
                <Gallery
                    style={{ flex: 1, backgroundColor: 'black' }}
                    images={[
                       { source: { uri: this.state.image_url } },
                    ]}
                />
            </View>
        )
    }
}


const mapStateToProps = (state) => ({
    reducer: state.fetchReducer
})

const mapDispatchToProps = {
}

export default connect(mapStateToProps, mapDispatchToProps)(FullimageScreen)