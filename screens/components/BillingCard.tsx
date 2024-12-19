// BillingCard.tsx

import React from 'react';
import { Modal, View, Text, TextInput, TouchableOpacity, StyleSheet, Linking } from 'react-native';
import { showToast } from './ToastCustom';
import { colors, fontSizes, spacing } from '../../style';

type BillingCardProps = {
  title: string;
  description: string;
  price: float;
  url?: string;
};

const BillingCard: React.FC<BillingCardProps> = ({
  title,
  description,
  price,
  url = 'https://www.couro.io/subscriptions'
}) => {

  function formatNumber(num: number) {
    const numberValue = parseFloat(num);

    if (isNaN(numberValue)) {
      return 'Número inválido';
    }

    return new Intl.NumberFormat('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(numberValue);
  }

  const openUrl = () => {
    Linking.openURL(url).catch(err => showToast('error', err.message))
  }

  return (
    <TouchableOpacity style={styles.container} onPress={openUrl}>
      <Text style={styles.title} >{title}</Text>
      <Text style={styles.description} >{description}</Text>
      <Text style={styles.price} >$ {formatNumber(price)} USD</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'transparent',
    borderColor: colors.gradientBlack[0],
    borderWidth: 1,
    padding: spacing.medium,
    borderRadius: 15,
    marginTop: spacing.medium
  },
  title: {
    fontSize: fontSizes.medium,
    fontWeight: '700',
  },
  description: {
    fontSize: fontSizes.small,
    color: colors.primary,
  },
  price: {
    fontSize: fontSizes.small,
    fontWeight: '700',
    color: colors.textTheriary,
    display: 'none',
  }
});

export default BillingCard;
