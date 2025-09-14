import { useDispatch, useSelector } from "react-redux";
import { addContact } from "../../redux/contactsOps";
import { selectContacts } from "../../redux/contactsSlice";
import { useId } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import styles from "./ContactForm.module.css";


const contactFormSchema = Yup.object().shape({
    name: Yup.string()
        .min(3, "Name is too short! Minimum 3 characters.")
        .max(50, "Name is too long! Maximum 50 characters.")
        .required("Name is required."),
    number: Yup.string()
        .min(3, "Number is too short! Minimum 3 characters.")
        .max(50, "Number is too long! Maximum 50 characters.")
        .required("Phone number is required."),
});

const initialValues = {
    name: "",
    number: "",
};

const ContactForm = () => {
    const dispatch = useDispatch();
    const contacts = useSelector(selectContacts);
    const nameFieldId = useId();
    const phoneFieldId = useId();

    const handleSubmit = (values, actions) => {
        const newContact = {
            name: values.name,
            number: values.number
        };

        if (contacts.some(contact => contact.name.toLowerCase() === newContact.name.toLowerCase())) {
            alert(`${newContact.name} is already in contacts.`);
            return;
        }

        dispatch(addContact(newContact));
        actions.resetForm();
    };

    return (
        <Formik
            initialValues={initialValues}
            onSubmit={handleSubmit}
            validationSchema={contactFormSchema}
        >
            <Form className={styles.form}>
                <div className={styles.inputGroup}>
                    <label htmlFor="name">Name</label>
                    <Field type="text" name="name" id={nameFieldId} />
                    <ErrorMessage name="name" component="span" className={styles.error} />
                </div>
                <div className={styles.inputGroup}>
                    <label htmlFor="number">Phone</label>
                    <Field type="text" name="number" id={phoneFieldId} />
                    <ErrorMessage name="number" component="span" className={styles.error} />
                </div>
                <button type="submit" className={styles.submitBtn}>Add contact</button>
            </Form>
        </Formik>
    );
};

export default ContactForm;