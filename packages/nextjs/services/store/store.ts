import { User } from "next-auth";
import { create } from "zustand";

/**
 * Zustand Store
 *
 * You can add global state to the app using this useGlobalState, to get & set
 * values from anywhere in the app.
 *
 * Think about it as a global useState.
 */

type TGlobalState = {
  nativeCurrencyPrice: number;
  setNativeCurrencyPrice: (newNativeCurrencyPriceState: number) => void;

  discordUser?: User;
  setDiscordUser: (newDiscord: User) => void;
};

export const useGlobalState = create<TGlobalState>(set => ({
  nativeCurrencyPrice: 0,
  setNativeCurrencyPrice: (newValue: number): void => set(() => ({ nativeCurrencyPrice: newValue })),
  discordUser: undefined,
  setDiscordUser: (newValue: User): void => set(() => ({ discordUser: newValue })),
}));
