/* eslint-disable prettier/prettier */
import {API_KEY} from '@env';
import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  TouchableOpacity,
  Image,
  StatusBar,
} from 'react-native';
import {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} from '@google/generative-ai';
import {BarIndicator} from 'react-native-indicators';

const MODEL_NAME = 'gemini-pro';
const API_Google_key = 'AIzaSyDNLV9nkXim8-JJSepGxbVPpz0uwsOEUi4';

const CollegeGpt = () => {
  const [showConversation, setShowConversation] = useState(false);
  const [userInput, setUserInput] = useState('');
  const [conversation, setConversation] = useState([
    {
      role: 'user',
      parts: [
        {
          text: 'your are gonna help students in their studies\n\n\ngive easy explationation to the question\nadd very simple example, or code snippet, whatever is necessary that should be a real-life easy example \n\nso that even a below-average student can grasp the examples easily \n\n dont use ** instead use points numbering',
        },
      ],
    },
    {
      role: 'model',
      parts: [
        {
          text: '**Question**: What is the difference between a variable and a constant?\n\n**Easy Explanation**:\n\n* **Variable**: A variable is like a container that can store different values. You can think of it like a box that you can put things in and take things out of.\n* **Constant**: A constant is like a value that never changes. You can think of it like a number that is written in stone.\n\n**Example**:\n\n* **Variable**: Imagine you have a box that you use to store your toys. You can put different toys in the box, and you can take them out whenever you want to play with them. The box is the variable, and the toys are the values that you store in the box.\n* **Constant**: Imagine you have a number, like the number 5. You can\'t change the number 5. It\'s a constant value.\n\n**Code Snippet**:\n\n```python\n# Variable\nmy_name = "John Smith"\n\n# Constant\nPI = 3.14159\n```\n\nIn this example, `my_name` is a variable that can store different values, such as "John Smith" or "Jane Doe". `PI` is a constant that stores the value of Pi, which is approximately 3.14159.',
        },
      ],
    },
  ]);
  const [loading, setLoading] = useState(false);
  const [isButtonDisabled, setButtonDisabled] = useState(true);
  const [showLoader, setShowLoader] = useState(false);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const placeholders = [
    'Artificial Intelligence and Machine Learning',
    'Cybersecurity and Ethical Hacking',
    'Data Science and Big Data Analytics',
    'Quantum Computing',
    'Genetics and Genetic Engineering',
    'Ecology and Environmental Science',
    'Human Anatomy and Physiology',
    'Microbiology and Immunology',
    'Biochemistry',
    'World Wars I and II',
    'Renaissance and Scientific Revolution',
    'Cold War Era',
    'Industrial Revolution',
  ];
  const [selectedPlaceholder, setSelectedPlaceholder] = useState('');
  useEffect(() => {
    // Randomly select a placeholder when the component mounts
    const randomIndex = Math.floor(Math.random() * placeholders.length);
    setSelectedPlaceholder(placeholders[randomIndex]);
  }, []);

  useEffect(() => {
    // Enable the button only when there is user input
    setButtonDisabled(userInput.trim() === '');
  }, [userInput]);

  const handleGenerateResponse = async () => {
    Keyboard.dismiss();
    setLoading(true);
    setShowLoader(true);
    const genAI = new GoogleGenerativeAI(API_Google_key);
    const model = genAI.getGenerativeModel({model: MODEL_NAME});
    const generationConfig = {
      temperature: 0.75,
      topK: 1,
      topP: 1,
      maxOutputTokens: 2048,
    };

    const safetySettings = [
      {
        category: HarmCategory.HARM_CATEGORY_HARASSMENT,
        threshold: HarmBlockThreshold.BLOCK_NONE,
      },
      {
        category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
        threshold: HarmBlockThreshold.BLOCK_NONE,
      },
      {
        category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
        threshold: HarmBlockThreshold.BLOCK_NONE,
      },
      {
        category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
        threshold: HarmBlockThreshold.BLOCK_NONE,
      },
    ];

    const chat = model.startChat({
      generationConfig,
      safetySettings,
      history: conversation,
    });

    const result = await chat.sendMessage(userInput);
    const response = result.response;
    console.log('Raw Text:', response.text());

    if (!result.isBlocked) {
      setConversation(prevConversation => [
        ...prevConversation,
        {role: 'user', parts: [{text: userInput}]},
        {role: 'model', parts: [{text: response.text()}]},
      ]);
    }

    setUserInput('');
    setLoading(false);
    setButtonDisabled(true);
    setShowConversation(true);
    setShowLoader(false);
  };

  const formatMessageText = text => {
    const applyStyle = (style, content, key) => (
      <Text key={key} style={style}>
        {content}
      </Text>
    );

    switch (true) {
      case text.includes('*'):
        return applyStyle(
          {color: 'black'},
          text
            .split('**')
            .map((part: any, index: number) =>
              index % 2 === 0
                ? part
                : applyStyle(
                    {fontWeight: '800', fontStyle: 'italic'},
                    part,
                    index,
                  ),
            ),
        );

      case text.includes('**'):
        return applyStyle(
          {fontStyle: 'italic'},
          text
            .split('*')
            .map((part: any, index: number) =>
              index % 2 === 0
                ? part
                : applyStyle(
                    {fontStyle: 'italic', fontWeight: '800'},
                    part,
                    index,
                  ),
            ),
        );

      case text.includes('```'):
        return applyStyle(
          {fontWeight: 'bold', fontStyle: 'italic'},
          text
            .split('```')
            .map((part: any, index: number) =>
              index % 2 === 0
                ? part
                : applyStyle(
                    {fontWeight: 'normal', fontStyle: 'italic'},
                    part,
                    index,
                  ),
            ),
        );

      default:
        return applyStyle({}, text, 0);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior="padding"
      keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0}
      style={styles.container}>
      <StatusBar animated={true} backgroundColor="#3B3A3F" />
      {/* Heading Section */}
      <View style={styles.headingContainer}>
        <Image source={require('../images/robot.png')} style={styles.logo} />
        <Text style={styles.brandName}>CollegeGPT</Text>
      </View>
      <ScrollView
        contentContainerStyle={styles.scrollViewContent}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}>
        <View style={styles.chatSnippets}>
          {showConversation &&
            conversation.slice(2).map((message, index) => (
              <View key={index}>
                <Text
                  style={[
                    styles.messageContainer,
                    message.role === 'user'
                      ? styles.userMessage
                      : styles.modelMessage,
                  ]}>
                  {formatMessageText(message.parts[0].text)}
                </Text>
              </View>
            ))}
        </View>
      </ScrollView>

      <>
        <View style={styles.inputLoadingWrapper}>
          <TextInput
            style={styles.input}
            placeholder={selectedPlaceholder}
            placeholderTextColor="#F9EFDB"
            value={userInput}
            onChangeText={text => setUserInput(text)}
          />
          {showLoader && (
            // eslint-disable-next-line react/jsx-no-undef
            <BarIndicator
              size={53}
              color={'#fcd62f'}
              style={styles.loading}
              count={6}
            />
          )}
          {!showLoader && (
            <TouchableOpacity
              style={styles.GenerateButton}
              onPress={handleGenerateResponse}
              disabled={isButtonDisabled || loading}>
              <Image
                source={require('../images/send.png')} // Replace with your image path
                style={styles.generateButtonImage}
              />
            </TouchableOpacity>
          )}
        </View>
      </>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  headingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 8,
    // elevation: 3,
    shadowColor: '#F9EFDB',
    marginHorizontal: 7,
  },
  logo: {
    width: 50, // Set the width of your logo
    height: 50, // Set the height of your logo
    marginRight: 12,
  },
  brandName: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#F9EFDB',
    fontFamily: 'Sixtyfour-Regular',
  },
  container: {
    flex: 1,
    backgroundColor: '#3B3A3F',
  },
  scrollViewContent: {
    flexGrow: 1,
  },
  chatSnippets: {
    margin: 15,
    elevation: 5,
  },
  messageContainer: {
    borderRadius: 8,
    padding: 13,
    maxWidth: '88%',
    marginVertical: 8,
  },
  userMessage: {
    //user message
    alignSelf: 'flex-end',
    backgroundColor: '#D24545',
    fontWeight: '500',
    color: '#F9EFDB',
  },
  modelMessage: {
    // model message
    backgroundColor: '#fcd62f',
    alignSelf: 'flex-start',
    color: 'black',
    // fontWeight: '600',
  },
  // inputTouchapleWrapper: {
  //   backgroundColor: 'rgb(25,25,25)',
  //   opacity: 0.5,
  //   paddingVertical: 20,
  //   paddingHorizontal: 16,
  //   borderTopLeftRadius: 20,
  //   borderTopRightRadius: 20,
  //   justifyContent: 'space-evenly',
  // },
  inputLoadingWrapper: {
    // opacity: 0.8,
    // borderTopStartRadius: 35,
    // borderTopEndRadius: 35,
    // borderColor: '#E9F6FF',
    // borderWidth: 1,
    padding: 6,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    borderRadius: 35,
    paddingHorizontal: 18,
    width: '30%',
    flexWrap: 'wrap',
    flex: 1,
    height: 55,
    marginRight: 2,
    backgroundColor: 'rgb(25,25,25)',
    color: '#E9F6FF',
    fontWeight: '500',
  },

  loading: {
    // margin: -120,
    margin: 4,
  },
  GenerateButton: {
    backgroundColor: '#fcd62f',
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
    margin: 4,
    marginHorizontal: 8,
  },
  generateButtonImage: {
    width: 30,
    height: 30,
  },
});

export default CollegeGpt;
