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
    StyleSheet,
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
    GetList,
    GETACTIVITY
} from '../utils/contants'

import logo from '../assets/image/logo.png'

import StorageService from '../utils/StorageServies'
import Helper from '../utils/Helper'
import { indicatorControll, userInfoControll } from '../actions'
import Button from 'apsl-react-native-button'

import Gallery from 'react-native-image-gallery';
//import { SearchBar } from 'react-native-elements';
//import SearchInput, { createFilter } from 'react-native-search-filter';

import SearchInput, { createFilter } from 'react-native-search-filter';

//import SearchBar from "react-native-dynamic-search-bar";
import { Picker } from "native-base"




const DEVICE_WIDTH = Dimensions.get('window').width;
class ListScreen3 extends React.Component {

    state = {
        activity: [],
        activityId: '',
        actList: [{ ActID: -1, ActName: 'เลือก' }],
        searchTerm: ''

    }

    getList(activityId) {
        let that = this
        const props = that.props
        let userInfo = props.reducer.userInfo[0]
        let formData = new FormData();
        formData.append('empid', userInfo.UsrName);
        formData.append('ref', '');
        formData.append('activity', activityId);
        props.indicatorControll(true)
        Helper.post(BASEURL + GetList, formData, '', (results) => {
            if (results.status == 'SUCCESS') {
                that.setState({ activity: results.data })
                props.indicatorControll(false)
            } else {
                props.indicatorControll(false)
                that.setState({ activity: [] })
                // alert(`${results.message}`)
            }
        })
    }

    getList2(activity_AccNo) {
        let that = this
        const props = that.props
        let userInfo = props.reducer.userInfo[0]
        let formData = new FormData();
        formData.append('empid', userInfo.UsrName);
        formData.append('ref', activity_AccNo);
        formData.append('activity', '');
        props.indicatorControll(true)
        Helper.post(BASEURL + GetList, formData, '', (results) => {
            if (results.status == 'SUCCESS') {
                that.setState({ activity: results.data })
                props.indicatorControll(false)
            } else {
                props.indicatorControll(false)
                that.setState({ activity: [] })
                // alert(`${results.message}`)
            }
        })
    }

    dropdown() {
        let that = this
        const props = that.props
        let userInfo = props.reducer.userInfo[0]
        let formData = new FormData();
        formData.append('empid', userInfo.UsrName);
        Helper.post(BASEURL + GETACTIVITY, formData, '', (results) => {
            if (results.status == 'SUCCESS') {
                let acc = that.state.actList.concat(results.data)
                that.setState({ actList: acc })
            } else {
                alert(`${results.message}`)
            }
        })
    }

    async onSelectDropdown(value) {
        this.setState({ activityId: value })
        if (value != -1) {
            this.getList(value)
        }
    }


    searchUpdated(term) {
        this.setState({ searchTerm: term })
    }



    ComponentLeft = () => {
        return (
            <View>
                <TouchableOpacity style={{ padding: 8 }}
                    onPress={
                        () => this.handleBack()
                    }>
                    {/* <Icon name='chevron-left' color={secondaryColor} size={20} /> */}
                </TouchableOpacity>
            </View>
        );
    }

    ComponentCenter = () => {
        return (
            <View style={[styles.center]}>
                <Text style={[styles.bold, { fontSize: 26, color: 'white' }]}>{'รายการ'}</Text>
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
                    {<Icon name="user" color={secondaryColor} size={20} /> }
                </TouchableOpacity>
            </View>
        );
    }

    handleBack = () => {
        return false
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBack)
    }

    async componentDidMount() {
        await this.dropdown()
        await this.getList('')
        BackHandler.addEventListener('hardwareBackPress', this.handleBack)
    }

    onClickItem(img) {
        this.props.navigation.push("FullimageScreen", {  // navigate 
            'url': img
        })
    }

    onClickItem2(AccNo, RefNo, f_id, assign_id) {
        // alert("bbbb")

        this.props.navigation.push("SavedataScreen", { // navigate 
            'AccNo': AccNo,
            'RefNo': RefNo,
            'f_id': f_id,
            'assign_id': assign_id


        })
    }



    renderItem = ({ item, index }) => {
        return (
            <View key={index} style={[styles.shadow, styles.backgrounSecondary, { padding: 10, width: DEVICE_WIDTH - 10, margin: 3, alignSelf: 'center', borderRadius: 6 }]}>
                <View style={[styles.container, styles.containerRow]}>
                    <TouchableOpacity onPress={() => this.onClickItem(item.map_img)}>
                        <Image
                            style={{ width: 100, height: 100 }}
                            resizeMode="contain"
                            source={{ uri: item.map_img }}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity setOpacityTo={0} onPress={() => this.onClickItem2(item.AccNo, item.RefNo, item.f_id, item.assign_id)}>
                        <View style={{ flex: 0.75, justifyContent: 'center' }}>
                            <Text style={{ fontSize: 18 }}>{`${"สัญญา : " + item.AccNo + " อ้างอิง : " + item.RefNo}`}</Text>
                            <View style={styles.marginBetweenVertical}></View>
                            <Text style={{ fontSize: 18 }}>{`${"ลูกค้า : " + item.CustName}`}</Text>
                            <View style={styles.marginBetweenVertical}></View>
                            <Text style={{ fontSize: 18 }}>{`${"เลขเครื่อง : " + item.serialno}`}</Text>
                            <View style={styles.marginBetweenVertical}></View>
                            <Text style={{ fontSize: 18 }}>{`${"วันที่ติดตั้ง : " + item.setupdate}`}</Text>
                            <Text style={{ flex: 1, fontSize: 18 }}>{item.Area.replace('\r\n', ' ')
                            }</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }

    render() {
        //const { search } = this.state;

        const filtered = this.state.activity.filter(createFilter(this.state.searchTerm, ['AccNo', 'RefNo']))

        //  let { sContainer, sSearchBar, sTextItem } = styles;


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
                    <View style={[styles.inputWithIcon, styles.shadow, styles.center, { margin: 10, alignSelf: 'center' }]}>
                        <Picker
                            mode="dropdown"
                            placeholder="เลือกคำนำหน้า"
                            textStyle={{ fontSize: 18 }}
                            itemStyle={{ marginLeft: 0, paddingLeft: 10 }}
                            itemTextStyle={{ color: 'gray', fontSize: 18 }}
                            style={[{ color: 'gray', width: '100%' }]}
                            selectedValue={this.state.activityId}
                            onValueChange={(value) => this.onSelectDropdown(value)} >
                            {
                                this.state.actList.map((value, index) => {
                                    return (<Picker.Item key={index} label={value.ActName} value={value.ActID} />);
                                })
                            }
                        </Picker>
                    </View>



                    <View style={[styles.inputWithIcon, styles.shadow, styles.center, { margin: 10, alignSelf: 'center' }]}>

                        <SearchInput
                            onChangeText={(term) => { this.searchUpdated(term) }}
                            style={styles.searchInput}
                            placeholder="ค้นหา"
                        />
                    </View>




                    {
                        this.state.activity != '' ?
                            <FlatList
                                initialNumToRender={10}
                                data={filtered}
                                renderItem={this.renderItem} />
                            :
                            <View style={[styles.container, styles.center]}>
                                <Text style={[styles.bold, { fontSize: 24 }]}>{'ไม่มีข้อมูล'}</Text>
                            </View>
                    }
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

export default connect(mapStateToProps, mapDispatchToProps)(ListScreen3)