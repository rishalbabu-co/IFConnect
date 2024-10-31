import { BaseNavigationContainer } from '@react-navigation/core';
import * as React from "react";
import { stackNavigatorFactory } from "react-nativescript-navigation";
import auth from '@react-native-firebase/auth';
import { AuthScreen } from "./auth/AuthScreen";
import { SignupScreen } from "./auth/SignupScreen";
import { LoginScreen } from "./auth/LoginScreen";
import { InfluencerDashboard } from "./dashboard/InfluencerDashboard";
import { BusinessDashboard } from "./dashboard/BusinessDashboard";
import { User, UserType } from '../types/User';

const StackNavigator = stackNavigatorFactory();

export const MainStack = () => {
  const [initializing, setInitializing] = React.useState(true);
  const [user, setUser] = React.useState<User | null>(null);

  React.useEffect(() => {
    const subscriber = auth().onAuthStateChanged(async (firebaseUser) => {
      if (firebaseUser) {
        // Fetch user data from Firestore
        const userDoc = await firestore()
          .collection('users')
          .doc(firebaseUser.uid)
          .get();
        
        const userData = userDoc.data();
        if (userData) {
          setUser({
            id: firebaseUser.uid,
            email: firebaseUser.email!,
            type: userData.type as UserType,
            name: userData.name
          });
        }
      } else {
        setUser(null);
      }
      
      if (initializing) {
        setInitializing(false);
      }
    });

    return subscriber;
  }, []);

  if (initializing) {
    return null;
  }

  return (
    <BaseNavigationContainer>
      <StackNavigator.Navigator
        initialRouteName="auth"
        screenOptions={{
          headerShown: true,
        }}
      >
        {!user ? (
          <>
            <StackNavigator.Screen
              name="auth"
              component={AuthScreen}
              options={{ title: "Welcome" }}
            />
            <StackNavigator.Screen
              name="login"
              component={LoginScreen}
              options={{ title: "Login" }}
            />
            <StackNavigator.Screen
              name="signup"
              component={SignupScreen}
              options={{ title: "Sign Up" }}
            />
          </>
        ) : (
          <>
            <StackNavigator.Screen
              name="businessDashboard"
              component={BusinessDashboard}
              options={{ title: "Business Dashboard" }}
            />
            <StackNavigator.Screen
              name="influencerDashboard"
              component={InfluencerDashboard}
              options={{ title: "Influencer Dashboard" }}
            />
          </>
        )}
      </StackNavigator.Navigator>
    </BaseNavigationContainer>
  );
}