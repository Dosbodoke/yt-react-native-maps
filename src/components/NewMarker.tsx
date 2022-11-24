import { View, TouchableOpacity, StyleSheet } from 'react-native'

import { PlusSvg, CheckSvg } from '../assets';

interface Props {
    mBottom: number,
    showMarkerSetter: boolean
    onPress: () => void;
}

const NewMarker = ({ mBottom, onPress, showMarkerSetter }: Props) => {
  return (
    <View style={styles(mBottom).view}>
        <TouchableOpacity onPress={onPress} style={styles(null, showMarkerSetter).button}>
            {showMarkerSetter ? <CheckSvg /> : <PlusSvg />}
        </TouchableOpacity>
    </View>
  )
}

const styles = (mBottom?: number | null, showMarkerSetter?: boolean) => StyleSheet.create({
    view: {
        position: "absolute",
        right: 18,
        bottom: mBottom ? mBottom + 15 : 0
    },
    button: {
        width: 40,
        height: 40,
        backgroundColor: showMarkerSetter ? "#34d399": "#f3f4f6",
        borderRadius: 100,
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
    }
})

export default NewMarker;
