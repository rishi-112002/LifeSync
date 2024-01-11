import { useTheme } from "@react-navigation/native";
import React from "react";
import { CountryPicker } from "react-native-country-codes-picker";

function CountryCodePicker(props:{show: any , setShow: any , setCountryCode: any}){
    const {show , setShow , setCountryCode} = props
    const {colors , dark} = useTheme()
    console.log("hello from country code picker" , show)
    return (
        <CountryPicker
        show={show}
        lang={'cz'}
        style={{
            // Styles for whole modal [View]
            modal: {
                height: "80%",
                backgroundColor: colors.background,
            },
            // Styles for modal backdrop [View]
            backdrop: {
            },
            // Styles for bottom input line [View]
            line: {
                borderColor: 'pink'
            },
            // Styles for list of countries [FlatList]
            itemsList: {

            },
            // Styles for input [TextInput]
            textInput: {
                height: 50,
                borderRadius: 10,
                backgroundColor:colors.card
            },
            // Styles for country button [TouchableOpacity]
            countryButtonStyles: {
                height: 55,
                backgroundColor:colors.card
            },
            // Styles for search message [Text]
            searchMessageText: {
                color: colors.text
            },
            // Styles for search message container [View]
            countryMessageContainer: {
            },
            // Flag styles [Text]
            flag: {
                backgroundColor: colors.card,
                paddingStart: 15,

            },
            // Dial code styles [Text]
            dialCode: {
                marginStart: 5,
                color:colors.text
            },
            // Country name styles [Text]
            countryName: {
                color: colors.text
            }
        }}
        pickerButtonOnPress={(item) => {
            setCountryCode(item.dial_code);
            setShow(false);
        }}
    />
    )
}
export default CountryCodePicker;