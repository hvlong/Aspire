import React, { useState } from 'react'
import { View, Text,Image,TouchableOpacity,Alert } from 'react-native'
import * as Images from '../constants';

export default function BottomTabs() {
    const[activeTab,setActiveTab] = useState('Debit');
    return (
        <View style={{height:'8%',flexDirection: 'row', justifyContent: 'space-evenly', backgroundColor: 'white' }}>
          <TouchableOpacity onPress={()=>{Alert.alert('Coming Soon')
                            setActiveTab('Home')}} 
                            style={{ justifyContent: 'center',alignItems:'center' }}>
            <Image source={Images.LOGO} style={{ tintColor: activeTab ==='Home' ?'#01D167' :'gray'  , height: 20, width: 20 }} />
            <Text style={{fontSize:10,color:activeTab ==='Home' ?'#01D167' :'gray'  }}>Home</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={()=>setActiveTab('Debit')} style={{ justifyContent: 'center',alignItems:'center' }}>
            <Image source={Images.CARD} style={{ tintColor: activeTab ==='Debit' ?'#01D167' :'gray'  , height: 20, width: 20 }} />
            <Text style={{fontSize:10,color:activeTab ==='Debit' ?'#01D167' :'gray'}}>Debit Card</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={()=>{Alert.alert('Coming Soon')
                            setActiveTab('Payments')}} style={{ justifyContent: 'center',alignItems:'center' }}>
            <Image source={Images.PAYMENTS} style={{ tintColor: 'gray', height: 20, width: 20 }} />
            <Text style={{fontSize:10,color:'gray',color:activeTab ==='Payments' ?'#01D167' :'gray'}}>Payments</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={()=>{Alert.alert('Coming Soon')
                                    setActiveTab('Credit')}} 
                            style={{ justifyContent: 'center',alignItems:'center' }}>
            <Image source={Images.CREDIT} style={{ tintColor: 'gray', height: 20, width: 20 }} />
            <Text style={{fontSize:10,color:'gray',color:activeTab ==='Credit' ?'#01D167' :'gray'}}>Credit</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={()=>{Alert.alert('Coming Soon')
                            setActiveTab('Profile')}} style={{ justifyContent: 'center',alignItems:'center' }}>
            <Image source={Images.ACCOUNT} style={{ tintColor: 'gray', height: 20, width: 20 }} />
            <Text style={{fontSize:10,color:'gray',color:activeTab ==='Profile' ?'#01D167' :'gray'}}>Profile</Text>
          </TouchableOpacity>

        </View>
    )
}
