import React, { useState, useCallback } from 'react'

import { Text, View, SafeAreaView, ScrollView, ActivityIndicator, RefreshControl } from "react-native"

import { Stack, useRouter, useSearchParams } from 'expo-router'

import { Company, JobAbout, JobFooter, JobTabs, ScreenHeaderBtn, Specifics } from '../../components'

import { COLORS, icons, SIZES } from '../../constants'

import { useFetch } from '../../hook/useFetchHook'


const Tabs = ["About", "Qualification", "Responsibilities"]

const JobDetails = () => {

  // lets us get the specific id of the particular page we are on as is the case with useParams of react-router-dom
  const params = useSearchParams()
  const router = useRouter()
  const [refreshing, setRefreshing] = useState(false)


  const [activeTab, setActiveTab] = useState(Tabs[0])


  const onRefresh = () => {
    console.log("refresh")
  }

  const displayTabContent = () => {
    switch (activeTab) {
      case "Qualification":
        return <Specifics
          title={"Qualifications"}
          points={data[0].job_highlights?.Qualifications ?? ['N/A']}
        />
        break;

      case "About":
        return <JobAbout
          title={"About"}
          info={data[0].job_description ?? 'No data provided'}
        />
        break;

      case "Responsibilities":
        return <Specifics
          title={"Responsibilities"}
          points={data[0].job_highlights?.Responsibilities ?? ['N/A']}
        />
        break;
    }
  }

  const { data, isLoading, isError } = useFetch('job-details', { job_id: params.id })

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
      <Stack.Screen
        options={{
          headerStyle: { backgroundColor: COLORS.lightWhite },
          headerShadowVisible: false,
          headerBackVisible: false,
          headerLeft: () => (
            <ScreenHeaderBtn
              iconUrl={icons.left}
              dimension={"60%"}
              handlePress={() => router.back()}
            />
          ),
          headerRight: () => (
            <ScreenHeaderBtn
              iconUrl={icons.share}
              dimension={"60%"}
            />
          ),
          headerTitle: ""
        }} />

      <ScrollView showsVerticalScrollIndicator={false} refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
        {isLoading ? (<ActivityIndicator size={"large"} color={COLORS.primary} />)
          : isError ? (<Text>Something went wrong</Text>)
            : data.length === 0 ? <Text>No data</Text>
              : (<View style={{ padding: SIZES.medium, paddingBottom: 100 }}>
                <Company
                  companyLogo={data[0].employer_logo}
                  jobTitle={data[0].job_title}
                  companyName={data[0].employer_name}
                  Location={data[0].job_country}
                />

                <JobTabs
                  tabs={Tabs}
                  activeTab={activeTab}
                  setActiveTab={setActiveTab}
                />

                {displayTabContent()}
              </View>)
        }

      </ScrollView>
      <JobFooter url={data[0]?.job_google_link ?? 'https://careers.google.com/jobs/results'} />
    </SafeAreaView>
  )
}

export default JobDetails