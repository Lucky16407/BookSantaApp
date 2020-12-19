import React from 'react';
import { TextInput, TouchableOpacity, TouchableHighlightComponent, Alert, ScrollView, KeyboardAvoidingView } from 'react-native';

export default class WelcomeScreen extends React.component{
    constructor(){
        super();
        this.state={
            emailID:'',
            password:'',
            confirmPassword:'',
            firstName:'',
            lastName:'',
            address:'',
            contact:'',
            isModelVisible: false
        }
    }
    
    userSignUp=(emailID,password,confirmPassword)=>{
        if(password != confirmPassword){
            Alert.alert("Error:Your passwords do not match");
        } else {
            firebase.auth().createUserWithEmailAndPassword(emailID,password)
            .then(()=>{
                db.collection('users').add({
                    first_name:this.state.firstName,
                    last_name:this.state.lastName,
                    address:this.state.address,
                    contact:this.state.contact,
                    email_id:this.state.emailID
                })
                return Alert.alert("User added sucessfully",'',[{
                    text:'Ok',
                    onPress:()=>this.setState({"isModelVisible":false})
                }])
            })
            .catch(()=>{
                var errorCode = error.code;
                var errorMessage = error.message;
                return Alert.alert(errorMessage);
            })
        }
    }

    userLogin=(emailID,password)=>{
        firebase.auth().createUserWithEmailAndPassword(emailID,password)
        .then(()=>{
            this.props.navigation.navigate('BookDonationScreen')
        })
        .catch(()=>{
            var errorCode = error.code;
            var errorMessage = error.message;
            return Alert.alert(errorMessage);
        })
    }

    showModel=()=>{
        return(
            <Modal animationType="fade" transparent={true} visible={this.state.isModelVisible}>
                <View style={styles.modelContainer}>
                    <ScrollView style={{width:'100%'}}> 
                    <KeyboardAvoidingView style={styles.KeyboardAvoidingView}>
                        <Text style={styles.modelTitle}> Registration </Text>
                        <TextInput
                        style={styles.formTextInput}
                        placeholder="First Name"
                        maxLength={8}
                        onChangeText={(text)=>{
                            this.setState({firstName:text})
                        }}
                        />
                        <TextInput
                        style={styles.formTextInput}
                        placeholder="Last Name"
                        maxLength={8}
                        onChangeText={(text)=>{
                            this.setState({lastName:text})
                        }}
                        />
                        <TextInput
                        style={styles.formTextInput}
                        placeholder="Contact"
                        maxLength={10}
                        keyboardType= {"numeric"}
                        onChangeText={(text)=>{
                            this.setState({contact:text})
                        }}
                        />
                        <TextInput
                        style={styles.formTextInput}
                        placeholder="Adress"
                        multiline={true}
                        onChangeText={(text)=>{
                            this.setState({address:text})
                        }}
                        />
                        <TextInput
                        style={styles.formTextInput}
                        placeholder="Email ID"
                        keyboardType='email-address'
                        onChangeText={(text)=>{
                            this.setState({emailID:text})
                        }}
                        />
                        <TextInput
                        style={styles.formTextInput}
                        placeholder="Password"
                        secureTextEntry={true}
                        onChangeText={(text)=>{
                            this.setState({password:text})
                        }}
                        />
                        <TextInput
                        style={styles.formTextInput}
                        placeholder="Confirm Password"
                        secureTextEntry={true}
                        onChangeText={(text)=>{
                            this.setState({confirmPassword:text})
                        }}
                        />
                        <View style={styles.modelBackButton}>
                            <TouchableOpacity style={styles.registerButton}
                            onPress={()=>{
                                this.userSignUp(this.state.emailID,this.state.password,this.state.confirmPassword);
                            }}
                            >
                                <Text style={styles.registerButtonText}>
                                    Register
                                </Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.modelBackButton}>
                            <TouchableOpacity
                            style={styles.cancelButton}
                            onPress={()=>this.setState({"isModelVisible":false})}
                            >
                                <Text style={{color:"red"}}>
                                    Cancel
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </KeyboardAvoidingView>
                    </ScrollView>
                </View>
            </Modal>
        )
    }

    render(){
        return(
            <View style={styles.container}>
                <View style={{justifyContent:'center', alignItems:'center'}}> 
                </View>
                {this.showModel()}
                <View style={{justifyContent:'center', alignItems:'center'}}> 
                <Text style={styles.title}>
                    Book Santa
                </Text>
                </View>
                <View>
                    <TextInput
                    style={styles.loginBox}
                    placeholder=" Enter Email ID Here"
                    keyboardType='email-address'
                    onChangeText={(text)=>{
                        this.setState({
                            emailID:text
                        })
                    }}
                    />
                    <TextInput
                    style={styles.loginBox}
                    placeholder="Enter Password Here"
                    secureTextEntry={true}
                    onChangeText={(text)=>{
                        this.setState({
                            password:text
                        })
                    }} 
                    />
                    <TouchableOpacity style={[styles.button,{marginBottom:20, marginTop:20}]} onPress={()=>{
                        this.userLogin(this.state.emailID, this.state.password)
                    }}>
                        <Text style={styles.buttonText}>
                            Login
                        </Text>  
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={()=>this.setState({isModelVisible:true})}>
                        <Text style={styles.buttonText}>
                            SignUp
                        </Text> 
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

const styles=StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:"#f8be85",
        alignItems:'center',
        justifyContent:'center'
    },
    title:{
        fontSize:55,
        fontWeight:300,
        paddingBottom:30,
        color:"#ff3d00"
    },
    loginBox:{
        width:300,
        height:40,
        borderBottomWidth:1.5,
        fontSize:20,
        margin:10,
        paddingLeft:10,
        borderColor:"#ff8a65"
    },
    keyboardAvoidingView:{
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    },
    modelContainer:{
        flex:1,
        borderRadius:20,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:"#ffffff",
        marginRight:30,
        marginLeft:30,
        marginTop:80,
        marginBottom:80
    },
    formTextInput:{
        width:'75%',
        height:35,
        alignSelf:'center',
        borderColor:"#ffab91",
        borderRadius:10,
        borderWidth:1,
        marginTop:20,
        padding:10
    },
    registerButton:{
        width:200,
        height:40,
        alignItems:'center',
        justifyContent:'center',
        borderWidth:1,
        borderRadius:10,
        marginTop:30
    },
    registerButtonText:{
        color:"#ff5722",
        fontSize:15,
        fontWeight:"bold",
    },
    cancelButton:{
        width:200,
        height:30,
        justifyContent:'center',
        alignItems:'center',
        marginTop:5
    },
    button:{
        width:300,
        height:50,
        justifyContent:'center',
        alignItems:'center',
        borderRadius:25,
        backgroundColor:"#ff9800",
        shadowColor:"#000000",
        shadowOffset:{
            width:0,
            height:8
        },
        shadowOpacity:0.30,
        shadowRadius:10.32,
        elevation:16,
        padding:10
    },
    buttonText:{
        fontSize:20,
        fontWeight:200,
        color:"#"
    },
})

