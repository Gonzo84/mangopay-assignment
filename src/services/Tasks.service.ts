import {tasksRef} from "@/firebase";
import {query, onSnapshot, addDoc, deleteDoc, doc, updateDoc} from "firebase/firestore";
import useTasksStore from "@/store/tasks.store.ts";
import {TaskType} from "@/store/tasks.store.ts";

// Function to monitor the tasks collection for changes
export function monitorTasksCollection() {
    const tasksStore = useTasksStore();
    const q = query(tasksRef) // Query the tasks collection
    return onSnapshot(q, (snapshot) => {
        snapshot.docChanges().forEach((change) => {
            const taskData = change.doc.data() as Object; // Get the data of the changed document
            const id = change.doc.id; // Get the id of the changed document
            if (change.type === 'added') {
                tasksStore.addTask({...taskData, id} as TaskType); // If a document was added, add the task to the store
            }
            if (change.type === 'modified') {
                tasksStore.updateTask({...taskData, id} as TaskType); // If a document was modified, update the task in the store
            }
            if (change.type === 'removed') {
                tasksStore.deleteTask(id); // If a document was removed, delete the task from the store
            }
        });
    });
}

// Function to add a task to the Firestore collection
export async function addTask(task: Partial<TaskType>) {
    await addDoc(tasksRef, task); // Add the task document to the tasks collection
}

// Function to delete a task from the Firestore collection
export async function deleteTask(taskId: string) {
    const docRef = doc(tasksRef, taskId); // Get a reference to the document to delete
    await deleteDoc(docRef); // Delete the document
}

// Function to update a task in the Firestore collection
export async function updateTask(task: TaskType) {
    const docRef = doc(tasksRef, task.id); // Get a reference to the document to update
    await updateDoc(docRef, task); // Update the document
}