import fetchRequest from './index';
import { Journal } from 'Types/index';

const JOURNALS_URL = '/journals';

export function addJournal(journal: Journal) {
  return fetchRequest(JOURNALS_URL, {
    method: 'POST',
    mode: 'cors',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(journal)
  })
}

export function getAllJournals() {
  return fetchRequest(JOURNALS_URL);
}

export function getOneJournal(id: string) {
  return fetchRequest(`${JOURNALS_URL}/${id}`);
}

export function getPublicJournals() {
  return fetchRequest(`${JOURNALS_URL}/collections`);
}

export function updateJournal(id: string, update: Journal) {
  return fetchRequest(`${JOURNALS_URL}/${id}`, {
    method: 'PUT',
    mode: 'cors',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(update)
  })
}

export function deleteJournal(id: string) {
  return fetchRequest(`${JOURNALS_URL}/${id}`, {
    method: 'DELETE'
  });
}

const JournalAPI = {
  addJournal,
  getAllJournals,
  getOneJournal,
  getPublicJournals,
  updateJournal,
  deleteJournal
}

export default JournalAPI