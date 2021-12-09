import React,{useState} from 'react'
import { View, Text, StyleSheet, Platform, Image, SafeAreaView,Dimensions } from 'react-native'
import Constants from 'expo-constants';
import { LIMIT } from '../constants';
import { TouchableOpacity } from 'react-native-gesture-handler';
const statusBarHeight = Constants.statusBarHeight

export default function WeeklyLimit() {
    const [currency,setCurrency] = useState('')
    return (
        <View style={styles.container}>

            <SafeAreaView style={styles.header}>
                <Text style={{ margin: 20, fontSize: 20, fontWeight: 'bold', color: "#FFFFFF" }}> Spending Limit</Text>
            </SafeAreaView>

            <View style={styles.panel}>
                <View style={{ margin: 20 }}>

                    <View style={{ flexDirection: 'row' }}>
                        <Image source={LIMIT} style={{ height: 15, width: 15 }} />
                        <Text style={{ left: 10 }}>Set a weekly debit card spending limit</Text>
                    </View>

                    <View style={{ borderBottomWidth: 0.3, borderBottomColor:'gray',marginVertical: 10 }}>

                        <View style={styles.currencyContainer}>

                            <View style={styles.currencySymbol}>
                                <Text style={{ color: 'white', fontSize: 14,fontWeight:'bold' }}>S$</Text>
                            </View >

                            <View>
                                <Text style={{ fontSize: 20, fontWeight: 'bold',}}>{currency}</Text>
                            </View>

                        </View>

                    </View>

                    
                    <Text style={{ left: 0, color:'gray',fontSize:12 }} numberOfLines={1}>Here weekly means the last 7 days- not the calendar week</Text>
                   

                   <View style={styles.tagsContainer}>

                        <TouchableOpacity style={styles.tags} onPress={()=>{setCurrency('5,000')}}> 
                        <Text style={{color:'#20D167',fontSize:12,fontWeight:'bold'}}>S$ 5,000</Text> 
                        </TouchableOpacity>

                       <TouchableOpacity style={styles.tags} onPress={()=>{setCurrency('10,000')}}> 
                        <Text style={{color:'#20D167',fontSize:12,fontWeight:'bold'}}>S$ 10,000</Text> 
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.tags} onPress={()=>{setCurrency('20,000')}}> 
                        <Text style={{color:'#20D167',fontSize:12,fontWeight:'bold'}}>S$ 20,000</Text> 
                        </TouchableOpacity>
                   </View>


                </View>


                
                

            </View>

            <SafeAreaView style={{height:'10%',flexDirection: 'row', justifyContent: 'space-evenly', backgroundColor: 'white' }}>
                <TouchableOpacity style={{ width:Dimensions.get('window').width/1.5, backgroundColor: '#20D167', borderRadius: 10, height: '100%', justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ color: 'white', fontSize: 16, fontWeight: 'bold' }}>Save</Text>
                </TouchableOpacity>

            </SafeAreaView>


        </View>
    )
}



const styles = StyleSheet.create({
    container:{ flex: 1, marginTop: Platform.OS === 'android' ? statusBarHeight : 0, backgroundColor: '#0C365A' },
    header: { flex: 1, top: statusBarHeight * 2, backgroundColor: '#0C365A' },
    panel:{ flex: 4, backgroundColor: '#FFFFFF', borderTopStartRadius: 20, borderTopEndRadius: 20 },
    currencyContainer: { flexDirection: 'row', marginTop: 0, paddingVertical: 10 },
    currencySymbol: { paddingHorizontal: 8, borderRadius: 5, backgroundColor: '#01D167', justifyContent: 'center' },
    tagsContainer:{marginVertical:20,flexDirection:'row',justifyContent:'space-between'},
    tags:{backgroundColor:'#DDFADF',paddingHorizontal:10,paddingVertical:10 },
  })