import React, {useEffect, useState} from 'react';
import {View, StyleSheet, ScrollView, Dimensions} from 'react-native';
import {
  Appbar,
  Text,
  DataTable,
  ActivityIndicator,
  Portal,
  Modal,
  Button,
  Provider,
  Title,
  Searchbar,
  Divider,
} from 'react-native-paper';
import {useDispatch, useSelector} from 'react-redux';
import {fetchvisitor} from '../store/actions/visitor';
import moment from 'moment';
import Colors from '../constants/Colors';
import Icon from 'react-native-vector-icons/MaterialIcons';

const optionsPerPage = [2, 3, 4];
const widthScreen = Dimensions.get('screen').width;
const capitalize = input => {
  return input
    .toLowerCase()
    .split(' ')
    .map(s => s.charAt(0).toUpperCase() + s.substring(1))
    .join(' ');
};

const VisitorLogScreen = ({navigation, route}) => {
  // const dispatch = useDispatch();
  let tableRow = 'even';
  const [asc, setAsc] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [visitor, setVisitor] = useState('');
  const [itemsPerPage, setItemsPerPage] = useState(optionsPerPage[0]);
  const [visible, setVisible] = useState(false);
  const [showSearchBar, setShowSearchBar] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const onChangeSearch = query => setSearchQuery(query);

  const showModal = data => {
    setVisitor(data);
    setVisible(true);
  };
  const hideModal = () => setVisible(false);

  useEffect(() => {
    setIsLoading(true);
    // dispatch(fetchvisitor());
    setIsLoading(false);
  }, []);
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

  useEffect(() => {
    setPage(0);
  }, [itemsPerPage]);

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
              icon={({size, color}) => (
                <Icon
                  color={'white'}
                  size={24}
                  name={'search'}
                  // style={{width: size, height: size, tintColor: color}}
                />
              )}
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
                            tableRow !== 'odd' ? styles.rowEven : styles.rowOdd
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
                                  'MMMM Do YYYY, hh:mm',
                                )}
                              </Text>
                              <Text style={styles.checkOutText}>
                                {item.checkOut !== undefined
                                  ? moment(item.checkOut).format(
                                      'MMMM Do YYYY, hh:mm',
                                    )
                                  : ''}
                              </Text>
                            </View>
                          </DataTable.Cell>
                        </DataTable.Row>
                      );
                    }
                  })}
                {/*<DataTable.Pagination*/}
                {/*  page={page}*/}
                {/*  numberOfPages={3}*/}
                {/*  onPageChange={page => setPage(page)}*/}
                {/*  label="1-2 of 6"*/}
                {/*  optionsPerPage={optionsPerPage}*/}
                {/*  itemsPerPage={itemsPerPage}*/}
                {/*  setItemsPerPage={setItemsPerPage}*/}
                {/*  showFastPagination*/}
                {/*  optionsLabel={'Rows per page'}*/}
                {/*/>*/}
              </DataTable>
            )}
          </View>
        </View>
        {/*<Provider>*/}
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
                {Object.keys(visitor).map((keyName, keyIndex) => {
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
                              'MMMM Do YYYY, hh:mm',
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
              {/*</ScrollView>*/}
            </View>
          </Modal>
        </Portal>
        {/*</Provider>*/}
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
    // shadowColor: '#d0d0d0',
    // shadowOpacity: 1,
    // shadowRadius: 10,
    // elevation: 4,
  },

  rowOdd: {
    ...rowTable,
    backgroundColor: Colors.accent,
    shadowColor: '#885b5b',
    // elevation: 1.5,
  },
  rowEven: {
    ...rowTable,
    // backgroundColor: 'rgb(226,226,226)',
    backgroundColor: 'rgb(243,243,255)',
    shadowColor: 'rgba(54,66,109,0.91)',
    elevation: 3,
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
