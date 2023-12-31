﻿import { useRef } from "react";
import styles from './NewTask.module.css';
import INewTask from "../../interfaces/INewTask";
import { createTask } from "../../api/Tasks.api";
import IHttpResponseObject from "../../interfaces/IHttpResponseObject";


const NewTask: React.FC = () => {
    const titleRef = useRef<HTMLInputElement>(null);
    const descriptionRef = useRef<HTMLTextAreaElement>(null);
    const dueDateRef = useRef<HTMLInputElement>(null);

    const clearInputValues = (): void => {
        if (titleRef && titleRef.current) {
            titleRef.current.value = '';
        }

        if (descriptionRef && descriptionRef.current) {
            descriptionRef.current.value = '';
        }

        if (dueDateRef && dueDateRef.current) {
            dueDateRef.current.value = '';
        }
    };

    const submitHandler = async (event: React.FormEvent): Promise<void> => {
        event.preventDefault();

        const titleValue = titleRef && titleRef.current ? titleRef.current.value : '';
        const descriptionValue = descriptionRef && descriptionRef.current ? descriptionRef.current.value : '';
        const dueDateValue = dueDateRef && dueDateRef.current ? new Date(dueDateRef.current.value) : null;

        if (titleValue === '') {
            // show error
            return;
        }

        const newTask: INewTask = {
            title: titleValue,
            description: descriptionValue,
            dueDate: dueDateValue
        };

        const response: IHttpResponseObject = await createTask(newTask);

        if (response.errors) {
            throw response.errors;
        }

        clearInputValues();
    };

    return (<form className={styles.form} onSubmit={submitHandler}>
        <label htmlFor="title">Title</label>
        <input id="title" type="text" ref={titleRef} />
        <label htmlFor="description">Description</label>
        <textarea id="description" ref={descriptionRef} />
        <label htmlFor="dueDate">Due date</label>
        <input id="dueDate" type="date" ref={dueDateRef} />
        <button type="submit">Create</button>
    </form>);
};

export default NewTask;