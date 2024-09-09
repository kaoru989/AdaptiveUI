      import React, { useState, useEffect } from "react";
      import {
        View,
        StyleSheet,
        Image,
        TextInput,
        Platform,
        Dimensions,
        useWindowDimensions,
        KeyboardAvoidingView,
        StatusBar,
        SafeAreaView,
        TouchableWithoutFeedback,
        ScrollView,
        TouchableOpacity,
        Text,
        Appearance,
        Keyboard,
      } from "react-native";

      export default function AdaptiveUI() {
        const window = useWindowDimensions();
        const [orientation, setOrientation] = useState("portrait");
        const screenWidth = Dimensions.get('window').width;
        const buttonWidth = screenWidth / 2 - 20;
        const [theme, setTheme] = useState(Appearance.getColorScheme() || "light");
        const [keyboardVisible, setKeyboardVisible] = useState(false);

        useEffect(() => {
          const updateOrientation = () => {
            const { width, height } = window;
            setOrientation(width > height ? "landscape" : "portrait");
          };
        
          updateOrientation();
          const subscription = Dimensions.addEventListener(
            "change",
            updateOrientation
          );

          const colorSchemeListener = Appearance.addChangeListener(({ colorScheme }) => {
            setTheme(colorScheme || "light"); 
          });

          const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => {
          });
          const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => { 
          });

          return () => subscription?.remove();
          keyboardDidShowListener.remove();
        keyboardDidHideListener.remove();
        colorSchemeListener.remove();
        }, [window]);

        const toggleTheme = () => {
          setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
        };

        const styles = StyleSheet.create({
          safeArea: {
            flex: 1,
            backgroundColor: theme === "light" ? "#f0f0f0" : "#222",
          },
          container: {
            flex: 1,
            padding: Platform.OS === "ios" ? 20 : 16,
            justifyContent: "center",
            alignItems: 'center',
          },
          header: {
            paddingTop: 20,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 20,
            paddingBottom: 20,
          },
          title: {
            fontSize: 24,
            fontWeight: "bold",
            color: theme === "light" ? "#333" : "#fff",
          },
          themeToggle: {
            padding: 10,
            backgroundColor: theme === "light" ? "#333" : "#f0f0f0",
            borderRadius: 5,
          },
          themeToggleText: {
            color: theme === "light" ? "#fff" : "#333",
          },
          content: {
            flex: 1,
          },
          buttonsContainer: {
            flexDirection: orientation === "portrait" ? "column" : "row",
            justifyContent: "center",
            alignItems: 'center',
            marginBottom: 20,
          },
          button: {
            width: orientation === "portrait" ? "100%" : "48%",
            marginBottom: orientation === "portrait" ? 10 : 0,
            backgroundColor: theme === "light" ? "#740001" : "#0A84FF",
            padding: 15,
            borderRadius: 5,
            alignItems: "center",
          },
          buttonText: {
            color: "#fff",
            fontSize: 16,
            fontWeight: "bold",
          },
          image: {
            width: window.width * 0.8,
            height:
              orientation === "portrait" ? window.width * 0.6 : window.height * 0.3,
            resizeMode: "contain",
            alignSelf: "center",
            marginBottom: 20,
          },
          input: {
            borderWidth: 1,
            borderColor: theme === "light" ? "#ccc" : "#666",
            padding: 10,
            marginBottom: 20,
            color: theme === "light" ? "#333" : "#fff",
            backgroundColor: theme === "light" ? "#fff" : "#444",
          },
          cardContainer: {
            flexDirection: orientation === "portrait" ? "column" : "row",
            justifyContent: "space-between",
          },
          card: {
            width: orientation === "portrait" ? "100%" : "48%",
            backgroundColor: theme === "light" ? "#fff" : "#333",
            borderRadius: 10,
            padding: 15,
            marginBottom: 15,
            ...Platform.select({
              ios: {
                shadowColor: theme === "light" ? "#000" : "#fff",
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.1,
                shadowRadius: 4,
              },
              android: {
                elevation: 4,
              },
            }),
          },
          cardTitle: {
            fontSize: 18,
            fontWeight: "bold",
            marginBottom: 10,
            color: theme === "light" ? "#333" : "#fff",
          },
          cardContent: {
            fontSize: 14,
            color: theme === "light" ? "#666" : "#ccc",
          },
        });

        return (
          <SafeAreaView style={styles.safeArea}>
            <StatusBar
              backgroundColor={theme === "light" ? "#f0f0f0" : "#222"}
              barStyle={theme === "light" ? "dark-content" : "light-content"}
              translucent={true}
            />
            <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0}
      >
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
                  <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
                  <View style={styles.content}>
                <View style={styles.header}>
                  <Text style={styles.title}>AdaptiveUI</Text>
                  <TouchableOpacity style={styles.themeToggle} onPress={toggleTheme}>
                    <Text style={styles.themeToggleText}>
                      {theme === "light" ? "Dark Mode" : "Light Mode"}
                    </Text>
                  </TouchableOpacity>
                </View>
      <View>
                <View style={styles.container}>
            <TouchableOpacity style={[styles.button, { width: buttonWidth }]}>
              <Text style={styles.buttonText}>Button A</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button, { width: buttonWidth }]}>
              <Text style={styles.buttonText}>Button B</Text>
            </TouchableOpacity>
          </View>
                <View>
            <Image
              source={require('../../assets/ff.png')}
              style={styles.image}
            />
          </View>

                  <TextInput
                    style={styles.input}
                    placeholder="Nhập văn bản"
                    placeholderTextColor={theme === "light" ? "#999" : "#888"}
                  />
                    </View>
                  </View>
                </TouchableWithoutFeedback>
              </ScrollView>
            </KeyboardAvoidingView>
          </SafeAreaView>
        );
      }
