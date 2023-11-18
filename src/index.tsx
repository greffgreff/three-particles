import { registerRoot } from 'remotion'
import { LoadSkia } from '@shopify/react-native-skia/src/web'

LoadSkia()
  .then(async () => (await import('./Video')).Video)
  .then(registerRoot)
