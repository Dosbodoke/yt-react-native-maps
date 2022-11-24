import React, { useState, useRef } from 'react';
import MapView, { Marker, Region } from 'react-native-maps';
import { StyleSheet, View, Dimensions, LayoutChangeEvent } from 'react-native';
import SearchCard from './src/components/SearchCard';
import MyLocation from './src/components/MyLocation';
import MapType from './src/components/MapType';
import MapTypeCard from './src/components/MapTypeCard';

import * as Location from 'expo-location';
import database from './database';

const getMyLocation = async(): Promise<Region | undefined> => {
  let { status } = await Location.requestForegroundPermissionsAsync();
  if (status !== 'granted') return;

  const { latitude, longitude } = (await Location.getCurrentPositionAsync({})).coords;
  const region = {
    latitude,
    longitude,
    latitudeDelta: 0.035,
    longitudeDelta: 0.035,
  };
  return region;
}

export default function App() {
  const [showCard, setShowCard] = useState<'search' | 'mapType'>('search');
  const [cardHeight, setCardHeight] = useState(0);
  const [mapType, setMapType] = useState<'standard' | 'satellite' | 'terrain'>('standard');
  const mapRef = useRef<MapView>(null);

  const markers = database.markers

  const goToMyLocation = async() => {
    const region = await getMyLocation();
    region && mapRef.current?.animateToRegion(region, 1000);
  }

  const handleLayoutChange = (event: LayoutChangeEvent) => {
    const { height } = event.nativeEvent.layout;
    setCardHeight(height);
  }

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        ref={mapRef}
        onMapReady={() => {goToMyLocation();}}
        showsMyLocationButton={false}
        mapType={mapType}
        showsUserLocation>
          {markers.map(marker => (
            <Marker
              key={marker.id}
              coordinate={marker.coordinates}
              pinColor={marker.color}
            />
          ))}
        </MapView>
        { showCard === 'search' ? (
          <SearchCard handleLayoutChange={handleLayoutChange} />
        ) : (
          <MapTypeCard
            handleLayoutChange={handleLayoutChange}
            closeModal={() => setShowCard('search')}
            changeMapType={(mapType) => setMapType(mapType)}
          />
        )}
        <MyLocation mBottom={cardHeight} onPress={goToMyLocation} />
        <MapType mBottom={cardHeight + 50 } onPress={() => setShowCard('mapType')} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});
