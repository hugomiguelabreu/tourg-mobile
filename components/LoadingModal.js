import React from "react";
import {ActivityIndicator, Modal, View} from "react-native";

export default class LoadingModal extends React.Component{

    render(){
        return(
            <Modal
                transparent={true}
                visible={true}
                onRequestClose={() => {}}>
                <View style={{flex: 1, alignItems: 'center', flexDirection: 'column', justifyContent: 'space-around', backgroundColor: '#00000040'}}>
                    <View style={{backgroundColor: '#FFFFFF', height: 100, width: 100, borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'space-around'}}>
                        <ActivityIndicator size='large' color='#2E3C58'/>
                    </View>
                </View>
            </Modal>
        );
    }

}