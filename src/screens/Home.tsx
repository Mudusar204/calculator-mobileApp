import {
  Button,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Keyboard,
  KeyboardAvoidingView,
  Switch,
  //   KeyboardEventListener
} from 'react-native';
import KeyboardListener from 'react-native-keyboard-listener';
import React, {useState, useRef, useEffect} from 'react';
import CustomButton from '../components/button/Button';

const Home = () => {
  const [text, onChangeText] = useState('');
  const [answer, setAnswer] = useState<any>('');
  const [cursorIndex, setCursorIndex] = useState(0);
  const inputRef = useRef(null);
  const [isKeyboardOpen, setIsKeyboardOpen] = useState(false);
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);
  useEffect(() => {
    inputRef.current.focus();
    // Keyboard.dismiss();
  }, []);
  //   useEffect(() => {
  //     // inputRef.current.focus();
  //     Keyboard.dismiss();
  //   }, [isKeyboardOpen]);
  const onclickButton = (title: any) => {
    if (
      (text.charAt(cursorIndex - 1) == '+' ||
        text.charAt(cursorIndex) == '+' ||
        text.charAt(cursorIndex - 1) == '-' ||
        text.charAt(cursorIndex) == '-' ||
        text.charAt(cursorIndex - 1) == '/' ||
        text.charAt(cursorIndex) == '/' ||
        text.charAt(cursorIndex - 1) == '*' ||
        text.charAt(cursorIndex) == '*' ||
        text.charAt(cursorIndex - 1) == '.' ||
        text.charAt(cursorIndex) == '.' ||
        text.charAt(cursorIndex - 1) == '%' ||
        text.charAt(cursorIndex) == '%') &&
      (title == '+' ||
        title == '-' ||
        title == '*' ||
        title == '/' ||
        title == '.' ||
        title == '%')
    ) {
      return;
    } else {
      if (text.length < 0) {
        onChangeText(text + title.toString());
      } else {
        let newDoc = text.split('');
        let finalDoc = newDoc.splice(cursorIndex, 0, title.toString());
        let Doc = newDoc.join('');
        onChangeText(Doc);
        console.log(newDoc, 'textStirng', '');
      }
    }
  };
  const removeOne = () => {
    let newstate = text.split('');
    let a = newstate.splice(cursorIndex - 1, 1);
    let finalState = newstate.join('');
    onChangeText(finalState);
  };
  const handleSelectionChange = (event: any) => {
    const {selection} = event.nativeEvent;
    const {start} = selection;
    setCursorIndex(start);
  };
  const result = () => {
    if (
      text.charAt(text.length - 1) == '-' ||
      text.charAt(text.length - 1) == '+' ||
      text.charAt(text.length - 1) == '.' ||
      text.charAt(text.length - 1) == '/' ||
      text.charAt(text.length - 1) == '*' ||
      text.charAt(text.length - 1) == '%'
    ) {
      return;
    } else {
      var result = eval(text);
      setAnswer(result);
    }
  };
  return (
    <View
      style={[styles.parent, {backgroundColor: isEnabled ? 'black' : 'white'}]}>
      <View
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: 20,
        }}>
        <Switch
          trackColor={{false: 'black', true: '#81b0ff'}}
          thumbColor={!isEnabled ? 'lightblue' : '#f4f3f4'}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleSwitch}
          value={isEnabled}
        />
      </View>
      <View style={styles.child1}>
        <KeyboardListener
          onWillShow={() => {
            setIsKeyboardOpen(true);
          }}
          onWillHide={() => {
            setIsKeyboardOpen(false);
          }}
        />
        <TextInput
          ref={inputRef}
          onFocus={() => {}}
          showSoftInputOnFocus={false}
          onSelectionChange={handleSelectionChange}
          style={{
            fontSize: 40,
            width: '100%',
            color: isEnabled ? 'white' : 'black',
          }}
          onChangeText={onChangeText}
          value={text}></TextInput>
        <View>
          <Text
            style={{
              fontSize: 30,
              width: '100%',
              color: isEnabled ? 'white' : 'black',
            }}>
            {answer}
          </Text>
        </View>
      </View>
      <View style={styles.child2}>
        <View style={styles.buttonRows}>
          <CustomButton
            onPress={() => {
              setAnswer(''), onChangeText('');
            }}
            title={'AC'}
            titleStyle={[
              styles.titleStyles,
              {color: isEnabled ? '#42AEA0' : 'black'},
            ]}
            buttonStyle={[
              styles.button,
              {backgroundColor: isEnabled ? 'black' : 'lightblue'},
            ]}
          />
          <CustomButton
            onPress={removeOne}
            titleStyle={[
              styles.titleStyles,
              {color: isEnabled ? '#42AEA0' : 'black'},
            ]}
            buttonStyle={[
              styles.button,
              {backgroundColor: isEnabled ? 'black' : 'lightblue'},
            ]}
            title={'X'}
          />
          <CustomButton
            onPress={() => onclickButton('%')}
            titleStyle={[
              styles.titleStyles,
              {color: isEnabled ? '#42AEA0' : 'black'},
            ]}
            buttonStyle={[
              styles.button,
              {backgroundColor: isEnabled ? 'black' : 'lightblue'},
            ]}
            title={'%'}
          />
          <CustomButton
            onPress={() => onclickButton('/')}
            titleStyle={[
              styles.titleStyles,
              {color: isEnabled ? 'red' : '#42AEA0'},
            ]}
            buttonStyle={[
              styles.button,
              {backgroundColor: isEnabled ? 'black' : 'lightblue'},
            ]}
            title={'/'}
          />
        </View>
        <View style={styles.buttonRows}>
          <CustomButton
            onPress={() => onclickButton(7)}
            titleStyle={styles.titleStyles}
            buttonStyle={[
              styles.button,
              {backgroundColor: isEnabled ? 'black' : 'lightblue'},
            ]}
            title={7}
          />
          <CustomButton
            onPress={() => onclickButton(8)}
            titleStyle={styles.titleStyles}
            buttonStyle={[
              styles.button,
              {backgroundColor: isEnabled ? 'black' : 'lightblue'},
            ]}
            title={8}
          />
          <CustomButton
            onPress={() => onclickButton(9)}
            titleStyle={styles.titleStyles}
            buttonStyle={[
              styles.button,
              {backgroundColor: isEnabled ? 'black' : 'lightblue'},
            ]}
            title={9}
          />
          <CustomButton
            onPress={() => onclickButton('*')}
            titleStyle={[
              styles.titleStyles,
              {color: isEnabled ? 'red' : '#42AEA0'},
            ]}
            buttonStyle={[
              styles.button,
              {backgroundColor: isEnabled ? 'black' : 'lightblue'},
            ]}
            title={'*'}
          />
        </View>
        <View style={styles.buttonRows}>
          <CustomButton
            onPress={() => onclickButton(4)}
            titleStyle={styles.titleStyles}
            buttonStyle={[
              styles.button,
              {backgroundColor: isEnabled ? 'black' : 'lightblue'},
            ]}
            title={4}
          />
          <CustomButton
            onPress={() => onclickButton(5)}
            titleStyle={styles.titleStyles}
            buttonStyle={[
              styles.button,
              {backgroundColor: isEnabled ? 'black' : 'lightblue'},
            ]}
            title={5}
          />
          <CustomButton
            onPress={() => onclickButton(6)}
            titleStyle={styles.titleStyles}
            buttonStyle={[
              styles.button,
              {backgroundColor: isEnabled ? 'black' : 'lightblue'},
            ]}
            title={6}
          />
          <CustomButton
            onPress={() => onclickButton('-')}
            titleStyle={[
              styles.titleStyles,
              {color: isEnabled ? 'red' : '#42AEA0'},
            ]}
            buttonStyle={[
              styles.button,
              {backgroundColor: isEnabled ? 'black' : 'lightblue'},
            ]}
            title={'--'}
          />
        </View>
        <View style={styles.buttonRows}>
          <CustomButton
            onPress={() => onclickButton(1)}
            titleStyle={styles.titleStyles}
            buttonStyle={[
              styles.button,
              {backgroundColor: isEnabled ? 'black' : 'lightblue'},
            ]}
            title={1}
          />
          <CustomButton
            onPress={() => onclickButton(2)}
            titleStyle={styles.titleStyles}
            buttonStyle={[
              styles.button,
              {backgroundColor: isEnabled ? 'black' : 'lightblue'},
            ]}
            title={2}
          />
          <CustomButton
            onPress={() => onclickButton(3)}
            titleStyle={styles.titleStyles}
            buttonStyle={[
              styles.button,
              {backgroundColor: isEnabled ? 'black' : 'lightblue'},
            ]}
            title={3}
          />
          <CustomButton
            onPress={() => onclickButton('+')}
            titleStyle={[
              styles.titleStyles,
              {color: isEnabled ? 'red' : '#42AEA0'},
            ]}
            buttonStyle={[
              styles.button,
              {backgroundColor: isEnabled ? 'black' : 'lightblue'},
            ]}
            title={'+'}
          />
        </View>
        <View style={styles.buttonRows}>
          <CustomButton
            titleStyle={styles.titleStyles}
            buttonStyle={[
              styles.button,
              {backgroundColor: isEnabled ? 'black' : 'lightblue'},
            ]}
            title={'Del'}
          />
          <CustomButton
            onPress={() => onclickButton(0)}
            titleStyle={styles.titleStyles}
            buttonStyle={[
              styles.button,
              {backgroundColor: isEnabled ? 'black' : 'lightblue'},
            ]}
            title={0}
          />
          <CustomButton
            onPress={() => onclickButton('.')}
            titleStyle={styles.titleStyles}
            buttonStyle={[
              styles.button,
              {backgroundColor: isEnabled ? 'black' : 'lightblue'},
            ]}
            title={'.'}
          />
          <CustomButton
            onPress={result}
            titleStyle={[
              styles.titleStyles,
              {color: isEnabled ? 'red' : '#42AEA0'},
            ]}
            buttonStyle={[
              styles.button,
              {backgroundColor: isEnabled ? 'black' : 'lightblue'},
            ]}
            title={'='}
          />
        </View>
      </View>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  parent: {
    flex: 1,
    backgroundColor: 'gray',
  },
  child1: {
    flex: 1,
    // backgroundColor:'green',
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: 5,
  },
  child2: {
    flex: 1.5,
    paddingHorizontal: '8%',
    paddingVertical: '8%',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    // backgroundColor:'blue',
    justifyContent: 'space-around',
    borderTopWidth: 2,
    borderColor: 'gray',
  },
  button: {
    backgroundColor: 'gray',
    paddingTop: 14,
    borderRadius: 25,
    width: 60,
    height: 60,
  },

  buttonRows: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  titleStyles: {
    fontSize: 20,
    textAlign: 'center',
  },
  button1: {
    backgroundColor: '#3498db',
    padding: 10,
    textAlign: 'center',
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 16,
    marginHorizontal: 100,
  },
});
