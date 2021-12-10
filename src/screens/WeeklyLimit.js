import React, { useState,useEffect } from 'react'
import { View, Text, StyleSheet, Platform, Image, SafeAreaView, Dimensions, ScrollView, TouchableOpacity } from 'react-native'
import Constants from 'expo-constants';
import { LIMIT } from '../constants';
import { LineChart, } from 'react-native-chart-kit'
import { VictoryPie } from "victory-native";


const statusBarHeight = Constants.statusBarHeight

export default function WeeklyLimit() {
    const [currency, setCurrency] = useState(null)

    useEffect(() => {console.warn('uf1')})
    useEffect(() => {console.warn('uf2')})
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
                    <ScrollView>
                        <Text style={{  fontSize: 16, fontWeight: 'bold' }}>Your Expense Graph For Last 6 months </Text>
                        <LineChart
                            data={{
                                labels: ['July', 'Aug', 'Sep', 'Oct', 'Nov','Dec'],
                                datasets: [{
                                    data: [
                                        6,
                                        8,
                                        12,
                                        4,
                                        10,
                                        8
                                    ],
                                    
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
                                data={[
                                    { label: "Food", y: 55 },
                                    { label: "Education", y: 40 },
                                    { label: "Beauty", y: 55 },
                                    { label: "Medical", y: 55 },
                                    { label: "Other", y: 55 }
                                ]}
                            />
                        </View>


                    </ScrollView>

                </View>




            </View>

            <SafeAreaView style={{ height: Platform.OS === 'android' ? '7%' : '10%', flexDirection: 'row', justifyContent: 'space-evenly', backgroundColor: 'white' }}>
                <TouchableOpacity style={{ width: Dimensions.get('window').width / 1.5, bottom: Platform.OS === 'android' ? 20 : 0, top: 10, backgroundColor: '#20D167', borderRadius: 10, height: '100%', justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ color: 'white', fontSize: 16, fontWeight: 'bold' }}>Save</Text>
                </TouchableOpacity>

            </SafeAreaView>


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