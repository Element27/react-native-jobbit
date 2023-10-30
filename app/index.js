import React, { useState } from 'react'
import { Text, SafeAreaView, ScrollView, View } from 'react-native'
import { Stack, useRouter } from 'expo-router'

import { COLORS, icons, images, SIZES } from '../constants'
import { ScreenHeaderBtn, Welcome, Nearbyjobs, Popularjobs } from '../components/'

export default function Home() {

  const [searchTerm, setTerm] = useState('')

  const router = useRouter()
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite, }}>
      <Stack.Screen
        options={{
          headerStyle: { backgroundColor: COLORS.lightWhite },
          headerShadowVisible: true,
          headerLeft: () => (<ScreenHeaderBtn iconUrl={icons.menu} dimension="60%" />),
          headerRight: () => (<ScreenHeaderBtn iconUrl={images.profile} dimension="100%" />),
          headerTitle: ""
        }}
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ flex: 1, padding: SIZES.medium }}>
          <Welcome
            searchTerm={searchTerm}
            setTerm={setTerm}
            handleClick={() => {
              if (searchTerm) {
                router.push(`/search/${searchTerm}`)
              }
            }}
          />
          <Popularjobs />
          <Nearbyjobs />
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

// expo cli start --tunnel