import {tasksRef} from "@/firebase";
import {getDocs, query, onSnapshot, addDoc, deleteDoc, doc, updateDoc} from "firebase/firestore";
import useTasksStore from "@/store/tasks.store.ts";
import {TaskType} from "@/store/tasks.store.ts";

export async function fetchAllTasks() {
    const tasksStore = useTasksStore();
    tasksStore.resetStore();
    const q = query(tasksRef)
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
        const taskData = doc.data() as Object;
        tasksStore.addTask({...taskData, id: doc.id} as TaskType);
    });

}

export function monitorTasksCollection() {
    const tasksStore = useTasksStore();
    const q = query(tasksRef)
    return onSnapshot(q, (snapshot) => {
        snapshot.docChanges().forEach((change) => {
            const taskData = change.doc.data() as Object;
            const id = change.doc.id;
            if (change.type === 'added') {
                tasksStore.addTask({...taskData, id} as TaskType);
            }
            if (change.type === 'modified') {
                tasksStore.updateTask({...taskData, id} as TaskType);
            }
            if (change.type === 'removed') {
                tasksStore.deleteTask(id);
            }
        });
    });
}

export async function addTask(task: Partial<TaskType>) {
    await addDoc(tasksRef, task);
}
export async function deleteTask(taskId: string) {
    const docRef = doc(tasksRef, taskId);
    await deleteDoc(docRef);
}
export async function updateTask(task: TaskType) {
    const docRef = doc(tasksRef, task.id);
    await updateDoc(docRef, task);
}