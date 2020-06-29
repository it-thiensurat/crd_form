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
    GETACTIVITY,
    Savedata
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
import DateTimePickerModal from "react-native-modal-datetime-picker";


var moment = require('moment');


const DEVICE_WIDTH = Dimensions.get('window').width;
class SavedataScreen extends React.Component {

    state = {
        activity: [],
        activityId: '',
        actList: [{ ActID: -1, ActName: 'เลือก' }],
        searchTerm: '',
        selectDate:"",
        isDatePickerVisible:false,
        remark:"",

        AccNo:this.props.route.params.AccNo,
        RefNo:this.props.route.params.RefNo,
        f_id:this.props.route.params.f_id,
        assign_id:this.props.route.params.assign_id


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
        this.setState({ activityId: value ,selectDate:""})

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
                    <Icon name='chevron-left' color={secondaryColor} size={20} />
                </TouchableOpacity>
            </View>
        );
    }

    ComponentCenter = () => {
        return (
            <View style={[styles.center]}>
                <Text style={[styles.bold, { fontSize: 26, color: 'white' }]}>{'บันทึกรายการ'}</Text>
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
                    {/* <Icon name="user" color={secondaryColor} size={20} /> */}
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

        BackHandler.addEventListener('hardwareBackPress', this.handleBack)
    }

    onClickItem(img) {
        this.props.navigation.push("FullimageScreen", {
            'url': img
        })
    }

    onClickItem2() {
        // alert("bbbb")

        this.props.navigation.push("SavedataScreen", {
            // 'url': img
        })
    }



    onClick_savedata() {
     //   console.log('onpress');
     //   alert(this.state.AccNo+" "+this.state.RefNo+" "+this.state.f_id+" "+this.state.assign_id);
//this.state.activityId+" "+this.state.selectDate+" "+this.state.remark+" "+



            let that = this
            const props = that.props
            let userInfo = props.reducer.userInfo[0]
            let formData = new FormData();
            formData.append('contno', this.state.AccNo);
            formData.append('refno', this.state.RefNo);
            formData.append('fid',  this.state.f_id);
            formData.append('assignid', this.state.assign_id);

            formData.append('activity', this.state.activityId);
            formData.append('adddate:', this.state.selectDate);
            formData.append('remark', this.state.remark);
            formData.append('empid',userInfo.UsrName);

            Helper.post(BASEURL + Savedata, formData, '', (results) => {
                if (results.status == 'SUCCESS') {
           
                    alert(`${results.message}`)

                } else {
                    alert(`${results.message}`)
                }
            })



    }
    dialogdate() {
        console.log('onpress');
        alert("1")

    }





    showDatePicker = () => {
        setDatePickerVisibility(true);
    };

    handleConfirm = (date) => {
        // hideDatePicker();
        this.setState({selectDate: moment(date).format('L').split("/").reverse().join("-"),
        isDatePickerVisible:false})
    };






    render() {

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





                    {
                        this.state.activityId == '2' ?
                        <View style={[styles.inputWithIcon, styles.shadow, styles.center, { margin: 10, alignSelf: 'center' }]}>

                        <View style={[styles.containerRow]}>
                            <TouchableOpacity onPress={() => this.setState({isDatePickerVisible:true})}>

                                <Icon style={{ backgroundColor: darkColor }} name="calendar" color={secondaryColor} size={20} />

                            </TouchableOpacity>

                            <View style={{ flex: 0.75, justifyContent: 'center', paddingLeft: 20 }}>

                                <Text style={{ fontSize: 18 }}>{`${this.state.selectDate}`}</Text>

                            </View>

                        </View>

                    </View>

                            :
                            null
                    }



                    









                    <View style={{ flexDirection: 'column', flex: 0.3, marginTop: 10, padding: 10, marginBottom: 20 }}>

                        <TextInput style={{ height: 200, borderWidth: 1, borderColor: "gray", textAlignVertical: "top" }}
                        onChangeText={(SSS)=>this.setState({remark:SSS})}>


                        </TextInput>


                    </View>



                    <View style={{ flexDirection: 'column', flex: 0.3, marginTop: 30, padding: 10 }}>

                        <Button style={{ backgroundColor: darkColor }}
                            textStyle={{ fontSize: 18, color: "white" }}
                            onPress={() => this.onClick_savedata()}>
                            บันทึก
                      </Button>



                    </View>

                </View>
                {/* <Button title="Show Date Picker" onPress={showDatePicker} /> */}
                <DateTimePickerModal
                    isVisible={this.state.isDatePickerVisible}
                    mode="date"
                    onConfirm={this.handleConfirm}
                    onCancel={() => this.setState({isDatePickerVisible:false})}
                />
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

export default connect(mapStateToProps, mapDispatchToProps)(SavedataScreen)