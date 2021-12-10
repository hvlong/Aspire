import React, { useState, useEffect } from "react";
import { View, Text, Image, Animated, Dimensions, TouchableOpacity, SafeAreaView, StyleSheet, Switch, Platform, ActivityIndicator,Alert } from "react-native";
import SlidingUpPanel from 'rn-sliding-up-panel';
import * as Images from '../constants';
import BottomTabs from '../components/BottomTabs';
import Constants from 'expo-constants';
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import {store} from '../redux/store'
const statusBarHeight = Constants.statusBarHeight

const height = Dimensions.get('window').height


const panelMenu = [
  { image: Images.INSIGHT, title: 'Top-up-account', meta: 'Deposit money to your account to use with card' },
  { image: Images.TRANSFER, title: 'Weekly spending limit', meta: "you haven't set any spending limit on card" },
  { image: Images.FREEZE, title: 'Freeze card', meta: 'Your Debit card is currently active' },
  { image: Images.NEW_CARD, title: 'Get a new card ', meta: 'This activates your current debit card' },
  { image: Images.DEACTIVATE_CARD, title: 'Deactivated cards', meta: 'This deactivates your current debit card' },
]
export default function Home({ navigation }) {
  const dispatch = useDispatch();
  const [showcard, setShowCard] = useState(true)
  const [isDebitEnabled, setIsDebitEnabled] = useState(false)
  const[weeklyLimit,setWeeklyLimit]=useState(5000)
  const loading = useSelector((state) => state.userInforReducer.loading)
  const userCardInfo = useSelector((state) => state.userInforReducer.userDetails)

  const getUserInfoFromAPI = async () => {
    
        store.dispatch({
          type: 'FETCH_USER_CARD_INFO',
        })
  }

  useEffect(() => {
   getUserInfoFromAPI();
  }, [])


  const draggableRange = {
    top: Platform.OS === 'ios' ? height - 150 : height - 100,
    bottom: height / 1.5
  };
  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.walletInfoContainer}>
        <Text style={styles.debitCardText}> Debit Card </Text>
        <Text style={styles.avlBalanceText}> Available  Balance</Text>
        {/* {console.warn(userCardInfo[0])} */}
        <View style={styles.currencyContainer}>
          <View style={styles.currencySymbol}>
          <Text style={{ color: 'white', fontSize: 14, fontWeight: 'bold' }}>S$</Text>
          </View >

          <View>
            <Text style={{ color: 'white', fontSize: 20, fontWeight: '700' }}>{loading ?'':`  3,000 / ${weeklyLimit}`}<Text style={{fontSize:12,color:'gray'}}> (weekly limit)</Text></Text>
          </View>
        </View>
      </SafeAreaView>

      <SlidingUpPanel showBackdrop={false} height={height} backdropOpacity={0} animatedValue={new Animated.Value(height / 1.5)} draggableRange={draggableRange}>

        <View style={styles.panleContentContainer}>

          <TouchableOpacity disabled={loading} onPress={() => setShowCard(!showcard)}  style={styles.showCardInfo}>
            <Image source={showcard ? Images.SHOW : Images.REMOVE} style={{ top: 5, flexDirection: 'row', justifyContent: 'center', tintColor: '#01D167', height: 15, width: 12 }} />
            <Text style={{ left: 10, top: 5, textAlign: 'center', color: '#01D167', fontSize: 12, fontWeight: '700' }}>{!showcard ? 'Hide Card Number' : 'Show Card Number'}</Text>
          </TouchableOpacity>

          <View style={{ borderRadius: 10, backgroundColor: '#01D167', top: -60, alignSelf: 'center', height: '25%', width: '90%' }}>

            {loading ?<View ><ActivityIndicator style={{marginTop:'25%'}} size="small" color="#0C365A'" /></View>  :
              <View>
                <View style={{ paddingTop: 20, flexDirection: 'row', justifyContent: 'flex-end', right: 30 }}>
                  <Image source={Images.ASPIRE_LOGO} style={{ tintColor: 'white', height: 20, width: 70 }} />
                </View>

                <View style={{ marginTop: '5%', marginHorizontal: 15 }}>
                  <Text style={{ fontSize: 20, color: 'white', fontWeight: '700' }}>{userCardInfo[0]['username']}</Text>
                </View>

                <View style={{ marginTop: '5%', marginHorizontal: 15 }}>
                  <Text style={{ fontSize: 14, color: 'white', fontWeight: '500' }}>{!showcard ? userCardInfo[0]['card_number'] : userCardInfo[0]['card_number'].replace(/\d{4}(?= \d{4})/g, "****")}</Text>
                </View>

                <View style={{ marginTop: '5%', marginHorizontal: 15 }}>
                  <Text style={{ fontSize: 14, color: 'white', fontWeight: '500' }}>Thur: {userCardInfo[0]['thur']} <Text> CVV:{userCardInfo[0]['cvv']}</Text> </Text>
                </View>

                <View style={{ bottom: Platform.OS === 'android' && 20, paddingTop: 20, flexDirection: 'row', justifyContent: 'flex-end', right: 30 }}>
                  <Image source={Images.VISA_LOGO} style={{ tintColor: 'white', height: 20, width: 60 }} />
                </View>
              </View>
            }


          </View>

          <View >
            <SlidingPanelItem name={panelMenu[0].title} meta={panelMenu[0].meta} img={panelMenu[0].image}></SlidingPanelItem>
            <SlidingPanelItem name={panelMenu[1].title} meta={panelMenu[1].meta} img={panelMenu[1].image} navigateTo={() => navigation.navigate('Limit')} toggleState={isDebitEnabled} setToggleState={() => setIsDebitEnabled(!isDebitEnabled)} ></SlidingPanelItem>
            <SlidingPanelItem name={panelMenu[2].title} meta={panelMenu[2].meta} img={panelMenu[2].image} navigateTo={() => Alert.alert('coming soon')} toggleState={isDebitEnabled} setToggleState={() => setIsDebitEnabled(!isDebitEnabled)}></SlidingPanelItem>
            <SlidingPanelItem name={panelMenu[3].title} meta={panelMenu[3].meta} img={panelMenu[3].image}></SlidingPanelItem>
            <SlidingPanelItem name={panelMenu[4].title} meta={panelMenu[4].meta} img={panelMenu[4].image}></SlidingPanelItem>
          </View>

        </View>
      </SlidingUpPanel>



      <BottomTabs/>



    </View>
  );
}




const SlidingPanelItem = ({ toggleState, setToggleState, ...props }) => {
  return (
    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
      <View style={{ flexDirection: 'row', marginBottom: 45, marginHorizontal: 20 }}>
        <View>
          <Image source={props.img} style={{ height: 30, width: 30 }} />
        </View>


        <View style={{ marginLeft: 10, }}>
          <Text style={{ fontSize: 16 }}>{props.name}</Text>
          <Text style={{ color: 'gray', fontSize: 12 }}>{props.meta}</Text>
        </View >

      </View>

      {setToggleState &&
        <View >
          <Switch
            style={{ transform: [{ scaleX: .6 }, { scaleY: .6 }] }}
            trackColor={{ false: '#C1C1C1', true: '#0C365A' }}
            thumbColor={toggleState ? '#FFFFFF' : '#FFFFFF'}
            ios_backgroundColor="#C1C1C1"
            onValueChange={() => {
              setToggleState
              props.navigateTo()
            }}
            value={toggleState}
          />
        </View>
      }


    </View>

  )



}



const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0C365A' },
  headerLogoContainer: { paddingTop: Platform.OS === 'android' ? statusBarHeight : 0, flexDirection: 'row', justifyContent: 'flex-end', right: 30 },
  walletInfoContainer: { flex: 1, paddingTop: Platform.OS === 'android' ? statusBarHeight : 0, backgroundColor: '#0C365A' },
  debitCardText: { marginTop: 10, padding: 18, fontSize: 20, color: 'white', fontWeight: '700' },
  avlBalanceText: { paddingLeft: 18, color: 'white' },
  currencyContainer: { flexDirection: 'row', marginTop: 10, paddingLeft: 20 },
  currencySymbol: { paddingHorizontal: 8, borderRadius: 5, backgroundColor: '#01D167', justifyContent: 'center' },
  panleContentContainer: { flex: 2, borderWidth: 1, backgroundColor: 'white', borderTopLeftRadius: 20, borderTopRightRadius: 20 },
  showCardInfo: { flexDirection: 'row', borderRadius: 10, backgroundColor: 'white', justifyContent: 'center', position: 'absolute', right: 20, top: -85, height: 50, width: '40%' }

})