import React, {useEffect, useState} from 'react';
import {View, StyleSheet, Dimensions, Platform, ScrollView} from 'react-native';
import {
  Text,
  Appbar,
  Button,
  Card,
  Title,
  ActivityIndicator,
  RadioButton,
  Dialog,
  Portal,
  Divider,
} from 'react-native-paper';
import Colors from '../constants/Colors';
import {useDispatch, useSelector} from 'react-redux';
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart,
} from 'react-native-chart-kit';
import {fetchvisitor} from '../store/actions/visitor';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import moment from 'moment';

let h = Dimensions.get('window').height;
const chartWidth = Dimensions.get('window').width - 16;
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
  const hosts = useSelector(state => state.host.hosts);
  const purposes = useSelector(state => state.host.purposes);
  const [visible, setVisible] = React.useState(false);
  const [chartName, setChartName] = React.useState('bezier');

  const filterData = visitorData.filter(
    data => new Date(data.checkIn) > compareDate,
  );
  const todayVisitor = visitorData.filter(
    data => new Date(data.checkIn) >= new Date(),
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

  const showDialog = () => setVisible(true);

  const hideDialog = () => setVisible(false);

  const chartConfig = {
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
  };

  const chartData = {
    labels: lable,
    datasets: [
      {
        data: dataSet,
      },
    ],
  };
  const commitsData = new Array();
  const daysAgo = {};
  for (var i = 1; i <= 7; i++) {
    commitsData[i - 1] = {
      date: moment().subtract(i, 'days').format('YYYY-MM-DD '),
      count: dataSet[i - 1],
    };
    daysAgo[i] = moment().subtract(i, 'days').format('YYYY-MM-DD ');
  }
  const hostLable = new Array();
  const purposeLable = new Array();

  for (let i in hosts) {
    hostLable[i] = hosts[i].name;
  }
  for (let i in purposes) {
    purposeLable[i] = purposes[i].name;
  }
  let stackData = new Array(hostLable.length).fill(
    new Array(purposeLable.length).fill(0),
  );
  console.log(stackData);
  for (let d of visitorData) {
    let hIndex = hostLable.indexOf(d.host);
    let pIndex = purposeLable.indexOf(d.purpose);
    console.log(hIndex, pIndex);
    if (hIndex !== -1 && pIndex !== -1) {
      stackData[hIndex][pIndex]++;
    }
    console.log(stackData);
  }
  console.log('this---', hostLable, purposeLable, stackData, '----!');
  // const data = {
  //   labels: hostLable,
  //   legend: purposeLable,
  //   data: stackData,
  //   barColors: ['#ced6e0', '#a4b0be'],
  // };
  const data = {
    labels: ['Test1', 'Test2'],
    legend: ['L1', 'L2', 'L3'],
    data: [
      [60, 60, 60],
      [30, 30, 60],
    ],
    barColors: ['#dfe4ea', '#ced6e0', '#a4b0be'],
  };

  const commitsDat = [
    {date: '2017-01-02', count: 1},
    {date: '2017-01-03', count: 2},
    {date: '2017-01-04', count: 3},
    {date: '2017-01-05', count: 4},
    {date: '2017-01-06', count: 5},
    {date: '2017-01-30', count: 2},
    {date: '2017-01-31', count: 3},
    {date: '2017-03-01', count: 2},
    {date: '2017-04-02', count: 4},
    {date: '2017-03-05', count: 2},
    {date: '2017-02-30', count: 4},
  ];

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
          <ScrollView>
            <View style={styles.cardContainer}>
              <Card
                style={styles.cardStyle}
                onPress={() =>
                  navigation.navigate('CheckInNav', {
                    screen: 'CheckOut',
                  })
                }>
                <Card.Content>
                  <Title>{checkedInData.length}</Title>
                  <Text>Visitors Checked In</Text>
                </Card.Content>
              </Card>
              <Card
                style={styles.cardStyle}
                onPress={() =>
                  navigation.navigate('Visitor Log', {vData: todayVisitor})
                }>
                <Card.Content>
                  <Title>{todayVisitor.length}</Title>
                  <Text>Today's visitors</Text>
                </Card.Content>
              </Card>
            </View>

            <View style={styles.cardContainer}>
              <Card
                style={styles.cardStyle}
                onPress={() =>
                  navigation.navigate('Visitor Log', {vData: monthVisitor})
                }>
                <Card.Content>
                  <Title>{monthVisitor.length}</Title>
                  <Text>This month visitors</Text>
                </Card.Content>
              </Card>
              <Card
                style={styles.cardStyle}
                onPress={() =>
                  navigation.navigate('Visitor Log', {vData: visitorData})
                }>
                <Card.Content>
                  <Title>{visitorData.length}</Title>
                  <Text>Total visitors</Text>
                </Card.Content>
              </Card>
            </View>

            <Button
              icon={({size, color}) => (
                <Icon color={color} size={24} name={'menu-down'} />
              )}
              contentStyle={styles.b}
              style={styles.dialogShowButton}
              onPress={showDialog}>
              Select Chart
              {/*<Icon size={20} name={'menu-down'} />*/}
            </Button>
            <Portal>
              <Dialog visible={visible} onDismiss={hideDialog}>
                <Dialog.Title>Select Chart</Dialog.Title>
                <Divider />
                <Dialog.Content>
                  <RadioButton.Group
                    onValueChange={newValue => {
                      setChartName(newValue);
                      hideDialog();
                    }}
                    value={chartName}>
                    <RadioButton.Item label="Bezier Chart" value="bezier" />
                    <RadioButton.Item label="Line Chart" value="line" />
                    <RadioButton.Item label="Bar Chart" value="bar" />
                    <RadioButton.Item
                      label={'Contribution Chart'}
                      value={'contribution'}
                    />
                  </RadioButton.Group>
                </Dialog.Content>
                {/*<Divider />*/}
                {/*<Dialog.Actions>*/}
                {/*  <Button onPress={hideDialog}>Cancel</Button>*/}
                {/*  <Button onPress={hideDialog}>Ok</Button>*/}
                {/*</Dialog.Actions>*/}
              </Dialog>
            </Portal>
            <View style={styles.graphContainer}>
              {(chartName === 'line' || chartName === 'bezier') && (
                <LineChart
                  bezier={chartName === 'bezier' && true}
                  data={chartData}
                  width={chartWidth} // from react-native
                  height={h}
                  yAxisInterval={1} // optional, defaults to 1
                  chartConfig={chartConfig}
                  style={styles.chartStyle}
                />
              )}

              {chartName === 'bar' && (
                <BarChart
                  style={styles.chartStyle}
                  data={chartData}
                  width={chartWidth}
                  height={h}
                  yAxisLabel="$"
                  chartConfig={chartConfig}
                  verticalLabelRotation={30}
                />
              )}

              {chartName === 'contribution' && (
                <ContributionGraph
                  values={commitsData}
                  endDate={compareDate}
                  numDays={105}
                  width={chartWidth}
                  height={220}
                  chartConfig={chartConfig}
                />
              )}
            </View>
            <View style={styles.graphContainer}>
              <StackedBarChart
                style={styles.chartStyle}
                data={data}
                width={chartWidth}
                height={h}
                chartConfig={chartConfig}
              />
            </View>
          </ScrollView>
        </View>
      )}
      <View style={styles.screen}>
        <View style={styles.bottomView}>
          <Button
            style={styles.bottomButton}
            color={'white'}
            onPress={() =>
              navigation.navigate('CheckInNav', {Screen: 'CheckOut'})
            }>
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
    // aspectRatio: 0.5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  graphContainer: {
    flex: 2,
    padding: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  chartStyle: {
    marginVertical: 8,
    borderRadius: 16,
  },
  optionView: {
    flexDirection: 'row',
  },
  dialogShowButton: {
    width: 200,
    alignSelf: 'center',
    marginBottom: 5,
  },
  b: {
    flexDirection: 'row-reverse',
    // backgroundColor: 'white',
  },
});

export default HomeScreen;
