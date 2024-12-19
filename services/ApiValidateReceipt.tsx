import config from '../config';

export enum InAppOwnershipType {
  PURCHASED = 'PURCHASED',
  FAMILY_SHARED = 'FAMILY_SHARED',
}

export interface ReceiptInfo {
  quantity: number;
  productId: string;
  transactionId: number;
  originalTransactionId: number;
  purchaseDate: string;
  purchaseDateTimestamp: number;
  purchaseDatePst: string;
  originalPurchaseDate: string;
  originalPurchaseDateTimestamp: number;
  originalPurchaseDatePst: string;
  expirationDate: string;
  expirationDateTimestamp: number;
  expirationDatePst: string;
  webOrderLineItemId: number;
  isTrialPeriod: boolean;
  isInIntroOfferPeriod: boolean;
  inAppOwnershipType: InAppOwnershipType;
  subscriptionGroupIdentifier: number;
}

export const fetchLatestReceipt = async (
  receipt: string,
): Promise<ReceiptInfo | null> => {
  try {
    if (!receipt) {
      console.error('El recibo es inválido o no está disponible.');
      return null;
    }

    console.log('Enviando recibo al servidor para validación...');

    const response = await fetch(
      `${config.backendUrl}/api/app-store-server/validate-receipt`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({receipt}),
      },
    );

    const result = await response.json();
    const data = result.data;

    if (data.status !== 0) {
      console.error('El recibo no es válido:', result);
      return null;
    }

    const latestReceiptInfo = data.latest_receipt_info; // La lista `latest_receipt_info`
    const now = Date.now(); // Marca de tiempo actual en milisegundos

    // Filtrar recibos válidos (no expirados)
    const validReceipts = latestReceiptInfo.filter(receipt => {
      return parseInt(receipt.expires_date_ms, 10) > now;
    });

    // Obtener el recibo más reciente
    const latestValidReceipt = validReceipts.reduce((latest, receipt) => {
      return parseInt(receipt.expires_date_ms, 10) >
        parseInt(latest.expires_date_ms, 10)
        ? receipt
        : latest;
    }, validReceipts[0]);

    if (!latestValidReceipt) {
      console.log('No hay recibos válidos.');
      return null;
    }

    console.log('Recibo más reciente válido:');
    console.log('ID de transacción:', latestValidReceipt.original_transaction_id);
    console.log(
      'Fecha de expiración:',
      new Date(parseInt(latestValidReceipt.expires_date_ms, 10)).toISOString(),
    );
    return {
      quantity: parseInt(latestValidReceipt.quantity, 10),
      productId: latestValidReceipt.product_id,
      transactionId: parseInt(latestValidReceipt.transaction_id, 10),
      originalTransactionId: parseInt(
        latestValidReceipt.original_transaction_id,
        10,
      ),
      purchaseDate: latestValidReceipt.purchase_date,
      purchaseDateTimestamp: parseInt(latestValidReceipt.purchase_date_ms, 10),
      purchaseDatePst: latestValidReceipt.purchase_date_pst,
      originalPurchaseDate: latestValidReceipt.original_purchase_date,
      originalPurchaseDateTimestamp: parseInt(
        latestValidReceipt.original_purchase_date_ms,
        10,
      ),
      originalPurchaseDatePst: latestValidReceipt.original_purchase_date_pst,
      expirationDate: latestValidReceipt.expires_date,
      expirationDateTimestamp: parseInt(latestValidReceipt.expires_date_ms, 10),
      expirationDatePst: latestValidReceipt.expires_date_pst,
      webOrderLineItemId: parseInt(
        latestValidReceipt.web_order_line_item_id,
        10,
      ),
      isTrialPeriod: latestValidReceipt.is_trial_period === 'true',
      isInIntroOfferPeriod:
        latestValidReceipt.is_in_intro_offer_period === 'true',
      inAppOwnershipType:
        latestValidReceipt.in_app_ownership_type as InAppOwnershipType,
      subscriptionGroupIdentifier: parseInt(
        latestValidReceipt.subscription_group_identifier,
        10,
      ),
    };
  } catch (error) {
    console.error('Error al validar el recibo con el servidor:', error);
    return null;
  }
};
