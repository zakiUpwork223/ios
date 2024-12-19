import {useEffect, useState} from 'react';
import * as RNIap from 'react-native-iap';
import {Plan} from '../plans';
import {
  fetchLatestReceipt,
  ReceiptInfo,
} from '../../../services/ApiValidateReceipt.tsx';

export const useIAP = (plans: Plan[], refresh) => {
  const [products, setProducts] = useState<RNIap.Product[]>([]);
  const [latestReceipt, setLatestReceipt] = useState<ReceiptInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const maxRetries = 3;

  const initIAP = async (retryCount = 0) => {
    try {
      console.log('Iniciando conexión IAP...');
      await RNIap.initConnection();
      console.log('IAP initialized');

      const skus = plans
        .map(plan => plan.appleProductId)
        .filter(Boolean) as string[];
      const availableProducts = await RNIap.getProducts({skus});
      setProducts(availableProducts);

      console.log('Productos disponibles encontrados');

      const purchaseHistory = await RNIap.getPurchaseHistory();
      console.log('Historial de compras obtenido');

      if (purchaseHistory && purchaseHistory.length > 0) {
        purchaseHistory.sort((a, b) => a.transactionDate - b.transactionDate);

        const latestPurchase = purchaseHistory[purchaseHistory.length - 1];
        const latestReceiptInfo: ReceiptInfo | null = await fetchLatestReceipt(
          latestPurchase.transactionReceipt,
        );

        if (latestReceiptInfo) {
          setLatestReceipt(latestReceiptInfo);
        } else {
          console.log('No se encontró un recibo válido');
        }
      }
    } catch (error) {
      console.error('Error al inicializar IAP:', error);
      if (retryCount < maxRetries) {
        console.log(
          `Reintentando inicialización IAP (${
            retryCount + 1
          }/${maxRetries})...`,
        );
        await initIAP(retryCount + 1);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    initIAP();

    return () => {
      RNIap.endConnection();
    };
  }, [plans, refresh]);

  return {products, latestReceipt, loading, setLatestReceipt};
};
