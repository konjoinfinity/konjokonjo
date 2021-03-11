import React from "react";
import {
    View, StatusBar, Text, Button, Image, TouchableOpacity, StyleSheet, Platform, SafeAreaView, KeyboardAvoidingView, TextInput,
    Dimensions, PixelRatio, Alert, ScrollView, Appearance, Keyboard, FlatList
} from 'react-native';
import 'react-native-gesture-handler';
import SInfo from "react-native-sensitive-info"
import { actions, getContentCSS, RichEditor, RichToolbar } from 'react-native-pell-rich-editor';
import { XMath } from '@wxik/core';
import { InsertLinkModal } from './Link';
import { EmojiView } from './Emoji';
import Modal from 'react-native-modal';

const imageList = [
    'https://img.lesmao.vip/k/h256/R/MeiTu/1293.jpg',
    'https://pbs.twimg.com/profile_images/1242293847918391296/6uUsvfJZ.png',
    'https://img.lesmao.vip/k/h256/R/MeiTu/1297.jpg',
    'https://img.lesmao.vip/k/h256/R/MeiTu/1292.jpg',
];
const initHTML = `<br/>
<center><b onclick="_.sendEvent('TitleClick')" id="title" contenteditable="false">Rich Editor</b></center>
<center>
<a href="https://github.com/wxik/react-native-rich-editor">React Native</a>
<span>And</span>
<a href="https://github.com/wxik/flutter-rich-editor">Flutter</a>
</center>
<br/>
<div><center><img src="${imageList[0]}" onclick="_.sendEvent('ImgClick')" contenteditable="false" height="170px"/></center></div>
<div>
<br/>Click the picture to switch<br/><br/>
</div>
`;

const STORAGE_KEY = "id_token";
const STORAGE_USER = "username";
const phizIcon = require('./phiz.png');
const htmlIcon = require('./html.png');

class New extends React.Component {
    richText = React.createRef();
    linkModal = React.createRef();
    constructor(props) {
        super(props);
        this.richHTML = '';
        const theme = props.theme || Appearance.getColorScheme();
        const contentStyle = this.createContentStyle(theme);
        this.state = {
            theme: theme,
            contentStyle,
            emojiVisible: false,
            disabled: false,
            isModalVisible: false,
        };
        this.editorInitializedCallback = this.editorInitializedCallback.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleHeightChange = this.handleHeightChange.bind(this);
        this.handlePaste = this.handlePaste.bind(this);
        this.handleKeyUp = this.handleKeyUp.bind(this);
        this.handleKeyDown = this.handleKeyDown.bind(this);
        this.handleMessage = this.handleMessage.bind(this);
        this.handleFocus = this.handleFocus.bind(this);
        this.handleBlur = this.handleBlur.bind(this);
        this.onInsertLink = this.onInsertLink.bind(this);
        this.onPressAddImage = this.onPressAddImage.bind(this);
        this.onTheme = this.onTheme.bind(this);
        this.onDone = this.onDone.bind(this);
        this.setModalVisible = this.setModalVisible.bind(this);
        this.setTitle = this.setTitle.bind(this);
        this.setURL = this.setURL.bind(this);
        this.onKeyShow = this.onKeyShow.bind(this);
    }

    componentDidMount() {
        Appearance.addChangeListener(this.themeChange);
        Keyboard.addListener('keyboardDidShow', this.onKeyShow);
        Keyboard.addListener('keyboardDidHide', this.onKeyHide);
    }

    componentWillUnmount() {
        Appearance.removeChangeListener(this.themeChange);
        Keyboard.removeListener('keyboardDidShow', this.onKeyShow);
        Keyboard.removeListener('keyboardDidHide', this.onKeyHide);
    }

    onKeyHide = () => { };

    onKeyShow(e) {
        TextInput.State.currentlyFocusedInput() && this.setState({ emojiVisible: false });
        // Show keyboard height
        // this.setState({
        //     keyboardHeight: e.endCoordinates.height,
        //     normalHeight: Dimensions.get('window').height,
        //     shortHeight: Dimensions.get('window').height - e.endCoordinates.height
        // }, () => console.log(this.state))
    };

    setModalVisible(visible) {
        this.setState({ isModalVisible: visible });
    }

    setTitle(title) {
        this.title = title;
    }

    setURL(url) {
        this.url = url;
    }

    onDone() {
        const title = this.title;
        const url = this.url;
        this.setModalVisible(false);
        this.richText.current?.insertLink(title, url)
    }

    createContentStyle(theme) {
        // Can be selected for more situations (cssText or contentCSSText).
        const contentStyle = {
            backgroundColor: '#2e3847',
            color: '#fff',
            placeholderColor: 'gray',
            // cssText: '#editor {background-color: #f3f3f3}', // initial valid
            contentCSSText: 'font-size: 16px; min-height: 200px; height: 100%;', // initial valid
        };
        if (theme === 'light') {
            contentStyle.backgroundColor = '#fff';
            contentStyle.color = '#000033';
            contentStyle.placeholderColor = '#a9a9a9';
        }
        return contentStyle;
    }

    editorInitializedCallback() {
        this.richText.current?.registerToolbar(function (items) {
            // console.log('Toolbar click, selected items (insert end callback):', items);
        });
    }


    handleChange(data) {
        // html
        // this.richHTML = html;
        // this.setState({ a: Math.random });
        // console.log(data)
        // console.log(this.state)
    }

    handleHeightChange(height) {
        // console.log('editor height change:', height);
    }

    handlePaste = data => {
        // console.log('Paste:', data);
    };

    handleKeyUp = data => {
        // console.log('KeyUp:', data);
    };

    handleKeyDown = data => {
        // console.log('KeyDown:', data);
    };

    handleMessage = ({ type, id, data }) => {
        let index = 0;
        switch (type) {
            case 'ImgClick':
                this.richText.current?.commandDOM(`$('#${id}').src="${imageList[XMath.random(imageList.length - 1)]}"`);
                break;
            case 'TitleClick':
                const color = ['red', 'blue', 'gray', 'yellow', 'coral'];

                // command: $ = document.querySelector
                this.richText.current?.commandDOM(`$('#${id}').style.color='${color[XMath.random(color.length - 1)]}'`);
                break;
            case 'SwitchImage':
                break;
        }
        // console.log('onMessage', type, id, data);
    };

    handleFocus = () => {
        this.editorFocus = true;
    };

    handleBlur = () => {
        this.editorFocus = false;
    };

    onPressAddImage() {
        // insert URL
        this.richText.current?.insertImage(
            'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/100px-React-icon.svg.png',
            'background: gray;',
        );
        // insert base64
        // this.richText.current?.insertImage(`data:${image.mime};base64,${image.data}`);
    }

    onInsertLink() {
        // this.richText.current?.insertLink('Google', 'http://google.com');
        this.setModalVisible(true);
    }

    insertEmoji(emoji) {
        this.richText.current?.insertText(emoji);
        this.richText.current?.blurContentEditor();
    }

    handleEmoji() {
        Keyboard.dismiss();
        this.state.emojiVisible == false ? this.setState({ emojiVisible: true }) : this.setState({ emojiVisible: false })
    }

    insertVideo() {
        Alert.alert("Add Video")
        // this.richText.current?.insertVideo(
        //     'https://mdn.github.io/learning-area/html/multimedia-and-embedding/video-and-audio-content/rabbit320.mp4',
        //     'width: 50%;',
        // );
    }

    fontSize = () => {
        // 1=  10px, 2 = 13px, 3 = 16px, 4 = 18px, 5 = 24px, 6 = 32px, 7 = 48px;
        const size = [1, 2, 3, 4, 5, 6, 7];
        this.richText.current?.setFontSize(size[XMath.random(size.length - 1)]);
    };

    insertHTML() {
        // this.richText.current?.insertHTML(
        //     `<span onclick="alert(2)" style="color: blue; padding:0 10px;" contenteditable="false">HTML</span>`,
        // );
        this.richText.insertHTML(
            `<div style="padding:10px 0;" contentEditable="false">
                <iframe  width="100%" height="220"  src="https://www.youtube.com/embed/6FrNXgXlCGA" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
            </div>`,
        );
    }

    onTheme() {
        this.state.theme == "light" ? this.setState({ theme: "dark" }) : this.setState({ theme: "light" })
    }

    render() {
        const { contentStyle, theme, emojiVisible, disabled, isModalVisible } = this.state;
        const { backgroundColor, color, placeholderColor } = contentStyle;
        const dark = theme === 'dark';
        return (
            <SafeAreaView style={[styles.container, dark && styles.darkBack]}>
                <StatusBar barStyle={theme !== 'dark' ? 'dark-content' : 'light-content'} />
                <Modal
                    ref={this.linkModal}
                    animationIn={'fadeIn'}
                    animationOut={'fadeOut'}
                    coverScreen={false}
                    isVisible={isModalVisible}
                    backdropColor={color}
                    backdropOpacity={0.3}
                    onBackdropPress={() => this.setModalVisible(false)}>
                    <View style={[styles.modaldialog, { backgroundColor }]}>
                        <View style={styles.modallinkTitle}>
                            <Text style={{ color }}>Insert Link</Text>
                        </View>
                        <View style={styles.modalitem}>
                            <TextInput
                                style={[styles.modalinput, { color }]}
                                placeholderTextColor={placeholderColor}
                                placeholder={'title'}
                                onChangeText={(text) => this.setTitle(text)}
                            />
                        </View>
                        <View style={styles.modalitem}>
                            <TextInput
                                style={[styles.modalinput, { color }]}
                                placeholderTextColor={placeholderColor}
                                placeholder="http(s)://"
                                onChangeText={(text) => this.setURL(text)}
                            />
                        </View>
                        <View style={styles.modalbuttonView}>
                            <TouchableOpacity style={styles.modalbtn} onPress={() => this.setModalVisible(false)}>
                                <Text style={styles.modaltext}>Cancel</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.modalbtn} onPress={this.onDone}>
                                <Text style={styles.modaltext}>OK</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
                <View style={styles.nav}>
                    <Button title={'New Konjo'} />
                </View>
                <ScrollView style={[styles.scroll, dark && styles.scrollDark]} keyboardDismissMode={'none'}>
                    <View style={[styles.topVi, dark && styles.darkBack]}>
                        <View style={styles.item}>
                            <Text style={{ color: this.state.theme == "light" ? "black" : "white" }}>Theme:</Text>
                            <Button title={theme} onPress={this.onTheme} />
                        </View>
                    </View>
                    <RichToolbar
                        style={[styles.richBar, dark && styles.richBarDark]}
                        flatContainerStyle={styles.flatStyle}
                        editor={this.richText}
                        disabled={disabled}
                        selectedIconTint={'#2095F2'}
                        disabledIconTint={'#bfbfbf'}
                        onPressAddImage={this.onPressAddImage}
                        onInsertLink={this.onInsertLink}
                    />
                    <RichEditor
                        // initialFocus={true}
                        disabled={disabled}
                        editorStyle={contentStyle} // default light style
                        ref={this.richText}
                        style={styles.rich}
                        placeholder={'Add your knowledge'}
                        editorInitializedCallback={this.editorInitializedCallback}
                        onChange={this.handleChange}
                        onHeightChange={this.handleHeightChange}
                        onPaste={this.handlePaste}
                        onKeyUp={this.handleKeyUp}
                        onKeyDown={this.handleKeyDown}
                        onMessage={this.handleMessage}
                        onFocus={this.handleFocus}
                        onBlur={this.handleBlur}
                        pasteAsPlainText={true}
                    />
                </ScrollView>
                {/* Add conditional rendering based on screen size for vert offset */}
                <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} keyboardVerticalOffset={95}>
                    <RichToolbar
                        style={[styles.richBar, dark && styles.richBarDark]}
                        flatContainerStyle={styles.flatStyle}
                        editor={this.richText}
                        disabled={disabled}
                        // iconTint={color}
                        selectedIconTint={'#2095F2'}
                        disabledIconTint={'#bfbfbf'}
                        onPressAddImage={this.onPressAddImage}
                        onInsertLink={this.onInsertLink}
                        iconSize={24}
                        iconGap={10}
                        actions={[
                            actions.undo,
                            actions.redo,
                            actions.insertVideo,
                            actions.insertImage,
                            actions.setStrikethrough,
                            actions.checkboxList,
                            actions.insertOrderedList,
                            actions.blockquote,
                            actions.alignLeft,
                            actions.alignCenter,
                            actions.alignRight,
                            actions.code,
                            actions.line,
                            actions.heading1,
                            actions.heading4,
                            'insertEmoji',
                            'insertHTML',
                            'fontSize',
                        ]} // default defaultActions
                        iconMap={{
                            insertEmoji: phizIcon,
                            [actions.heading1]: ({ tintColor }) => (
                                <Text style={[styles.tib, { color: tintColor }]}>H1</Text>
                            ),
                            [actions.heading4]: ({ tintColor }) => (
                                <Text style={[styles.tib, { color: tintColor }]}>H3</Text>
                            ),
                            insertHTML: htmlIcon,
                        }}
                        insertEmoji={this.handleEmoji}
                        insertHTML={this.insertHTML}
                        insertVideo={this.insertVideo}
                        fontSize={this.fontSize}
                    />
                    {emojiVisible && <EmojiView onSelect={this.insertEmoji} />}
                </KeyboardAvoidingView>
            </SafeAreaView>
        );
    }
}
export default New;

const styles = StyleSheet.create({
    settingcard: {
        borderColor: "#CCCCCC",
        borderWidth: 1,
        height: Dimensions.get('window').height * 0.15,
        width: Dimensions.get('window').width * 0.85,
        fontSize: 25,
        padding: 15,
        borderRadius: 15,
        textAlign: "center"
    },
    container: {
        flex: 1,
        backgroundColor: '#efefef',
    },
    nav: {
        flexDirection: 'row',
        justifyContent: "center",
        marginHorizontal: 5,
    },
    rich: {
        minHeight: 300,
        flex: 1,
    },
    topVi: {
        backgroundColor: '#fafafa',
    },
    richBar: {
        borderColor: '#efefef',
        borderTopWidth: StyleSheet.hairlineWidth,
    },
    richBarDark: {
        backgroundColor: '#191d20',
        borderColor: '#696969',
    },
    scroll: {
        backgroundColor: '#ffffff',
    },
    scrollDark: {
        backgroundColor: '#2e3847',
    },
    darkBack: {
        backgroundColor: '#191d20',
    },
    item: {
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderColor: '#e8e8e8',
        flexDirection: "row",
        height: 40,
        alignItems: 'center',
        paddingHorizontal: 15,
    },

    input: {
        flex: 1,
    },

    tib: {
        textAlign: 'center',
        color: '#515156',
    },

    flatStyle: {
        paddingHorizontal: 12,
    },
    modalitem: {
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderColor: '#e8e8e8',
        flexDirection: 'row',
        height: 40,
        alignItems: 'center',
        paddingHorizontal: 15,
    },
    modalinput: {
        flex: 1,
        height: 40,
    },
    modallinkTitle: {
        height: 36,
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderColor: '#b3b3b3',
    },
    modaldialog: {
        borderRadius: 8,
        marginHorizontal: 40,
        paddingHorizontal: 10,
    },

    modalbuttonView: {
        flexDirection: 'row',
        height: 36,
        paddingVertical: 4,
    },
    modalbtn: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    modaltext: {
        color: '#286ab2',
    }
})