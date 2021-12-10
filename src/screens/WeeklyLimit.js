import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, Platform, Image, SafeAreaView, Dimensions, ScrollView, TouchableOpacity, Alert, ActivityIndicator } from 'react-native'
import Constants from 'expo-constants';
import { LIMIT } from '../constants';
import { LineChart, } from 'react-native-chart-kit'
import { VictoryPie } from "victory-native";
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'


const statusBarHeight = Constants.statusBarHeight

export default function WeeklyLimit() {
    const dispatch = useDispatch();
    const [currency, setCurrency] = useState(null)
    const loading = useSelector((state) => state.userExpenseReducer.loading)
    const userExpenseInfoLabels = useSelector((state) => state.userExpenseReducer.expenseDetails).map((item, index) => { return item.month })
    const userExpenseInfoData = useSelector((state) => state.userExpenseReducer.expenseDetails).map((item, index) => { return item.expense })
    const userCategoryInfo = useSelector((state) => state.userExpenseReducer.categoryInfo)

    const getExpenseHistoryFromAPI = async () => {
        const url = "https://bc6efa5e-56e8-48eb-a6ce-ceea56d12c21.mock.pstmn.io/v1/users/1/expenseinfo?mon=last_six";
        return await fetch(url)
            .then(res => res.json())
            .then(json =>
                dispatch({
                    type: 'FETCH_EXPENSE_SUCCESS',
                    payload: { expenseInfo: json.expense_info }
                })
            )
            .catch(error => {
                dispatch({
                    type: 'FETCH_EXPENSE_FAILED',
                })
                Alert.alert('Error', 'Something went wrong')
            })
    }

    const getExpenseCategoryFromAPI = async () => {
        const url = "https://bc6efa5e-56e8-48eb-a6ce-ceea56d12c21.mock.pstmn.io/v1/users/1/expensecategories?mon=last-six";
        return await fetch(url)
            .then(res => res.json())
            .then(json =>
                dispatch({
                    type: 'FETCH_CATEGORYINFO_SUCCESS',
                    payload: { categoryInfo: json.categories_info }
                })
            )
            .catch(error => {
                dispatch({
                    type: 'FETCH_EXPENSE_FAILED',
                })
                Alert.alert('Error', 'unable to fetch category info')
            })
    }

    useEffect(() => {
        getExpenseHistoryFromAPI();
        getExpenseCategoryFromAPI();
    }, [])

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
                    {loading ? <ActivityIndicator size="large" color="red" /> :
                    <ScrollView>
                        <Text style={{  fontSize: 16, fontWeight: 'bold' }}>Your Expense Graph For Last 6 months </Text>
                        <LineChart
                            data={{
                                labels: userExpenseInfoLabels,
                                datasets: [{
                                    data: userExpenseInfoData
                                }]
                            }}

                            width={Dimensions.get('window').width - 20} // from react-native
                            height={220}
                            yAxisLabel="S$"
                            yAxisSuffix="k"
                            chartConfig={{
                                backgroundColor: 'white',
                                backgroundGradientFrom: '#20D150',
                                backgroundGradientTo: '#20D167',
                                decimalPlaces: 1, // optional, defaults to 2dp
                                color: (opacity = 0.7) => `rgba(255, 255, 255, ${opacity})`,
                                style: {
                                    borderRadius: 16
                                }
                            }}
                            bezier
                            style={{
                                marginVertical: 8,
                                borderRadius: 16
                            }}
                        />
                        <Text style={{ paddingTop: 50, fontSize: 16, fontWeight: 'bold' }}> Categories of your expenses for Last 6 months </Text>
                        <View style={{ top:-50,justifyContent: 'center', alignItems:'center' }}>
                            <VictoryPie
                                // width={Dimensions.get('window').width - 50}
                                width={Dimensions.get('window').width - 100}
                                colorScale={"cool"}
                                data={userCategoryInfo}
                            />
                        </View>


                    </ScrollView>
                    }
                    
                </View>


                <SafeAreaView style={{ height: Platform.OS === 'android' ? '7%' : '10%', bottom:10,flexDirection: 'row', justifyContent:'center',alignItems:'center',backgroundColor: 'white' }}>
                        <TouchableOpacity style={{ width: Dimensions.get('window').width / 1.5, bottom: Platform.OS === 'android' ? 10 : 0, backgroundColor: '#20D167', borderRadius: 10, height: '100%', justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{ color: 'white', fontSize: 16, fontWeight: 'bold' }}>Save</Text>
                        </TouchableOpacity>

                    </SafeAreaView>

            </View>

            




        </View>
    )
}



const styles = StyleSheet.create({
    container: { flex: 1, marginTop: Platform.OS === 'android' ? statusBarHeight : 0, backgroundColor: '#0C365A' },
    header: { flex: 1, top: statusBarHeight * 2, backgroundColor: '#0C365A' },
    panel: { flex: 4, backgroundColor: '#FFFFFF', borderTopStartRadius: 20, borderTopEndRadius: 20 },
    currencyContainer: { flexDirection: 'row', marginTop: 0, paddingVertical: 10 },
    currencySymbol: { paddingHorizontal: 8, borderRadius: 5, backgroundColor: '#01D167', justifyContent: 'center' },
    tagsContainer: { marginVertical: 20, flexDirection: 'row', justifyContent: 'space-between' },
    tags: { backgroundColor: '#DDFADF', paddingHorizontal: 10, paddingVertical: 10 },
})