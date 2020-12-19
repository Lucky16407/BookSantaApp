import ReactComponent from 'react';
import {Text, TouchableOpacity, FlatList} from 'react-native';

export default class BookDonationScreen extends Component{
    constructor(){
        super();
        this.state={
            userID:firebase.auth().currentUser.email,
            requestedBooksList:[],
        }
        this.requestRef=null
    }
    
    getRequestedBooksList=()=>{
        this.requestRef=db.collection("requested_books")
        .onSnapshot((snapshot)=>{
            var requestedBooksList = snapshot.docs.map((doc)=>doc.data())
            this.setState({requestedBooksList:requestedBooksList})
        })
    }

    componentDidMount(){
        this.getRequestedBooksList();
    }

    componentWillUnmount(){
        this.requestRef();
    }

    keyExtractor=(item,index)=>index.toString()

    renderItem=({item,i})=>{
        return(
            <ListItem
            key={i}
            title={item.book_name}
            subtitle={item.reason_to_request}
            titleStyle={{color:"black", fontWeight:"bold"}}
            rightElement={
                <TouchableOpacity style={styles.button} onPress={()=>{this.props.navigation.navigate("ReceiverDetails",{"details":item})}}>
                    <Text style={{color:"#ffffff"}}>
                        View
                    </Text>
                </TouchableOpacity>
            }
            bottomDivider
            />
        )
    }
    
    render(){
        return(
            <View style={{flex:1}}>
                <MyHeader
                title = "Donate Books"
                navigation ={this.props.navigation}
                />
            
            <View> style={{flex:1}}>
                {
                this.state.requestedBooksList.length===0?(
                    <View style={styles.subContainer}>
                        <Text style={{fontSize:20}}>
                            List Of All Requested Books
                        </Text>
                    </View>  
                ):(
                    <FlatList
                    keyExtractor={this.keyExtractor}
                    data={this.state.requestedBooksList}
                    renderItem={this.renderItem}
                    />
                )
                }
            </View>
            </View>
        )
    }
}

const styles=StyleSheet.create({
    subContainer:{
        alignItems:'center',
        justifyContent:'center',
        fontSize:20,
        flex:1
    },
    button:{
        width:100,
        height:30,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:"#ff9800",
        shadowColor:"#000000",
        shadowOffset:{
            width:0,
            height:8
        },
    }    
})