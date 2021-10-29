import React, {Component} from "react"
import {View,Text,StyleSheet,Image,TouchableOpacity} from "react-native"
import {Header, AirbnbRating, Icon} from "react-native-elements"
import {RFValue} from "react-native-responsive-fontsize"
import axios from "axios"

export default class HomeScreen extends Component{
    constructor(){
        super();
        this.state={
            movieDetails:{}
        }
    }
timeConvert(n){
    var hours=Math.floor(n/60)
    var minutes=n%60
    return `${hours}hrs ${minutes} mins`
}
componentDidMount(){
    this.getMovie()
}

getMovie=()=>{
    const url="http://localhost:5000/get-movie";
    axios.get(url).then(response=>{
        let details=response.data.data
        details["duration"]=this.timeConvert(details.duration)
        this.setState({movieDetails: details})
    })
    .catch(error=>{
        console.log(error.message)
    })
}

likedMovie=()=>{
    const url="http://localhost:5000/liked-movie";
    axios.post(url).then(response=>{
    this.getMovie();
    })
    .catch(error=>{
        console.log(error.message)
    })
}

unlikedMovie=()=>{
    const url="http://localhost:5000/unliked-movie";
    axios.post(url).then(response=>{
    this.getMovie();
    })
    .catch(error=>{
        console.log(error.message)
    })
}

notWatchedMovie=()=>{
    const url="http://localhost:5000/notwatched-movie";
    axios.post(url).then(response=>{
    this.getMovie();
    })
    .catch(error=>{
        console.log(error.message)
    })
}

render(){
    const{movieDetails}=this.state;
    if(movieDetails.poster_link){
        const{
            poster_link,title,release_date,duration,rating,overview
        }=movieDetails;
        return(
            <View style={styles.container}>
                <View style={styles.headerContainer}>
                    <Header centerComponent={{text:"Movie Recommended",style:styles.headerTitle}}
                    rightComponent={{icon:"search",color:"blue"}} backgroundColor={"green"} containerStyle={{flex:1}}/>
                </View>
                    <View style={styles.subContainer}>
                        <Image style={styles.posterImage} source={{uri:poster_link}}/>
                        <View style={styles.subBottomContainer}>
                            <Text style={styles.title}>{title}</Text>
                            <Text style={styles.subtitle}>{`${release_date.split("-")[0]}| ${duration}`}</Text>
                            <View style={{flex:0.3}}>
                                <AirbnbRating
                                count={10}
                                reviews={["","","","",""]}
                                defaultRating={rating}
                                isDisabled={true}
                                size={RFValue(25)}
                                starContainerStyle={{marginTop:-30}}></AirbnbRating>

                                <View style={{flex:0.7,padding:15}}>
                                    <Text style={styles.overview}>{overview}</Text>
                                </View>
                                <TouchableOpacity onPress={this.likedMovie}>
                                    <Icon reverse name={"check"} type={"entypo"} size={RFValue(30)} color={"green"}></Icon>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={this.unlikedMovie}>
                                    <Icon reverse name={"cross"} type={"entypo"} size={RFValue(30)} color={"red"}></Icon>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.button} onPress={this.notWatchedMovie}>
                                    <Text style={styles.buttonText}>Did Not Watch</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
            </View>
        );
    }
    return null
}
}

const style=StyleSheet.create({
    container:{
        flex:1,
    },
    headerContainer:{
        flex:0.1
    },
    headerTitle:{
        color:"blue",
        fontWeight:"bold",
        fontSize:RFValue(18)
    },
    subContainer:{
        flex:0.9
    },
    posterImage:{
        width:"60%",
        height:"90%",
        resizeMode:"stretch",
        borderRadius:RFValue(30),
        marginHorizontal:RFValue(10)
    },
    subBottomContainer:{
        flex:0.6
    },
    title:{
        fontSize:RFValue(20),
        fontWeight:"bold",
        textAlign:"center",
    },
    subtitle:{
        fontSize:RFValue(14),
        fontWeight:"300"
    },
    overview:{
        fontSize:RFValue(13),
        textAlign:"center",
        fontWeight:"300",
        color:"brown"
    },
    button:{
        width:RFValue(160),
        height: RFValue(50),
        borderRadius:RFValue(20),
        justifyContent:"center",
        alignItems:"center",
        borderWidth:1,
        marginTop:RFValue(15),
    },
    buttonText:{
        fontSize:RFValue(15),
        fontWeight:"bold",
    }
})