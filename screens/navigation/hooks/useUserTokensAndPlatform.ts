// useUserTokensAndPlatform.ts

import React, {useState} from 'react';
import {useFocusEffect} from '@react-navigation/native';
import {getUserTokens} from '../../../services/ApiGetTokens.tsx';
import {
  getUserPlatform,
  UserPlatform,
} from '../../../services/ApiGetUserPlatform';

export const useUserTokensAndPlatform = (
  trainerID: string,
  refresh?: boolean,
): {
  tokens: number;
  platform: UserPlatform | null;
} => {
  const [tokens, setTokens] = useState(0);
  const [platform, setPlatform] = useState<UserPlatform | null>(null);

  useFocusEffect(
    React.useCallback(() => {
      const fetchData = async () => {
        try {
          const {remainingTokens} = await getUserTokens(trainerID);
          setTokens(remainingTokens ?? 0);

          const userPlatform = await getUserPlatform(trainerID);
          setPlatform(userPlatform ?? null);
        } catch (error) {
          console.error('Error fetching tokens or platform:', error);
        }
      };

      fetchData();
    }, [trainerID, refresh]),
  );

  return {tokens, platform};
};
