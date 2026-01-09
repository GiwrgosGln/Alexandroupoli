import { useSignIn } from "@clerk/clerk-expo";
import { Link, useRouter } from "expo-router";
import React from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Page() {
  const { signIn, setActive, isLoaded } = useSignIn();
  const router = useRouter();

  const [emailAddress, setEmailAddress] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [showTwoFactor, setShowTwoFactor] = React.useState(false);
  const [twoFactorCode, setTwoFactorCode] = React.useState("");

  // Handle the submission of the sign-in form
  const onSignInPress = async () => {
    if (!isLoaded) return;

    // Start the sign-in process using the email and password provided
    try {
      const signInAttempt = await signIn.create({
        identifier: emailAddress,
        password,
      });

      // If sign-in process is complete, set the created session as active
      // and redirect the user
      if (signInAttempt.status === "complete") {
        await setActive({ session: signInAttempt.createdSessionId });
        router.replace("/");
      } else if (signInAttempt.status === "needs_second_factor") {
        // Check if email_code strategy is supported
        const emailCodeFactor = signInAttempt.supportedSecondFactors?.find(
          (factor) => factor.strategy === "email_code"
        );

        if (emailCodeFactor) {
          // Prepare the second factor (this sends the email)
          await signIn.prepareSecondFactor({
            strategy: "email_code",
            emailAddressId: emailCodeFactor.emailAddressId,
          });
          setShowTwoFactor(true);
        } else {
          console.error("No supported secondary factor found (expected email_code)");
          console.error(JSON.stringify(signInAttempt, null, 2));
        }
      } else {
        // If the status isn't complete, check why. User might need to
        // complete further steps.
        console.error(JSON.stringify(signInAttempt, null, 2));
      }
    } catch (err) {
      // See https://clerk.com/docs/guides/development/custom-flows/error-handling
      // for more info on error handling
      console.error(JSON.stringify(err, null, 2));
    }
  };

  const onTwoFactorPress = async () => {
    if (!isLoaded) return;

    try {
      const signInAttempt = await signIn.attemptSecondFactor({
        strategy: "email_code",
        code: twoFactorCode,
      });

      if (signInAttempt.status === "complete") {
        await setActive({ session: signInAttempt.createdSessionId });
        router.replace("/");
      } else {
        console.error(JSON.stringify(signInAttempt, null, 2));
      }
    } catch (err) {
      console.error(JSON.stringify(err, null, 2));
    }
  };

  if (showTwoFactor) {
    return (
      <SafeAreaView>
        <Text>Verify 2FA</Text>
        <TextInput
          value={twoFactorCode}
          placeholder="Enter your 2FA code"
          onChangeText={(code) => setTwoFactorCode(code)}
        />
        <TouchableOpacity onPress={onTwoFactorPress}>
          <Text>Verify</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView>
      <Text>Sign in</Text>
      <TextInput
        autoCapitalize="none"
        value={emailAddress}
        placeholder="Enter email"
        onChangeText={(emailAddress) => setEmailAddress(emailAddress)}
      />
      <TextInput
        value={password}
        placeholder="Enter password"
        secureTextEntry={true}
        onChangeText={(password) => setPassword(password)}
      />
      <TouchableOpacity onPress={onSignInPress}>
        <Text>Continue</Text>
      </TouchableOpacity>
      <View style={{ display: "flex", flexDirection: "row", gap: 3 }}>
        <Text>Don't have an account?</Text>
        <Link href="/sign-up">
          <Text>Sign up</Text>
        </Link>
      </View>
    </SafeAreaView>
  );
}
