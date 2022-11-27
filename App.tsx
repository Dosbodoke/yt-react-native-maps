import React, { useState, useRef, useMemo } from 'react';
import MapView, { LatLng, Marker, Region } from 'react-native-maps';
import { StyleSheet, Text, View, Dimensions, LayoutChangeEvent } from 'react-native';
import type { PointFeature } from 'supercluster'
import type { BBox, GeoJsonProperties } from 'geojson';
import useSupercluster from 'use-supercluster';

import SearchCard from './src/components/SearchCard';
import MyLocation from './src/components/MyLocation';
import MapType from './src/components/MapType';
import NewMarker from './src/components/NewMarker'
import MapTypeCard from './src/components/MapTypeCard';

import * as Location from 'expo-location';
import database from './database';

interface PointProperties {
  cluster: boolean;
  category: string;
  id: number;
  color: string,
}

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

const regionToBoundingBox = (region: Region): BBox => {
  let lngD: number;
  if (region.longitudeDelta < 0) lngD = region.longitudeDelta + 360;
  else lngD = region.longitudeDelta;

  return [
    region.longitude - lngD, // westLng - min lng
    region.latitude - region.latitudeDelta, // southLat - min lat
    region.longitude + lngD, // eastLng - max lng
    region.latitude + region.latitudeDelta, // northLat - max lat
  ];
};

export default function App() {
  const [showCard, setShowCard] = useState<'search' | 'mapType'>('search');
  const [cardHeight, setCardHeight] = useState(0);
  const [mapType, setMapType] = useState<'standard' | 'satellite' | 'terrain'>('standard');
  const mapRef = useRef<MapView>(null);

  const [showMarkerSetter, setShowMarkerSetter] = useState(false);
  const [markerCoordinates, setMarkerCoordinates] = useState<LatLng>({latitude: 0, longitude: 0})

  const [bounds, setBounds] = useState<BBox>()
  const [zoom, setZoom] = useState(12);

  const onRegionChangeComplete = async (region: Region, _?: object) => {
    const mapBounds = regionToBoundingBox(region);
    setBounds(mapBounds);
    const camera = await mapRef.current?.getCamera();
    setZoom(camera?.zoom ?? 10);
  }

  const goToMyLocation = async() => {
    const region = await getMyLocation();
    region && mapRef.current?.animateToRegion(region, 1000);
  }

  const handleLayoutChange = (event: LayoutChangeEvent) => {
    const { height } = event.nativeEvent.layout;
    setCardHeight(height);
  }

  const handleNewMarker = async () => {
    if (!showMarkerSetter) {
      const camera = await mapRef.current?.getCamera()
      camera?.center && setMarkerCoordinates(camera?.center)
    } else {
      database?.markers.push({
        id: database?.markers.length + 1,
        color: 'green',
        coordinates: markerCoordinates
      })
    }
    setShowMarkerSetter(v => !v)
  }

  const handleClusterPress = (cluster_id: number): void => {
    // Zoom to cluster
    const leaves = supercluster?.getLeaves(cluster_id);
    if (!leaves) return
    const coords = leaves?.map((l) => ({
      longitude: l.geometry.coordinates[0],
      latitude: l.geometry.coordinates[1],
    }))
    mapRef.current?.fitToCoordinates(coords, {
      edgePadding: {
        top: 200,
        right: 50,
        bottom: 250,
        left: 50,
      },
      animated: true,
    });
  };

  const points = useMemo<PointFeature<GeoJsonProperties & PointProperties>[]>(() => {
    return database?.markers.map((m) => ({
      type: 'Feature',
      properties: {
        cluster: false,
        category: 'markers',
        id: m.id,
        color: m.color
      },
      geometry: {
        type: 'Point',
        coordinates: [m.coordinates.longitude, m.coordinates.latitude],
      },
    }));
  }, [database?.markers.length]);

  const { clusters, supercluster } = useSupercluster({
    points,
    bounds,
    zoom,
    options: { radius: 75, maxZoom: 20 }
  });

  return (
    <View style={styles.container}>
      <MapView
        provider={"google"}
        style={styles.map}
        ref={mapRef}
        onMapReady={() => {goToMyLocation()}}
        onRegionChangeComplete={onRegionChangeComplete}
        showsMyLocationButton={false}
        mapType={mapType}
        showsUserLocation>
          {showMarkerSetter &&
            <Marker
              draggable
              coordinate={markerCoordinates}
              onDragEnd={(e) => setMarkerCoordinates(e.nativeEvent.coordinate)}
            />
          }
          {clusters?.map((point) => {
            const [longitude, latitude] = point.geometry.coordinates;
            const coordinates = { latitude, longitude };
            const properties = point.properties;

            if (properties?.cluster) {
              const size = 25 + (properties.point_count * 75) / points.length
              return (
                <Marker
                  key={`cluster-${properties.cluster_id}`}
                  coordinate={coordinates}
                  onPress={() => handleClusterPress(properties.cluster_id)}>
                  <View style={[styles.cluster, { width: size, height: size }]}>
                    <Text style={styles.clusterCount}>{properties.point_count}</Text>
                  </View>
                </Marker>
              );
            }

            return (
              <Marker
                key={properties.id}
                coordinate={coordinates}
                pinColor={properties.color} />
            )
          })}
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
        <NewMarker
          mBottom={cardHeight + 100 }
          showMarkerSetter={showMarkerSetter}
          onPress={handleNewMarker}
        />
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
  cluster: {
    borderRadius: 100,
    backgroundColor: '#334155',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  clusterCount: {
    color: '#FFF',
    fontWeight: 'bold',
  }
});
