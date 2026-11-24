import { RegisterNewContact } from "./components/registerNewContact";
import styles from "./page.module.css";

export default function Home() {
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

        <section className={styles.panel} aria-labelledby="new-contact-title">
          <h2 className={styles.panelTitle} id="new-contact-title">
            Novo contato
          </h2>
          <p className={styles.panelDescription}>
            Preencha os dados para adicionar alguém especial à sua agenda.
          </p>
          <RegisterNewContact />
        </section>

        <footer className={styles.footer}>Simples, leve e sempre por perto.</footer>
      </div>
    </main>
  );
}
