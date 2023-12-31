﻿import IHttpResponseObject from "../interfaces/IHttpResponseObject";
import INewTask from "../interfaces/INewTask";
import ITask from "../interfaces/ITask";

export const getTasks = async (): Promise<ITask[]> => {
    try {
        const result: Response = await fetch('tasks/all');
        const tasksData: ITask[] = await result.json();

        return tasksData;
    } catch (e) {
        return [];
    }
};

export const createTask = async (task: INewTask): Promise<IHttpResponseObject> => {
    const result: IHttpResponseObject = { success: false, errors: null };

    try {
        const response = await fetch('tasks/new', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(task)
        });

        const data = await response.json();

        if (data.success) {
            result.success = true;

            return result;
        } else {
            const errors = data.errors;
            result.errors = errors;

            return result;
        }
    } catch (e: unknown) {
        result.success = false;

        if (typeof e === 'string') {
            result.errors = e;
        } else if (e instanceof Error) {
            result.errors = e.message;
        }

        return result;
    }
};

export const deleteTask = async (id: string): Promise<IHttpResponseObject> => {
    const result: IHttpResponseObject = { success: false, errors: null };

    try {
        const response = await fetch('tasks/delete', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(id)
        });

        const data = await response.json();

        if (data.success) {
            result.success = true;

            return result;
        } else {
            const errors = data.errors;
            result.errors = errors;

            return result;
        }
    } catch (e: unknown) {
        result.success = false;

        if (typeof e === 'string') {
            result.errors = e;
        } else if (e instanceof Error) {
            result.errors = e.message;
        }

        return result;
    }
};

export const editTask = async (task: ITask): Promise<IHttpResponseObject> => {
    const result: IHttpResponseObject = { success: false, errors: null };

    try {
        const response = await fetch('tasks/edit', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(task)
        });

        const data = await response.json();

        if (data.success) {
            result.success = true;

            return result;
        } else {
            const errors = data.errors;
            result.errors = errors;

            return result;
        }
    } catch (e: unknown) {
        result.success = false;

        if (typeof e === 'string') {
            result.errors = e;
        } else if (e instanceof Error) {
            result.errors = e.message;
        }

        return result;
    }
};