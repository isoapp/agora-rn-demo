import type { StackScreenProps } from '@react-navigation/stack'

export type RootStackParamList = {
  Home: undefined
  Livestream: undefined
}

export type RootStackScreenProps<T extends keyof RootStackParamList> = StackScreenProps<RootStackParamList, T>