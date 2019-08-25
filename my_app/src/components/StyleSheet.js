import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    view: {
        alignItems: "center",
        justifyContent: "space-around",
        marginVertical: 10,
        paddingBottom: 10
    },
    header: {
        fontSize: 30
    },
    image: {
        height: 250,
        width: 350,
        marginBottom: 15
    },  
    input: {
        margin: 10,
        borderColor: "black",
        borderWidth: 1,
        alignSelf: "stretch"
    },
    subhead: {
        fontSize: 20,
        alignSelf: "center"
    },
    buttonRow: {
        flexDirection: "row",
        marginLeft: 20
    },
    label: {
        marginTop: 10,
        fontSize: 18
    },
    qtyBtn: {
        fontSize: 30
    }
});

export default styles;