import React, {useContext, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Button,
  Platform,
  Linking,
} from 'react-native';
import {Link, NavigationProp, useNavigation} from '@react-navigation/native';
import {AuthContext, RootStackParamList} from '../../App';
import styles from './style/BillinScreenStyles';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faArrowLeft} from '@fortawesome/free-solid-svg-icons';
import * as RNIap from 'react-native-iap';
import {Plan, plans} from './plans';
import {useUserTokensAndPlatform} from './hooks/useUserTokensAndPlatform';
import {useIAP} from './hooks/useIAP';
import {
  fetchLatestReceipt,
  ReceiptInfo,
} from '../../services/ApiValidateReceipt.tsx';
import config from '../../config';
import OpenURLButton from '../components/OpenURLButton.tsx';

interface PlanCardProps {
  title: string;
  plan: Plan;
  description?: string;
  additionalDescription?: string;
  price?: string;
  onBuy?: () => void;
  onCancel?: () => void;
  buttonTitle?: string;
  isProcessing?: boolean;
}

const PlanCard: React.FC<PlanCardProps> = ({
  title,
  plan,
  description,
  additionalDescription,
  price,
  onBuy,
  onCancel,
  buttonTitle,
  isProcessing,
}) => (
  <View style={styles.planBox}>
    <Text style={styles.planTitle}>{title}</Text>
    <Text style={styles.planName}>{plan.name}</Text>
    <Text style={styles.planDescription}>
      {description || plan.description.join('\n')}
      {additionalDescription && `\n${additionalDescription}`}
    </Text>
    <Text style={styles.planPrice}>{price || plan.price}</Text>
    {onBuy && (
      <Button
        title={isProcessing ? 'Processing...' : buttonTitle || 'Buy'}
        onPress={onBuy}
        disabled={isProcessing}
      />
    )}
    {onCancel && <Button title={buttonTitle || 'Manage'} onPress={onCancel} />}
  </View>
);

const BillingScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const {session} = useContext(AuthContext);
  const trainerID = session?.user.id || '';
  const [refresh, setRefresh] = useState(false);
  const {products, latestReceipt, loading, setLatestReceipt} = useIAP(
    plans,
    refresh,
  );
  const {tokens, platform} = useUserTokensAndPlatform(trainerID, refresh);
  const [purchaseProcessing, setPurchaseProcessing] = useState(false);

  const purchaseProduct = async (sku: string) => {
    try {
      setPurchaseProcessing(true);
      console.log(`Intentando comprar producto con SKU: ${sku}`);

      const purchase = await RNIap.requestPurchase({sku});

      if (!purchase) {
        console.error('No se pudo completar la compra.');
        alert(
          'We encountered an issue while processing your purchase. Please try again.',
        );
        setPurchaseProcessing(false);
        return;
      }

      const receipt = purchase.transactionReceipt;
      if (receipt) {
        const purchaseSuccess = await handlePurchaseSuccess(
          purchase,
          setLatestReceipt,
        );

        if (purchaseSuccess) {
          console.log('Compra completada y validada.');
          alert('Purchase completed successfully!');
          setRefresh(!refresh);
        } else {
          console.error('Error al validar la compra.');
          alert(
            'We encountered an issue while validating your purchase. Please try again.',
          );
          setPurchaseProcessing(false);
        }

        await RNIap.finishTransaction({purchase, isConsumable: false});
      }
    } catch (error) {
      console.error('Error al procesar la compra:', error);
      alert('An error occurred while processing your purchase.');
      setPurchaseProcessing(false);
    }
  };

  const handlePurchaseSuccess = async (
    purchase: RNIap.Purchase,
    updateLatestReceipt: (receipt: ReceiptInfo) => void,
  ) => {
    try {
      console.log(
        'Procesando compra:',
        purchase.originalTransactionIdentifierIOS,
      );
      const receiptInfo: ReceiptInfo | null = await fetchLatestReceipt(
        purchase.transactionReceipt,
      );
      if (!receiptInfo) {
        console.error('Validación del servidor fallida.');
        return false;
      }

      const updateRes = await fetch(`${config.backendUrl}/api/update-account`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: trainerID,
          customerId: platform?.customerId,
          subscriptionId: platform?.subscriptionId,
          plan: purchase.productId,
          tokensPerPlan: findPlanByAppleProductId(purchase.productId)
            ?.tokenAmount,
          platform: 'apple',
          subFinish: receiptInfo.expirationDateTimestamp,
          subStart: receiptInfo.originalPurchaseDateTimestamp,
          appleTransactionId: receiptInfo.originalTransactionId,
        }),
      });

      if (!updateRes.ok) {
        const errorData = await updateRes.json();
        console.error('Detalles del error:', errorData);
        return false;
      }

      updateLatestReceipt(receiptInfo);

      await RNIap.finishTransaction({purchase, isConsumable: false});
      console.log('Transacción finalizada correctamente.');
      return true;
    } catch (error) {
      console.error('Error al finalizar la transacción:', error);
      return false;
    }
  };

  const handleCancelSubscription = () => {
    const url =
      Platform.OS === 'ios'
        ? 'https://apps.apple.com/account/subscriptions'
        : 'https://play.google.com/store/account/subscriptions';
    Linking.openURL(url).catch(err =>
      console.error('Failed to open subscriptions page:', err),
    );
  };

  const findPlanByPriceId = (priceId: string) =>
    plans.find(plan => plan.priceId === priceId);
  const findPlanByAppleProductId = (appleProductId: string) =>
    plans.find(plan => plan.appleProductId === appleProductId);

  console.log(
    'latestReceipt.originalTransactionId:',
    latestReceipt?.originalTransactionId,
  );
  console.log('platform?.appleTransactionId:', platform?.appleTransactionId);
  console.log(
    'Comparación:',
    latestReceipt?.originalTransactionId === platform?.appleTransactionId,
  );

  return (
    <View style={styles.container}>
      <View>
        <TouchableOpacity
          style={styles.buttonBack}
          onPress={() => navigation.navigate('PatientCreation')}>
          <FontAwesomeIcon icon={faArrowLeft} />
        </TouchableOpacity>
      </View>
      <View style={styles.containerHeader}>
        <View style={styles.containerText}>
          <Text style={styles.title}>
            Couro <Text style={styles.highlight}>Plans</Text>
          </Text>
        </View>
      </View>
      <View style={styles.remainingTokensBox}>
        <Text style={styles.remainingTokensText}>
          Remaining Tokens: {tokens}
        </Text>
      </View>

      {loading ? (
        <Text style={styles.loadingText}>
          Loading info (this may take a while)...
        </Text>
      ) : platform?.platform && platform?.platform !== 'apple' ? (
        <View>
          <PlanCard
            title="Current Plan"
            plan={findPlanByPriceId(platform?.planId) || plans[0]}
          />
          <View style={styles.warningBox}>
            <Text style={styles.warningText}>
              You can't make changes to your subscription inside this app,
              because you purchased this subscription on another platform.
            </Text>
          </View>
        </View>
      ) : (
        <View>
          {latestReceipt ? (
            platform?.appleTransactionId &&
            latestReceipt.originalTransactionId ===
              platform?.appleTransactionId ? (
              <PlanCard
                title="Current Plan"
                plan={
                  findPlanByAppleProductId(latestReceipt.productId) || plans[0]
                }
                additionalDescription={`Renews on ${new Date(
                  latestReceipt.expirationDateTimestamp,
                ).toLocaleDateString()} at ${new Date(
                  latestReceipt.expirationDateTimestamp,
                ).toLocaleTimeString()}`}
                price={
                  products.find(
                    product => product.productId === latestReceipt.productId,
                  )?.localizedPrice
                }
                onCancel={handleCancelSubscription}
                buttonTitle="Manage"
              />
            ) : (
              <View>
                <PlanCard
                  title="Current Plan"
                  plan={
                    findPlanByAppleProductId(latestReceipt.productId) ||
                    plans[0]
                  }
                  additionalDescription={`Renews on ${new Date(
                    latestReceipt.expirationDateTimestamp,
                  ).toLocaleDateString()} at ${new Date(
                    latestReceipt.expirationDateTimestamp,
                  ).toLocaleTimeString()}`}
                  price={
                    products.find(
                      product => product.productId === latestReceipt.productId,
                    )?.localizedPrice
                  }
                  onCancel={handleCancelSubscription}
                  buttonTitle="Cancel"
                />
                <View style={styles.warningBox}>
                  <Text style={styles.warningText}>
                    This subscription is owned by another Couro account but
                    managed by this Apple ID. If you want to subscribe with this
                    Couro account, please cancel the subscription first.
                  </Text>
                </View>
              </View>
            )
          ) : (
            <View>
              {products.map(product => {
                const plan =
                  findPlanByAppleProductId(product.productId) || plans[0];
                return (
                  <PlanCard
                    key={product.productId}
                    title={plan.name}
                    plan={plan}
                    price={product.localizedPrice}
                    onBuy={() => purchaseProduct(product.productId)}
                    buttonTitle="Buy"
                    isProcessing={purchaseProcessing}
                  />
                );
              })}

              <View>
                <Text style={styles.termsText}>
                  Recurring billing. By continuing, you verify that you are at
                  least 18 years old and agree to these{' '}
                  <OpenURLButton url="https://www.apple.com/legal/internet-services/itunes/dev/stdeula/">
                    terms
                  </OpenURLButton>
                  . See the{' '}
                  <OpenURLButton url="https://www.couro.io/privacy-policy">
                    privacy statement
                  </OpenURLButton>
                  . No refunds for partial billing periods.
                </Text>
              </View>
            </View>
          )}
        </View>
      )}
    </View>
  );
};

export default BillingScreen;
