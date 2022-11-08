import { View, TouchableOpacity, StyleSheet } from 'react-native'

import { MapTypeSvg } from '../assets';

interface Props {
    mBottom: number,
    onPress: () => void;
}

const MapType = ({ mBottom, onPress }: Props) => {
  return (
    <View style={styles(mBottom).view}>
        <TouchableOpacity onPress={onPress} style={styles().button}>
            <MapTypeSvg />
        </TouchableOpacity>
    </View>
  )
}

const styles = (mBottom?: number) => StyleSheet.create({
    view: {
        position: "absolute",
        right: 18,
        bottom: mBottom ? mBottom + 15 : 0
    },
    button: {
        width: 40,
        height: 40,
        backgroundColor: "#f3f4f6",
        borderRadius: 100,
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
    }
})

export default MapType;
