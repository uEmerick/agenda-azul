"use client";
import { useState, useEffect } from "react";
import styles from "./registerNewContact.module.css";

type Contact = {
    name: string;
    phone: string;
    cep: string;
    address: string;
};

export function RegisterNewContact() {

    const [newContact, setNewContact] = useState<Contact>({
        name: "",
        phone: "",
        cep: "",
        address: "",
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {

        if (newContact.cep.length !== 8) return;

        setLoading(true);
        setError("");

        fetch(`https://viacep.com.br/ws/${newContact.cep}/json/`)
            .then((response) => response.json())
            .then((data) => {
                if (data.erro) {
                    setError("CEP não encontrado.");
                    return;
                }
                setNewContact((prevContact) => ({
                    ...prevContact,
                    address: `${data.logradouro}, ${data.bairro} - ${data.localidade}/${data.uf}`,
                }));
            })
            .catch((error) => {
                setError("Não foi possível buscar o endereço.");
            })
            .finally(() => {
                setLoading(false);
            });

    }, [newContact.cep]);

    return (
        <form className={styles.form}>
            <div className={styles.field}>
                <label className={styles.label} htmlFor="name">Nome</label>
                <input
                    className={styles.input}
                    type="text"
                    id="name"
                    name="name"
                    placeholder="Ex.: Ana Silva"
                    required
                    value={newContact.name}
                    onChange={(e) => setNewContact(prev => ({ ...prev, name: e.target.value }))}
                />
            </div>
            <div className={styles.field}>
                <label className={styles.label} htmlFor="phone">Telefone</label>
                <input
                    className={styles.input}
                    type="tel"
                    id="phone"
                    name="phone"
                    placeholder="(00) 00000-0000"
                    required
                    value={newContact.phone}
                    onChange={(e) => setNewContact(prev => ({ ...prev, phone: e.target.value }))}
                />
            </div>
            <div className={styles.field}>
                <label className={styles.label} htmlFor="cep">CEP</label>
                <input
                    className={styles.input}
                    type="text"
                    id="cep"
                    name="cep"
                    placeholder="Digite os 8 numeros do CEP"
                    inputMode="numeric"
                    maxLength={8}
                    required
                    value={newContact.cep}
                    onChange={(e) => setNewContact(prev => ({
                        ...prev,
                        cep: e.target.value.replace(/\D/g, ''),
                        address: '',
                    }))}
                />
            </div>
            {loading && <p className={styles.message} role="status">Buscando endereço...</p>}
            {error && <p className={styles.message} role="alert">{error}</p>}
            {newContact.address && <p className={styles.address}>{newContact.address}</p>}
        </form>
    );
}