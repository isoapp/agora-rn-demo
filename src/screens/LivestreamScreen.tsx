import { PermissionsAndroid, Platform, StyleSheet, View } from "react-native";
import { useCallback, useEffect, useRef, useState } from 'react';
import {
  CameraDirection,
  ChannelProfileType,
  ClientRoleType,
  createAgoraRtcEngine,
  ErrorCodeType,
  IRtcEngine,
  OrientationMode,
  VideoMirrorModeType,
} from 'react-native-agora'
import { RtcSurfaceView, VideoViewSetupMode } from 'react-native-agora'

export const appId = '9963820e3537434283488af96a3bf5b8'

export function LivestreamScreen() {
  const engine = useRef<IRtcEngine | null>(null)

  const [joined, setJoined] = useState(false)

  const onJoinChannelSuccess = useCallback(() => {
    setJoined(true)
  }, [])

  const onLeaveChannel = useCallback(() => {
    setJoined(false)
  }, [])

  const onError = useCallback((err: ErrorCodeType, msg: string) => {
    console.error(`[AgoraRtc] onError ${err}, message: ${msg}`)
  }, [])

  useEffect(
    () => {
      const initRtcEngine = async () => {
        try {
          console.info('[AgoraRtc] initializing engine')

          await requestPermissions()

          engine.current = createAgoraRtcEngine()
          engine.current.initialize({
            appId,
            channelProfile: ChannelProfileType.ChannelProfileLiveBroadcasting,
          })
          engine.current.setClientRole(ClientRoleType.ClientRoleBroadcaster)

          engine.current.addListener('onJoinChannelSuccess', onJoinChannelSuccess)
          engine.current.addListener('onLeaveChannel', onLeaveChannel)
          engine.current.addListener('onError', onError)

          engine.current.setVideoEncoderConfiguration({
            dimensions: { width: 1920, height: 1080 },
            frameRate: 30,
            orientationMode: OrientationMode.OrientationModeFixedPortrait,
            mirrorMode: VideoMirrorModeType.VideoMirrorModeDisabled,
          })
          engine.current.enableVideo()
          engine.current.setCameraCapturerConfiguration({ cameraDirection: CameraDirection.CameraRear })

          engine.current.startPreview()
        } catch (err) {
          console.error('error initRtcEngine', err)
        }
      }

      ;(async () => {
        await initRtcEngine()
      })()

      const engineCopy = engine.current
      return () => {
        engineCopy?.removeAllListeners('onJoinChannelSuccess')
        engineCopy?.removeAllListeners('onLeaveChannel')
        engineCopy?.removeAllListeners('onError')
        engineCopy?.release()
        console.info('[AgoraRtc] engine released')
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  )

  return (
    <View style={styles.container}>
      <RtcSurfaceView 
        canvas={{ uid: 0, setupMode: VideoViewSetupMode.VideoViewSetupAdd }}
        style={styles.video}
        zOrderMediaOverlay={true}
        zOrderOnTop={true}
      />
    </View>
  )
}

async function requestPermissions() {
  if (Platform.OS === 'android') {
    await PermissionsAndroid.requestMultiple([
      PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
      PermissionsAndroid.PERMISSIONS.CAMERA,
    ])
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  video: {
    flex: 1,
  },
})
