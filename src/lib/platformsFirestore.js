// Real, shared-across-all-visitors backend for the admin panel's "Links"
// (lock/unlock, edit URLs), "Announce" (site-wide banner), and "Control"
// (feature toggles) tabs - all stored in Firestore, all live via onSnapshot,
// so a change the admin makes shows up for every visitor within seconds,
// no refresh needed.
import { doc, collection, setDoc, updateDoc, onSnapshot, increment, serverTimestamp } from 'firebase/firestore'
import { db } from './firebase'
import { platforms as basePlatforms, pwPlatforms as basePw, nextTopperPlatforms as baseNt } from '../data/constants'

const platformsDocRef = doc(db, 'config', 'platforms')
const announcementDocRef = doc(db, 'config', 'announcement')
const appControlDocRef = doc(db, 'config', 'appControl')
const countersDocRef = doc(db, 'stats', 'counters')

// --- Platform lock state / edited links ------------------------------------

function mergeList(baseList, overrides) {
  return baseList.map((item) => ({ ...item, ...(overrides?.[item.id] || {}) }))
}

export function subscribePlatforms(callback) {
  return onSnapshot(platformsDocRef, (snap) => {
    const overrides = snap.data()?.overrides || {}
    callback({
      platforms: mergeList(basePlatforms, overrides),
      pwPlatforms: mergeList(basePw, overrides),
      nextTopperPlatforms: mergeList(baseNt, overrides),
    })
  })
}

export async function setPlatformOverride(id, patch) {
  await setDoc(platformsDocRef, { overrides: {} }, { merge: true })
  await updateDoc(platformsDocRef, { [`overrides.${id}`]: patch })
}

export async function resetPlatformOverride(id) {
  await updateDoc(platformsDocRef, { [`overrides.${id}`]: {} })
}

// --- Site-wide announcement banner ------------------------------------------

export function subscribeAnnouncement(callback) {
  return onSnapshot(announcementDocRef, (snap) => {
    callback(snap.data() || { text: '', active: false, color: 'red' })
  })
}

export async function setAnnouncement({ text, active, color }) {
  await setDoc(announcementDocRef, { text, active, color }, { merge: true })
}

// --- App-wide feature toggles ------------------------------------------------

export function subscribeAppControl(callback) {
  return onSnapshot(appControlDocRef, (snap) => {
    callback(
      snap.data() || {
        maintenanceMode: false,
        telegramPopupEnabled: true,
        urgentAlertEnabled: true,
      }
    )
  })
}

export async function setAppControl(patch) {
  await setDoc(appControlDocRef, patch, { merge: true })
}

// --- Real "total opens" counter ---------------------------------------------

export async function recordAppOpen() {
  try {
    await setDoc(countersDocRef, { totalOpens: increment(1), lastOpenedAt: serverTimestamp() }, { merge: true })
  } catch {
    // never let analytics break the site for a visitor
  }
}

export function subscribeCounters(callback) {
  return onSnapshot(countersDocRef, (snap) => {
    callback(snap.data() || { totalOpens: 0 })
  })
}

// --- Lightweight "online now" presence --------------------------------------
// Each open tab writes a heartbeat every 20s; "online now" = presence docs
// updated in the last 60s. This is an approximation (no server-side cleanup
// of stale docs), not a precise number - good enough for a dashboard vibe.

export function startPresenceHeartbeat() {
  const sessionId = Math.random().toString(36).slice(2)
  const ref = doc(db, 'presence', sessionId)
  const beat = () => setDoc(ref, { lastSeen: serverTimestamp() }).catch(() => {})
  beat()
  const interval = setInterval(beat, 20000)
  return () => clearInterval(interval)
}

export function subscribePresenceCount(callback) {
  return onSnapshot(collection(db, 'presence'), (snap) => {
    const now = Date.now()
    const online = snap.docs.filter((d) => {
      const t = d.data().lastSeen?.toMillis?.()
      return t && now - t < 60000
    }).length
    callback(online)
  })
}
