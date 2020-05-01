import React from 'react'
import { View, StyleSheet, Text } from 'react-native'

const SearchResultsScreen = () => {
    return <Text style={{ fontSize: 48 }}>Tracklist Screen</Text> 
}

const styles = StyleSheet.create({})



export default SearchResultsScreen





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

