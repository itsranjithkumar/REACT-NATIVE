import { StyleSheet, Text, View, ScrollView } from "react-native";
import React ,{useState}from "react";

const ConfirmationScreen = () => {
  const steps = [
    { title: "Address", content: "Address Form" },
    { title: "Delivery", content: "Delivery Options" },
    { title: "Payment", content: "Payment Details" },
    { title: "Place Order", content: "Order Summary" },
  ];
  const [currentStop,setCurrentStep]= useState(0);
  return (
    <ScrollView style={{ marginTop: 55 }}>
      <View style={{ flex: 1 }}>
        <View>
          {steps?.map((step, index) => (
            <View>
              {index > 0 && (
                <View
                  style={[{ flex: 1, height: 2, backgroundColor: "green" }, index <= currentStep && {backgroundColor:"green"},

                  ]}
                />
              )}
              <View>
                
              </View>
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
  );
};

export default ConfirmationScreen;

const styles = StyleSheet.create({});
