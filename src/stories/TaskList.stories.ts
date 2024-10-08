// TasksList.stories.ts
import {defineComponent} from 'vue';
import TasksList from '@/components/tasks/TasksList.component.vue';
import useTasksStore from '@/store/tasks.store';
import {TaskType} from '@/store/tasks.store.ts';


export default {
    title: 'Components/TasksList',
    component: TasksList,
    decorators: [
        () => defineComponent({
            setup() {
                const taskStore = useTasksStore();
                const mockedTasks: TaskType[] = [
                    {title: 'Task 1', description: 'This is task 1', dueDate: '2023-12-31', status: 'pending', id: '1'},
                    {title: 'Task 2', description: 'This is task 2', dueDate: '2023-12-31', status: 'inProgress', id: '2'},
                    {title: 'Task 3', description: 'This is task 3', dueDate: '2023-12-31', status: 'completed', id: '3'},
                ];
                mockedTasks.forEach((task: TaskType) => taskStore.addTask(task as TaskType));
            },
            template: '<story />',
        }),
    ],
};

const Template = () => ({
    components: {TasksList},
    template: '<tasks-list />',
});

export const Default = Template.bind({});
