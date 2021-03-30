import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import * as Location from "expo-location";
import { getCurrentDate } from "../src/commonUtil";
import { LinearGradient } from "expo-linear-gradient";
import TypeWriter from "react-native-typewriter";

const WEATHER_API_KEY = "d5463ce650cc583333f40ffbbaa16be4";

// _S 는 state이다.
// useEffect(실행함수, [배열]);

const TodayScreen = () => {
  const [location_S, setLocation_S] = useState(null);
  const [errMsg_S, setErrMsg_S] = useState(``);

  const [viewDate, setViewDate] = useState(`0000. 00. 00 (0)`);
  const [viewTime, setviewTime] = useState(`00:00`);

  const [currentTemp, setCurrentTemp] = useState(`0`);
  const [currentCity, setCurrentCity] = useState(``);

  const [minTemp, setMinTemp] = useState(`0`);
  const [maxTemp, setMaxTemp] = useState(`0`);

  const [weatherStatus, setWeatherStatus] = useState(``);
  const [weatherImg, setweaherImg] = useState(``);

  setInterval(() => {
    const { currentDate, currentTime } = getCurrentDate();

    setViewDate(currentDate);
    setviewTime(currentTime);
  }, 1000);

  useEffect(() => {
    const { currentDate, currentTime } = getCurrentDate();

    setViewDate(currentDate);
    setviewTime(currentTime);
    (async () => {
      const { status } = await Location.requestPermissionsAsync();

      if (status !== "granted") {
        setErrMsg_S("Refuse Permission This Device.");
        return;
      }

      const locData = await Location.getCurrentPositionAsync({});
      setLocation_S(locData);

      try {
        const weather = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=${locData.coords.latitude}&lon=${locData.coords.longitude}&appid=${WEATHER_API_KEY}&units=metric`
        )
          .then((res) => {
            return res.json();
          })
          .then((json) => {
            const temp = String(json.main.temp).split(".")[0];
            const minTemp = String(json.main.temp_min).split(".")[0];
            const maxTemp = String(json.main.temp_max).split(".")[0];

            setCurrentCity(json.name);
            setCurrentTemp(temp);
            setMinTemp(minTemp);
            setMaxTemp(maxTemp);

            const status = json.weather[0].description;

            switch (status) {
              case "clear sky":
                setWeatherStatus("날씨가 좋습니다.");
                setweaherImg(
                  "https://firebasestorage.googleapis.com/v0/b/weather-d92b2.appspot.com/o/sun.png?alt=media&token=6c996a5e-0d7b-4622-a998-5ccc4f1bd648"
                );
                break;
              case "moderate rain":
                setWeatherStatus("비가 오고있습니다.");
                setweaherImg(
                  "https://firebasestorage.googleapis.com/v0/b/weather-d92b2.appspot.com/o/rain.png?alt=media&token=87455c1b-eb5a-4ece-a348-dcb53ab9d755"
                );
                break;
              case "few clouds":
                setWeatherStatus("조금 흐립니다.");
                setweaherImg(
                  "https://firebasestorage.googleapis.com/v0/b/weather-d92b2.appspot.com/o/fewCloud.png?alt=media&token=5d721bae-9fca-4a8e-a6c3-d1c5516dc39c"
                );
                break;
              case "scattered clouds":
                setWeatherStatus("구름이 많습니다.");
                setweaherImg(
                  "https://firebasestorage.googleapis.com/v0/b/weather-d92b2.appspot.com/o/clouds.png?alt=media&token=8efdb51e-f845-45eb-9eeb-0e18712e7013"
                );
                break;
              case "broken clouds":
                setWeatherStatus("비가 올 수도 있습니다.");
                setweaherImg(
                  "https://firebasestorage.googleapis.com/v0/b/weather-d92b2.appspot.com/o/blakCloud.png?alt=media&token=39446dfc-c191-4d44-a06e-a390fb73d612"
                );
                break;
              case "shower rain":
                setWeatherStatus("소나기가 오고있습니다.");
                setweaherImg(
                  "https://firebasestorage.googleapis.com/v0/b/weather-d92b2.appspot.com/o/rain.png?alt=media&token=87455c1b-eb5a-4ece-a348-dcb53ab9d755"
                );
                break;
              case "rain":
                setWeatherStatus("비가 오고있습니다.");
                setweaherImg(
                  "https://firebasestorage.googleapis.com/v0/b/weather-d92b2.appspot.com/o/rain.png?alt=media&token=87455c1b-eb5a-4ece-a348-dcb53ab9d755"
                );
                break;
              case "thunder storm":
                setWeatherStatus("번개가 치고 있습니다.");
                setweaherImg(
                  "https://console.firebase.google.com/u/0/project/weather-d92b2/storage/weather-d92b2.appspot.com/files?hl=ko"
                );
                break;
              case "snow":
                setWeatherStatus("눈이 오고있습니다");
                setweaherImg(
                  "https://firebasestorage.googleapis.com/v0/b/weather-d92b2.appspot.com/o/snow.png?alt=media&token=b6d23a53-e2cc-4553-9a16-b99ec30ee797"
                );
                break;
              case "mist":
                setWeatherStatus("안개가 꼈습니다.");
                setweaherImg(
                  "https://firebasestorage.googleapis.com/v0/b/weather-d92b2.appspot.com/o/mist.png?alt=media&token=a1a87c17-df54-4e73-a3f1-d84ed53f9231"
                );
                break;
            }
          });
      } catch (e) {
        console.log(e);
      }
    })();
  }, []);

  return (
    <View style={styles.container}>
      {/* <Text>{location_S && location_S.coords.latitude}</Text>
      <Text>{location_S && location_S.coords.longitude}</Text> */}
      <View style={styles.box_1}>
        <Text style={styles.timeText}>{viewTime}</Text>
        <Text style={styles.dateText}>{viewDate}</Text>
      </View>
      <View style={styles.box_2}>
        <Image
          style={styles.weatherImg}
          source={{
            uri:
              "https://firebasestorage.googleapis.com/v0/b/weather-d92b2.appspot.com/o/sun.png?alt=media&token=6c996a5e-0d7b-4622-a998-5ccc4f1bd648",
          }}
        />
        <Text style={styles.statusText}>
          <TypeWriter typing={1}>{weatherStatus}</TypeWriter>
        </Text>
        <Text style={styles.tempText}>{currentTemp}°C</Text>
        <View style={styles.tempUnderLine}></View>
      </View>
      <View style={styles.box_3}>
        <Text style={styles.cityText}>{currentCity}</Text>
      </View>
      <View style={styles.box_4}>
        <LinearGradient style={styles.gbox} colors={["#ffe259", "#ffa751"]} />

        {/*<View style={styles.box_4_box}>
          <Text style={styles.tempGuideText}>최저기온</Text>
          <Text style={styles.minMaxTemp}>{minTemp}°C</Text>
        </View>
        <View style={styles.box_4_box}>
          <Text style={styles.tempGuideText}>최고기온</Text>
          <Text style={styles.minMaxTemp}>{maxTemp}°C</Text>
        </View> */}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,

    alignItems: `center`,
    justifyContent: `center`,
  },

  box_1: {
    flex: 1.5,
    width: `100%`,
    flexDirection: `column`,
    alignItems: `center`,
    justifyContent: `center`,
  },

  dateText: {
    fontSize: 19,
    color: `#34495e`,
  },

  timeText: {
    fontSize: 34,
    fontWeight: `700`,
  },
  statusText: {
    marginBottom: 20,
    color: `#333`,
    fontSize: 18,
  },

  box_2: {
    flex: 3,
    width: `100%`,
    flexDirection: `column`,
    alignItems: `center`,
    justifyContent: `flex-end`,
  },

  tempText: {
    fontSize: 85,
    fontWeight: `500`,
    marginBottom: 5,
  },

  tempUnderLine: {
    width: `70%`,
    height: 10,
    backgroundColor: `#222`,
    borderRadius: 20,
    marginTop: -10,
    marginBottom: 5,
  },

  box_3: {
    flex: 1,
    width: `100%`,
    flexDirection: `column`,
    alignItems: `center`,
    justifyContent: `flex-start`,
  },

  cityText: {
    fontSize: 20,
    fontWeight: `500`,
    color: `#888`,
  },

  box_4: {
    flex: 2,
    width: `100%`,
    flexDirection: `row`,
    alignItems: `center`,
    justifyContent: `center`,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: -8,
    },
    shadowOpacity: 0.46,
    shadowRadius: 11.14,

    elevation: 17,
  },

  gbox: {
    width: "100%",
    height: "100%",
  },

  box_4_box: {
    flex: 1,
    width: `40%`,
    height: `100%`,
    alignItems: `center`,
    justifyContent: `space-around`,
  },

  tempGuideText: {
    fontSize: 26,
    fontWeight: `500`,
    padding: 5,
  },

  minMaxTemp: {
    fontSize: 20,
    fontWeight: `500`,
  },
  weatherImg: {
    width: 160,
    height: 160,
    marginBottom: 20,
  },
});

export default TodayScreen;

// 1. location (위치) 위도 , 경도를 구해야함
// ex ) 공주 , 대전

// expo install expo-location 을 하여 Location 을 install 한다.
