import React, { useState } from 'react'
import { View, Text, ActivityIndicator, FlatList, TouchableOpacity } from 'react-native'
import { useRouter } from 'expo-router'
import styles from './popularjobs.style'
import { COLORS, SIZES } from '../../../constants'
import PopularJobCard from '../../common/cards/popular/PopularJobCard'
import { useFetch } from '../../../hook/useFetchHook';

const Popularjobs = () => {
  // const [] = useState()
  const router = useRouter()

  const { data, isError, isLoading } = useFetch('search', { query: 'React developer', num_pages: "1" })



  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Popularjobs</Text>
        <TouchableOpacity>
          <Text style={styles.headerBtn}>Show All</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.cardsContainer}>
        {isLoading ? (<ActivityIndicator size={'large'} color={COLORS.primary} />) : isError ? (<Text >"something went wrong"</Text>) : <FlatList
          data={data}
          renderItem={({ item }) => (
            <PopularJobCard item={item} />
          )}
          keyExtractor={item => item?.job_id}
          contentContainerStyle={{ columnGap: SIZES.medium }}
          horizontal
        />}
      </View>
    </View>
  )
}

export default Popularjobs