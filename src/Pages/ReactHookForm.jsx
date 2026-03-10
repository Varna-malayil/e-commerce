import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { View, Text, StyleSheet, Button, TextInput, KeyboardAvoidingView, TouchableWithoutFeedback, ScrollView, Keyboard } from 'react-native';


const Form = () => {

  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = data => {
    console.log(data);
  };

  return (
    <>
      <KeyboardAvoidingView
        style={{ flex: 1, padding: 30 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <TouchableWithoutFeedback>
          <ScrollView
            contentContainerStyle={styles.scrollContainer}
            keyboardShouldPersistTaps="handled"

          >
            {/* Name */}
            <Text style={styles.label}>Full Name</Text>
            <Controller
              control={control}
              name="name"
              rules={{ required: "Name is required" }}
              render={({ field: { onChange, value } }) => (
                <TextInput
                  style={styles.input}
                  placeholder="Enter full name"
                  placeholderTextColor="#bfadad"
                  value={value}
                  onChangeText={onChange}
                />
              )}
            />
            {errors.name && <Text style={styles.error}>{errors.name.message}</Text>}

            {/* Email */}
            <Text style={styles.label}>Email</Text>
            <Controller
              control={control}
              name="email"
              rules={{ required: "Email is required" }}
              render={({ field: { onChange, value } }) => (
                <TextInput
                  style={styles.input}
                  placeholder="Enter email"
                  placeholderTextColor="#bfadad"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  value={value}
                  onChangeText={onChange}
                />
              )}
            />
            {errors.email && (
              <Text style={styles.error}>{errors.email.message}</Text>
            )}
            {/* phone */}
            <Text style={styles.label}>Phone</Text>
            <Controller
              control={control}
              name="phone"
              rules={{ required: "phone is required", maxLength: 10 }}
              render={({ field: { onChange, value } }) => (
                <TextInput
                  style={styles.input}
                  placeholder='Enter email'
                  placeholderTextColor="#bfadad"
                  keyboardType='number-pad'
                  value={value}
                  onChangeText={onChange}
                />
              )}
            />
            {errors.email && (
              <Text style={styles.error}>{errors.phone.message}</Text>
            )}
            {/* Password */}
            <Text style={styles.label}>Password</Text>
            <Controller
              control={control}
              name="password"
              rules={{
                maxLength: 10,
              }}
              render={({ field: { onChange, value } }) => (
                <TextInput
                  style={styles.input}
                  placeholder="Enter password"
                  placeholderTextColor="#bfadad"
                  secureTextEntry
                  value={value}
                  onChangeText={onChange}
                />
              )}
            />
            {errors.password && (
              <Text style={styles.error}>{errors.password.message}</Text>
            )}

            {/* Confirm Password */}
            <Text style={styles.label}>Confirm Password</Text>
            <Controller
              control={control}
              name="confirmPassword"
              rules={{
                required: "Confirm your password",
                validate: (value) =>
                  value === watch("password") || "Passwords do not match",
              }}
              render={({ field: { onChange, value } }) => (
                <TextInput
                  style={styles.input}
                  placeholder="Confirm password"
                  placeholderTextColor="#bfadad"
                  secureTextEntry
                  value={value}
                  onChangeText={onChange}
                />
              )}
            />
            {errors.confirmPassword && (
              <Text style={styles.error}>
                {errors.confirmPassword.message}
              </Text>
            )}

            {/* Submit */}
            <View style={styles.button}>
              <Button title="Submit" onPress={handleSubmit(onSubmit)} />
            </View>
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>



    </>
  );
};

const styles = StyleSheet.create({
  container: { padding: 20 },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 15, color: '#4a90e2' },
  text: { fontSize: 16, marginBottom: 10, color: '#333' },
  input: { borderWidth: 1, borderColor: '#ccc', padding: 10, marginBottom: 10, color: '#0b0a0a' },
  error: { color: 'red', marginBottom: 10 }, label: {
    fontSize: 16,
    marginBottom: 5,
    color: '#555',
  }, button: {
    marginTop: 20,
    marginBottom: 40,
  },
  scrollContainer: {
    flexGrow: 1,

  },
});

export default Form;


