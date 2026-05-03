import { ScrollView, StyleSheet, Text, View } from 'react-native';

export default function HomeScreen() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Silopilot</Text>
        <Text style={styles.headerSub}>Montag, 5. Mai</Text>
      </View>

      <Text style={styles.sectionLabel}>HEUTE – 3 STOPPS</Text>

      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Text style={styles.cardName}>Mühle Grünwald</Text>
          <View style={styles.badgeGreen}><Text style={styles.badgeTextGreen}>Jetzt</Text></View>
        </View>
        <Text style={styles.cardDetail}>Weizenmehl 550 · 22 t</Text>
        <View style={styles.chips}>
          <View style={styles.chip}><Text style={styles.chipText}>06:00–14:00</Text></View>
          <View style={styles.chip}><Text style={styles.chipText}>0,8 bar</Text></View>
          <View style={styles.chip}><Text style={styles.chipText}>20 m</Text></View>
        </View>
      </View>

      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Text style={styles.cardName}>Bäckerei Hofmann</Text>
          <View style={styles.badgeAmber}><Text style={styles.badgeTextAmber}>10:30</Text></View>
        </View>
        <Text style={styles.cardDetail}>Roggenmehl · 8 t</Text>
        <View style={styles.chips}>
          <View style={styles.chip}><Text style={styles.chipText}>07:00–16:00</Text></View>
          <View style={styles.chip}><Text style={styles.chipText}>0,6 bar</Text></View>
        </View>
      </View>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5' },
  header: { backgroundColor: '#1D9E75', padding: 20, paddingTop: 50 },
  headerTitle: { fontSize: 22, fontWeight: '600', color: '#fff' },
  headerSub: { fontSize: 13, color: 'rgba(255,255,255,0.8)', marginTop: 2 },
  sectionLabel: { fontSize: 11, color: '#888', margin: 16, marginBottom: 8 },
  card: { backgroundColor: '#fff', borderRadius: 12, margin: 12, marginTop: 0, padding: 14, borderWidth: 0.5, borderColor: '#ddd' },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 },
  cardName: { fontSize: 15, fontWeight: '500' },
  cardDetail: { fontSize: 13, color: '#666', marginBottom: 8 },
  chips: { flexDirection: 'row', gap: 6, flexWrap: 'wrap' },
  chip: { backgroundColor: '#f0f0f0', borderRadius: 6, paddingHorizontal: 8, paddingVertical: 3 },
  chipText: { fontSize: 11, color: '#555' },
  badgeGreen: { backgroundColor: '#E1F5EE', borderRadius: 6, paddingHorizontal: 8, paddingVertical: 3 },
  badgeTextGreen: { fontSize: 11, color: '#0F6E56', fontWeight: '500' },
  badgeAmber: { backgroundColor: '#FAEEDA', borderRadius: 6, paddingHorizontal: 8, paddingVertical: 3 },
  badgeTextAmber: { fontSize: 11, color: '#854F0B', fontWeight: '500' },
});