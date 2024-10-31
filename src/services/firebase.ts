import { 
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
  query,
  where
} from 'firebase/firestore';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
  onAuthStateChanged,
  User
} from 'firebase/auth';
import { auth, db } from '../config/firebase';
import { InfluencerProfile, BusinessProfile, UserType } from '../types/User';

export const getCurrentUser = (): User | null => {
  return auth.currentUser;
};

export const signUp = async (
  email: string, 
  password: string, 
  userType: UserType,
  profileData: Partial<InfluencerProfile | BusinessProfile>
) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    await createUserProfile(user.uid, userType, profileData);
    return user;
  } catch (error) {
    console.error('Error during signup:', error);
    throw error;
  }
};

export const signIn = async (email: string, password: string) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error) {
    console.error('Error during sign in:', error);
    throw error;
  }
};

export const signOut = async () => {
  try {
    await firebaseSignOut(auth);
  } catch (error) {
    console.error('Error during sign out:', error);
    throw error;
  }
};

export const createUserProfile = async (
  userId: string,
  userType: UserType,
  profileData: Partial<InfluencerProfile | BusinessProfile>
) => {
  try {
    const userRef = doc(db, `${userType}s`, userId);
    await setDoc(userRef, {
      ...profileData,
      id: userId,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    });
    return userId;
  } catch (error) {
    console.error('Error creating user profile:', error);
    throw error;
  }
};

export const updateInfluencerProfile = async (
  userId: string,
  updates: Partial<InfluencerProfile>
) => {
  try {
    const influencerRef = doc(db, 'influencers', userId);
    const influencerDoc = await getDoc(influencerRef);

    if (!influencerDoc.exists()) {
      throw new Error('Influencer profile not found');
    }

    await updateDoc(influencerRef, {
      ...updates,
      updatedAt: new Date().toISOString()
    });
  } catch (error) {
    console.error('Error updating influencer profile:', error);
    throw error;
  }
};

export const getInfluencers = async (): Promise<InfluencerProfile[]> => {
  try {
    const influencersRef = collection(db, 'influencers');
    const querySnapshot = await getDocs(influencersRef);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as InfluencerProfile[];
  } catch (error) {
    console.error('Error fetching influencers:', error);
    throw error;
  }
};

export const getInfluencerById = async (id: string): Promise<InfluencerProfile | null> => {
  try {
    const influencerRef = doc(db, 'influencers', id);
    const influencerDoc = await getDoc(influencerRef);
    
    if (!influencerDoc.exists()) {
      return null;
    }

    return {
      id: influencerDoc.id,
      ...influencerDoc.data()
    } as InfluencerProfile;
  } catch (error) {
    console.error('Error fetching influencer:', error);
    throw error;
  }
};

export const subscribeToAuthChanges = (callback: (user: User | null) => void) => {
  return onAuthStateChanged(auth, callback);
};