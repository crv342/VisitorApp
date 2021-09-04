import React, {useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {View, StyleSheet, ScrollView, Dimensions} from 'react-native';
import {
  Appbar,
  Text,
  DataTable,
  ActivityIndicator,
  Portal,
  Modal,
  Title,
  Searchbar,
  Divider,
} from 'react-native-paper';
import {useSelector} from 'react-redux';
import moment from 'moment';
import Icon from 'react-native-vector-icons/MaterialIcons';

const widthScreen = Dimensions.get('screen').width;
const capitalize = input => {
  return input
    .toLowerCase()
    .split(' ')
    .map(s => s.charAt(0).toUpperCase() + s.substring(1))
    .join(' ');
};

const VisitorLogScreen = ({navigation, route}) => {
  const {t} = useTranslation();
  const Colors = useSelector(state => state.theme.colors);
  let tableRow = 'even';
  const [asc, setAsc] = useState(true);
  const [isLoading] = useState(false);
  const [visitor, setVisitor] = useState('');
  const [visible, setVisible] = useState(false);
  const [showSearchBar, setShowSearchBar] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const onChangeSearch = query => setSearchQuery(query);

  const showModal = data => {
    setVisitor(data);
    setVisible(true);
  };
  const hideModal = () => setVisible(false);

  const visitorsData = useSelector(state => state.visitor.visitor);
  // if (!visitorsData) {
  //   return (
  //     <View>
  //       <Appbar.Header>
  //             <Appbar.Action
  //               color={'white'}
  //               icon={'menu'}
  //               onPress={() => navigation.toggleDrawer()}
  //             />
  //             <Appbar.Content title={'History'} />
  //       </Appbar.Header>
  //       <Text>no visitors found.</Text>
  //     </View>
  //   );
  // }
  const [visitorData, setVisitorData] = useState(
    visitorsData.slice().reverse(),
  );
  useEffect(() => {
    if (route.params) {
      setVisitorData(route.params.vData.slice().reverse());
      return;
    }
    if (searchQuery !== '') {
      setVisitorData(
        visitorsData
          .slice()
          .reverse()
          .filter(data =>
            data.name.toLowerCase().includes(searchQuery.toLowerCase()),
          ),
      );
    } else {
      setVisitorData(visitorsData.slice().reverse());
    }
  }, [route, searchQuery, visitorsData, navigation]);

  return (
    <View style={styles.screen}>
      <Appbar.Header>
        {showSearchBar ? (
          <>
            <Appbar.Action
              color={'white'}
              icon={'arrow-left'}
              onPress={() => {
                setShowSearchBar(false);
                setSearchQuery('');
              }}
            />
            <Searchbar
              style={styles.searchBar}
              autoCapitalize={'none'}
              placeholder="Search"
              onChangeText={onChangeSearch}
              value={searchQuery}
            />
          </>
        ) : (
          <>
            <Appbar.Action
              color={'white'}
              icon={'menu'}
              onPress={() => navigation.toggleDrawer()}
            />
            <Appbar.Content title={'History'} />
            <Appbar.Action
              icon={() => <Icon color={'white'} size={24} name={'search'} />}
              onPress={() => setShowSearchBar(true)}
            />
          </>
        )}
      </Appbar.Header>

      <ScrollView>
        <View style={styles.tableStyle}>
          <View style={styles.table}>
            {isLoading ? (
              <ActivityIndicator />
            ) : (
              <DataTable>
                <DataTable.Header>
                  <View style={{flex: 1, flexDirection: 'row'}}>
                    <View
                      style={{
                        ...styles.headerText,
                        flex: 3,
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginRight: '4%',
                      }}>
                      <DataTable.Title>Name</DataTable.Title>
                    </View>
                    <View
                      style={{
                        flex: 2,
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      <DataTable.Title
                        onPress={() => {
                          setVisitorData(visitorData.reverse());
                          setAsc(asc ? false : true);
                        }}
                        sortDirection={asc ? 'ascending' : 'descending'}
                        numeric>
                        In/Out Time
                      </DataTable.Title>
                    </View>
                  </View>
                </DataTable.Header>
                {visitorData.length === 0 && (
                  <Text style={{alignSelf: 'center', marginTop: 5}}>
                    No Visitors Found.
                  </Text>
                )}
                {visitorData &&
                  visitorData.map(item => {
                    if (item.checkOut !== undefined || true) {
                      tableRow = tableRow !== 'odd' ? 'odd' : 'even';
                      return (
                        <DataTable.Row
                          key={item.id}
                          onPress={() => showModal(item)}
                          style={
                            tableRow !== 'odd'
                              ? styles.rowEven
                              : {
                                  ...styles.rowOdd,
                                  backgroundColor: Colors.accent,
                                }
                          }>
                          <DataTable.Cell style={styles.dataTitle}>
                            <Text
                              style={{fontSize: widthScreen * 0.0361}}
                              numberOfLines={2}>
                              {item.name}
                            </Text>
                          </DataTable.Cell>
                          <DataTable.Cell numeric>
                            <View>
                              <Text style={styles.checkINText}>
                                {moment(item.checkIn).format(
                                  'MMM Do YYYY, hh:mm',
                                )}
                              </Text>
                              <Text style={styles.checkOutText}>
                                {item.checkOut !== undefined
                                  ? moment(item.checkOut).format(
                                      'MMM Do YYYY, hh:mm',
                                    )
                                  : ''}
                              </Text>
                            </View>
                          </DataTable.Cell>
                        </DataTable.Row>
                      );
                    }
                  })}
              </DataTable>
            )}
          </View>
        </View>
        <Portal>
          <Modal
            visible={visible}
            onDismiss={hideModal}
            contentContainerStyle={styles.containerStyle}>
            <View>
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginBottom: 4,
                }}>
                <Title>Visitor Details</Title>
              </View>
              <Divider />
              <DataTable>
                {Object.keys(visitor).map(keyName => {
                  if (keyName === 'id') {
                    return;
                  }
                  return (
                    <DataTable.Row key={keyName}>
                      <DataTable.Title style={styles.modalDataTitle}>
                        {capitalize(keyName)}
                      </DataTable.Title>
                      <ScrollView horizontal style={{width: '40%'}}>
                        {keyName === 'checkIn' ||
                        (keyName === 'checkOut' &&
                          visitor[keyName] !== undefined) ? (
                          <DataTable.Cell>
                            {moment(visitor[keyName]).format(
                              'MMM Do YYYY, hh:mm',
                            )}
                          </DataTable.Cell>
                        ) : (
                          <DataTable.Cell>{visitor[keyName]}</DataTable.Cell>
                        )}
                      </ScrollView>
                    </DataTable.Row>
                  );
                })}
              </DataTable>
            </View>
          </Modal>
        </Portal>
      </ScrollView>
    </View>
  );
};
const rowTable = {
  marginTop: 8,
  borderRadius: 5,
  shadowOpacity: 0.4,
  shadowOffset: {width: 1, height: 2},
  elevation: 0.3,
};
const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: 'white',
  },
  searchBar: {
    width: '85%',
  },
  containerStyle: {
    backgroundColor: 'white',
    padding: 20,
    margin: 10,
    borderRadius: 5,
  },
  tableStyle: {
    padding: 4,
    flex: 1,
  },
  table: {
    flex: 1,
    borderColor: '#d0d0d0',
    borderRadius: 10,
  },

  rowOdd: {
    ...rowTable,
    shadowColor: '#885b5b',
  },
  rowEven: {
    ...rowTable,
    backgroundColor: 'rgb(255,255,255)',
    shadowColor: 'rgba(54,66,109,0.91)',
    elevation: 1.5,
  },
  tableHeader: {
    justifyContent: 'space-around',
    flexDirection: 'row',
    fontSize: 10,
  },
  headerText: {
    fontWeight: 'bold',
  },
  checkINText: {
    color: 'green',
    marginVertical: 4,
    marginTop: 8,
    fontSize: Dimensions.get('window').width * 0.0361,
  },
  checkOutText: {
    color: 'red',
    marginBottom: 4,
    fontSize: Dimensions.get('window').width * 0.0361,
  },
  modelText: {
    flexDirection: 'row',
    alignItems: 'center',
    overflow: 'hidden',
  },
  visitorDetail: {
    marginBottom: -1,
    marginLeft: 2,
  },
  modalDataTitle: {
    maxWidth: '40%',
  },
  dataTitle: {
    fontSize: widthScreen * 0.0361,
    width: widthScreen * 0.6,
    maxWidth: widthScreen * 0.6,
  },
});

export default VisitorLogScreen;
