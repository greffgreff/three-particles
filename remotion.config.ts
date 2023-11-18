import { Config } from '@remotion/cli/config'
import { enableSkia } from '@remotion/skia/enable'

Config.overrideWebpackConfig(enableSkia)
Config.setVideoImageFormat('jpeg')
Config.setChromiumOpenGlRenderer('angle')
Config.setOverwriteOutput(true)
