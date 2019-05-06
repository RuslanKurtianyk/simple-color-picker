const variables = {
    circleSize: '14px',
    sliderHeight: '12px',
    colorGray: '#ccc',
    colorWhite: '#fff',
    colorRed: '#f00',
    transparent: 'transparent',
}

export default {
    colorPickerContainer: {
        width: '100%',
        height: '100%',
        border: [1, 'solid', variables.colorGray],
        background: variables.colorWhite,
    },
    paletteContainer: {
        width: '100%',
        paddingBottom: '55%',
        position: 'relative',
        overflow: 'hidden',
        marginBottom: '5px',
    },
    settingsContainer: {
        margin: '10px'
    },
    palette: {
        position: 'absolute',
        top: '0px',
        right: '0px',
        bottom: '0px',
        left: '0px',
    },
    paletteMain: {
        background: variables.colorRed,
    },
    paletteSaturation: {
        background: 'linear-gradient(to right, rgb(255, 255, 255), rgba(255, 255, 255, 0))'
    },
    paletteLightness: {
        background: 'linear-gradient(to top, rgb(0, 0, 0), rgba(0, 0, 0, 0))'
    },
    paletteChooser: {
        position: 'absolute',
        height: variables.circleSize,
        width: variables.circleSize,
        backgroundColor: 'transparent',
        border: [2, 'solid', variables.colorWhite],
        borderRadius: '50%',
        boxSizing: 'border-box',
        touchAction: 'none',
        userSelect: 'none',
    },
    sliderContainer: {
        position: 'relative',
        marginTop: '10px',
    },
    sliderChooser: {
        position: 'relative',
        height: variables.sliderHeight,
        width: '100%',
        boxSizing: 'border-box',
    },
    hueChooser: {
        background: 'linear-gradient(to right, rgb(255, 0, 0) 0%, rgb(255, 255, 0) 17%, rgb(0, 255, 0) 33%, rgb(0, 255, 255) 50%, rgb(0, 0, 255) 67%, rgb(255, 0, 255) 83%, rgb(255, 0, 0) 100%)'
    },
    alphaChooser: {
        background: 'linear-gradient(to right, rgba(146, 114, 114, 0) 0%, rgb(146, 114, 114) 100%)'
    },
    slider: {
        appearance: 'none',
        margin: [0, 0, 0, -3],
        width: 'calc(100% + 6px)',
        '&:focus': {
            outline: 0
        },
        '&::-webkit-slider-thumb': {
            appearance: 'none',
            border: [1, 'solid', variables.colorGray],
            height: variables.circleSize,
            width: variables.circleSize,
            borderRadius: '50%',
            background: variables.colorWhite,
            cursor: 'pointer',
            marginTop: '-15px',
        },
        '&::-moz-range-thumb': {
            border: [1, 'solid', variables.colorGray],
            height: variables.circleSize,
            width: variables.circleSize,
            borderRadius: '50%',
            background: variables.colorWhite,
            cursor: 'pointer',
        },
        '&::-ms-thumb': {
            border: [1, 'solid', variables.colorGray],
            height: variables.circleSize,
            width: variables.circleSize,
            borderRadius: '50%',
            background: variables.colorWhite,
            cursor: 'pointer',
        }
    },
    colorResult: {
        display: 'flex',
        flexDirection: 'row',
        marginTop: '10px',
    },
    colorResultValue: {
        flexGrow: 1,
    },
    colorSwitcher: {
        display: 'flex',
        flexDirection: 'column',
        margin: [8, 0, 0, 10],
        height: 20,
        cursor: 'pointer',
        '&:before': {
            content: '""',
            width: 0,
            height: 0,
            borderLeft: [8, 'solid', variables.transparent],
            borderRight: [8, 'solid', variables.transparent],
            borderBottom: [10, 'solid', variables.colorGray],
            marginBottom: 1,
        },
        '&:after': {
            content: '""',
            width: 0,
            height: 0,
            borderLeft: [8, 'solid', variables.transparent],
            borderRight: [8, 'solid', variables.transparent],
            borderTop: [10, 'solid', variables.colorGray],
            marginTop: 1,
        }
    },
    colorType: {
        textAlign: 'center',
        marginTop: 10,
    },
    colorValue: {
        padding: '3px',
        marginTop: '5px',
        textAlign: 'center',
    },
    colorValueBorder: {
        border: [1, 'solid', variables.colorGray],
        borderRadius: '2px',
    },
    complexColorContainer: {
        display: "flex",
        justifyContent: "space-between",
    },
    complexColorItemValue: {
        minWidth: 40,
    },

}