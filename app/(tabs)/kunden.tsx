import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';
import { Alert, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function KundenScreen() {
  const [kunden, setKunden] = useState([]);
  const [formOffen, setFormOffen] = useState(false);
  const [bearbeitenId, setBearbeitenId] = useState(null);
  const [name, setName] = useState('');
  const [adresse, setAdresse] = useState('');
  const [zeiten, setZeiten] = useState('');
  const [produkt, setProdukt] = useState('');
  const [druck, setDruck] = useState('');
  const [schlauch, setSchlauch] = useState('');
  const [hinweis, setHinweis] = useState('');

  useEffect(() => {
    AsyncStorage.getItem('kunden').then(data => {
      if (data) setKunden(JSON.parse(data));
    });
  }, []);

  const speichern = (neueKunden) => {
    setKunden(neueKunden);
    AsyncStorage.setItem('kunden', JSON.stringify(neueKunden));
  };

  const formLeeren = () => {
    setName(''); setAdresse(''); setZeiten(''); setProdukt('');
    setDruck(''); setSchlauch(''); setHinweis('');
    setBearbeitenId(null);
    setFormOffen(false);
  };

  const kundeBearbeiten = (k) => {
    setName(k.name); setAdresse(k.adresse); setZeiten(k.zeiten);
    setProdukt(k.produkt); setDruck(k.druck); setSchlauch(k.schlauch);
    setHinweis(k.hinweis); setBearbeitenId(k.id);
    setFormOffen(true);
  };

  const kundeSpeichern = () => {
    if (!name) return;
    let neueKunden;
    if (bearbeitenId) {
      neueKunden = kunden.map(k => k.id === bearbeitenId ? { id: bearbeitenId, name, adresse, zeiten, produkt, druck, schlauch, hinweis } : k);
    } else {
      neueKunden = [...kunden, { id: Date.now(), name, adresse, zeiten, produkt, druck, schlauch, hinweis }];
    }
    speichern(neueKunden);
    formLeeren();
  };

  const kundeLoschen = (id, kundenName) => {
    Alert.alert('Kunde löschen', `${kundenName} wirklich löschen?`, [
      { text: 'Abbrechen', style: 'cancel' },
      { text: 'Löschen', style: 'destructive', onPress: () => speichern(kunden.filter(k => k.id !== id)) }
    ]);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Kunden</Text>
      </View>

      <TouchableOpacity style={styles.addBtn} onPress={() => { formLeeren(); setFormOffen(!formOffen); }}>
        <Text style={styles.addBtnText}>{formOffen ? '✕ Abbrechen' : '+ Neuer Kunde'}</Text>
      </TouchableOpacity>

      {formOffen && (
        <View style={styles.form}>
          <Text style={styles.formTitle}>{bearbeitenId ? 'Kunde bearbeiten' : 'Neuer Kunde'}</Text>
          <TextInput style={styles.input} placeholder="Name *" value={name} onChangeText={setName} />
          <TextInput style={styles.input} placeholder="Adresse" value={adresse} onChangeText={setAdresse} />
          <TextInput style={styles.input} placeholder="Öffnungszeiten" value={zeiten} onChangeText={setZeiten} />
          <TextInput style={styles.input} placeholder="Produkt" value={produkt} onChangeText={setProdukt} />
          <TextInput style={styles.input} placeholder="Entladedruck" value={druck} onChangeText={setDruck} />
          <TextInput style={styles.input} placeholder="Schlauchlänge" value={schlauch} onChangeText={setSchlauch} />
          <TextInput style={styles.input} placeholder="Anfahrtshinweis / Warnung" value={hinweis} onChangeText={setHinweis} />
          <TouchableOpacity style={styles.saveBtn} onPress={kundeSpeichern}>
            <Text style={styles.saveBtnText}>Kunde speichern</Text>
          </TouchableOpacity>
        </View>
      )}

      {kunden.map(k => (
        <View key={k.id} style={styles.card}>
          <View style={styles.cardHeader}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>{k.name.substring(0,2).toUpperCase()}</Text>
            </View>
            <View style={{flex:1}}>
              <Text style={styles.cardName}>{k.name}</Text>
              <Text style={styles.cardSub}>{k.adresse}</Text>
            </View>
            <TouchableOpacity onPress={() => kundeBearbeiten(k)} style={styles.editBtn}>
              <Text style={styles.editBtnText}>✏️</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => kundeLoschen(k.id, k.name)} style={styles.deleteBtn}>
              <Text style={styles.deleteBtnText}>🗑️</Text>
            </TouchableOpacity>
          </View>
          {k.zeiten ? <View style={styles.infoRow}><Text style={styles.infoLabel}>Öffnungszeiten</Text><Text style={styles.infoValue}>{k.zeiten}</Text></View> : null}
          {k.produkt ? <View style={styles.infoRow}><Text style={styles.infoLabel}>Produkt</Text><Text style={styles.infoValue}>{k.produkt}</Text></View> : null}
          {k.druck ? <View style={styles.infoRow}><Text style={styles.infoLabel}>Druck</Text><Text style={styles.infoValue}>{k.druck}</Text></View> : null}
          {k.schlauch ? <View style={styles.infoRow}><Text style={styles.infoLabel}>Schlauch</Text><Text style={styles.infoValue}>{k.schlauch}</Text></View> : null}
          {k.hinweis ? <View style={styles.warning}><Text style={styles.warningText}>⚠️ {k.hinweis}</Text></View> : null}
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5' },
  header: { backgroundColor: '#1D9E75', padding: 20, paddingTop: 50 },
  headerTitle: { fontSize: 22, fontWeight: '600', color: '#fff' },
  addBtn: { margin: 12, backgroundColor: '#1D9E75', borderRadius: 10, padding: 12, alignItems: 'center' },
  addBtnText: { color: '#fff', fontWeight: '500', fontSize: 14 },
  form: { backgroundColor: '#fff', borderRadius: 12, margin: 12, marginTop: 0, padding: 14, borderWidth: 0.5, borderColor: '#ddd' },
  formTitle: { fontSize: 14, fontWeight: '500', marginBottom: 10, color: '#333' },
  input: { borderWidth: 0.5, borderColor: '#ddd', borderRadius: 8, padding: 10, marginBottom: 8, fontSize: 13 },
  saveBtn: { backgroundColor: '#1D9E75', borderRadius: 8, padding: 12, alignItems: 'center', marginTop: 4 },
  saveBtnText: { color: '#fff', fontWeight: '500', fontSize: 14 },
  card: { backgroundColor: '#fff', borderRadius: 12, margin: 12, marginTop: 0, padding: 14, borderWidth: 0.5, borderColor: '#ddd' },
  cardHeader: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 12 },
  avatar: { width: 40, height: 40, borderRadius: 20, backgroundColor: '#E1F5EE', alignItems: 'center', justifyContent: 'center' },
  avatarText: { fontSize: 13, fontWeight: '500', color: '#0F6E56' },
  cardName: { fontSize: 15, fontWeight: '500' },
  cardSub: { fontSize: 12, color: '#888' },
  editBtn: { padding: 6 },
  editBtnText: { fontSize: 16 },
  deleteBtn: { padding: 6 },
  deleteBtnText: { fontSize: 16 },
  infoRow: { flexDirection: 'row', paddingVertical: 6, borderTopWidth: 0.5, borderTopColor: '#eee' },
  infoLabel: { fontSize: 12, color: '#888', width: 100 },
  infoValue: { fontSize: 12, color: '#333', flex: 1 },
  warning: { backgroundColor: '#FAEEDA', borderRadius: 8, padding: 10, marginTop: 10 },
  warningText: { fontSize: 12, color: '#854F0B' },
});