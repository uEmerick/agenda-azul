"use client";
import { useState } from "react";
import { RegisterNewContact } from "./components/registerNewContact";
import { ContactCard } from "./components/contactCard";
import styles from "./page.module.css";


export type Contact = {
  id: string;
  name: string;
  phone: string;
  cep: string;
  address: string;
};

export default function Home() {

  const [Contacts, setContacts] = useState<Contact[]>([]);
  const [showForm, setShowForm] = useState(true);

  const addContact = (New : Contact) => {
    setContacts(prev => [...prev, New]);
    setShowForm(false); // depois de cadastrar, volta para a lista
  }

  const deleteContact = (id : string) => {
    setContacts(prev => prev.filter(c => c.id !== id))
  };

  return (
    <main className={styles.page}>
      <div className={styles.content}>
        <header className={styles.hero}>
          <span className={styles.eyebrow}>Sua vida em harmonia</span>
          <h1 className={styles.title}>Agenda Azul</h1>
          <p className={styles.description}>
            Guarde seus contatos em um só lugar.
          </p>
        </header>

        {showForm || Contacts.length === 0 ? (
        <section className={styles.panel} aria-labelledby="new-contact-title">
          <h2 className={styles.panelTitle} id="new-contact-title">
            Novo contato
          </h2>
          <p className={styles.panelDescription}>
            Preencha os dados para adicionar alguém especial à sua agenda.
          </p>
          <RegisterNewContact onAdd={addContact} />
          {Contacts.length > 0 && (
            <button className={styles.backButton} type="button" onClick={() => setShowForm(false)}>
              Voltar para a lista
            </button>
          )}
        </section>
        ) : (
          <div className={styles.panel} aria-labelledby="contacts-title">
            <button className={styles.button} onClick={() => setShowForm(true)}>
              Adicionar novo contato
            </button>
            
            <p className={styles.panelDescription}>
              Clique em "Excluir" para remover um contato da sua agenda.
            </p>
            <h2 className={styles.panelTitle} id="contacts-title">
              Contatos
            </h2>
            <div className={styles.list}>
              {Contacts.map(c => (
                <ContactCard key={c.id} contact={c} onDelete={deleteContact} />
              ))}
            </div>
          </div>
        )
        }
        <footer className={styles.footer}>Simples, leve e sempre por perto.</footer>
      </div>
    </main>
  );
}
