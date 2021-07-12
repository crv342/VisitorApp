import React, {useEffect, useState} from 'react';
import {View, StyleSheet, Dimensions, Platform} from 'react-native';
import {
  Text,
  Appbar,
  Button,
  Card,
  Title,
  ActivityIndicator,
} from 'react-native-paper';
import Colors from '../constants/Colors';
import {useDispatch, useSelector} from 'react-redux';
import {LineChart} from 'react-native-chart-kit';
import {fetchvisitor} from '../store/actions/visitor';

let h = Dimensions.get('window').height;
h = h * 0.4 - 16;
let lable = new Array(7);

let compareDate = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
var weekdays = new Array(7);
weekdays[0] = 'Sun';
weekdays[1] = 'Mon';
weekdays[2] = 'Tue';
weekdays[3] = 'Wed';
weekdays[4] = 'Thu';
weekdays[5] = 'Fri';
weekdays[6] = 'Sat';
let k = new Date().getDay();

const HomeScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const visitorData = useSelector(state => state.visitor.visitor);
  const checkedInData = useSelector(state => state.visitor.checkedInVisitors);
  const filterData = visitorData.filter(
    data => new Date(data.checkIn) > compareDate,
  );
  const todayVisitor = visitorData.filter(
    data => new Date(data.checkIn).getDate() == new Date().getDate(),
  );
  const monthVisitor = visitorData.filter(
    data => new Date(data.checkIn).getMonth() == new Date().getMonth(),
  );

  useEffect(() => {
    setIsLoading(true);
    dispatch(fetchvisitor());
    setIsLoading(false);
  }, [dispatch]);

  for (let i = 0; i <= 6; i++) {
    lable[i] = k;
    k = k === 0 ? 6 : k - 1;
  }
  let dataSet = new Array(7).fill(0);
  for (let i of filterData) {
    let index = lable.indexOf(new Date(i.checkIn).getDay());
    dataSet[index] += 1;
  }
  k = new Date().getDay();
  for (let i = 0; i <= 6; i++) {
    lable[i] = weekdays[k];
    k = k === 0 ? 6 : k - 1;
  }

  return (
    <View style={{flex: 1}}>
      <Appbar.Header>
        <Appbar.Action
          icon={'menu'}
          onPress={() => navigation.toggleDrawer()}
        />
        <Appbar.Content title={'Dashboard'} />
      </Appbar.Header>

      {isLoading ? (
        <View
          style={{
            ...styles.contentContainer,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <ActivityIndicator style={{alignSelf: 'center'}} />
        </View>
      ) : (
        <View style={styles.contentContainer}>
          <View style={styles.cardContainer}>
            <Card style={styles.cardStyle}>
              <Card.Content>
                <Title>{checkedInData.length}</Title>
                <Text>ChekedIn visitors</Text>
              </Card.Content>
            </Card>
            <Card style={styles.cardStyle}>
              <Card.Content>
                <Title>{todayVisitor.length}</Title>
                <Text>Today's visitors</Text>
              </Card.Content>
            </Card>
          </View>

          <View style={styles.cardContainer}>
            <Card style={styles.cardStyle}>
              <Card.Content>
                <Title>{monthVisitor.length}</Title>
                <Text>This month visitors</Text>
              </Card.Content>
            </Card>
            <Card style={styles.cardStyle}>
              <Card.Content>
                <Title>{visitorData.length}</Title>
                <Text>Total visitors</Text>
              </Card.Content>
            </Card>
          </View>

          <View style={styles.graphContainer}>
            <LineChart
              data={{
                labels: lable,
                datasets: [
                  {
                    data: dataSet,
                  },
                ],
              }}
              width={Dimensions.get('window').width - 16} // from react-native
              height={h}
              yAxisInterval={1} // optional, defaults to 1
              chartConfig={{
                backgroundColor: '#e26a00',
                backgroundGradientFrom: '#fb8c00',
                backgroundGradientTo: '#ffa726',
                decimalPlaces: 2, // optional, defaults to 2dp
                color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                style: {
                  borderRadius: 16,
                },
                propsForDots: {
                  r: '6',
                  strokeWidth: '2',
                  stroke: '#ffa726',
                },
              }}
              bezier
              style={{
                marginVertical: 8,
                borderRadius: 16,
              }}
            />
          </View>
        </View>
      )}
      <View style={styles.screen}>
        <View style={styles.bottomView}>
          <Button
            style={styles.bottomButton}
            color={'white'}
            onPress={() => navigation.navigate('CheckInNav')}>
            Go Back
          </Button>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    // flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: Platform.OS === 'ios' ? 20 : 0,
  },
  bottomView: {
    alignSelf: 'flex-end',
    width: '100%',
    height: 50,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 0,
  },
  bottomButton: {
    width: '100%',
    height: 50,
  },
  contentContainer: {
    flex: 1,
    marginBottom: 50,
  },
  cardContainer: {
    flex: 1,
    padding: 8,
    justifyContent: 'space-around',
    flexDirection: 'row',
  },
  cardStyle: {
    width: '48%',
    // aspectRatio:1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  graphContainer: {
    flex: 2,
    padding: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default HomeScreen;
