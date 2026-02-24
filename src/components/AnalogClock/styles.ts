import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f5f6fa',
    },
    clockFace: {
        backgroundColor: '#ffffff',
        borderWidth: 6,
        borderColor: '#2c3e50',
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 10,
        elevation: 8,
    },
    centerDot: {
        width: 16,
        height: 16,
        borderRadius: 8,
        backgroundColor: '#e74c3c',
        position: 'absolute',
        zIndex: 10,
    },
    hand: {
        position: 'absolute',
        bottom: '50%',
        transformOrigin: 'bottom',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
    },
    hourHand: {
        width: 8,
        height: '25%',
        backgroundColor: '#2c3e50',
        marginLeft: -4,
        zIndex: 3,
    },
    minuteHand: {
        width: 6,
        height: '35%',
        backgroundColor: '#34495e',
        marginLeft: -3,
        zIndex: 4,
    },
    secondHand: {
        width: 2,
        height: '42%',
        backgroundColor: '#e74c3c',
        marginLeft: -1,
        zIndex: 5,
    },
    numberContainer: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    alignItems: 'center',
    paddingTop: '3%', 
    zIndex: 1,
  },
  numberText: {
    fontWeight: 'bold',
    color: '#2c3e50',
  },
  ampmContainer: {
    position: 'absolute',
    top: '65%',
    alignItems: 'center',
    width: '100%',
    zIndex: 2,
  },
  ampmText: {
    fontWeight: '600',
    color: '#7f8c8d',
    letterSpacing: 2,
  },
});


export default styles;