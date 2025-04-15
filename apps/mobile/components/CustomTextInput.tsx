import React from "react";
import { View, TextInput, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useController } from "react-hook-form";

interface CustomTextInputProps {
  name: string;
  control: any;
  placeholder: string;
  icon: string;
  secureTextEntry?: boolean;
  keyboardType?: "default" | "email-address" | "numeric" | "phone-pad";
  error?: string;
}

const CustomTextInput = ({
  name,
  control,
  placeholder,
  icon,
  secureTextEntry = false,
  keyboardType = "default",
  error,
}: CustomTextInputProps) => {
  const { field } = useController({
    name,
    control,
    defaultValue: "",
  });

  return (
    <View style={styles.container}>
      <Ionicons name={icon} size={20} color="#888" style={styles.icon} />
      <TextInput
        {...field}
        placeholder={placeholder}
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType}
        style={[styles.input, error && { borderColor: "red" }]}
      />
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

export default CustomTextInput;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
    backgroundColor: "#f2f2f2",
    borderRadius: 10,
    paddingLeft: 15,
    paddingRight: 10,
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 15,
    height: 45,
  },
  errorText: {
    color: "red",
    fontSize: 12,
    marginTop: 4,
    paddingLeft: 10,
  },
});
