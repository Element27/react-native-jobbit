import React from 'react'
import { View, Text, ActivityIndicator, TouchableOpacity } from 'react-native'

import styles from './nearbyjobs.style'
import { COLORS } from '../../../constants'
import { useFetch } from '../../../hook/useFetchHook';
import { useRouter } from 'expo-router'
import NearbyJobCard from '../../common/cards/nearby/NearbyJobCard';

const Nearbyjobs = () => {
  // const [] = useState()
  const router = useRouter()

  const { data, isError, isLoading } = useFetch('search', { query: 'React developer', num_pages: "1" })



  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Jobs near you</Text>
        <TouchableOpacity>
          <Text style={styles.headerBtn}>Show All</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.cardsContainer}>
        {isLoading ? (<ActivityIndicator size={'large'} color={COLORS.primary} />) : isError ? (<Text >"something went wrong"</Text>) :
          data?.map((job) => (
            <NearbyJobCard
              job={job}
              key={`nearby-job-${job?.job_id}`}
              handleNavigate={(() => router.push(`/job-details/${job.job_id}`))}
            />
          ))
        }
      </View>
    </View>
  )
}

export default Nearbyjobs