import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';
import { Alert, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function HomeScreen() {
  const [touren, setTouren] = useState([]);
  const [formOffen, setFormOffen] = useState(false);
  const [kunde, setKunde] = useState('');
  const [produkt, setProdukt] = useState('');
  const [menge, setMenge] = useState('');
  const [zeit, setZeit] = useState('');

  useEffect(() => {
    AsyncStorage.getItem('touren').then(data => {
      if (data) setTouren(JSON.parse(data));
    });
  }, []);

  const speichern = (neueTouren) => {
    setTouren(neueTouren);
    AsyncStorage.setItem('touren', JSON.stringify(neueTouren));
  };

  const tourHinzufuegen = () => {
    if (!kunde) return;
    const neueTouren = [...touren, { id: Date.now(), kunde, produkt, menge, zeit, erledigt: false }];
    speichern(neueTouren);
    setKunde(''); setProdukt(''); setMenge(''); setZeit('');
    setFormOffen(false);
  };

  const tourErledigt = (id) => {
    speichern(touren.map(t => t.id === id ? { ...t, erledigt: !t.erledigt } : t));
  };

  const tourLoschen = (id, kundenName) => {
    Alert.alert('Tour löschen', `${kundenName} wirklich löschen?`, [
      { text: 'Abbrechen', style: 'cancel' },
      { text: 'Löschen', style: 'destructive', onPress: () => speichern(touren.filter(t => t.id !== id)) }
    ]);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Silopilot</Text>
        <Text style={styles.headerSub}>Touren heute: {touren.filter(t => !t.erledigt).length} offen</Text>
      </View>

      <TouchableOpacity style={styles.addBtn} onPress={() => setFormOffen(!formOffen)}>
        <Text style={styles.addBtnText}>{formOffen ? '✕ Abbrechen' : '+ Neue Tour'}</Text>
      </TouchableOpacity>

      {formOffen && (
        <View style={styles.form}>
          <TextInput style={styles.input} placeholder="Kunde *" value={kunde} onChangeText={setKunde} />
          <TextInput style={styles.input} placeholder="Produkt" value={produkt} onChangeText={setProdukt} />
          <TextInput style={styles.input} placeholder="Menge (z.B. 22 t)" value={menge} onChangeText={setMenge} />
          <TextInput style={styles.input} placeholder="Uhrzeit (z.B. 06:00)" value={zeit} onChangeText={setZeit} />
          <TouchableOpacity style={styles.saveBtn} onPress={tourHinzufuegen}>
            <Text style={styles.saveBtnText}>Tour speichern</Text>
          </TouchableOpacity>
        </View>
      )}

      {touren.length === 0 && (
        <View style={styles.leer}>
          <Text style={styles.leerText}>Noch keine Touren – tippe auf + Neue Tour</Text>
        </View>
      )}

      {touren.map(t => (
        <View key={t.id} style={[styles.card, t.erledigt && styles.cardErledigt]}>
          <View style={styles.cardHeader}>
            <TouchableOpacity onPress={() => tourErledigt(t.id)} style={styles.check}>
              <Text style={styles.checkText}>{t.erledigt ? '✅' : '⬜'}</Text>
            </TouchableOpacity>
            <View style={{flex:1}}>
              <Text style={[styles.cardName, t.erledigt && styles.cardNameErledigt]}>{t.kunde}</Text>
              <Text style={styles.cardDetail}>{t.produkt} {t.menge ? '· ' + t.menge : ''}</Text>
            </View>
            {t.zeit ? <View style={styles.badge}><Text style={styles.badgeText}>{t.zeit}</Text></View> : null}
            <TouchableOpacity onPress={() => tourLoschen(t.id, t.kunde)} style={styles.deleteBtn}>
              <Text>🗑️</Text>
            </TouchableOpacity>
          </View>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5' },
  header: { backgroundColor: '#1D9E75', padding: 20, paddingTop: 50 },
  headerTitle: { fontSize: 22, fontWeight: '600', color: '#fff' },
  headerSub: { fontSize: 13, color: 'rgba(255,255,255,0.8)', marginTop: 2 },
  addBtn: { margin: 12, backgroundColor: '#1D9E75', borderRadius: 10, padding: 12, alignItems: 'center' },
  addBtnText: { color: '#fff', fontWeight: '500', fontSize: 14 },
  form: { backgroundColor: '#fff', borderRadius: 12, margin: 12, marginTop: 0, padding: 14, borderWidth: 0.5, borderColor: '#ddd' },
  input: { borderWidth: 0.5, borderColor: '#ddd', borderRadius: 8, padding: 10, marginBottom: 8, fontSize: 13 },
  saveBtn: { backgroundColor: '#1D9E75', borderRadius: 8, padding: 12, alignItems: 'center', marginTop: 4 },
  saveBtnText: { color: '#fff', fontWeight: '500', fontSize: 14 },
  leer: { margin: 20, alignItems: 'center' },
  leerText: { color: '#999', fontSize: 13 },
  card: { backgroundColor: '#fff', borderRadius: 12, margin: 12, marginTop: 0, padding: 14, borderWidth: 0.5, borderColor: '#ddd' },
  cardErledigt: { opacity: 0.5 },
  cardHeader: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  check: { padding: 4 },
  checkText: { fontSize: 18 },
  cardName: { fontSize: 15, fontWeight: '500' },
  cardNameErledigt: { textDecorationLine: 'line-through' },
  cardDetail: { fontSize: 12, color: '#666', marginTop: 2 },
  badge: { backgroundColor: '#E1F5EE', borderRadius: 6, paddingHorizontal: 8, paddingVertical: 3 },
  badgeText: { fontSize: 11, color: '#0F6E56', fontWeight: '500' },
  deleteBtn: { padding: 4 },
});