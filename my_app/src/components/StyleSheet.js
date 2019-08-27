import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    view: {
        alignItems: "center",
        justifyContent: "space-around",
        marginVertical: 10
    },
    header: {
        fontSize: 30,
        marginBottom: 20,
        fontWeight: "900"
    },
    purchaseImage: {
        height: 250,
        width: 350,
        marginBottom: 15
    },  
    input: {
        margin: 10,
        borderColor: "#000000",
        borderWidth: 1,
        alignSelf: "stretch",
        height: 30,
        width: 300,
        fontSize: 20,
        alignSelf: "center",
        textAlign: "center"
    },
    subhead: {
        fontSize: 20,
        alignSelf: "center"
    },
    label: {
        fontSize: 20,
        alignSelf: "center",
        fontWeight: "600",
    },
    logoImage: {
        width: 300,
        height: 300
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
    recImage: {
        height: 200,
        width: 350,
        marginBottom: 10
    },  
    recTitle: {
        marginBottom: 5,
        marginTop: 15,
        fontSize: 20,
        fontWeight: "900",
        alignSelf: "center"
    },
    switcher: {
        marginTop: 10
    }
});

export default styles;