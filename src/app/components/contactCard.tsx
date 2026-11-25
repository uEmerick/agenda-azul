import type { Contact } from '../page';
import styles from './contactCard.module.css';
import { formatPhoneNumber } from '../utils/formatPhoneNumber';

export function ContactCard({ contact, onDelete }: { contact: Contact; onDelete: (id: string) => void }) {
  const initial = contact.name.trim().charAt(0).toUpperCase() || '?';

  return (
    <article className={styles.card}>
      <span className={styles.avatar} aria-hidden="true">{initial}</span>
      <div className={styles.info}>
        <h3 className={styles.name}>{contact.name}</h3>
        <p className={styles.phone}>{formatPhoneNumber(contact.phone)}</p>
        <p className={styles.address}>{contact.address}</p>
      </div>
      <button className={styles.deleteButton} onClick={() => onDelete(contact.id)}>
        Excluir
      </button>
    </article>
  );
}
