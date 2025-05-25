import SearchInput from '@/components/common/SearchInput'
import React from 'react'
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    FlatList,
    Image,
    TouchableOpacity
} from 'react-native'
import { useTheme } from 'react-native-paper'

const menuData = [
    { title: 'Carbohydrate intake', image: require('@/assets/images/thuc-don-thuan-viet.jpg') },
    { title: 'Fat intake', image: require('@/assets/images/thuc-don-thuan-viet.jpg') },
    { title: 'Calories consumed', image: require('@/assets/images/thuc-don-thuan-viet.jpg') },
    { title: 'Calorie breakdown', image: require('@/assets/images/thuc-don-thuan-viet.jpg') },
    { title: 'Nutritional', image: require('@/assets/images/thuc-don-thuan-viet.jpg') },
    { title: 'Nutrient', image: require('@/assets/images/thuc-don-thuan-viet.jpg') },
    { title: 'Caloric balance', image: require('@/assets/images/thuc-don-thuan-viet.jpg') },
    { title: 'Nutrient analysis', image: require('@/assets/images/thuc-don-thuan-viet.jpg') }
]

export default function MenuScreen() {
    const { colors } = useTheme()

    const renderItem = ({ item }: { item: { title: string, image: any } }) => (
        <TouchableOpacity style={[styles.card, { borderColor: colors.outlineVariant }]}>
            <Image source={item.image} style={styles.image} resizeMode="cover" />
            <View style={styles.overlay} />
            <Text style={styles.cardTitle}>{item.title}</Text>
        </TouchableOpacity>
    )

    return (
        <View style={styles.container}>
            <SearchInput />
            <Text style={[styles.sectionTitle, { color: colors.onSurfaceVariant }]}>Protein intake</Text>
            <FlatList
                data={menuData.slice(0, 4)}
                renderItem={renderItem}
                keyExtractor={(item, index) => index.toString()}
                numColumns={2}
                columnWrapperStyle={{ justifyContent: 'space-between' }}
                scrollEnabled={false}
            />

            <Text style={[styles.sectionTitle, { color: colors.onSurfaceVariant }]}>Daily intake</Text>
            <FlatList
                data={menuData.slice(4)}
                renderItem={renderItem}
                keyExtractor={(item, index) => index.toString()}
                numColumns={2}
                columnWrapperStyle={{ justifyContent: 'space-between' }}
                scrollEnabled={false}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    title: {
        fontSize: 18,
        fontWeight: '600',
        marginBottom: 16,
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