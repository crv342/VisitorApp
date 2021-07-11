import React, {useEffect, useState} from 'react';
import {View, StyleSheet, ScrollView} from 'react-native';
import {Appbar, Text, DataTable, ActivityIndicator} from 'react-native-paper';
import {useDispatch, useSelector} from 'react-redux';
import {fetchvisitor} from '../store/actions/visitor';
import moment from 'moment';

const optionsPerPage = [2, 3, 4];

const VisitorLogScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(optionsPerPage[0]);

  useEffect(() => {
    setIsLoading(true);
    dispatch(fetchvisitor());
    setIsLoading(false);
  }, []);

  const visitorData = useSelector(state => state.visitor.visitor);

  useEffect(() => {
    setPage(0);
  }, [itemsPerPage]);

  return (
    <View>
      <Appbar.Header>
        <Appbar.Action
          icon={'menu'}
          onPress={() => navigation.toggleDrawer()}
        />
        <Appbar.Content title={'History'} />
      </Appbar.Header>
      <ScrollView>
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <DataTable>
          <DataTable.Header>
            <DataTable.Title>name</DataTable.Title>
            <DataTable.Title numeric>time</DataTable.Title>
            {/*<DataTable.Title numeric>Fat</DataTable.Title>*/}
          </DataTable.Header>

          {visitorData.map(item => (
            <DataTable.Row key={item.id}>
              <DataTable.Cell>{item.name}</DataTable.Cell>
              <DataTable.Cell numeric>
                <View>
                  <Text>
                    {moment(item.checkIn).format('MMMM Do YYYY, hh:mm')}
                  </Text>
                  <Text>
                    {moment(item.checkOut).format('MMMM Do YYYY, hh:mm')}
                  </Text>
                </View>
              </DataTable.Cell>
              {/*<DataTable.Cell numeric>{item.checkOut}</DataTable.Cell>*/}
            </DataTable.Row>
          ))}

          <DataTable.Pagination
            page={page}
            numberOfPages={3}
            onPageChange={page => setPage(page)}
            label="1-2 of 6"
            optionsPerPage={optionsPerPage}
            itemsPerPage={itemsPerPage}
            setItemsPerPage={setItemsPerPage}
            showFastPagination
            optionsLabel={'Rows per page'}
          />
        </DataTable>
      )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default VisitorLogScreen;
