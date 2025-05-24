import React from 'react'
import {
  View,
  StyleSheet,
  TextInput,
} from 'react-native'
import { useTranslation } from 'react-i18next'
import { useTheme } from 'react-native-paper'
import Icon from '@/components/common/Icon'

function SearchInput() {
  const { colors } = useTheme()
  const { t } = useTranslation()
    return (
        <View style={[styles.searchContainer, { borderColor: colors.outline }]}>
            <TextInput
                style={[styles.input, { color: colors.onBackground }]}
                placeholder={t('search food')}
                placeholderTextColor={colors.onSurfaceDisabled}
            />
            <Icon name="Search" size={20} color={colors.outline} />
        </View>
    )
}

export default SearchInput



const styles = StyleSheet.create({
    searchContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      borderWidth: 1,
      borderRadius: 12,
      paddingHorizontal: 12,
      paddingVertical: 4,
      marginVertical: 8,
    },
    input: {
      flex: 1,
      fontSize: 14,
      minHeight: 40,
    },
    sectionTitle: {
      fontSize: 16,
      fontWeight: '500',
      marginBottom: 8,
      marginTop: 16,
    },
    card: {
      width: '48%',
      aspectRatio: 1,
      borderRadius: 16,
      overflow: 'hidden',
      borderWidth: 1,
      marginBottom: 16,
      position: 'relative',
    },
    image: {
      ...StyleSheet.absoluteFillObject,
      borderRadius: 16,
    },
    overlay: {
      ...StyleSheet.absoluteFillObject,
      backgroundColor: 'rgba(0,0,0,0.3)',
    },
    cardTitle: {
      position: 'absolute',
      bottom: 12,
      left: 12,
      right: 12,
      fontSize: 14,
      fontWeight: '700',
      color: '#fff',
    },
  })