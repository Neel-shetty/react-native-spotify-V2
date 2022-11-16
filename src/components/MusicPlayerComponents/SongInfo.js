import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import React from "react";
import Svg, { Path } from "react-native-svg";
import { useRoute } from "@react-navigation/native";
import previewData from "../../../assets/dummydata/previewData";

const SongInfo = () => {
  const padding =
    Dimensions.get("window").width - Dimensions.get("window").width * 0.9;
  //console.log(padding)
  const route = useRoute();
  const name = route.params.filename;
  const album = route?.params?.Album
  //console.log(album)
  const songId = route?.params?.songId - 1;

  function removeExtension(filename) {
    // filename = filename.replace(/\d+/g, '');
    filename = filename.substring(filename.indexOf(" ") + 1);
    return filename.substring(0, filename.lastIndexOf(".")) || filename;
  }

  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "space-between",
        flexDirection: "row",
        paddingHorizontal: padding,
      }}
    >
      <View>
        <Text style={styles.name} numberOfLines={1}>{removeExtension(name)}</Text>
        {/* <Text style={styles.artist}>{previewData[songId].content.ArtistName}</Text> */}
        <Text style={styles.artist} numberOfLines={1}>Artist . {album}</Text>
      </View>
      <View>
        <TouchableOpacity>
          <Svg
            width={24}
            height={24}
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <Path
              d="M20.311 4.46c-2.334-2.38-5.037-1.376-6.71-.314-.946.6-2.256.6-3.202 0-1.673-1.062-4.376-2.066-6.71.315C-1.852 10.11 7.649 21 12 21c4.35 0 13.852-10.889 8.311-16.54Z"
              stroke="#6C6C6C"
              strokeWidth={1.5}
              strokeLinecap="round"
            />
          </Svg>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SongInfo;

const styles = StyleSheet.create({
  name: {
    fontSize: 20,
    fontFamily: "satoshi-bold",
  },
  artist: {
    fontSize: 20,
    fontFamily: "satoshi-regular",
  },
});
