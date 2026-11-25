"use client";
import { useState, useEffect } from "react";
import styles from "./registerNewContact.module.css";
import type { Contact } from "../page";
import { match } from "assert";
import { formatPhoneNumber, normalizePhoneNumber, PHONE_NUMBER_LENGTH } from "../utils/formatPhoneNumber";

export function RegisterNewContact({onAdd}: {onAdd: (newContact: Contact) => void}) {
    const [newContact, setNewContact] = useState<Omit<Contact, "id">>({
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

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (newContact.phone.length !== PHONE_NUMBER_LENGTH) {
            setError("Informe um celular válido com DDD (11 dígitos).");
            return;
        }
        if (!newContact.address) {
            setError("Informe um CEP válido antes de cadastrar");
            return;
        }
        const id = Math.random().toString(36).substring(2, 10);
        onAdd({...newContact, id});
        setNewContact({name: "", phone: "", cep: "", address: ""});
    };

    return (
        <form className={styles.form} onSubmit={handleSubmit}>
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
                    inputMode="numeric"
                    maxLength={15}
                    required
                    value={formatPhoneNumber(newContact.phone)}
                    onChange={(e) => {
                        setError("");
                        setNewContact(prev => ({
                            ...prev,
                            phone: normalizePhoneNumber(e.target.value),
                        }));
                    }}
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
            {loading && <p className={styles.status} role="status">Buscando endereço...</p>}
            {error && <p className={styles.message} role="alert">{error}</p>}
            {newContact.address && <p className={styles.address} role="status">Endereço encontrado: {newContact.address}</p>}
            <button className={styles.button} type="submit">Adicionar</button>
        </form>
    )
}