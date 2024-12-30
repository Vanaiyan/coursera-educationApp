// screens/AddToCart.js
import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { useCart } from '../context/CartContext';
import BottomNavbar from '../components/bottomNavbar';

const AddToCart = () => {
  const { cartItems } = useCart();

  console.log(cartItems); 

  // Check if cart is defined and an array
  if (!Array.isArray(cartItems)) {
    return (
      <View style={styles.container}>
        <Text style={styles.emptyText}>An error occurred. Please try again later.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.title}>Your Cart</Text>
        {cartItems.length === 0 ? (
          <Text style={styles.emptyText}>Your cart is empty</Text>
        ) : (
          <View style={styles.cartItems}>
            {cartItems.map((course) => (
              <View key={course.id} style={styles.cartItem}>
                <Image source={{ uri: course.icon }} style={styles.cartItemIcon} />
                <View style={styles.cartItemInfo}>
                  <Text style={styles.cartItemName}>{course.name}</Text>
                  <Text style={styles.cartItemInstitution}>{course.institution}</Text>
                </View>
              </View>
            ))}
          </View>
        )}
      </ScrollView>
      <BottomNavbar />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#4a4a4a',
  },
  scrollContainer: {
    padding: 20,
  },
  title: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  emptyText: {
    color: '#fff',
    fontSize: 18,
    textAlign: 'center',
  },
  cartItems: {
    gap: 15,
  },
  cartItem: {
    flexDirection: 'row',
    backgroundColor: '#333',
    borderRadius: 15,
    padding: 15,
    alignItems: 'center',
  },
  cartItemIcon: {
    width: 40,
    height: 40,
    marginRight: 10,
  },
  cartItemInfo: {
    flexDirection: 'column',
  },
  cartItemName: {
    color: '#fff',
    fontWeight: 'bold',
  },
  cartItemInstitution: {
    color: '#999',
    fontSize: 12,
  },
});

export default AddToCart;