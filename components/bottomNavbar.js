import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Platform } from "react-native";
import { useTheme } from "../theme/ThemeProvider";
import { AntDesign, MaterialCommunityIcons } from "@expo/vector-icons";

const BottomNavBar = () => {
  const { theme } = useTheme();
  const [selected, setSelected] = useState("Home");

  const navItems = [
    { name: "Home", icon: "home", iconSet: "AntDesign" },
    { name: "Explore", icon: "search1", iconSet: "AntDesign" },
    { name: "Certificate", icon: "certificate-outline", iconSet: "MaterialCommunityIcons" },
    { name: "Profile", icon: "user", iconSet: "AntDesign" },
  ];

  return (
    <View style={styles.container}>
      <View
        style={[
          styles.navbarContainer,
          { 
            backgroundColor: theme.colors.oncard || '#FFFFFF',
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: -2,
            },
            shadowOpacity: 0.1,
            shadowRadius: 3.84,
            elevation: 5,
          }
        ]}
      >
        <View style={styles.navbar}>
          {navItems.map((item) => (
            <TouchableOpacity
              key={item.name}
              style={styles.navItem}
              onPress={() => setSelected(item.name)}
              activeOpacity={0.7}
            >
              <View style={styles.iconContainer}>
                {selected === item.name && (
                  <View
                    style={[
                      styles.indicator,
                      { backgroundColor: theme.colors.primary },
                    ]}
                  />
                )}
                <View style={styles.iconWrapper}>
                  {item.iconSet === "AntDesign" ? (
                    <AntDesign
                      name={item.icon}
                      size={22}
                      color={
                        selected === item.name
                          ? theme.colors.primary
                          : theme.colors.textSecondary
                      }
                    />
                  ) : (
                    <MaterialCommunityIcons
                      name={item.icon}
                      size={22}
                      color={
                        selected === item.name
                          ? theme.colors.primary
                          : theme.colors.textSecondary
                      }
                    />
                  )}
                </View>
                <Text
                  style={[
                    styles.navText,
                    {
                      color:
                        selected === item.name
                          ? theme.colors.primary
                          : theme.colors.textSecondary,
                      fontWeight: selected === item.name ? '600' : '400'
                    },
                  ]}
                >
                  {item.name}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </View>
      {/* Add extra padding for iPhone models with home indicator */}
      {Platform.OS === 'ios' && <View style={styles.iosPadding} />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
  },
  navbarContainer: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    overflow: "hidden",
    borderTopWidth: 1,
    borderTopColor: "rgba(0,0,0,0.05)",
  },
  navbar: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    height: 65,
    width: "100%",
    paddingBottom: Platform.OS === 'ios' ? 0 : 3,
  },
  navItem: {
    flex: 1,
    height: "100%",
    justifyContent: "center",
  },
  iconContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 10,
  },
  iconWrapper: {
    alignItems: "center",
    justifyContent: "center",
    height: 24,
  },
  indicator: {
    position: "absolute",
    top: -10,
    width: 30,
    height: 3,
    borderRadius: 2,
  },
  navText: {
    fontSize: 12,
    marginTop: 4,
    textAlign: "center",
  },
  iosPadding: {
    height: Platform.OS === 'ios' ? 20 : 0,
    backgroundColor: '#FFFFFF', // or theme.colors.oncard
  }
});

export default BottomNavBar;