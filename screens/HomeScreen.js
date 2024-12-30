import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Image,
  ActivityIndicator,
  Modal,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useRoute, useNavigation } from '@react-navigation/native';
import BottomNavbar from '../components/bottomNavbar';
import { useCart } from '../context/CartContext';

const API_URL = 'http://192.168.202.132:3005'; // Replace with your computer's IP address

const HomeScreen = () => {
  const route = useRoute();
  const { email } = route.params || {};
  const navigation = useNavigation();

  const { cartItems, addToCart, removeFromCart } = useCart();
  const [courseInProgress, setCourseInProgress] = useState([]);
  const [recommendedCourses, setRecommendedCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCourse, setSelectedCourse] = useState(null);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(`${API_URL}/api/courses`);
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || 'Failed to fetch courses');
        }

        const inProgress = data.slice(0, 6).map(course => ({
          id: course._id,
          name: course.name,
          institution: course.institute,
          icon: course.image
        }));

        const recommended = data.slice(6).map(course => ({
          id: course._id,
          name: course.name,
          institution: course.institute,
          icon: course.image
        }));

        setCourseInProgress(inProgress);
        setRecommendedCourses(recommended);
      } catch (error) {
        console.error('Error fetching courses:', error);
        setError('Failed to load courses. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  const handleCourseSelect = (course) => {
    setSelectedCourse(course);
  };

  const handleAddToCart = () => {
    if (selectedCourse) {
      addToCart(selectedCourse);
      setSelectedCourse(null);
    }
  };

  const handleRemoveFromCart = () => {
    if (selectedCourse) {
      removeFromCart(selectedCourse.id);
      setSelectedCourse(null);
    }
  };

  const renderErrorMessage = () => (
    <View style={styles.errorContainer}>
      <Text style={styles.errorText}>{error}</Text>
      <TouchableOpacity
        style={styles.retryButton}
        onPress={() => {
          setLoading(true);
          fetchCourses();
        }}
      >
        <Text style={styles.retryButtonText}>Retry</Text>
      </TouchableOpacity>
    </View>
  );

  const cartItemCount = cartItems.length;

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#fff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.welcomeText}>Welcome!</Text>
            <Text style={styles.nameText}>{email || 'Guest'}</Text>
          </View>
          <View style={styles.headerIcons}>
            <TouchableOpacity onPress={() => navigation.navigate('AddToCart')}>
              <Icon name="cart-outline" size={24} color="#fff" />
              {cartItemCount > 0 && (
                <View style={styles.cartCount}>
                  <Text style={styles.cartCountText}>{cartItemCount}</Text>
                </View>
              )}
            </TouchableOpacity>
          </View>
        </View>

        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="Search"
            placeholderTextColor="#666"
          />
          <Icon name="search-outline" size={20} color="#666" style={styles.searchIcon} />
        </View>

        {error ? (
          renderErrorMessage()
        ) : (
          <>
            {/* Courses in Progress */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Course in progress</Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                <View style={styles.coursesRow}>
                  {courseInProgress.map((course) => (
                    <TouchableOpacity
                      key={course.id}
                      style={styles.courseCard}
                      onPress={() => handleCourseSelect(course)}
                    >
                      <Image
                        source={{ uri: course.icon }}
                        style={styles.courseIcon}
                        defaultSource={require('../assets/images/cpp-icon.png')}
                      />
                      <Text style={styles.courseName}>{course.name}</Text>
                      <Text style={styles.institutionName}>{course.institution}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </ScrollView>
            </View>

            {/* Recommended Courses */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Recommended</Text>
              <View style={styles.recommendedGrid}>
                {recommendedCourses.map((course) => (
                  <TouchableOpacity
                    key={course.id}
                    style={styles.recommendedCard}
                    onPress={() => handleCourseSelect(course)}
                  >
                    <Image
                      source={{ uri: course.icon }}
                      style={styles.recommendedIcon}
                      defaultSource={require('../assets/images/cpp-icon.png')}
                    />
                    <Text style={styles.recommendedName}>{course.name}</Text>
                    <Text style={styles.institutionName}>{course.institution}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </>
        )}
      </ScrollView>

      <BottomNavbar />

      {/* Popup Modal */}
      {selectedCourse && (
        <Modal
          visible={!!selectedCourse}
          transparent={true}
          animationType="slide"
          onRequestClose={() => setSelectedCourse(null)}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>{selectedCourse.name}</Text>
              <Text style={styles.modalText}>Institution: {selectedCourse.institution}</Text>
              <View style={styles.modalButtons}>
                <TouchableOpacity
                  style={[styles.modalButton, cartItems.some(item => item.id === selectedCourse.id) && styles.disabledButton]}
                  disabled={cartItems.some(item => item.id === selectedCourse.id)}
                  onPress={handleAddToCart}
                >
                  <Text style={styles.modalButtonText}>Add to Cart</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.modalButton, !cartItems.some(item => item.id === selectedCourse.id) && styles.disabledButton]}
                  disabled={!cartItems.some(item => item.id === selectedCourse.id)}
                  onPress={handleRemoveFromCart}
                >
                  <Text style={styles.modalButtonText}>Remove from Cart</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      )}
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#4a4a4a',
  },
  scrollContainer: {
    flexGrow: 1,
    paddingBottom: 80,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    paddingTop: 40,
  },
  headerIcons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuIcon: {
    marginLeft: 15,
  },
  welcomeText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  nameText: {
    color: '#fff',
    fontSize: 18,
  },
  searchContainer: {
    margin: 20,
    position: 'relative',
  },
  searchInput: {
    backgroundColor: '#fff',
    borderRadius: 25,
    padding: 10,
    paddingLeft: 40,
  },
  searchIcon: {
    position: 'absolute',
    left: 10,
    top: 10,
  },
  section: {
    marginTop: 20,
    padding: 20,
  },
  sectionTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  coursesRow: {
    flexDirection: 'row',
    gap: 15,
  },
  courseCard: {
    backgroundColor: '#333',
    padding: 20,
    borderRadius: 15,
    alignItems: 'center',
    width: 120,
  },
  courseIcon: {
    width: 40,
    height: 40,
    marginBottom: 10,
  },
  courseName: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  institutionName: {
    color: '#999',
    fontSize: 12,
    textAlign: 'center',
    marginTop: 5,
  },
  recommendedGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 15,
    justifyContent: 'space-between',
  },
  recommendedCard: {
    backgroundColor: '#333',
    padding: 15,
    borderRadius: 15,
    alignItems: 'center',
    width: '30%',
  },
  recommendedIcon: {
    width: 30,
    height: 30,
    marginBottom: 10,
  },
  recommendedName: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 15,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#4a4a4a',
  },
  loadingText: {
    color: '#fff',
    fontSize: 18,
  },
  errorContainer: {
    margin: 20,
    padding: 20,
    backgroundColor: 'rgba(255, 0, 0, 0.1)',
    borderRadius: 10,
    alignItems: 'center',
  },
  errorText: {
    color: '#fff',
    fontSize: 16,
    marginBottom: 10,
    textAlign: 'center',
  },
  retryButton: {
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
  },
  retryButtonText: {
    color: '#4a4a4a',
    fontWeight: 'bold',
  },
  cartCount: {
    position: 'absolute',
    top: -5,
    right: -5,
    backgroundColor: '#ff0000',
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cartCountText: {
    color: '#fff',
    fontSize: 12,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    width: 300,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  modalText: {
    fontSize: 14,
    marginVertical: 10,
  },
  modalButtons: {
    flexDirection: 'row',
    gap: 10,
  },
  modalButton: {
    backgroundColor: '#4a90e2',
    padding: 10,
    borderRadius: 5,
    width: 120,
    alignItems: 'center',
  },
  disabledButton: {
    backgroundColor: '#bbb',
  },
  modalButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default HomeScreen;