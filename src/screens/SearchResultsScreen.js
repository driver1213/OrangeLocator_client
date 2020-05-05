import React, { Component } from 'react';
import { View, StyleSheet, FlatList, ActivityIndicator, Alert, SafeAreaView } from 'react-native';
import { ListItem, SearchBar } from 'react-native-elements';
import { connect } from 'react-redux';
import { selectDest, addFav } from '../actions/locationActions';
import PropTypes from 'prop-types';


class SearchStoreResults extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      data: [],
      error: null,
      destInfo: [],
    };
    // console.log(this.props.data);
    this.arrayholder = this.props.data
  }

  componentDidMount() {
    // this.makeRemoteRequest();
    this.setState({
      data: this.props.data,
      loading: false,
    });
  }
  renderSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: '86%',
          backgroundColor: '#CED0CE',
          marginLeft: '14%',
        }}
      />
    );
  };
  searchFilterFunction = text => {
    this.setState({
      value: text,
    });
    const newData = this.arrayholder.filter(item => {
      const itemData = `${item.name.toUpperCase()} ${item.category.toUpperCase()}`;
      const textData = text.toUpperCase();
      return itemData.indexOf(textData) > -1;
    });
    this.setState({
      data: newData,
    });
  };
  renderHeader = () => {
    return (
      <SearchBar
        placeholder="Type Here..."
        lightTheme
        round
        onChangeText={text => this.searchFilterFunction(text)}
        autoCorrect={false}
        value={this.state.value}
      />
    );
  };
  render() {
    if (this.state.loading) {
      return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <ActivityIndicator />
        </View>
      );
    }


    return (
      <SafeAreaView style={styles.styling} >
        <SearchBar 
        placeholder="Search"
        lightTheme
        round
        onChangeText={text => this.searchFilterFunction(text)}
        autoCorrect={false}
        value={this.state.value}
      />
        <FlatList
          data={this.state.data}
          renderItem={({ item }) => (
            <ListItem
              title={`${item.name} is in category:  ${item.category}`}
              subtitle={`Phone: ${item.info.phone}`}
              // leftAvatar={{ source: { uri: item.avatar_url } }}
              onPress={() => Alert.alert(
                'New Destination',
                `Are you sure want to set "${item.name}" as new destination?`,
                [
                  { text: 'Set as "My Favorite"', onPress: () => {
                    this.props.addFav(item);
                    console.log(this.props.fav)
                    alert(`${item.name} has saved in your Fav List`);
                    console.log('Fav Saved')} },
                  {
                    text: 'Cancel',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel',
                  },
                  {
                    text: 'OK',
                    onPress: () => {
                      console.log('OK Pressed');
                      // console.log(item.name);

                      this.props.selectDest(item);
                      // console.log(this.props.destInfo);

                      this.props.navigation.navigate('Map');
                    }
                  }
                ],
                { cancelable: false },
              )
              }

            />

          )}
          keyExtractor={item => item._id}
          ItemSeparatorComponent={this.renderSeparator}
          // ListHeaderComponent={this.renderHeader}
        />
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  styling: {
      marginTop: 50
  }
})


SearchStoreResults.propTypes = {
  selectDest: PropTypes.func.isRequired,
  addFav: PropTypes.func.isRequired,
  destInfo: PropTypes.object.isRequired

};


const mapStateToProp = (state) => {
  return {
    data: state.locationReducer.data,
    destInfo: state.locationReducer.destInfo,
  }
}

// const mapDispatchToProps = (dispatch) => ({
//   // console.log("Select New Dest Updating to redux");

//   // return {
//   //   selectDest: (newDestObj) => dispatch(selectDest(newDestObj))
//   // }
// })

export default connect(mapStateToProp, { selectDest,addFav })(SearchStoreResults)