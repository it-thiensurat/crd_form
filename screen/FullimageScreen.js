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

class FullimageScreen extends React.Component {

   state={
        image_url:this.props.route.params.url
    }

    render() {
        return (
            <View style={[styles.container]}>
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