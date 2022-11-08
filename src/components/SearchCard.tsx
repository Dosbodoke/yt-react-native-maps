import { View, Text, StyleSheet, TouchableOpacity, LayoutChangeEvent } from 'react-native'
import React from 'react'
import { HistorySvg, SearchSvg } from '../assets'

interface Props {
  handleLayoutChange: (event: LayoutChangeEvent) => void;
}

const SearchCard = ({ handleLayoutChange }: Props) => {
  return (
    <View onLayout={handleLayoutChange} style={styles.card}>
      <TouchableOpacity style={styles.touchable}>
        <SearchSvg />
        <Text style={styles.searchText}>Encontre um lugar</Text>
      </TouchableOpacity>

      <View style={styles.history}>
        <View style={styles.historyItem}>
          <HistorySvg />
          <Text style={styles.historyItemText}>Rio de Janeiro</Text>
        </View>
        <View style={styles.historyItem}>
          <HistorySvg />
          <Text style={styles.historyItemText}>Brasilia</Text>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
    card: {
        position: "absolute",
        bottom: 0,
        width: "100%",
        backgroundColor: "#FFF",
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        paddingHorizontal: 10,
        paddingTop: 20,
        paddingBottom: 20,
    },
    touchable: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      borderRadius: 10,
      backgroundColor: "#f3f4f6",
      padding: 5,
    },
    searchText: {
      marginLeft: 8,
      fontSize: 24,
      fontWeight: "700",
    },
    history: {
      marginTop: 4
    },
    historyItem: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      marginTop: 8,
    },
    historyItemText: {
      marginLeft: 8,
      color: "#111827",
    }
})

export default SearchCard;
