import React, { useState } from "react";
import { View, Text, Image, Animated, Dimensions, TouchableOpacity, SafeAreaView, StyleSheet, Switch } from "react-native";
import SlidingUpPanel from 'rn-sliding-up-panel';
import * as Images from '../constants';
import BottomTabs from '../components/BottomTabs';

const height = Dimensions.get('window').height


const panelMenu = [
  { image: Images.INSIGHT, title: 'Top-up-account', meta: 'Deposit money to your account to use with card' },
  { image: Images.TRANSFER, title: 'Weekly spending limit', meta: "you haven't set any spending limit on card" },
  { image: Images.FREEZE, title: 'Freeze card', meta: 'Your Debit card is currently active' },
  { image: Images.NEW_CARD, title: 'Get a new card ', meta: 'This activates your current debit card' },
  { image: Images.DEACTIVATE_CARD, title: 'Deactivated cards', meta: 'This deactivates your current debit card' },
]
export default function Home() {
  const [showcard, setShowCard] = useState(true)
  const [isDebitEnabled, setIsDebitEnabled] = useState(false)

  const draggableRange = {
    top: height - 150,
    bottom: height / 1.5
  };
  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.headerLogoContainer}>
        <Image source={Images.LOGO} style={{ height: 20, width: 20 }} />
      </SafeAreaView>

      <SafeAreaView style={styles.walletInfoContainer}>
        <Text style={styles.debitCardText}> Debit Card </Text>
        <Text style={styles.avlBalanceText}> Available  Balance</Text>

        <View style={styles.currencyContainer}>
          <View style={styles.currencySymbol}>
            <Text style={{ color: 'white', fontSize: 16 }}>s<Text style={{ color: 'white', fontSize: 13 }}>$</Text></Text>
          </View >

          <View>
            <Text style={{ color: 'white', fontSize: 20, fontWeight: '700' }}>   3,000</Text>
          </View>
        </View>
      </SafeAreaView>

      <SlidingUpPanel showBackdrop={false} height={height} backdropOpacity={0} animatedValue={new Animated.Value(height / 1.5)} draggableRange={draggableRange}>

        <View style={styles.panleContentContainer}>

          <TouchableOpacity onPress={() => setShowCard(!showcard)} style={styles.showCardInfo}>
            <Image source={showcard ? Images.SHOW : Images.REMOVE} style={{ top: 5, flexDirection: 'row', justifyContent: 'center', tintColor: '#01D167', height: 15, width: 12 }} />
            <Text style={{ left: 10, top: 5, textAlign: 'center', color: '#01D167', fontSize: 12, fontWeight: '700' }}>{showcard ? 'Hide Card Number' : 'Show Card Number'}</Text>
          </TouchableOpacity>

          <View style={{ borderRadius: 10, backgroundColor: '#01D167', top: -60, alignSelf: 'center', height: '25%', width: '90%' }}>

            <View style={{ paddingTop: 20, flexDirection: 'row', justifyContent: 'flex-end', right: 30 }}>
              <Image source={Images.ASPIRE_LOGO} style={{ tintColor: 'white', height: 20, width: 70 }} />
            </View>

            <View style={{ marginTop: '5%', marginHorizontal: 15 }}>
              <Text style={{ fontSize: 20, color: 'white', fontWeight: '700' }}>Ajaykumar Rajasekaran</Text>
            </View>

            <View style={{ marginTop: '5%', marginHorizontal: 15 }}>
              <Text style={{ fontSize: 14, color: 'white', fontWeight: '500' }}>1234 5678 9012 3456</Text>
            </View>

            <View style={{ marginTop: '5%', marginHorizontal: 15 }}>
              <Text style={{ fontSize: 14, color: 'white', fontWeight: '500' }}>Thur: 12/20 <Text> CVV:456</Text> </Text>
            </View>

            <View style={{ paddingTop: 20, flexDirection: 'row', justifyContent: 'flex-end', right: 30 }}>
              <Image source={Images.VISA_LOGO} style={{ tintColor: 'white', height: 20, width: 60 }} />
            </View>

          </View>

          <View >
            <SlidingPanelItem name={panelMenu[0].title} meta={panelMenu[0].meta} img={panelMenu[0].image}></SlidingPanelItem>
            <SlidingPanelItem name={panelMenu[1].title} meta={panelMenu[1].meta} img={panelMenu[1].image} toggleState={isDebitEnabled} setToggleState ={()=>setIsDebitEnabled(!isDebitEnabled)} ></SlidingPanelItem>
            <SlidingPanelItem name={panelMenu[2].title} meta={panelMenu[2].meta} img={panelMenu[2].image} toggleState={isDebitEnabled} setToggleState ={()=>setIsDebitEnabled(!isDebitEnabled)}></SlidingPanelItem>
            <SlidingPanelItem name={panelMenu[3].title} meta={panelMenu[3].meta} img={panelMenu[3].image}></SlidingPanelItem>
            <SlidingPanelItem name={panelMenu[4].title} meta={panelMenu[4].meta} img={panelMenu[4].image}></SlidingPanelItem>
          </View>

        </View>
      </SlidingUpPanel>

     

        <BottomTabs />
       
     

    </View>
  );
}




const SlidingPanelItem = ({toggleState,setToggleState,...props}) => {
  let check ="weekly spending limit"
  return (
    <View style={{flexDirection:'row', justifyContent:'space-between'}}>
        <View style={{ flexDirection: 'row', marginBottom: 50, marginHorizontal: 20 }}>
          <View>
            <Image source={props.img} style={{ height: 30, width: 30 }} />
          </View>
          

          <View style={{ marginLeft: 10, }}>
            <Text style={{ fontSize: 16 }}>{props.name}</Text>
            <Text style={{ color: 'gray', fontSize: 12 }}>{props.meta}</Text>
          </View >

         </View>

        { setToggleState  &&
          <View >
          <Switch
            style={{ transform: [{ scaleX: .6 }, { scaleY: .6 }] }}
            trackColor={{ false: 'pink', true: '#0C365A' }}
            thumbColor={toggleState ? 'white' : 'white'}
            ios_backgroundColor="white"
            onValueChange={setToggleState}
            value={toggleState}
          />
        </View>
        }
         
      
    </View>
    
  )
  


}



const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0C365A' },
  headerLogoContainer: { flexDirection: 'row', justifyContent: 'flex-end', right: 30 },
  walletInfoContainer: { flex: 1, backgroundColor: '#0C365A' },
  debitCardText: { padding: 18, fontSize: 20, color: 'white', fontWeight: '700' },
  avlBalanceText: { paddingLeft: 18, color: 'white' },
  currencyContainer: { flexDirection: 'row', marginTop: 10, paddingLeft: 20 },
  currencySymbol: { paddingHorizontal: 8, borderRadius: 5, backgroundColor: '#01D167', justifyContent: 'center' },
  panleContentContainer: { flex: 2, borderWidth: 1, backgroundColor: 'white', borderTopLeftRadius: 20, borderTopRightRadius: 20 },
  showCardInfo: { flexDirection: 'row', borderRadius: 10, backgroundColor: 'white', justifyContent: 'center', position: 'absolute', right: 20, top: -85, height: 40, width: '40%' }

})