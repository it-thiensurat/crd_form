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
    TouchableOpacity,
    StyleSheet
} from 'react-native'
import { connect } from 'react-redux'
import { NavigationBar } from 'navigationbar-react-native'
import Icon from 'react-native-vector-icons/dist/FontAwesome'
import { Card } from 'react-native-elements'
import styles from '../style/style'
import {
    darkColor,
    primaryColor,
    secondaryColor,
    BASEURL,
    GetList
} from '../utils/contants'

import logo from '../assets/image/logo.png'

import StorageService from '../utils/StorageServies'
import Helper from '../utils/Helper'
import { indicatorControll, userInfoControll } from '../actions'
import Button from 'apsl-react-native-button'


const DEVICE_WIDTH = Dimensions.get('window').width;
class ListScreen2 extends React.Component {





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


        formData.append('empid', 'A03715');
        formData.append('ref', '');
        formData.append('activity', '');


        props.indicatorControll(true)
        Helper.post(BASEURL + GetList, formData, header, (results) => {

            if (results.status == 'SUCCESS') {
                //  console.log(results.data)
                //  alert(`${results.data}`)

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


    onClick_image() {
        console.log('onpress');
        alert ("1")

    }
    onClick_Performance() {
        console.log('onpress');
        alert ("2")

    }

    onClickItem() {
        alert ("aaaa")
     //   console.log('onpress');
    }


    renderItem = ({ item, index }) => {
        return (


            <TouchableOpacity setOpacityTo={0} onPress={() => this.onClickItem(item)}>
                <Card containerStyle={{ overflow: 'hidden', flexDirection: 'column', marginBottom: 0, borderRadius: 6, padding: 6 }}>


                <View style={{ flexDirection: 'row', marginBottom: 16, height: 45, alignItems: 'center' }}>
                     
                       <View style={{ flexDirection: 'column',flex:1.2 ,marginTop:60}}>
                       <Text style={{ fontSize: 18 }}>{`${"สัญญา : " + item.AccNo + " อ้างอิง : " + item.RefNo}`}</Text>
                       <View style={styles.marginBetweenVertical}></View>

                            <Text style={{ fontSize: 18 }}>{`${"ลูกค้า : "+item.CustName}`}</Text>
                            <View style={styles.marginBetweenVertical}></View>

                            <Text style={{ fontSize: 18 }}>{`${"เลขเครื่อง : " + item.serialno}`}</Text>
                            <View style={styles.marginBetweenVertical}></View>

                            <Text style={{ fontSize: 18 }}>{`${"วันที่ติดตั้ง : " + item.setupdate}`}</Text>

                        </View>
                        <View style={{ flexDirection: 'column',flex:0.3,marginTop:60 }}>

                                  <Button style={{ backgroundColor: 'blue' }}
                                        textStyle={{ fontSize: 18,color:"white"  }}
                                        onPress={() => this.onClick_image()}>
                                        รูปรายละเอียด
                                  </Button>

                                    <Button style={{ backgroundColor: 'green' }}
                                         textStyle={{ fontSize: 18,color:"white" }}
                                         onPress={() => this.onClick_Performance()}>
                                        ผลดำเนินการ
                                </Button>

                        </View>
                    </View>




                  



                    <View style={{ padding: 10, flexDirection: "row" ,marginTop:40}}>
                        <Text
                            style={{ flex: 1/*, borderWidth: 1*/, fontSize: 18 }}>{item.Area /* 492, 494 ซอยรัชดาภิเษก 26 ถนนรัชดาภิเษก แขวงสามเสนนอก เขตห้วยขวาง กรุงเทพมหานคร 10310"*/}

                        </Text>
                    </View>

                </Card>
            </TouchableOpacity>










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









export default connect(mapStateToProps, mapDispatchToProps)(ListScreen2)