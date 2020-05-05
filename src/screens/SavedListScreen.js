import React, { Component } from 'react';
import { View, Text, FlatList, ActivityIndicator, Alert, SafeAreaView } from 'react-native';
import { ListItem, SearchBar } from 'react-native-elements';
import { connect } from 'react-redux';
import { addFav, delFav, selectDest } from '../actions/locationActions';
import PropTypes from 'prop-types';
import { MaterialIcons } from '@expo/vector-icons';





class SavedList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            data: [],
            error: null,
            fav: [],
        };
        this.arrayholder = this.props.fav
    }

    componentDidMount() {
        // this.makeRemoteRequest();
        this.setState({
            data: this.props.fav,
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
            <SafeAreaView style={{ flex: 1 }}>
                <FlatList
                    data={this.state.data}
                    renderItem={({ item }) => (
                        <ListItem
                            title={`${item.name} is in category:  ${item.category}`}
                            subtitle={`Phone: ${item.info.phone}`}
                            // leftAvatar={{ source: { uri: item.avatar_url } }}
                            onPress={() => Alert.alert(
                                'New Destination',
                                `What do you want do to with  "${item.name}" ?`,
                                [
                                    {
                                        text: 'Delete From "My Favorite"', onPress: () => {
                                            this.props.delFav(item);

                                            console.log('Ask me later pressed')
                                        }
                                    },
                                    {
                                        text: 'Set Destination',
                                        onPress: () => {
                                            console.log('Set from SavedList');
                                            // console.log(item.name);

                                            this.props.selectDest(item);
                                            // console.log(this.props.fav);

                                            this.props.navigation.navigate('Map');
                                        }
                                    },
                                    {
                                        text: 'Cancel',
                                        onPress: () => console.log('Cancel Pressed'),
                                        style: 'cancel',
                                    },
                                ],
                                { cancelable: false },
                            )
                            }

                        />

                    )}
                    keyExtractor={item => item._id}
                    ItemSeparatorComponent={this.renderSeparator}
                    ListHeaderComponent={this.renderHeader}
                />
            </SafeAreaView >


        );
    }
}


SavedList.navigationOptions = {
    tabBarIcon: <MaterialIcons name="favorite" color="orange" size={20} />,
    tabBarLabel: "Your Favorite"
};


SavedList.propTypes = {
    delFav: PropTypes.func.isRequired,
    fav: PropTypes.array.isRequired,
    selectDest: PropTypes.func.isRequired,
    addFav: PropTypes.func.isRequired,
    destInfo: PropTypes.object.isRequired

};

const mapStateToProp = (state) => {
    return {
        data: state.locationReducer.data,
        fav: state.locationReducer.fav,
    }
}

// const mapDispatchToProps = (dispatch) => ({
//   // console.log("Select New Dest Updating to redux");

//   // return {
//   //   addFav: (newDestObj) => dispatch(addFav(newDestObj))
//   // }
// })

export default connect(mapStateToProp, { addFav, delFav, selectDest })(SavedList)