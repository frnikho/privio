"use client"

import {ChakraProvider, createSystem, defaultConfig, defineConfig} from "@chakra-ui/react"
import {
  ColorModeProvider,
  type ColorModeProviderProps,
} from "./color-mode"

const config = defineConfig({
    preflight: false,
})

const a = createSystem(defaultConfig, config)

export function Provider(props: ColorModeProviderProps) {
  return (
    <ChakraProvider value={a}>
      <ColorModeProvider {...props} />
    </ChakraProvider>
  )
}
