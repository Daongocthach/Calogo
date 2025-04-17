import React from 'react'
import { useTranslation } from 'react-i18next'
import { View, Text, StyleSheet } from 'react-native'
import { LineChart } from 'react-native-gifted-charts'
import { useTheme } from 'react-native-paper'

type DataItem = {
    value: number;
    label: string;
};

const MonthlyLineChart = ({ data = [] }: { data: DataItem[] }) => {
    const { t } = useTranslation()
    const { colors } = useTheme()
    const chartData = data.map((item) => ({
        value: item.value,
        label: item.label,
    }))

    return (
        <View style={[styles.container, styles.shadow]}>
            <Text style={styles.title}>{t('monthly intake')}</Text>
            <LineChart
                data={chartData}
                curved
                color={colors.primary}
                dataPointsColor={colors.onPrimaryContainer}
                thickness={2}
                hideRules
                yAxisColor="transparent"
                xAxisColor="transparent"
                yAxisTextStyle={{ color: '#94a3b8' }}
                xAxisLabelTextStyle={{ color: '#64748b' }}
                noOfSections={4}
            />
        </View>
    )
}

export default MonthlyLineChart

const styles = StyleSheet.create({
    container: {
        marginTop: 16,
        marginBottom: 10,
        padding: 14,
        borderRadius: 12,
        backgroundColor: '#ffffff',
    },
    shadow: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
        elevation: 2,
    },
    title: {
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 16,
        color: '#0f172a',
    },
})
