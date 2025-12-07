"use client";

import { useState } from "react";
import { useSignAndExecuteTransaction, useIotaClient } from "@iota/dapp-kit";
import { Transaction } from "@iota/iota-sdk/transactions";
import {
  PACKAGE_ID,
  MODULE_NAME,
  SUBMIT_GUESS_FUNCTION,
  CHECK_GUESS_FUNCTION,
} from "@/lib/config";

export function useContract() {
  const [loading, setLoading] = useState(false);
  const { mutate: signAndExecute } = useSignAndExecuteTransaction();
  const client = useIotaClient();

  const submitGuess = async (
    num1: number,
    num2: number,
    num3: number,
    num4: number
  ): Promise<string | null> => {
    setLoading(true);
    return new Promise((resolve) => {
      const tx = new Transaction();
      tx.moveCall({
        target: `${PACKAGE_ID}::${MODULE_NAME}::${SUBMIT_GUESS_FUNCTION}`,
        arguments: [
          tx.pure.u16(num1), 
          tx.pure.u16(num2),
          tx.pure.u16(num3),
          tx.pure.u16(num4),
        ],
      });

      signAndExecute(
        {
          transaction: tx,
        },
        {
          onSuccess: async (result) => {
            console.log("Transaction successful:", result);
            
            // Get the created GuessBox object ID
            const createdObjects = result.effects?.created;
            if (createdObjects && createdObjects.length > 0) {
              const guessBoxId = createdObjects[0].reference.objectId;
              console.log("GuessBox created:", guessBoxId);
              resolve(guessBoxId);
            } else {
              resolve(null);
            }
            setLoading(false);
          },
          onError: (error) => {
            console.error("Transaction failed:", error);
            alert("Transaction failed: " + error.message);
            setLoading(false);
            resolve(null);
          },
        }
      );
    });
  };

  const checkGuess = async (guessBoxId: string): Promise<boolean> => {
    setLoading(true);
    return new Promise((resolve) => {
      const tx = new Transaction();
      tx.moveCall({
        target: `${PACKAGE_ID}::${MODULE_NAME}::${CHECK_GUESS_FUNCTION}`,
        arguments: [tx.object(guessBoxId)],
      });

      signAndExecute(
        {
          transaction: tx,
        },
        {
          onSuccess: (result) => {
            console.log("Check successful:", result);
            setLoading(false);
            resolve(true);
          },
          onError: (error) => {
            console.error("Check failed:", error);
            setLoading(false);
            resolve(false);
          },
        }
      );
    });
  };

  return {
    submitGuess,
    checkGuess,
    loading,
  };
}