const BOX_MARGIN = 30;
const BOX_SIZE = Layout.window.width - BOX_MARGIN * 2;
const BOX_TOP = Layout.window.height / 2 - BOX_SIZE / 2;
const BOX_BOTTOM = BOX_TOP + BOX_SIZE;
const BOX_LEFT = BOX_MARGIN;
const BOX_RIGHT = Layout.window.width - BOX_MARGIN;

const overlayBaseStyle = {
    position: 'absolute',
    backgroundColor: 'rgba(0,0,0,0.6)',
  };
  const cornerBaseStyle = {
    borderRadius: 5,
    position: 'absolute',
    borderColor: '#fff',
    backgroundColor: 'transparent',
    borderWidth: 5,
    width: 20,
    height: 20,
  };
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#000'
    },
    topLeftCorner: {
      ...cornerBaseStyle,
      top: BOX_TOP - 1,
      left: BOX_MARGIN - 1,
      borderBottomWidth: 0,
      borderRightWidth: 0,
    },
    topRightCorner: {
      ...cornerBaseStyle,
      top: BOX_TOP - 1,
      right: BOX_MARGIN - 1,
      borderBottomWidth: 0,
      borderLeftWidth: 0,
    },
    bottomLeftCorner: {
      ...cornerBaseStyle,
      bottom: Layout.window.height - BOX_BOTTOM - 1,
      left: BOX_MARGIN - 1,
      borderTopWidth: 0,
      borderRightWidth: 0,
    },
    bottomRightCorner: {
      ...cornerBaseStyle,
      bottom: Layout.window.height - BOX_BOTTOM - 1,
      right: BOX_MARGIN - 1,
      borderTopWidth: 0,
      borderLeftWidth: 0,
    },
    topOverlay: {
      ...overlayBaseStyle,
      top: 0,
      left: 0,
      right: 0,
      bottom: Layout.window.height -  BOX_TOP,
    },
    leftOverlay: {
      ...overlayBaseStyle,
      top: BOX_TOP,
      left: 0,
      right: BOX_RIGHT,
      bottom: Layout.window.height - BOX_BOTTOM,
    },
    rightOverlay: {
      ...overlayBaseStyle,
      top: BOX_TOP,
      left: BOX_RIGHT,
      right: 0,
      bottom: Layout.window.height - BOX_BOTTOM,
    },
    bottomOverlay: {
      ...overlayBaseStyle,
      top: BOX_BOTTOM,
      left: 0,
      right: 0,
      bottom: 0,
    },
    headerText: {
      color: '#fff',
      backgroundColor: 'transparent',
      fontSize: 22,
      fontWeight: '400',
    },
    bottomBar: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      backgroundColor: 'rgba(0,0,0,0.5)',
      padding: 15,
      flexDirection: 'row',
    },
    url: {
      flex: 1,
    },
    urlText: {
      color: '#fff',
      fontSize: 20,
    },
    cancelButton: {
      marginLeft: 10,
      alignItems: 'center',
      justifyContent: 'center',
    },
    cancelButtonText: {
      color: 'rgba(255,255,255,0.8)',
      fontSize: 18,
    },
  });

  export default styles;