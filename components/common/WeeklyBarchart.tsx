import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { BarChart } from 'react-native-gifted-charts'
import { useTranslation } from 'react-i18next'

const WeeklyBarChart = ({ data = [] }: { data: { value: number; label: string; highlight: boolean }[] }) => {
    const { t } = useTranslation()
    
    const chartData = data.map((item) => ({
        value: item.value,
        label: item.label,
        frontColor: item.highlight ? '#3b82f6' : '#e5e7eb',
        topLabelComponent: item.highlight
            ? () => (
                <View style={styles.tooltip}>
                    <Text style={styles.tooltipText}>{item.value}</Text>
                </View>
            )
            : undefined,
    }))

    return (
        <View style={[styles.container, styles.shadow]}>
            <Text style={styles.title}>{t('weekly intake')}</Text>
            <BarChart
                barWidth={24}
                noOfSections={3}
                barBorderRadius={8}
                data={chartData}
                yAxisThickness={0}
                xAxisThickness={0}
                yAxisTextStyle={{ color: '#94a3b8' }}
                xAxisLabelTextStyle={{ color: '#64748b' }}
                maxValue={60}
                isAnimated
            />
        </View>
    )
}

export default WeeklyBarChart

const styles = StyleSheet.create({
    container: {
        marginTop: 16,
        padding: 14,
        borderRadius: 12,
        backgroundColor: '#ffffff',
        maxWidth: '100%',
        overflow: 'hidden',
    },
    shadow: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
        elevation: 2,
    },
    tooltip: {
        backgroundColor: '#e2e8f0',
        paddingHorizontal: 4,
        paddingTop: 2,
        height: 20,
        borderRadius: 8,
        marginBottom: 6,
    },
    tooltipText: {
        color: '#334155',
        fontSize: 12,
        fontWeight: '500'
    },
    title: {
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 16,
        color: '#0f172a',
    },
})