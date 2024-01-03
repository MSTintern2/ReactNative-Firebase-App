import { Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import firestore from '@react-native-firebase/firestore';
import database from '@react-native-firebase/database';

const App = () => {
  //add data
  const [fname, setFname] = useState('')
  const [lname, setLname] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const addData = async () => {
    try {
      database()
        .ref('/user/1')
        .set({
          fname: fname,
          lname: lname,
          email: email,
          password: password,
        });
    } catch (error) {
      console.log(error)
    }
  }
  //clear data
  const clearData = () => {
    setFname(""), setLname(""), setEmail(""), setPassword("")
  }
  //get data
  const [data, setData] = useState('')
  const getData = async () => {
    try {
      const reference = await database().ref('/user/1').once('value');
      setData(reference.val())
    } catch (error) {
      console.log(error)
    }
  }
  //remove data
  const removeData = async () => {
    try {
      await database().ref('/user/1').remove();
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <ScrollView>
      <View style={{ margin: 20, }}>
        <Text style={{ fontSize: 24, fontWeight: 'bold', color: '#4834d4', textAlign: 'center' }}>
          Form App
        </Text>
        <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#4834d4', textAlign: 'center', marginTop: 10, }}>
          React Native & Firebase
        </Text>
        <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#686de0', textAlign: 'left', marginTop: 10, }}>
          Add Data:
        </Text>
        <View style={{ marginTop: 20, }}>
          <TextInput
            placeholder='Enter first name.'
            placeholderTextColor='#535c68'
            style={{ borderColor: '#95afc0', borderWidth: 1, borderRadius: 14, padding: 10, fontSize: 18, }}
            value={fname}
            onChangeText={(text) => setFname(text)}
          />
        </View>
        <View style={{ marginTop: 20, }}>
          <TextInput
            placeholder='Enter last name.'
            placeholderTextColor='#535c68'
            style={{ borderColor: '#95afc0', borderWidth: 1, borderRadius: 14, padding: 10, fontSize: 18, }}
            value={lname}
            onChangeText={(text) => setLname(text)}
          />
        </View>
        <View style={{ marginTop: 20, }}>
          <TextInput
            placeholder='Enter email.'
            placeholderTextColor='#535c68'
            style={{ borderColor: '#95afc0', borderWidth: 1, borderRadius: 14, padding: 10, fontSize: 18, }}
            value={email}
            onChangeText={(text) => setEmail(text)}
          />
        </View>
        <View style={{ marginTop: 20, }}>
          <TextInput
            placeholder='Enter password.'
            secureTextEntry={true}
            placeholderTextColor='#535c68'
            style={{ borderColor: '#95afc0', borderWidth: 1, borderRadius: 14, padding: 10, fontSize: 18, }}
            value={password}
            onChangeText={(text) => setPassword(text)}
          />
        </View>
        <View style={{ marginTop: 20, alignSelf: "flex-end", flexDirection: 'row' }}>
          <TouchableOpacity
            style={{ backgroundColor: '#c7ecee', paddingVertical: 16, paddingHorizontal: 26, alignSelf: 'flex-start', borderRadius: 14, elevation: 2, marginRight: 10, }}
            onPress={() => clearData()}>
            <Text style={{ fontSize: 16, color: '#130f40' }}>
              Clear
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{ backgroundColor: '#7ed6df', paddingVertical: 16, paddingHorizontal: 26, alignSelf: 'flex-start', borderRadius: 14, elevation: 2 }}
            onPress={() => addData()}>
            <Text style={{ fontSize: 16, color: '#130f40' }}>
              Add
            </Text>
          </TouchableOpacity>
        </View>
        <View style={{ marginTop: 20, }}>
          <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#686de0', textAlign: 'left', }}>
            Get Data:
          </Text>
          <View style={{ backgroundColor: '#dff9fb', padding: 22, borderRadius: 12, marginTop: 12, }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 20, }}>
                <Text style={{ fontSize: 20, color: '#535c68', }}>First Name:</Text>
                <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#6ab04c', }}>{data ? data.fname : "null"}</Text></View>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 22, }}>
                <Text style={{ fontSize: 20, color: '#535c68', }}>Last Name:</Text>
                <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#6ab04c', }}>{data ? data.lname : "null"}</Text></View>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 70, }}>
                <Text style={{ fontSize: 20, color: '#535c68', }}>Email:</Text>
                <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#6ab04c', }}>{data ? data.email : "null"}</Text></View>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 30, }}>
                <Text style={{ fontSize: 20, color: '#535c68', }}>Password:</Text>
                <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#6ab04c', }}>{data ? data.password : "null"}</Text></View>
            </View>
            <View style={{ alignSelf: "flex-end", flexDirection: 'row', marginTop: 10 }}>
              <TouchableOpacity
                style={{ backgroundColor: '#f8c291', paddingVertical: 16, paddingHorizontal: 26, alignSelf: 'flex-start', borderRadius: 14, elevation: 2, marginRight: 10, }}
                onPress={() => removeData()}>
                <Image
                  style={{ width: 20, height: 20, }}
                  source={require("./DEleteIcon.png")}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={{ backgroundColor: '#7ed6df', paddingVertical: 16, paddingHorizontal: 26, alignSelf: 'flex-start', borderRadius: 14, elevation: 2, }}
                onPress={() => getData()}>
                <Text style={{ fontSize: 16, color: '#130f40' }}>
                  Get Data
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  )
}

export default App

const styles = StyleSheet.create({})