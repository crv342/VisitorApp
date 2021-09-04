import React, {useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
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
  Modal,
} from 'react-native-paper';
import {useDispatch, useSelector} from 'react-redux';
import {
  LineChart,
  BarChart,
  PieChart,
  ContributionGraph,
  StackedBarChart,
} from 'react-native-chart-kit';
import {fetchvisitor} from '../store/actions/visitor';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import moment from 'moment';
import CustomSwitch from '../components/CustomSwitch3';
import {ColorPicker} from 'react-native-color-picker';
import CustomColorPicker from '../components/CustomColorPicker';
import {updateChartColor} from '../store/actions/theme';

let h = Dimensions.get('window').height;
const chartWidth = Dimensions.get('window').width - 16;
h = h * 0.4 - 16;
let lable = new Array(7);

let compareDate = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
let weekdays = new Array(7);
weekdays[0] = 'Sun';
weekdays[1] = 'Mon';
weekdays[2] = 'Tue';
weekdays[3] = 'Wed';
weekdays[4] = 'Thu';
weekdays[5] = 'Fri';
weekdays[6] = 'Sat';
let k = new Date().getDay();

const HomeScreen = ({navigation}) => {
  const {t} = useTranslation();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const visitorData = useSelector(state => state.visitor.visitor);
  const checkedInData = useSelector(state => state.visitor.checkedInVisitors);
  const hosts = useSelector(state => state.host.hosts);
  const purposes = useSelector(state => state.host.purposes);
  const Colors = useSelector(state => state.theme.colors);
  const chartColors = useSelector(state => state.theme.chartColors);
  const [visible, setVisible] = useState(false);
  const [pickerVisible, setPickerVisible] = useState(false);
  const [colorChangeVisible, setColorChangeVisible] = useState(false);
  const [chartName, setChartName] = useState('bezier');
  const [gradientStartColor, setGradientStartColor] = useState(
    chartColors.bezier.gradientStart,
  );
  const [gradientEndColor, setGradientEndColor] = useState(
    chartColors.bezier.gradientEnd,
  );
  const [stroke, setStroke] = useState(chartColors.bezier.stroke);
  const [chartShadowColor] = useState(Colors.accent);
  const [switchValue, setSwitchValue] = useState(1);
  const [selectedColor, setSelectedColor] = useState('');
  const colorArray = [
    '#e26a00',
    '#69e200',
    '#0066e2',
    '#a600e2',
    '#e2002d',
    '#00c8e2',
  ];

  const filterData = visitorData.filter(
    data => new Date(data.checkIn) > compareDate,
  );
  const todayVisitor = visitorData.filter(
    data => new Date(data.checkIn).toDateString() == new Date().toDateString(),
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

  const showColorModal = () => setPickerVisible(true);
  const hideColorModal = () => setPickerVisible(false);

  const radioButtonHandler = value => {
    setSwitchValue(1);
    setSelectedColor(chartColors[value].gradientStart);
    setGradientStartColor(chartColors[value].gradientStart);
    setGradientEndColor(chartColors[value].gradientEnd);
    setStroke(chartColors[value].stroke);
    setChartName(value);
    hideDialog();
  };

  const onSelectSwitch = index => {
    setSwitchValue(index);
    if (switchValue === 1) {
      setSelectedColor(gradientStartColor);
    } else if (switchValue === 2) {
      setSelectedColor(gradientEndColor);
    } else {
      setSelectedColor(stroke);
    }
  };

  const onColorSelect = color => {
    if (chartName === 'bezier') {
      if (switchValue === 1) {
        dispatch(
          updateChartColor({
            ...chartColors,
            bezier: {...chartColors.bezier, gradientStart: color},
          }),
        );
        setGradientStartColor(color);
      } else if (switchValue === 2) {
        dispatch(
          updateChartColor({
            ...chartColors,
            bezier: {...chartColors.bezier, gradientEnd: color},
          }),
        );
        setGradientEndColor(color);
      } else {
        dispatch(
          updateChartColor({
            ...chartColors,
            bezier: {...chartColors.bezier, stroke: color},
          }),
        );
        setStroke(color);
      }
    } else if (chartName === 'line') {
      if (switchValue === 1) {
        dispatch(
          updateChartColor({
            ...chartColors,
            line: {...chartColors.line, startGradient: color},
          }),
        );
        setGradientStartColor(color);
      } else if (switchValue === 2) {
        dispatch(
          updateChartColor({
            ...chartColors,
            line: {...chartColors.line, gradientEnd: color},
          }),
        );
        setGradientEndColor(color);
      } else {
        dispatch(
          updateChartColor({
            ...chartColors,
            line: {...chartColors.line, stroke: color},
          }),
        );
        setStroke(color);
      }
    } else if (chartName === 'bar') {
      if (switchValue === 1) {
        dispatch(
          updateChartColor({
            ...chartColors,
            bar: {...chartColors.bar, gradientStart: color},
          }),
        );
        setGradientStartColor(color);
      } else if (switchValue === 2) {
        dispatch(
          updateChartColor({
            ...chartColors,
            bar: {...chartColors.bar, gradientEnd: color},
          }),
        );
        setGradientEndColor(color);
      } else {
        dispatch(
          updateChartColor({
            ...chartColors,
            bar: {...chartColors.bar, stroke: color},
          }),
        );
        setStroke(color);
      }
    } else {
      if (switchValue === 1) {
        dispatch(
          updateChartColor({
            ...chartColors,
            contribution: {...chartColors.contribution, gradientStart: color},
          }),
        );
        setGradientStartColor(color);
      } else if (switchValue === 2) {
        dispatch(
          updateChartColor({
            ...chartColors,
            contribution: {...chartColors.contribution, gradientEnd: color},
          }),
        );
        setGradientEndColor(color);
      } else {
        dispatch(
          updateChartColor({
            ...chartColors,
            contribution: {...chartColors.contribution, stroke: color},
          }),
        );
        setStroke(color);
      }
    }
  };

  const btrColorHandler = color => {
    if (color === '#ffffff') {
      showColorModal();
    }
    setSelectedColor(color);
    onColorSelect(color);
  };

  const colorHandler = color => {
    hideColorModal();
    onColorSelect(color);
  };

  const chartConfig = {
    backgroundColor: gradientStartColor,
    backgroundGradientFrom: gradientStartColor,
    backgroundGradientTo: gradientEndColor,
    decimalPlaces: 0, // optional, defaults to 2dp
    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    style: {
      borderRadius: 16,
    },
    propsForDots: {
      r: '6',
      strokeWidth: '2',
      stroke: stroke,
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
  for (let d of visitorData) {
    let hIndex = hostLable.indexOf(d.host);
    let pIndex = purposeLable.indexOf(d.purpose);
    if (hIndex !== -1 && pIndex !== -1) {
      stackData[hIndex][pIndex]++;
    }
  }

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
  const p = new Array();
  const c = new Array();
  for (let v of visitorData) {
    if (!p.includes(v.purpose)) {
      p.push(v.purpose);
      c.push(0);
    }
    let i = p.indexOf(v.purpose);
    if (i !== -1) {
      c[i] += 1;
    }
  }
  const pieChart = new Array();
  for (let i in p) {
    pieChart.push({
      name: p[i],
      visitors: c[i],
      color: colorArray[i],
      legendFontColor: '#7F7F7F',
      legendFontSize: 15,
    });
  }

  return (
    <View style={{flex: 1}}>
      <Appbar.Header>
        <Appbar.Action
          icon={'menu'}
          onPress={() => navigation.toggleDrawer()}
        />
        <Appbar.Content title={t('Dashboard')} />
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
                  <Text>{t('Visitors Checked In')}</Text>
                </Card.Content>
              </Card>
              <Card
                style={styles.cardStyle}
                onPress={() =>
                  navigation.navigate('Visitor Log', {vData: todayVisitor})
                }>
                <Card.Content>
                  <Title>{todayVisitor.length}</Title>
                  <Text>{t("Today's Visitors")}</Text>
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
                  <Text>{t('This Month Visitors')}</Text>
                </Card.Content>
              </Card>
              <Card
                style={styles.cardStyle}
                onPress={() =>
                  navigation.navigate('Visitor Log', {vData: visitorData})
                }>
                <Card.Content>
                  <Title>{visitorData.length}</Title>
                  <Text>{t('Total Visitors')}</Text>
                </Card.Content>
              </Card>
            </View>

            <View style={styles.chartButtonContainer}>
              <Button
                icon={({color}) => (
                  <Icon color={color} size={24} name={'menu-down'} />
                )}
                contentStyle={styles.b}
                style={styles.dialogShowButton}
                onPress={showDialog}>
                {t('Select Chart')}
              </Button>
              <Entypo
                size={21}
                color={Colors.primary}
                style={{
                  marginRight: 20,
                  transform: colorChangeVisible
                    ? [{rotateX: '180deg'}]
                    : [{rotateX: '0deg'}],
                }}
                name={'colours'}
                onPress={() =>
                  setColorChangeVisible(colorChangeVisible ? false : true)
                }
              />
            </View>
            {colorChangeVisible && (
              <View>
                <View style={{alignItems: 'center'}}>
                  <CustomSwitch
                    selectionMode={switchValue}
                    roundCorner={true}
                    option1={'Gradient Start'}
                    option2={'Gradient End'}
                    option3={'Stroke'}
                    onSelectSwitch={onSelectSwitch}
                    selectionColor={Colors.primary}
                  />
                </View>
                <CustomColorPicker
                  colors={[
                    '#F44336',
                    '#E91E63',
                    '#9C27B0',
                    '#673AB7',
                    '#3F51B5',
                    '#2196F3',
                    '#03A9F4',
                    '#00BCD4',
                    '#009688',
                    '#4CAF50',
                    '#8BC34A',
                    '#CDDC39',
                    '#FFEB3B',
                    '#FFC107',
                    '#FF9800',
                    '#FF5722',
                    '#795548',
                    '#9E9E9E',
                    '#607D8B',
                    '#ffffff',
                  ]}
                  selectedColor={selectedColor}
                  onSelect={selectedColor => btrColorHandler(selectedColor)}
                />
              </View>
            )}

            <Portal>
              <Dialog visible={visible} onDismiss={hideDialog}>
                <Dialog.Title>{t('Select Chart')}</Dialog.Title>
                <Divider />
                <Dialog.Content>
                  <RadioButton.Group
                    onValueChange={newValue => {
                      radioButtonHandler(newValue);
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
              </Dialog>
            </Portal>
            <Portal>
              <Modal
                style={{flex: 1}}
                visible={pickerVisible}
                onDismiss={hideColorModal}
                contentContainerStyle={{
                  ...styles.containerStyle,
                  height: '50%',
                  backgroundColor: '#dedede',
                }}>
                <ColorPicker
                  onColorSelected={color => colorHandler(color)}
                  style={{flex: 1}}
                />
              </Modal>
            </Portal>
            <View
              style={{...styles.graphContainer, shadowColor: chartShadowColor}}>
              {(chartName === 'line' || chartName === 'bezier') && (
                <LineChart
                  bezier={chartName === 'bezier' && true}
                  data={chartData}
                  width={chartWidth}
                  height={h}
                  yAxisInterval={1}
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
                  withVerticalLabels={true}
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

            <View
              style={{...styles.graphContainer, shadowColor: chartShadowColor}}>
              <PieChart
                style={styles.pieChart}
                data={pieChart}
                width={chartWidth}
                height={220}
                chartConfig={chartConfig}
                accessor={'visitors'}
                paddingLeft={'15'}
                absolute
              />
            </View>
            <View
              style={{...styles.graphContainer, shadowColor: chartShadowColor}}>
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
        <View style={{...styles.bottomView, backgroundColor: Colors.primary}}>
          <Button
            style={styles.bottomButton}
            color={Colors.text}
            onPress={() =>
              navigation.navigate('CheckInNav', {Screen: 'CheckOut'})
            }>
            {t('Go Back')}
          </Button>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: Platform.OS === 'ios' ? 20 : 0,
  },
  bottomView: {
    alignSelf: 'flex-end',
    width: '100%',
    height: 50,
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
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#664b4b',
    shadowOffset: {height: 1, width: 1},
    shadowOpacity: 0.5,
    shadowRadius: 4,
  },
  chartButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  graphContainer: {
    flex: 2,
    height: h,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#c6c0c0',
    shadowOffset: {height: 1.5, width: 1.5},
    shadowOpacity: 3,
    shadowRadius: 8,
    elevation: 3,
    backgroundColor: 'white',
    borderRadius: 16,
    margin: 8,
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
  },
  pieChart: {
    shadowColor: '#a4a4a4',
    shadowOffset: {height: 2, width: 2},
    shadowOpacity: 2,
    shadowRadius: 3,
  },
  containerStyle: {
    backgroundColor: 'white',
    padding: 20,
    margin: 10,
    borderRadius: 5,
  },
});

export default HomeScreen;
