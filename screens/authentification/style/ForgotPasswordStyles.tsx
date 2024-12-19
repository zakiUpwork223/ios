import { StyleSheet } from 'react-native';
import { colors, spacing, fontSizes, fonts } from '../../../style'; 

const styles = StyleSheet.create({
    scrollViewContainer: {
        flexGrow: 1,
        justifyContent: 'center',
    },
    modalInstructions: {
        textAlign: 'center',
        width: '70%',
        marginTop: spacing.medium,
        marginBottom: spacing.medium,
    },
    container: {
        flex: 1,
        padding: spacing.medium,
        backgroundColor: '#fff',
        width: '100%',
        height: '100%',
    },
    containerShadow: {
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    titleContainer: {
        alignItems: 'center',
        marginVertical: spacing.medium,
    },
    title: {
        fontSize: fontSizes.large,
        fontWeight: 'bold',
        fontFamily: fonts.bold,
        color: colors.primary,
        marginTop: spacing.medium,
        textAlign: 'center',
    },
    subtitle: {
        width: '70%',
        marginTop: spacing.large,
        fontSize: fontSizes.small,
        textAlign: "center",
    },
    containerForms: {
        marginTop: spacing.large,
        alignItems: 'center',
        justifyContent: 'center',
    },
    highlight: {
        color: colors.secondary,
    },
    input: {
        marginTop: spacing.small,
        height: 40,
        borderWidth: 1,
        borderColor: colors.textPrimary,
        marginBottom: spacing.small,
        paddingHorizontal: spacing.small,
        color: colors.primary,
        backgroundColor: colors.textPrimary,
        borderRadius: 10,
        width: '80%',
    },
    containerButton: {
        width: '80%',
        marginTop: spacing.large,
    },
    ButtonLogin: {
        backgroundColor: colors.secondary,
        borderRadius: 10,
        paddingVertical: 10,
        paddingHorizontal: 20,
        alignItems: 'center',
    },
    ButtonLoginText: {
        color: colors.primary,
        fontWeight: 'bold',
        fontSize: 16,
    },
    registerContainer: {
        alignItems: 'center',
        marginVertical: spacing.medium,
    },
    login: {
        fontWeight: 'bold',
        color: colors.primary,
    },
    logoImagen: {
        alignItems: 'center',
        marginVertical: spacing.medium,
        /* height: '10%', */
        marginTop: spacing.small,
    },
    logo: {
        width: 80,
        height: 80,
        resizeMode: 'contain',
    },
    modalOverlay: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    modalView: {
        width: '100%',
        backgroundColor: 'white',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        padding: 20,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: -5,
        },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        alignItems: 'center',
        justifyContent: 'center',
    },
    modalText: {
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
        color: colors.primary,
    },
});


export default styles; 