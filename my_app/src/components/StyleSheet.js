import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    view: {
        alignItems: "center",
        justifyContent: "space-around",
        marginVertical: 10
    },
    header: {
        fontSize: 30,
        marginBottom: 20
    },
    image: {
        height: 250,
        width: 350,
        marginBottom: 15
    },  
    input: {
        margin: 10,
        borderColor: "#000000",
        borderWidth: 1,
        alignSelf: "stretch"
    },
    subhead: {
        fontSize: 20,
        alignSelf: "center"
    },
    label: {
        fontSize: 20,
        alignSelf: "center",
        fontWeight: "bold",
    },
    buttonRow: {
        flexDirection: "row",
        marginLeft: 20,
        marginTop: 10
    },
    pickerStylesVisible: {
        width: 100
    },
    pickerStylesHidden: {
        height: 0,
        width: 0
    },
    preferencesStyleVisible: {
        fontSize: 20,
        alignSelf: "center",
        marginTop: 20
    },
    preferencesStyleHidden: {
        height: 0,
        width: 0
    },
    qtyBtn: {
        fontSize: 30
    },
    recs: {
        marginTop: 15,
        fontSize: 18,
        alignSelf: "center"
    },
    switcher: {
        marginTop: 10
    }
});

export default styles;