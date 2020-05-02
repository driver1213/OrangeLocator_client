import React, { Component } from 'react'
import { View, StyleSheet, Text } from 'react-native';
import { connect } from 'react-redux';

class SearchResultsScreen extends Component {


  constructor(props) {
    super(props)
    this.state = {
      data: [
        {
          "_id": "5ea9cf9b72593a331a1f41b5",
          "name": "La Dolce Vita Cafe",
          "info": {
            "phone": "(713) 652-3197",
            "address": "1600 Smith St, Tunnel Level, Houston, TX 77002"
          },
          "macAddress": "",
          "imgUrl": "",
          "category": "Food",
          "locations": [
            {
              "x": "25%",
              "y": "53.5%",
              "latitude": "29.7544285",
              "longitude": "-95.3748376"
            }
          ]
        },

      ],

      loading: true,

    }
  }


  componentWillMount() {
    fetch('http://192.168.31.43:3000/stores')
      .then(results => results.json())
      .then(data => {
        this.setState({
          data: data.data,
          loading: false
        })
      });
  }


  render() {

    if (this.state.loading) {
      return (<View><Text>Data Loading</Text></View>)
    }
    else
      console.log(this.state.data);
    // console.log(this.state.data[1].info.phone); //timing problem

    // setTimeout(() => {
    //   console.log("0000000000000000000000000000000000000000");
    //   console.log(this.state.data[3].name);
    //   console.log(this.state.data[1].info.phone);
    //   console.log(this.state.data[1].info.address);
    //   let shopAddress = () => {
    //     return this.state.data[1].info.address
    //   };

    // }, 500);

    console.log("++++++++++++++++++++++++++++++++++++++++++++")

    // searchCases = (e) => {
    //   let keyword = e.target.value;
    //   this.setState({
    //     search: keyword
    //   })
    // }

    return (

      <View>
        <Text>Test State</Text>


        {/* <FlatList
          data={this.state.data}
          keyExtractor={(i) => i}
          renderItem={({ store }) =>
            <Text>
              {`${store.name} 
              `
              }
            </Text>}
        /> */}


        <Text>{this.state.data[0].name}</Text>
        <Text>{this.state.data[2].name}</Text>
        {/* <Text>{shopAddress}</Text> */}
        {/* <Text>{ setTimeout(()=>{shopAddress()},1000) }</Text> */}
      </View>

    )
  }
}

export default SearchResultsScreen





///////////////////////


// class StillMapScreen extends React.Component {
//     constructor(props) {
//       super(props)
//       this.state = {

//         loading: false,

//         currentX: 100,
//         currentY: 300,

//         destX: "50%",
//         destY: "60%",

//         focusX: 0,
//         focusY: 0,

//         currentZoom: 1,
//         iconZoomedSize: 33,

//         data: [],
//       }
//     }

//     // componentDidMount() {
//     //   fetch('http://192.168.31.43:3000/stores')
//     //     .then(results => results.json())
//     //     .then(data => {
//     //       this.setState({
//     //         data: data.data
//     //       })
//     //     });
//     // }

//     componentWillMount(){
//       this.fetchData();
//     }

//    fetchData = async () =>{
//      const res = await fetch('http://192.168.31.43:3000/stores');
//      const json=await res.json();
//      this.setState({data: json.data});
//    }



////////////search example///////////////

// ////after load state, 
// //////insside of render before return///////////////
// searchCases = (e) => {
//     let keyword = e.target.value;
//     this.setState({
//         search: keyword
//     })
// }


// if (this.state.loading) {
//     return (<div>Data Loading</div>)
// }
// else

//     console.log("==============app props==============");

// let gData = this.state.allRegions.Global;
// console.log(gData.TotalConfirmed);




// const countryTable = () => {

//     let regionSet = this.state.allRegions.Countries.filter(region => {
//         if (this.state.search == null) return this.state.allRegions.Countries
//         else if (region.Country.toLowerCase().includes(this.state.search.toLowerCase())) return region

//     });

// ///////////inside of return////////////

// <input type="text" placeholder="Enter search term" className="text-warning form-control form-control-sm p-3" onChange={e => this.searchCases(e)} />
// ////////////////////

