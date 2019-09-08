import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    divider: {
        color: "black",
        fontSize: 20,
        fontFamily: "Futura",
        marginLeft: 4
    },
    view: {
        alignItems: "center",
        justifyContent: "space-around",
        marginVertical: 10
    },
    header: {
        fontSize: 28,
        marginBottom: 20,
        fontFamily: "Futura",
        fontWeight: "900"
    },
    listStyleVisible: {
 
    },
    listStyleHidden: {
        height: 0,
        width: 0
    },
    header: {
        fontSize: 28,
        marginBottom: 20,
        fontFamily: "Futura",
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
        textAlign: "center",
        fontFamily: "Futura"
    },
    numInput: {
        margin: 8,
        borderColor: "#000000",
        borderWidth: 1,
        fontSize: 18,
        height: 28,
        width: 28,
        textAlign: "center"
    },
    subhead: {
        fontSize: 20,
        fontFamily: "Futura",
        alignSelf: "center",
        marginBottom: 10
    },
    label: {
        fontSize: 20,
        fontFamily: "Futura",
        alignSelf: "center",
        fontWeight: "900",
    },
    logoImage: {
        width: 300,
        height: 300
    },
    buttonRow: {
        justifyContent: "center",
        flexDirection: "row",
        marginLeft: 10,
        marginTop: 10
    },
    messageActions: {
        marginLeft: 5,
        fontFamily: "Futura",
        fontSize: 10
    }, 
    messageImage: {
        height: 100,
        width: 100,
        marginBottom: 10
    },
    messageTextRead: {
        marginBottom: 5,
        fontFamily: "Futura",
        fontSize: 20,
        alignSelf: "center"
    },  
    messageTextUnread: {
        marginBottom: 5,
        fontFamily: "Futura",
        fontSize: 20,
        alignSelf: "center"
    },  
    messageTitleRead: {
        marginBottom: 5,
        fontFamily: "Futura",
        fontSize: 25,
        alignSelf: "center"
    },
    messageTitleUnread: {
        marginBottom: 5,
        fontFamily: "Futura",
        fontSize: 25,
        alignSelf: "center"
    },
    messagesRead: {
        borderColor: "black",
        borderWidth: 1,
        width: 400,
        backgroundColor: "white"
    },
    messagesUnread: {
        borderColor: "black",
        borderWidth: 1,
        width: 400,
        backgroundColor: "rgb(0, 124, 170)"
    },
    messagesHidden: {
        height: 0,
        width: 0
    },
    pickerStylesVisible: {
        alignSelf: "center",
        fontFamily: "Futura",
        width: 100
    },
    pickerStylesHidden: {
        height: 0,
        width: 0
    },
    preferencesStyleVisible: {
        fontSize: 20,
        fontFamily: "Futura",
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
        marginTop: 40,
        fontFamily: "Futura",
        fontSize: 25,
        fontWeight: "900",
        alignSelf: "center"
    },
    recTitleTwo: {
        marginBottom: 5,
        marginTop: 40,
        fontFamily: "Futura",
        fontSize: 20,
        fontWeight: "900",
        alignSelf: "center"
    },
    switcher: {
        marginTop: 10
    },
    customButton: {
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "rgb(0, 124, 170)",
        color: "white",
        borderRadius: 12,
        marginTop: 20,
        paddingLeft: 30,
        paddingRight: 30,
        paddingTop: 2,
        paddingBottom: 2,
        fontSize: 20,
        fontFamily: "Futura"
    },
    subButton: {
        textAlign: "center",
        justifyContent: "center",
        backgroundColor: "rgb(0, 153, 0)",
        color: "white",
        borderRadius: 12,
        marginTop: 10,
        paddingLeft: 30,
        paddingRight: 30,
        paddingTop: 2,
        fontSize: 20,
        fontFamily: "Futura",
        width: 160
    },
    unsubButton: {
        textAlign: "center",
        justifyContent: "center",
        backgroundColor: "rgb(211, 211, 211)",
        color: "white",
        borderRadius: 12,
        marginTop: 10,
        paddingLeft: 30,
        paddingRight: 30,
        paddingTop: 2,
        fontSize: 20,
        fontFamily: "Futura",
        width: 160
    },
    textButton: {
        color: "rgb(0, 102, 204)",
        fontSize: 20,
        fontFamily: "Futura",
        marginLeft: 4
    },
    textButtonLogin: {
        color: "rgb(0, 124, 170)",
        fontSize: 15,
        fontFamily: "Futura",
        marginLeft: 5,
        marginTop: 15
    },   
    toHome: {
        width: 300
    },
    toPref: {
        justifyContent: "center",
        width: 130,
        marginLeft: 10
    },
    resetButton: {
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "rgb(168, 0, 0)",
        color: "white",
        borderRadius: 12,
        marginTop: 20,
        paddingLeft: 30,
        paddingRight: 30,
        paddingTop: 2,
        paddingBottom: 2,
        fontSize: 20,
        fontFamily: "Futura"
    },
    excellentButton: {
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "rgb(0, 204, 0)",
        color: "white",
        borderRadius: 12,
        marginTop: 20,
        paddingLeft: 30,
        paddingRight: 30,
        paddingTop: 2,
        paddingBottom: 2,
        fontSize: 20,
        fontFamily: "Futura"
    },
    aboveAverageButton: {
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "rgb(143, 216, 47)",
        color: "white",
        borderRadius: 12,
        marginTop: 20,
        paddingLeft: 30,
        paddingRight: 30,
        paddingTop: 2,
        paddingBottom: 2,
        fontSize: 20,
        fontFamily: "Futura"
    },
    averageButton: {
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "rgb(239, 224, 13)",
        color: "white",
        borderRadius: 12,
        marginTop: 20,
        paddingLeft: 30,
        paddingRight: 30,
        paddingTop: 2,
        paddingBottom: 2,
        fontSize: 20,
        fontFamily: "Futura"
    },
    belowAverageButton: {
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "rgb(255, 128, 0)",
        color: "white",
        borderRadius: 12,
        marginTop: 20,
        paddingLeft: 30,
        paddingRight: 30,
        paddingTop: 2,
        paddingBottom: 2,
        fontSize: 20,
        fontFamily: "Futura"
    }
});

export default styles;