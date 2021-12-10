import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, Platform, Image, SafeAreaView, Dimensions, ScrollView, TouchableOpacity, Alert, ActivityIndicator } from 'react-native'
import Constants from 'expo-constants';
import { LIMIT } from '../constants';
import { VictoryPie, VictoryChart, VictoryTheme, VictoryBar } from "victory-native";
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import {store} from '../redux/store'


const statusBarHeight = Constants.statusBarHeight

export default function WeeklyLimit(props) {
    const dispatch = useDispatch();
    const [currency, setCurrency] = useState(null)
    const loading = useSelector((state) => state.userExpenseReducer.loading)
    const userExpenseInfoData = useSelector((state) => state.userExpenseReducer.expenseDetails).map((item, index) => { return { "month": item.month, "expense": item.expense, "fill": 'green' } })
    const userCategoryInfo = useSelector((state) => state.userExpenseReducer.categoryInfo)
    const weeklyLimit = useSelector((state) => state.userExpenseReducer.weeklyLimit)

    const getExpenseHistoryFromAPI =  () => {
                store.dispatch({
                    type: 'FETCH_USER_EXPENSE_HISTORY_INFO',
                })
            
    }

    const getExpenseCategoryFromAPI = async () => {
                store.dispatch({
                    type: 'FETCH_USER_EXPENSE_CATEGORY_INFO',
                })
    }

    useEffect(() => {
        getExpenseHistoryFromAPI();
        getExpenseCategoryFromAPI();
    }, [])

    const save=(value)=>{
        dispatch({
            type: 'SET_WEEKLY_LIMIT',
            WeeklyLimitValue:value
        })

        Alert.alert('success','Weekly Limit Updated Successfully')
    }

    return (
        <View style={styles.container}>

            <SafeAreaView style={styles.header}>
                <Text style={{ marginVertical: Platform.OS === 'android' ? 40 : 20, marginHorizontal: 20, fontSize: 20, fontWeight: 'bold', color: "#FFFFFF" }}> Spending Limit</Text>
            </SafeAreaView>

            <View style={styles.panel}>
                <View style={{ margin: 20 }}>

                    <View style={{ flexDirection: 'row' }}>
                        <Image source={LIMIT} style={{ height: 15, width: 15 }} />
                        <Text style={{ left: 10 }}>Set a weekly debit card spending limit</Text>
                    </View>

                    <View style={{ borderBottomWidth: 0.3, borderBottomColor: 'gray', marginVertical: 10 }}>

                        <View style={styles.currencyContainer}>

                            <View style={styles.currencySymbol}>
                                <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold' }}>S$</Text>
                            </View >

                            <View>
                                <Text style={{ fontSize: 20, fontWeight: 'bold', }}>{currency}</Text>
                            </View>

                        </View>

                    </View>

                    <Text style={{ left: 0, color: 'gray', fontSize: 12 }} numberOfLines={1}>Here weekly means the last 7 days- not the calendar week</Text>


                    <View style={styles.tagsContainer}>

                        <TouchableOpacity style={styles.tags} onPress={() => { setCurrency(' 5,000') }}>
                            <Text style={{ color: '#20D167', fontSize: 12, fontWeight: 'bold' }}>S$ 5,000</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.tags} onPress={() => { setCurrency(' 10,000') }}>
                            <Text style={{ color: '#20D167', fontSize: 12, fontWeight: 'bold' }}>S$ 10,000</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.tags} onPress={() => { setCurrency(' 20,000') }}>
                            <Text style={{ color: '#20D167', fontSize: 12, fontWeight: 'bold' }}>S$ 20,000</Text>
                        </TouchableOpacity>
                    </View>

                </View>

                <View style={{ flex: 1, marginHorizontal: 10 }}>
                    {loading ? <ActivityIndicator size="large" color="#20D167" /> :
                        <ScrollView>
                            <Text numberOfLines={2} style={{marginLeft:10, fontSize: 16, fontWeight: 'bold' }}>Your Expense Graph For Last 6 months </Text>
                            <View style={{  top:-20,justifyContent: 'center', alignItems: 'center' }}>
                             <VictoryChart domainPadding={10} width={Dimensions.get('window').width - 100} theme={VictoryTheme.material} animate={{
                                onLoad: { duration: 1000 },
                                duration: 1000,
                                easing: "bounce"
                            }} 
                            >
                                <VictoryBar style={{ data: { fill: "#20D167" } }} data={userExpenseInfoData} x="month" y="expense" />
                            </VictoryChart>
                            </View>

                            <Text numberOfLines={2} style={{marginLeft:10, fontSize: 16, fontWeight: 'bold' }}> Categories of your expenses for Last 6 months </Text>
                                <View style={{ top: -50, justifyContent: 'center', alignItems: 'center' }}>
                                    <VictoryPie
                                        // width={Dimensions.get('window').width - 50}

                                        width={Dimensions.get('window').width - 100}
                                        colorScale={"cool"}
                                        data={userCategoryInfo ? userCategoryInfo : [{ y: 0 }]}
                                    />
                                </View>
                            
                        </ScrollView>
                    }

                </View>


                <SafeAreaView style={{ height: Platform.OS === 'android' ? '7%' : '10%', bottom: Platform.OS === 'android' ? 3 : 10, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', backgroundColor: 'white' }}>
                    <TouchableOpacity disabled={currency !== null ? false : true } onPress={()=> save(currency)}style={{ width: Dimensions.get('window').width / 1.5, bottom: Platform.OS === 'android' ? 10 : 0, backgroundColor: '#20D167', borderRadius: 10, height: '100%', justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ color: 'white', fontSize: 16, fontWeight: 'bold' }}>Save</Text>
                    </TouchableOpacity>

                </SafeAreaView>

            </View>






        </View >
    )
}



const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#0C365A' },
    header: { flex: 1, top: statusBarHeight * 2, backgroundColor: '#0C365A' },
    panel: { flex: 4, backgroundColor: '#FFFFFF', borderTopStartRadius: 20, borderTopEndRadius: 20 },
    currencyContainer: { flexDirection: 'row', marginTop: 0, paddingVertical: 10 },
    currencySymbol: { paddingHorizontal: 8, borderRadius: 5, backgroundColor: '#01D167', justifyContent: 'center' },
    tagsContainer: { marginVertical: 20, flexDirection: 'row', justifyContent: 'space-between' },
    tags: { backgroundColor: '#DDFADF', paddingHorizontal: 10, paddingVertical: 10 },
})