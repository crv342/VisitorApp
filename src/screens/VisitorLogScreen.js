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
  List,
  Divider,
} from 'react-native-paper';
import {useDispatch, useSelector} from 'react-redux';
import {fetchvisitor} from '../store/actions/visitor';
import moment from 'moment';

const optionsPerPage = [2, 3, 4];
let visitorData, ascData, descData;

const VisitorLogScreen = ({navigation}) => {
  // const dispatch = useDispatch();
  let tableRow = 'even';
  const [asc, setAsc] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [visitor, setVisitor] = useState('');
  const [itemsPerPage, setItemsPerPage] = useState(optionsPerPage[0]);
  const [visible, setVisible] = useState(false);

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
  ascData = visitorsData.slice();
  // descData = visitorsData.slice().reverse();
  const [visitorData, setVisitorData] = useState(
    visitorsData.slice().reverse(),
  );

  useEffect(() => {
    setPage(0);
  }, [itemsPerPage]);

  return (
    <View style={styles.screen}>
      <Appbar.Header>
        <Appbar.Action
          icon={'menu'}
          onPress={() => navigation.toggleDrawer()}
        />
        <Appbar.Content title={'History'} />
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
                        style={styles.headerText}
                        numeric>
                        In/Out Time
                      </DataTable.Title>
                    </View>
                  </View>
                </DataTable.Header>

                {visitorData.map(item => {
                  tableRow = tableRow !== 'odd' ? 'odd' : 'even';
                  return (
                    <DataTable.Row
                      key={item.id}
                      onPress={() => showModal(item)}
                      style={
                        tableRow !== 'odd' ? styles.rowEven : styles.rowOdd
                      }>
                      <DataTable.Cell>
                        <Text numberOfLines={2}>{item.name}</Text>
                      </DataTable.Cell>
                      <DataTable.Cell numeric>
                        <View>
                          <Text style={styles.checkINText}>
                            {moment(item.checkIn).format('MMMM Do YYYY, hh:mm')}
                          </Text>
                          <Text style={styles.checkOutText}>
                            {moment(item.checkOut).format(
                              'MMMM Do YYYY, hh:mm',
                            )}
                          </Text>
                        </View>
                      </DataTable.Cell>
                    </DataTable.Row>
                  );
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
              {Object.keys(visitor).map((keyName, keyIndex) => {
                if (keyName === 'id') {
                  return;
                }
                return (
                  <View style={styles.modelText} key={keyName}>
                    <Title>{keyName}: </Title>
                    <Text style={styles.visitorDetail}>{visitor[keyName]}</Text>
                  </View>
                  // <List.Item key={keyName}>
                  //   {console.log(keyName,keyIndex)}
                  //   <Text>
                  //     {keyName}
                  //     {visitor[keyName]}
                  //   </Text>
                  // </List.Item>
                );
              })}
            </View>
          </Modal>
        </Portal>
        {/*</Provider>*/}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: 'white',
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
    // borderWidth: 2,
    borderColor: '#d0d0d0',
    borderRadius: 10,
    shadowColor: '#d0d0d0',
    // shadowOffset: {width: 2, height: 2},
    shadowOpacity: 1,
    shadowRadius: 10,
    elevation: 4,
  },
  rowOdd: {
    backgroundColor: '#fff',
  },
  rowEven: {
    backgroundColor: 'rgb(226,226,226)',
  },
  tableHeader: {
    justifyContent: 'space-around',
    flexDirection: 'row',
    fontSize: 10,
  },
  headerText: {
    // paddingLeft:20,
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
  },
  visitorDetail: {
    marginBottom: -1,
    marginLeft: 2,
  },
});

export default VisitorLogScreen;
