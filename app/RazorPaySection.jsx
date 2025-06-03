// RazorpayCloneWithReceipt.js

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
  Alert,
  ActivityIndicator,
} from 'react-native';
import * as Print from 'expo-print';
import * as Sharing from 'expo-sharing';
import { useNavigation } from 'expo-router';

const RazorpayCloneWithReceipt = () => {
  const [isGenerating, setIsGenerating] = useState(false);
    const navigation = useNavigation();
  // Dummy transaction data
  const transaction = {
    id: 'pay_DEMO123456789',
    amount: 25.0,
    date: new Date().toLocaleString(),
    merchant: 'MyMunicipality Services',
    payerName: 'John Doe',
    payerEmail: 'user@example.com',
    payerPhone: '9876543210',
  };

  const handlePay = () => {
    Alert.alert(
      'Payment Successful',
      `Transaction ID:\n${transaction.id}`,
      [{ text: 'OK' }],
      { cancelable: true }
    );
    //// 
    navigation.goBack();
  };

  const generateAndShareReceipt = async () => {
    setIsGenerating(true);
    try {
      // 1) Prepare simple HTML for the receipt
      const htmlContent = `
        <html>
          <head>
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <style>
              body { font-family: Arial, sans-serif; padding: 20px; }
              h1 { color: #2B7DF7; }
              .detail { margin-bottom: 12px; }
              .label { font-weight: bold; }
              .value { margin-left: 6px; }
              .footer { margin-top: 30px; font-size: 12px; color: #555; text-align: center; }
            </style>
          </head>
          <body>
            <h1>Payment Receipt</h1>
            <div class="detail">
              <span class="label">Transaction ID:</span>
              <span class="value">${transaction.id}</span>
            </div>
            <div class="detail">
              <span class="label">Merchant:</span>
              <span class="value">${transaction.merchant}</span>
            </div>
            <div class="detail">
              <span class="label">Amount:</span>
              <span class="value">₹${transaction.amount.toFixed(2)}</span>
            </div>
            <div class="detail">
              <span class="label">Date & Time:</span>
              <span class="value">${transaction.date}</span>
            </div>
            <hr />
            <div class="detail">
              <span class="label">Payer Name:</span>
              <span class="value">${transaction.payerName}</span>
            </div>
            <div class="detail">
              <span class="label">Payer Email:</span>
              <span class="value">${transaction.payerEmail}</span>
            </div>
            <div class="detail">
              <span class="label">Payer Phone:</span>
              <span class="value">${transaction.payerPhone}</span>
            </div>
            <div class="footer">
              This is a system-generated receipt.  
              Thank you for your payment.
            </div>
          </body>
        </html>
      `;

      // 2) Generate PDF from the HTML
      const { uri } = await Print.printToFileAsync({
        html: htmlContent,
        base64: false,
      });
      // i.e., uri → file://.../output.pdf

      // 3) Share (or save) the PDF via native share sheet
      await Sharing.shareAsync(uri, {
        mimeType: 'application/pdf',
        dialogTitle: 'Download Receipt',
        UTI: 'com.adobe.pdf',
      });
    } catch (err) {
      console.warn('Error generating/sharing receipt:', err);
      Alert.alert('Error', 'Could not generate receipt.');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <View style={styles.overlay}>
      <View style={styles.modal}>
        {/* Header */}
        <View style={styles.header}>
          <Image
            source={{ uri: 'https://sugermint.com/wp-content/uploads/2022/01/Razorpay-Startup-Story.jpg' }}
            style={styles.logo}
          />
          <Text style={styles.headerText}>Secure Payment</Text>
        </View>

        {/* Merchant Info */}
        <View style={styles.merchantBox}>
          <Text style={styles.label}>Paying to</Text>
          <Text style={styles.merchant}>{transaction.merchant}</Text>
        </View>

        {/* Amount */}
        <Text style={styles.amount}>₹{transaction.amount.toFixed(2)}</Text>

        {/* Prefill Info */}
        <View style={styles.inputGroup}>
          <TextInput
            style={styles.input}
            placeholder="you@example.com"
            editable={false}
            value={transaction.payerEmail}
          />
          <TextInput
            style={styles.input}
            placeholder="Phone number"
            editable={false}
            value={transaction.payerPhone}
          />
        </View>

        {/* Payment Options */}
        <View style={styles.paymentOptions}>
          <Text style={styles.optionTitle}>Choose payment method</Text>
          <TouchableOpacity style={styles.upiOption} activeOpacity={0.7}>
            <Text style={styles.upiText}>UPI</Text>
            <Text style={styles.upiDesc}>Pay using any UPI app</Text>
          </TouchableOpacity>
        </View>

        {/* Pay Now Button */}
        <TouchableOpacity style={styles.payButton} onPress={handlePay}>
          <Text style={styles.payButtonText}>Pay Now</Text>
        </TouchableOpacity>

        {/* Download Receipt Button */}
        <TouchableOpacity
          style={[styles.receiptButton, isGenerating && { opacity: 0.6 }]}
          onPress={generateAndShareReceipt}
          disabled={isGenerating}
        >
          {isGenerating ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.receiptButtonText}>Download Receipt</Text>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default RazorpayCloneWithReceipt;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  modal: {
    backgroundColor: '#fff',
    borderRadius: 12,
    width: '100%',
    maxWidth: 380,
    padding: 20,
    elevation: 10,
  },
  header: {
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: 20,
  },
  logo: {
    width: "100%",
    height: 60,
    marginRight: 10,
  },
  headerText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2B7DF7',
  },
  merchantBox: {
    marginBottom: 10,
  },
  label: {
    fontSize: 12,
    color: '#999',
  },
  merchant: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  amount: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#222',
    marginVertical: 12,
    textAlign: 'center',
  },
  inputGroup: {
    marginVertical: 12,
  },
  input: {
    backgroundColor: '#f1f1f1',
    borderRadius: 8,
    padding: 12,
    marginBottom: 10,
    color: '#555',
  },
  paymentOptions: {
    marginBottom: 20,
  },
  optionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#444',
    marginBottom: 8,
  },
  upiOption: {
    padding: 12,
    backgroundColor: '#eaf4ff',
    borderRadius: 8,
  },
  upiText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2B7DF7',
  },
  upiDesc: {
    fontSize: 12,
    color: '#555',
  },
  payButton: {
    backgroundColor: '#2B7DF7',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 12,
  },
  payButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  receiptButton: {
    backgroundColor: '#555',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  receiptButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
});
